import { Button, Form, Input, message, Modal, Space } from 'antd';
import React from 'react'
import { Job } from '../../hooks/types';
import { useTranslation } from 'react-i18next';

interface ApplicationModalProps {
  job: Job;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ApplicationForm {
  firstName: string;
  lastName: string;
  email: string;
  cvLink: string;
}

export const ApplicationModal = ({ job, openModal, setOpenModal }: ApplicationModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<ApplicationForm>();

  /**
   * Handles the submission of the application form.
   * Shows loading message while processing, sends the application data,
   * and displays success/error messages accordingly.
   * 
   * @returns Promise<void>
   * @throws Will display an error message if submission fails
   * 
   * @example
   * handleSubmit({
   *   name: "John Doe",
   *   email: "john@example.com",
   *   // ... other form fields
   * });
   */
  const handleSubmit = async () => {
    try {

      message.loading(t('Enviando aplicación...'), 1.5);
      await new Promise(resolve => setTimeout(resolve, 1500));

      message.success(t('Aplicación enviada correctamente'));
      setOpenModal(false);
      form.resetFields();
    } catch (error) {
      message.error(t('Error al enviar la aplicación'));
    }
  };

  return (
    <Modal
      title={`${t('Aplicar a')}: ${job.name}`}
      centered
      open={openModal}
      onCancel={() => setOpenModal(false)}
      footer={null}
      width={{
        xs: '90%',
        sm: '80%',
        md: '70%',
        lg: '60%',
        xl: '50%',
        xxl: '40%',
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark="optional"
      >
        <Form.Item
          label={t('Nombres')}
          name="firstName"
          rules={[{ required: true, message: t('Por favor ingresa tus nombres') }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('Apellidos')}
          name="lastName"
          rules={[{ required: true, message: t('Por favor ingresa tus apellidos') }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('Correo electrónico')}
          name="email"
          rules={[
            { required: true, message: t('Por favor ingresa tu correo electrónico') },
            { type: 'email', message: t('Por favor ingresa un correo electrónico válido') }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('Link del CV')}
          name="cvLink"
          rules={[
            { required: true, message: t('Por favor ingresa el link de tu CV') },
            {
              type: 'url',
              message: t('Por favor ingresa una URL válida'),
            },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                const validDomains = ['docs.google.com', 'drive.google.com', 'dropbox.com', 'onedrive.live.com'];
                const url = new URL(value.trim());
                const isValidDomain = validDomains.some(domain => url.hostname.includes(domain));
                return isValidDomain
                  ? Promise.resolve()
                  : Promise.reject(t('Por favor usa Google Drive, Dropbox u OneDrive'));
              },
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={() => setOpenModal(false)}>
              {t('Cancelar')}
            </Button>
            <Button type="primary" htmlType="submit">
              {t('Enviar solicitud')}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}

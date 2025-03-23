import { BankOutlined, BookOutlined, FileSearchOutlined, GithubOutlined, LinkedinOutlined, SendOutlined } from '@ant-design/icons';
import { Typography, Card, Space, QRCode, Statistic } from 'antd'
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography

const LINKEDIN_URL = 'https://www.linkedin.com/in/eduardoperezpons/';
const GITHUB_REPO_URL = 'https://github.com/epons96/job-positions';
const DOCUMENTATION_URL = 'https://github.com/epons96/job-positions#job-board-application';

const About = () => {
  const { t } = useTranslation();

  return (
    <>
    <Space direction="vertical" size={24} className="w-full items-start">
      <Card variant='borderless' className='w-full'>
        <Title level={2}>{t('Sobre Job Board')}</Title>
        <Paragraph style={{ textAlign: 'left' }}>
          {t('Job Board es una plataforma que conecta a profesionales talentosos con las mejores oportunidades laborales. Nuestra misión es simplificar el proceso de búsqueda de empleo y ayudar a las empresas a encontrar el talento adecuado.')}
        </Paragraph>

        <Title level={3}>{t('¿Qué ofrecemos?')}</Title>
        <Paragraph>
          <ul className='flex flex-col items-start'>
            <li>{t('Empleos actualizados diariamente')}</li>
            <li>{t('Proceso de aplicación simplificado')}</li>
            <li>{t('Búsqueda personalizada por tipo de trabajo y ubicación')}</li>
            <li>{t('Conexión directa con empleadores')}</li>
          </ul>
        </Paragraph>

        <Title level={3}>{t('Estadísticas')}</Title>
        <Space size={48} wrap className="w-full justify-around">
          <Statistic
            title={t('Empleos publicados')}
            value={1234}
            prefix={<FileSearchOutlined />}
          />
          <Statistic
            title={t('Empresas activas')}
            value={567}
            prefix={<BankOutlined />}
          />
          <Statistic
            title={t('Aplicaciones enviadas')}
            value={890}
            prefix={<SendOutlined />}
          />
        </Space>
      </Card>
    </Space>
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* util Links */}
        <Card variant='borderless' className='h-full'>
          <Title level={3}>{t('Links útiles')}</Title>
          <Space direction="vertical" size={16} className='w-full'>
            <Space className='w-full items-center'>
              <GithubOutlined className="text-xl" />
              <Typography.Link
                href={GITHUB_REPO_URL}
                target="_blank"
                className='text-base'
              >
                {t('Código fuente en GitHub')}
              </Typography.Link>
            </Space>
            <Space className='w-full items-center'>
              <BookOutlined className="text-xl" />
              <Typography.Link
                href={DOCUMENTATION_URL}
                target="_blank"
                className='text-base'
              >
                {t('Documentación')}
              </Typography.Link>
            </Space>
          </Space>
        </Card>

        {/* LinkedIn QR */}
        <Card variant='borderless' className='h-full flex flex-col items-center justify-center'>
          <Space direction="vertical" align="center" size={16}>
            <LinkedinOutlined className='text-3xl text-[#0A66C2]' />
            <QRCode
              value={LINKEDIN_URL}
              color="#0A66C2"
              size={80}
              bordered={false}
              className='p-4 bg-white rounded-lg shadow-sm'
            />
            <Typography.Link
              href={LINKEDIN_URL}
              target="_blank"
              className='text-base hover:text-[#0A66C2]'
            >
              {t('Conéctate conmigo en LinkedIn')}
            </Typography.Link>
          </Space>
        </Card>
      </div>
    </>
  )
}

export default About
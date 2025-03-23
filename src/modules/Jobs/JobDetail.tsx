import { useParams } from 'react-router-dom'
import { Typography, Space, Tag, Button, Card } from 'antd'
import { useGetJob } from '../../hooks/useGetJob'
import { useState } from 'react'
import { ApplicationModal } from './ApplicationModal'
import CustomSpinner from '../../common/Components/CustomSpinner/CustomSpinner'
import { FetchError } from '../../common/Components/FetchError/FetchError'

const { Title } = Typography

const JobDetail = () => {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const { data: job, isLoading } = useGetJob(id || '');
  

  if (isLoading) return <CustomSpinner fullscreen />

  if (!job) return <FetchError/>

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={2}>{job.name}</Title>
          <Title level={4}>{job.company.name}</Title>
        </div>

        <Space>
          <Tag color="blue">{job.type}</Tag>
          <Tag color="default">{job.locations.map(loc => loc.name).join(', ')}</Tag>
        </Space>

        <div>
          <Title level={4}>Descripción</Title>
          <div
            className='pt-1.5'
            dangerouslySetInnerHTML={{ __html: job.contents }}
          />
        </div>

        <Button type="primary" size="large" onClick={() => setOpenModal(true)}>
          Aplicar ahora
        </Button>
      </Space>

      <ApplicationModal job={job} openModal={openModal} setOpenModal={setOpenModal}/>
     
    </Card>
  )
}

export default JobDetail
import { Typography, Space, Tag } from 'antd'
// import { Job } from '../../hooks/useGetJobs'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import { Job } from '../../hooks/types'

const { Title } = Typography

interface JobCardProps {
  job: Job
}

const JobCard = ({ job }: JobCardProps) => {

  return (
    <Link to={`/jobs/${job.id}`}>
      <Card hoverable>
        <Title level={4}>{job.name}</Title>
        <p  className='font-medium text-lg pb-1.5'>{job.company.name}</p>
        <Space>
          <Tag color="blue">{job.type}</Tag>
          <Tag color="default">{job.locations.map(loc => loc.name).join(', ')}</Tag>
        </Space>
        <div
          className='h-16 overflow-hidden relative pt-1.5'
          style={{
            maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
          }}
          dangerouslySetInnerHTML={{ __html: job.contents }}
        />
      </Card>
    </Link>
  )
}

export default JobCard
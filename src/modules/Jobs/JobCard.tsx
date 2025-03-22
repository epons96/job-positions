import { Typography, Space, Tag, Grid } from 'antd'
// import { Job } from '../../hooks/useGetJobs'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import { Job } from '../../hooks/types'

const { Title } = Typography;
const { useBreakpoint } = Grid;

interface JobCardProps {
  job: Job
}

const JobCard = ({ job }: JobCardProps) => {
  const screens = useBreakpoint();

  return (
    <Link to={`/jobs/${job.id}`}>
      <Card
        hoverable
        className="h-full"
        bodyStyle={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: screens.sm ? 24 : 16
        }}
      >
        <Title level={4} className={screens.sm ? 'text-xl' : 'text-lg'}>
          {job.name}
        </Title>
        <p className='font-medium text-lg pb-1.5'>{job.company.name}</p>
        <Space className='flex-wrap flex justify-center'>
          <Tag color="blue">{job.type}</Tag>
          <Tag color="default">{job.locations.map(loc => loc.name).join(', ')}</Tag>
        </Space>
        <div
          className='h-16 overflow-hidden relative pt-1.5 mt-auto'
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
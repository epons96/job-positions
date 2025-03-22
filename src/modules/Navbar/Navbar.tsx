import { Layout, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Header } = Layout
const { Title } = Typography

const Navbar = () => {
  return (
    <Header className='bg-white! px-12!'>
      <Space className='w-full justify-between'>
        <Link to="/">
          <Space className='flex! items-center!'>
            <img src="/vite.svg" alt="Logo" className='h-10' />
            <Title level={3} className='m-0'>Job Board</Title>
          </Space>
        </Link>
        <Link to="/about" className='hover:text-blue-600'>
          Acerca De
        </Link>
      </Space>
    </Header>
  )
}

export default Navbar;
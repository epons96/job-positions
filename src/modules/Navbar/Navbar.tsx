import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Layout, Space, Switch, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useThemeStore } from '../../store/theme'

const { Header } = Layout
const { Title } = Typography

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <Header className={`${isDarkMode ? "bg-gray-800!" : "bg-white!"} px-12!'`}>
      <Space className='w-full justify-between'>
        <Link to="/">
          <Space className='flex! items-center!'>
            <img src="/vite.svg" alt="Logo" className='h-10' />
            <Title level={3} className='m-0 dark:text-white'>Job Board</Title>
          </Space>
        </Link>
        
        <Space size={24}>
          <Switch
            checkedChildren={<SunOutlined />}
            unCheckedChildren={<MoonOutlined />}
            checked={isDarkMode}
            onChange={toggleTheme}
          />
          <Link to="/about" className='hover:text-blue-600 dark:text-white dark:hover:text-blue-400'>
            Acerca De
          </Link>
        </Space>
      </Space>
    </Header>
  )
}

export default Navbar;
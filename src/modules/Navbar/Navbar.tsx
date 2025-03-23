import { GlobalOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Layout, Select, Space, Switch, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useThemeStore } from '../../store/theme'
import { useTranslation } from 'react-i18next'

const { Header } = Layout
const { Title } = Typography

const LANGUAGES = [
  { value: 'es', label: 'ES' },
  { value: 'en', label: 'EN' }
]

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Header className={`${isDarkMode ? "bg-gray-800!" : "bg-white!"}
      px-4! 
      sm:px-8! 
      lg:px-12!
    `}>
      <Space className='w-full justify-between'>
        <Link to="/">
          <Space className='flex! items-center!'>
            <img src="/vite.svg" alt="Logo" className='h-6! sm:h-10!' />
            <Title level={3} className='m-0! text-lg! sm:text-xl! lg:text-2xl! dark:text-white hidden sm:inline'>{t('Job Board')}</Title>
            <Title level={1} className='m-0! text-lg! sm:text-xl! lg:text-2xl! dark:text-white sm:hidden'>{t('JB')}</Title>
          </Space>
        </Link>
        
        <Space size={16} className='sm:space-x-24! [&>.ant-space-item]:me-0!'>
          <Space size={8}>
            <Select
              size="small"
              defaultValue={i18n.language}
              onChange={handleLanguageChange}
              options={LANGUAGES}
              variant='borderless'
              suffixIcon={<GlobalOutlined className='text-sm!' />}
              className='w-[70px]!'
              popupClassName='min-w-[70px]!'
              dropdownStyle={{ padding: '4px' }}
            />
            <Switch
              checkedChildren={<SunOutlined />}
              unCheckedChildren={<MoonOutlined />}
              checked={isDarkMode}
              onChange={toggleTheme}
              size='small'
            />
          </Space>
          <Link to="/about" className='text-sm! sm:text-base! hover:text-blue-600 dark:text-white dark:hover:text-blue-400'>
            {t('Acerca De')}
          </Link>
        </Space>
      </Space>
    </Header>
  )
}

export default Navbar;
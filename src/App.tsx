import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider, Layout, theme } from 'antd'
import './App.css'
import AppRoutes from './modules/Routes/Routes';
import Navbar from './modules/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { useThemeStore } from './store/theme';
import { useEffect } from 'react';

const { Content } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;

const queryClient = new QueryClient()

function App() {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
            token: {
              colorPrimary: '#1677ff',
            },
          }}
        >
        <Layout>
          <Navbar />
          <Content className={`
            px-4 
            sm:px-8 
            lg:px-12 
            py-6 
            sm:py-8 
            lg:py-12 
            max-w-7xl 
            mx-auto 
            w-full
            min-h-[calc(100vh-64px)]!
          `}>
            <AppRoutes />
          </Content>
        </Layout>
         </ConfigProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App

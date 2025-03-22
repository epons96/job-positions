import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from 'antd'
import './App.css'
import AppRoutes from './modules/Routes/Routes';
import Navbar from './modules/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';

const { Content } = Layout

const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
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
          `}>
            <AppRoutes />
          </Content>
        </Layout>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App

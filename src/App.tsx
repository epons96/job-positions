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
          <Content style={{ padding: '50px', maxWidth: 1200, margin: '0 auto' }}>
            <AppRoutes />
          </Content>
        </Layout>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App

import { Routes, Route } from 'react-router-dom'
import JobList from '../Jobs/JobList'
import JobDetail from '../Jobs/JobDetail'
import About from '../About/About'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<JobList />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<h1>404: Página no encontrada</h1>} />
    </Routes>
  )
}

export default AppRoutes
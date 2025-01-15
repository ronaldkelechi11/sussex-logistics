import ReactDOM from 'react-dom/client'
import './main.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import PackagePage from './pages/PackagePage'
import NotFoundPage from './pages/NotFoundPage'
import LandingPage from './pages/LandingPage'
import AdminDashboard from './pages/AdminDashboard'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/admin-login' element={<LoginPage />} />
      <Route path='/package/:trackingId' element={<PackagePage />} />
      <Route path='/admin-dashboard' element={<AdminDashboard />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>,
)

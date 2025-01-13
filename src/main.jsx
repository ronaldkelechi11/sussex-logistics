import ReactDOM from 'react-dom/client'
import './main.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './layouts/Landing'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/admin-login' element={<LoginPage />} />
    </Routes>
  </BrowserRouter>,
)

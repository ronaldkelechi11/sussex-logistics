import ReactDOM from 'react-dom/client'
import './main.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './layouts/Landing'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />} />
    </Routes>
  </BrowserRouter>,
)

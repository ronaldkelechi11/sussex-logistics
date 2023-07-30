import ReactDOM from 'react-dom/client'
import './main.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './screens/Home'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    }
  </BrowserRouter>,
)

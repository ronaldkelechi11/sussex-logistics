import ReactDOM from 'react-dom/client'
import './main.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './screens/Home'
import Track from './screens/Track'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/track'>
          <Route index element={<Track />} />
          <Route path=':id' element={<Track />} />
        </Route>
      </Routes>
    }
  </BrowserRouter>,
)

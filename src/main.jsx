import ReactDOM from 'react-dom/client'
import './main.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './screens/Home'
import PackageDetails from './components/PackageDetails'
import TrackSearch from './components/TrackSearch'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/track'>
          <Route index element={<TrackSearch />} />
          <Route path=':id' element={<PackageDetails />} />
        </Route>
      </Routes>
    }
  </BrowserRouter>,
)

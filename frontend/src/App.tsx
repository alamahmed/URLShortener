import '@mantine/core/styles.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Pricing from './pages/Pricing/Pricing'
import Dashboard from './pages/Dashboard/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import classes from './App.module.css'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Pricing' element={<Pricing />}></Route>
        <Route path='/Dashboard' element={<Dashboard />}>
          <Route
            path='/Dashboard/'
            element={<Pricing />}
          />
          <Route
            path='/Dashboard/Profile'
            element={<Pricing />}
          />
          <Route
            path='/Dashboard/Security'
            element={<Pricing />}
          />
          <Route
            path='/Dashboard/Analytics'
            element={<Pricing />}
          />
          <Route
            path='/Dashboard/Settings'
            element={<Pricing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Pricing from './pages/Pricing/Pricing'
import Dashboard from './pages/Dashboard/Dashboard'
import Overview from './components/Overview/Overview'
import Settings from './components/Settings/Settings'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './components/Profile/Profile'
// import classes from './App.module.css'

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
            element={
              <Overview />
            }
          />
          <Route
            path='/Dashboard/Profile'
            element={
              <Profile />
            }
          />
          <Route
            path='/Dashboard/Security'
            element={
              <Home />
            }
          />
          <Route
            path='/Dashboard/Analytics'
            element={
              <Home />
            }
          />
          <Route
            path='/Dashboard/Settings'
            element={
              <Settings />
            }
          />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
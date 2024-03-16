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
import { Flex } from '@mantine/core'
// import classes from './App.module.css'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes >

        <Route path='/dashboard' element={<Dashboard />}>
          <Route

            path=''
            element={
              <Overview />
            }
          />
          <Route
            path='profile'
            element={
              <Profile />
            }
          />
          <Route
            path='security'
            element={
              <Home />
            }
          />
          <Route
            path='analytics'
            element={
              <Home />
            }
          />
          <Route
            path='settings'
            element={
              <Settings />
            }
          />
        </Route>
        <Route element={<Footer />}>
          <Route path='/' element={<Home />} />
          <Route path='/pricing' element={<Pricing />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App
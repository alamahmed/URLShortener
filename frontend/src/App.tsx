import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
// import Pricing from './pages/Pricing/Pricing'
import Dashboard from './pages/Dashboard/Dashboard'
import Overview from './components/Overview/Overview'
import Profile from './components/Profile/Profile'
import { UserProvider } from './context/UserContext'
import Security from './components/Security/Security'
import './App.css'

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes >
          <Route path='/URLShortener/dashboard' element={<Dashboard />}>
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
                <Security />
              }
            />
          </Route>
          <Route element={<Footer />}>
            <Route path='/URLShortener/' element={<Home />} />
            {/* <Route path='/pricing' element={<Pricing />} /> */}
          </Route>
        </Routes>
      </BrowserRouter >
    </UserProvider>
  )
}

export default App
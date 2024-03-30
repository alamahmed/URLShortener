import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { SessionContext } from './context/SessionContext'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Pricing from './pages/Pricing/Pricing'
import Dashboard from './pages/Dashboard/Dashboard'
import Overview from './components/Overview/Overview'
import Settings from './components/Settings/Settings'
import Profile from './components/Profile/Profile'
import './App.css'
import { UserProvider } from './context/UserContext'

const App = () => {
  return (
    <UserProvider>
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
    </UserProvider>
  )
}

export default App
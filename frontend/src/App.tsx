import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from './context/UserContext'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Pricing from './pages/Pricing/Pricing'
import Dashboard from './pages/Dashboard/Dashboard'
import Overview from './components/Overview/Overview'
import Settings from './components/Settings/Settings'
import Profile from './components/Profile/Profile'
import './App.css'

const App = () => {
  const [token] = useContext(UserContext)
  const [user, setUser] = useState({ uid: '', email: '', username: '' })

  useEffect(() => {
    const getData = async () => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      };

      try {
        const response = await fetch('http://127.0.0.1:8000/get_user', requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseJson = await response.json();
        if (responseJson.status) {
          setUser(prevState => ({
            ...prevState,
            uid: responseJson.uid,
            email: responseJson.email,
            username: responseJson.username,
          }));
        }
      } catch (error) {
        localStorage.removeItem('userToken')
      }
    }
    if (token)
      getData()
    //eslint-disable-next-line
  }, [token])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes >
        <Route path='/dashboard' element={<Dashboard />}>
          <Route

            path=''
            element={
              <Overview {...user} />
            }
          />
          <Route
            path='profile'
            element={
              <Profile uid={user.uid} />
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
              <Settings {...user} />
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
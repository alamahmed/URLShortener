import '@mantine/core/styles.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Pricing from './pages/Pricing/Pricing'
import Features from './pages/Features/Features'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import classes from './App.module.css'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Features' element={<Features />}></Route>
        <Route path='/Pricing' element={<Pricing />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
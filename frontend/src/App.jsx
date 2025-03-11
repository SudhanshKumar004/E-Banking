import React from 'react'
import Footer from './components/Footer'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Registration from './pages/Registration'
import Login from './pages/Login'
import About from './pages/About'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='home' element={<Home />}/>
          <Route path='about' element={<About />}/>
          <Route path='login' element={<Login />}/>
          <Route index element={<Login />}/>
          <Route path='registration' element={<Registration />}/>
        </Route>
      </Routes>

      <Routes>

        <Route path='dashboard' element={<Dashboard />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

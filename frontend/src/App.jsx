import React from 'react'
import Footer from './components/Footer'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Registration from './pages/Registration'
import Login from './pages/Login'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import AddMoney from '../src/pages/dashboardPages/AddMoney'
import AccInfo from '../src/pages/dashboardPages/AccInfo'
import Statement from '../src/pages/dashboardPages/Statement'
import ResetPass from '../src/pages/dashboardPages/ResetPass'

import WithdrawMoney from '../src/pages/dashboardPages/WithdrawMoney'

import { ToastContainer } from 'react-toastify'
import ShowBalance from './pages/dashboardPages/ShowBalance'
import MiniStatement from './pages/dashboardPages/MiniStatement'


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

        <Route path='dashboard' element={<Dashboard />}>
          <Route path='addmoney' element={<AddMoney/>}/>
          <Route path='accountInfo' element={<AccInfo/>}/>
          <Route index element={<AccInfo/>}/>
          <Route path='statement' element ={<Statement />}/>
          <Route path='withdrawmoney' element ={<WithdrawMoney />}/>
          <Route path='resetpass' element ={<ResetPass />}/>
          <Route path='showbalance' element ={<ShowBalance />}/>
          <Route path='ministatement' element ={<MiniStatement />}/>

        </Route>
      </Routes>
      </BrowserRouter>

      
        <ToastContainer />

    </>
  )
}

export default App

import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import TopNav from './components/Nav'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Header />
      <TopNav />

        <div className="wrapper">
        <Outlet />
        </div>
    
      <Footer />
    </>
  )
}

export default Layout

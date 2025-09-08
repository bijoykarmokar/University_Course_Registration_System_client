import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../pages/Navbar/Navbar'
import Footer from '../pages/Footer/Footer'

const MainLayouts = () => {
  return (
    <div className='max-w-7xl mx-auto space-y-10'>
        <Navbar></Navbar>
        <div>
            <Outlet></Outlet>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default MainLayouts
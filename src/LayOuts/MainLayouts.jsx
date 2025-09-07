import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../pages/Navbar/Navbar'

const MainLayouts = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div>
            <Outlet></Outlet>
        </div>
    </div>
  )
}

export default MainLayouts
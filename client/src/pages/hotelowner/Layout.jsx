import React from 'react'
import Navbar2 from '../../components/hotelowner/Navbar2'
import SideBar from '../../components/hotelowner/SideBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar2 />
      <div className='flex h-full'>
       <SideBar />
      <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
       <Outlet />
      </div>
       </div>
  
    </div>
  )
}

export default Layout

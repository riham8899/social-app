import React from 'react'
import stylee from'./Layout.module.css'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar'

export const Layout = () => {
  return (

 
    <>

    <Navbar/>
    <Outlet/>
    </>
  )
}

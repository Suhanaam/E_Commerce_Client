import React from 'react'
import { UserHeader } from '../components/user/UserHeader'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/user/Footer'

export const UserLayout = () => {
  return (
    <div>
        <UserHeader />
        <Outlet />
        <Footer />
    </div>
  )
}

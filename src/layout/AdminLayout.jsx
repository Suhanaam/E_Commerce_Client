import React from 'react'
import { Footer } from '../components/user/Footer'
import { AdminHeader } from '../components/admin/AdminHeader'
import { Outlet } from 'react-router-dom'

export const AdminLayout = () => {

  return (
    <div>AdminLayout
       <AdminHeader />
       <Outlet />
      <Footer />
    </div>
  )
}

import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminHeader } from '../components/admin/AdminHeader';
import { Footer } from '../components/user/Footer';

export const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-grow p-4 bg-gray-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

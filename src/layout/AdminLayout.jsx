import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminHeader } from '../components/admin/AdminHeader';
import { Footer } from '../components/user/Footer';

export const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 max-w-7xl mx-auto">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

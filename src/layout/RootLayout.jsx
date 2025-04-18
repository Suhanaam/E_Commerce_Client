import React from 'react';
import { Header } from '../components/user/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/user/Footer';

export const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

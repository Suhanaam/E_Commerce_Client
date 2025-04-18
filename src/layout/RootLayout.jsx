import React from 'react';
import { Header } from '../components/user/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/user/Footer';

export const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow w-full px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

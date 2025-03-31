import React from 'react';
import { Header } from '../components/user/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/user/Footer';


export const RootLayout = () => {
   

    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

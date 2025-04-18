import React, { useEffect } from 'react';
import { UserHeader } from '../components/user/UserHeader';
import { Outlet, useNavigate } from 'react-router-dom';
import { Footer } from '../components/user/Footer';
import { useSelector } from 'react-redux';

export const UserLayout = () => {
  const { isUserAuth, userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuth || !userData) {
      navigate("/user/login");
    }
  }, [isUserAuth, userData, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <UserHeader user={userData} />

      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-6 bg-white max-w-7xl mx-auto">
        <Outlet context={{ user: userData }} />
      </main>

      <Footer />
    </div>
  );
};

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
    <div>
      {/* Pass userData to UserHeader if needed */}
      <UserHeader user={userData} />
      <Outlet context={{ user: userData }} />
      <Footer />
    </div>
  );
};

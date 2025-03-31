import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectRoutes = () => {
    const { isUserAuth, userData } = useSelector((state) => state.user);
    
      console.log("Auth:", isUserAuth, "User Role:", userData?.role);
    
      return isUserAuth && userData?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminProtectRoutes;

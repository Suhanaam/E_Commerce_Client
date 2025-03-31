
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const SellerProtectRoutes = () => {
  const { isUserAuth, userData } = useSelector((state) => state.user);

  console.log("Auth:", isUserAuth, "User Role:", userData?.role);

  return isUserAuth && userData?.role === "seller" ? <Outlet /> : <Navigate to="/" />;
};

export default SellerProtectRoutes;

import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectRoutes = () => {
    const navigate = useNavigate();
    const { isUserAuth } = useSelector((state) => state.user);  // Get auth state from Redux

    useEffect(() => {
        if (!isUserAuth) {
            navigate("/login");
        }
    }, [isUserAuth, navigate]);  // Include dependencies to re-run effect

    return isUserAuth ? <Outlet /> : null;  // Prevent rendering if not authenticated
};
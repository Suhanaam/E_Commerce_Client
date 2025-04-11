import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectRoutes = () => {
    const navigate = useNavigate();
    const { isUserAuth, userData } = useSelector((state) => state.user);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        // Wait for Redux to load userData
        if (userData && userData._id) {
            setCheckingAuth(false);
        } else if (!isUserAuth) {
            navigate("/login");
        }
    }, [isUserAuth, navigate, userData]);

    if (checkingAuth) {
        return <div className="p-4 text-gray-500">Checking authentication...</div>;
    }

    return isUserAuth ? <Outlet /> : null;
};

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DarkMode } from "../shared/DarkMode";
import { clearUser } from "../../redux/features/userSlice";
import toast from "react-hot-toast";


export const SellerHeaderr = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
        toast.success("Logged out successfully");
        navigate("/"); // Redirect to home after logout
    };

    return (
        <div>
            <div className="flex justify-between items-center p-14 h-20 shadow-2xl">
                <div>
                    <h1 className="text-3xl font-bold">RayanMart - Seller</h1>
                </div>
                <div className="flex justify-center items-center gap-16">
                    <nav>
                        <ul className="flex justify-center items-center gap-10 text-md">
                            <Link to="/seller/dashboard">
                                <li>Dashboard</li>
                            </Link>
                            <Link to="/seller/myproducts">
                                <li>My Products</li>
                            </Link>
                            <Link to="/seller/orders">
                                <li>Orders</li>
                            </Link>
                            <Link to="/seller/reviews">
                                <li>Reviews</li>
                            </Link>
                        </ul>
                    </nav>
                    <div className="flex justify-center gap-3">
                        <DarkMode />
                        <button className="btn btn-primary" onClick={() => navigate("/seller/profile")}>
                            View Profile
                        </button>
                        <button className="btn btn-success" onClick={() => navigate("/seller/createProduct")}>
                            Create Product
                        </button>
                        <button className="btn btn-error" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

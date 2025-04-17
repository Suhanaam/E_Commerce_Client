import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DarkMode } from "../shared/DarkMode";
import { clearUser } from "../../redux/features/userSlice";
import toast from "react-hot-toast";
import { Menu, X } from "lucide-react";

export const SellerHeaderr = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="shadow-md">
      <div className="flex justify-between items-center px-4 py-4 md:px-14 md:py-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-bold">RayanMart - Seller</h1>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center items-center gap-10">
          <nav>
            <ul className="flex gap-8 text-md font-medium">
              <Link to="/seller/dashboard"><li>Dashboard</li></Link>
              <Link to="/seller/myproducts"><li>My Products</li></Link>
              <Link to="/seller/orders"><li>Orders</li></Link>
            </ul>
          </nav>

          <div className="flex gap-3">
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-100 px-4 py-3 space-y-4">
          <ul className="flex flex-col gap-2 font-medium">
            <Link to="/seller/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
            <Link to="/seller/myproducts" onClick={() => setMobileMenuOpen(false)}>My Products</Link>
            <Link to="/seller/orders" onClick={() => setMobileMenuOpen(false)}>Orders</Link>
          </ul>

          <div className="flex flex-col gap-2">
            <DarkMode />
            <button className="btn btn-primary" onClick={() => { navigate("/seller/profile"); setMobileMenuOpen(false); }}>
              View Profile
            </button>
            <button className="btn btn-success" onClick={() => { navigate("/seller/createProduct"); setMobileMenuOpen(false); }}>
              Create Product
            </button>
            <button className="btn btn-error" onClick={() => { setMobileMenuOpen(false); handleLogout(); }}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

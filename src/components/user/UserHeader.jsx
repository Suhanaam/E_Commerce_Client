import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, X } from "lucide-react"; // optional icons

export const UserHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch(clearUser());
    // toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="shadow-md">
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center md:px-10">
        <h1 className="text-xl font-semibold">User Dashboard</h1>

        {/* Hamburger icon on small screens */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-gray-700 px-4 py-2 rounded"
            >
              MyActivities ▼
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded w-48 z-10">
                <Link to="/user/allproducts" className="block px-4 py-2 hover:bg-gray-200">View Products</Link>
                <Link to="/user/order" className="block px-4 py-2 hover:bg-gray-200">View Orders</Link>
                <Link to="/user/wishlist" className="block px-4 py-2 hover:bg-gray-200">View Wishlist</Link>
                <Link to="/user/cart" className="block px-4 py-2 hover:bg-gray-200">View Cart</Link>
                <Link to="/user/profile" className="block px-4 py-2 hover:bg-gray-200">View Profile</Link>
              </div>
            )}
          </div>

          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-700 text-white p-4 space-y-2">
          <div>
            <p className="font-medium mb-2">MyActivities</p>
            <div className="flex flex-col gap-1">
              <Link to="/user/allproducts" onClick={() => setMobileMenuOpen(false)}>View Products</Link>
              <Link to="/user/order" onClick={() => setMobileMenuOpen(false)}>View Orders</Link>
              <Link to="/user/wishlist" onClick={() => setMobileMenuOpen(false)}>View Wishlist</Link>
              <Link to="/user/cart" onClick={() => setMobileMenuOpen(false)}>View Cart</Link>
              <Link to="/user/profile" onClick={() => setMobileMenuOpen(false)}>View Profile</Link>
            </div>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
            }}
            className="bg-red-500 px-4 py-2 rounded w-full"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

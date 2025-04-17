import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../redux/features/userSlice";
import { Menu, X } from "lucide-react";

export const AdminHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/admin/login");
  };

  return (
    <div className="bg-gray-800 text-white shadow-md">
      <div className="flex justify-between items-center px-4 py-4 md:px-10">
        <h1 className="text-xl md:text-2xl font-semibold">Admin Panel</h1>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-gray-700 px-4 py-2 rounded"
            >
              View Options ▼
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded w-48 z-10">
                <Link to="/admin/profile" className="block px-4 py-2 hover:bg-gray-200">View Profile</Link>
                <Link to="/admin/sellers" className="block px-4 py-2 hover:bg-gray-200">View Sellers</Link>
                <Link to="/admin/users" className="block px-4 py-2 hover:bg-gray-200">View Users</Link>
                <Link to="/admin/orders" className="block px-4 py-2 hover:bg-gray-200">View Orders</Link>
                <Link to="/admin/products" className="block px-4 py-2 hover:bg-gray-200">View Products</Link>
              </div>
            )}
          </div>

          {/* Buttons */}
          <button
            onClick={() => navigate("/admin/changePassword")}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            Change Password
          </button>
          <button
            onClick={() => navigate("/admin/createSeller")}
            className="bg-green-500 px-4 py-2 rounded"
          >
            Create Seller
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <div className="bg-gray-700 p-3 rounded">
            <p className="font-medium mb-2">View Options</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/admin/profile" onClick={() => setMobileMenuOpen(false)}>View Profile</Link>
              <Link to="/admin/sellers" onClick={() => setMobileMenuOpen(false)}>View Sellers</Link>
              <Link to="/admin/users" onClick={() => setMobileMenuOpen(false)}>View Users</Link>
              <Link to="/admin/orders" onClick={() => setMobileMenuOpen(false)}>View Orders</Link>
              <Link to="/admin/products" onClick={() => setMobileMenuOpen(false)}>View Products</Link>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => { navigate("/admin/changePassword"); setMobileMenuOpen(false); }}
              className="bg-blue-500 px-4 py-2 rounded"
            >
              Change Password
            </button>
            <button
              onClick={() => { navigate("/admin/createSeller"); setMobileMenuOpen(false); }}
              className="bg-green-500 px-4 py-2 rounded"
            >
              Create Seller
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

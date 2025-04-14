import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../redux/features/userSlice";

export const AdminHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());// Dispatch logout action
    navigate("/admin/login"); // Redirect to login page
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Panel</h1>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-gray-700 px-4 py-2 rounded"
        >
          View Options ▼
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded w-48">
            <Link to="/admin/profile" className="block px-4 py-2 hover:bg-gray-200">View Profile</Link>
            <Link to="/admin/sellers" className="block px-4 py-2 hover:bg-gray-200">View Sellers</Link>
            <Link to="/admin/users" className="block px-4 py-2 hover:bg-gray-200">View Users</Link>
            <Link to="/admin/orders" className="block px-4 py-2 hover:bg-gray-200">View Orders</Link>
            <Link to="/admin/products" className="block px-4 py-2 hover:bg-gray-200">View Products</Link>
            <Link to="/admin/reviews" className="block px-4 py-2 hover:bg-gray-200">View Reviews</Link>
          </div>
        )}
      </div>

      <div className="space-x-4">
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
    </nav>
  );
};

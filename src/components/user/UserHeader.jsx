import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const UserHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser()); // Uncomment if using Redux logout action
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">User Dashboard</h1>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-gray-700 px-4 py-2 rounded"
        >
          MyActivities ▼
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded w-48">
            <Link to="/user/allproducts" className="block px-4 py-2 hover:bg-gray-200">View Products</Link>
            <Link to="/user/order" className="block px-4 py-2 hover:bg-gray-200">View Orders</Link>
            <Link to="/user/wishlist" className="block px-4 py-2 hover:bg-gray-200">View Wishlist</Link>
            <Link to="/user/cart" className="block px-4 py-2 hover:bg-gray-200">View Cart</Link>
            <Link to="/user/profile" className="block px-4 py-2 hover:bg-gray-200">View Profile</Link>
            <Link to="/user/review" className="block px-4 py-2 hover:bg-gray-200">View Review</Link>
          </div>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const UserHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
        toast.success("Logged out successfully");
    navigate("/login"); // Redirect to login page
  };
  const goToCart=()=>{

    navigate("/user/cart");

  }
  const viewProfile=()=>{
    navigate("/user/profile");

  }

  return (
    <div>
    {/* <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
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
            
          </div>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav> */}



    <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">RayanMart</a>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
        <div className="card-body">
          
          <div className="card-actions">
            <button className="btn btn-primary btn-block" onClick={goToCart}>View cart</button>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
        <button
        onClick={viewProfile}
        className="bg-red-500 px-4 py-2 rounded"
      >
        Profile
      </button>
        </li>
        
        <li><button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button></li>
      </ul>
    </div>
  </div>
</div>




















    </div>
  );
};

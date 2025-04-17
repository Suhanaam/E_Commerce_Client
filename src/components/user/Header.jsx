import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import { Menu, X } from 'lucide-react'; // optional icon library

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="shadow-2xl">
      <div className="flex justify-between items-center px-6 py-4 md:px-14 h-20">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-bold">RayanMart</h1>

        {/* Hamburger Menu (Small Screens) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Nav + Buttons (Large Screens) */}
        <div className="hidden md:flex justify-center items-center gap-8">
          <nav>
            <ul className="flex gap-6 text-md">
              <Link to="/"><li>Home</li></Link>
              <Link to="/about"><li>About</li></Link>
              <Link to="/products"><li>Products</li></Link>
            </ul>
          </nav>
          <div className="flex gap-2">
            <DarkMode />
            <button className="btn btn-primary" onClick={() => navigate('/signup')}>Join Us</button>
            <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
            <button className="btn btn-primary" onClick={() => navigate('/seller/login')}>StartSelling</button>
            <button className="btn btn-primary" onClick={() => navigate('/admin/login')}>RayanMart</button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 py-4 bg-gray-100 dark:bg-gray-800 space-y-4">
          <nav>
            <ul className="flex flex-col gap-2 text-md">
              <Link to="/" onClick={() => setMenuOpen(false)}><li>Home</li></Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}><li>About</li></Link>
              <Link to="/products" onClick={() => setMenuOpen(false)}><li>Products</li></Link>
            </ul>
          </nav>
          <div className="flex flex-col gap-2">
            <DarkMode />
            <button className="btn btn-primary" onClick={() => { navigate('/signup'); setMenuOpen(false); }}>Join Us</button>
            <button className="btn btn-primary" onClick={() => { navigate('/login'); setMenuOpen(false); }}>Login</button>
            <button className="btn btn-primary" onClick={() => { navigate('/seller/login'); setMenuOpen(false); }}>StartSelling</button>
            <button className="btn btn-primary" onClick={() => { navigate('/admin/login'); setMenuOpen(false); }}>RayanMart</button>
          </div>
        </div>
      )}
    </div>
  );
};

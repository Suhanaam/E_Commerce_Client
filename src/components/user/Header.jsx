import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            RayanMart
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-primary">Home</Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-primary">About</Link>
            <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-primary">Products</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <DarkMode />
            <button className="btn btn-outline" onClick={() => navigate('/signup')}>Join Us</button>
            <button className="btn btn-outline" onClick={() => navigate('/login')}>Login</button>
            <button className="btn btn-outline" onClick={() => navigate('/seller/login')}>Start Selling</button>
            <button className="btn btn-primary" onClick={() => navigate('/admin/login')}>Admin</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 dark:text-white">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg px-6 py-4 space-y-4">
          <nav className="flex flex-col gap-2">
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 dark:text-gray-200">Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="text-gray-700 dark:text-gray-200">About</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)} className="text-gray-700 dark:text-gray-200">Products</Link>
          </nav>
          <div className="flex flex-col gap-2">
            <DarkMode />
            <button className="btn btn-outline" onClick={() => { navigate('/signup'); setMenuOpen(false); }}>Join Us</button>
            <button className="btn btn-outline" onClick={() => { navigate('/login'); setMenuOpen(false); }}>Login</button>
            <button className="btn btn-outline" onClick={() => { navigate('/seller/login'); setMenuOpen(false); }}>Start Selling</button>
            <button className="btn btn-primary" onClick={() => { navigate('/admin/login'); setMenuOpen(false); }}>Admin</button>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import { Menu, X, ChevronDown, User, LogIn, Store, Shield } from 'lucide-react';
import { Avatar } from "@/components/avatar"; // Optional - use your own Avatar component or image
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/dropdown';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="shadow-lg">
      <div className="flex justify-between items-center px-6 py-4 md:px-14 h-20">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-bold">RayanMart</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav>
            <ul className="flex gap-6 text-md font-medium">
              <Link to="/"><li>Home</li></Link>
              <Link to="/about"><li>About</li></Link>
              <Link to="/products"><li>Products</li></Link>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <DarkMode />

            {/* Dropdown for Auth Links */}
            <Dropdown>
              <DropdownButton as="button" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                <User className="w-5 h-5" />
                <ChevronDown className="w-4 h-4" />
              </DropdownButton>
              <DropdownMenu className="min-w-48" anchor="bottom end">
                <DropdownItem onClick={() => navigate('/signup')}>
                  <User className="w-4 h-4" />
                  <DropdownLabel>Join Us</DropdownLabel>
                </DropdownItem>
                <DropdownItem onClick={() => navigate('/login')}>
                  <LogIn className="w-4 h-4" />
                  <DropdownLabel>Login</DropdownLabel>
                </DropdownItem>
                <DropdownItem onClick={() => navigate('/seller/login')}>
                  <Store className="w-4 h-4" />
                  <DropdownLabel>Start Selling</DropdownLabel>
                </DropdownItem>
                <DropdownItem onClick={() => navigate('/admin/login')}>
                  <Shield className="w-4 h-4" />
                  <DropdownLabel>Admin Panel</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 py-4 bg-gray-100 dark:bg-gray-800 space-y-4">
          <nav>
            <ul className="flex flex-col gap-2 text-md font-medium">
              <Link to="/" onClick={() => setMenuOpen(false)}><li>Home</li></Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}><li>About</li></Link>
              <Link to="/products" onClick={() => setMenuOpen(false)}><li>Products</li></Link>
            </ul>
          </nav>
          <div className="flex flex-col gap-2">
            <DarkMode />
            <button className="btn btn-primary" onClick={() => { navigate('/signup'); setMenuOpen(false); }}>Join Us</button>
            <button className="btn btn-primary" onClick={() => { navigate('/login'); setMenuOpen(false); }}>Login</button>
            <button className="btn btn-primary" onClick={() => { navigate('/seller/login'); setMenuOpen(false); }}>Start Selling</button>
            <button className="btn btn-primary" onClick={() => { navigate('/admin/login'); setMenuOpen(false); }}>Admin Panel</button>
          </div>
        </div>
      )}
    </div>
  );
};

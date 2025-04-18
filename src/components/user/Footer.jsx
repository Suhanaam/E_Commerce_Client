import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content w-full p-6 md:p-10">
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 px-4 sm:px-6 lg:px-8">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4 md:gap-10 text-sm md:text-base">
          <Link to="/about" className="link link-hover">About us</Link>
          <Link to="/contact" className="link link-hover">Contact</Link>
          <Link to="/products" className="link link-hover">Products</Link>
          <Link to="/brands" className="link link-hover">Brands</Link>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
              <path d="M24 4.557..." />
            </svg>
          </a>
          <a href="#" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
              <path d="M19.615 3.184..." />
            </svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
              <path d="M9 8h-3v4h3v12..." />
            </svg>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-sm">
        <p>Copyright © {new Date().getFullYear()} - RayanMart Private Ltd</p>
      </div>
    </footer>
  );
};

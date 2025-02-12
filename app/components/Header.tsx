// components/Header.tsx
'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import PyiursLogo from './ui/PyiursLogo';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <header className="py-2 md:py-4 sticky top-0 z-10"> {/* Responsive py */}
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6"> {/*Responsive px for container*/}

        {/* Hamburger Menu - Always visible */}
        <button
          className="text-gray-700 focus:outline-none"
          onClick={toggleDrawer}
        >
          <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
        </button>

        {/* Logo */}
        <PyiursLogo />

        {/* Icons (Search, Cart) */}
        <div className="flex items-center space-x-3 md:space-x-4"> {/* Responsive spacing */}
          <button className="text-gray-700 focus:outline-none">
            <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
          </button>
          <a href="/cart" className="text-gray-700 hover:text-gray-500 focus:outline-none relative">
            <FontAwesomeIcon icon={faShoppingCart} className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1 leading-none"> {/* Added leading-none */}
              3
            </span>
          </a>
        </div>
      </div>

      {/* Mobile Drawer - Always visible, but hidden by default */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4"> {/* Padding for the drawer content */}
          <button className="text-gray-700" onClick={toggleDrawer}>
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
          </button>
          <nav className="mt-4"> {/* Margin Top for the nav*/}
            <a href="/" className="block py-2 hover:text-gray-500"> {/* Py for menu item spacing*/}
              Home
            </a>
            <a href="/shop" className="block py-2 hover:text-gray-500">
              Shop
            </a>
            <a href="/about" className="block py-2 hover:text-gray-500">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
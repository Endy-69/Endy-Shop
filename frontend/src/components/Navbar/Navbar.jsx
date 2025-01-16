import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaUser, FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';

import DarkMode from './DarkMode';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import SearchModal from '../Search/SearchModal';
import AuthModal from '../Auth/AuthModal';
import { useAuth } from '../../context/AuthContext';
import AlertDialog from '../Shared/AlertDialog';

const navLinks = [
  { title: 'Home', path: '/' },
  { 
    title: 'Categories', 
    path: '/categories',
    submenu: [
      { title: "Headphones", path: '/category/headphones' },
      { title: "Smart Phones", path: '/category/smartphones' },
      { title: "Smart Watches", path: '/category/smartwatches' },
      { title: "Laptops", path: '/category/laptops' },
      { title: "Virtual Reality", path: '/category/vr' },
      { title: "Tablets", path: '/category/tablets' },
      { title: "Smart Glasses", path: '/category/smartglasses' },
      { title: "Gaming", path: '/category/gaming' },
      { title: "Speakers", path: '/category/speakers' },
    ]
  },
  { title: 'New Arrivals', path: '/new-arrivals' },
  { title: 'Blog', path: '/blog' },
  { title: 'Contact', path: '/contact' },
];

const Navbar = ({ darkMode, toggleDarkMode, isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const { cart } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const { currentUser } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside of user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserIconClick = () => {
    if (currentUser) {
      setShowUserMenu(!showUserMenu);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
      navigate('/');
      setShowLogoutConfirm(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setShowUserMenu(false);
  };

  const handleMobileSearch = () => {
    setIsOpen(false); // Close mobile menu
    setIsSearchOpen(true);
  };

  const handleMobileAuth = () => {
    setIsOpen(false); // Close mobile menu
    if (currentUser) {
      setShowUserMenu(!showUserMenu);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleMobileUserClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    if (currentUser) {
      setShowUserMenu(!showUserMenu);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleMobileMenuClick = (index, hasSubmenu) => {
    if (hasSubmenu) {
      setActiveSubmenu(activeSubmenu === index ? null : index);
    } else {
      setIsOpen(false);
      setActiveSubmenu(null);
    }
  };

  const handleMobileMenuItemClick = (path) => {
    navigate(path);
    setShowUserMenu(false);
    setIsOpen(false);
  };

  const handleMobileLogout = () => {
    logout();
    setShowUserMenu(false);
    setIsOpen(false);
    navigate('/'); // Optionally navigate to home page after logout
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowUserMenu(false); // Close the menu after clicking
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-transparent'
    }`}>
      {/* Top Bar */}
      <div className="bg-primary-600 dark:bg-primary-700 text-white py-2 text-sm">
        <div className="container mx-auto px-4">
          
            <p className="text-center">
            Free Shipping on Orders Over ETB 50000 | Get 10% Off Your First Order
          </p>
         
          
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/">
              <h2 className="h-13 text-primary-600 text-xl font-bold font-mono">
                Endy-Shop
              </h2>
            </a>
            
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <div 
                key={index}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a 
                  href={link.path}
                  className={`text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors ${
                    activeDropdown === index ? 'text-primary-600 dark:text-primary-400' : ''
                  }`}
                >
                  {link.title}
                </a>
                
                {/* Dropdown Menu */}
                {link.submenu && activeDropdown === index && (
                  <div className="absolute top-full left-0 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 mt-2">
                    {link.submenu.map((subItem, subIndex) => (
                      <Link 
                        to={subItem.path}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-700 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            <DarkMode darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <FaSearch className="text-xl" />
            </button>
            
            {/* User Icon with Dropdown - Moved before cart */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={handleUserIconClick}
                className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2"
              >
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="text-xl" />
                )}
                {currentUser && (
                  <span className="text-sm font-medium">
                    {currentUser.displayName || currentUser.email.split('@')[0]}
                  </span>
                )}
              </button>

              {/* User Dropdown Menu */}
              {currentUser && showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Signed in as</p>
                    <p className="font-medium text-gray-800 dark:text-white truncate">
                      {currentUser.email}
                    </p>
                  </div>
                  
                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-700"
                    >
                      Your Profile
                    </Link>
                    
                    <Link
                      to="/orders"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-700"
                    >
                      Your Orders
                    </Link>
                    
                    <Link
                      to="/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-700"
                    >
                      Settings
                    </Link>
                  </div>
                  
                  <div className="border-t dark:border-gray-700 py-1">
                    <button
                      onClick={handleLogoutClick}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-primary-50 dark:hover:bg-primary-700"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Icon - Moved after user icon */}
            <Link 
              to="/cart"
              className="relative text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center"
            >
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-[0px] right-3 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Nav Links */}
            <div className="space-y-4">
              {navLinks.map((link, index) => (
                <div key={index} className="space-y-2">
                  <div
                    className="flex justify-between items-center"
                    onClick={() => handleMobileMenuClick(index, !!link.submenu)}
                  >
                    <Link 
                      to={link.path}
                      className="block text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
                      onClick={() => !link.submenu && setIsOpen(false)}
                    >
                      {link.title}
                    </Link>
                    {link.submenu && (
                      <span className={`transform transition-transform ${
                        activeSubmenu === index ? 'rotate-180' : ''
                      }`}>
                        ▼
                      </span>
                    )}
                  </div>
                  {link.submenu && activeSubmenu === index && (
                    <div className="pl-4 space-y-2">
                      {link.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                          onClick={() => {
                            setIsOpen(false);
                            setActiveSubmenu(null);
                          }}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Icons - Also swap the order here */}
            <div className="flex items-center justify-around mt-6 pt-6 border-t dark:border-gray-700">
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsSearchOpen(true);
                }}
                className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FaSearch className="text-xl" />
              </button>

              {/* Mobile User Menu - Moved before cart */}
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={handleMobileUserClick}
                  className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2"
                >
                  {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="text-xl" />
                )}
                {currentUser && (
                  <span className="text-sm font-medium">
                    {currentUser.displayName || currentUser.email.split('@')[0]}
                  </span>
                )}
              </button>


                {/* Mobile User Dropdown */}
                {currentUser && showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Signed in as</p>
                      <p className="font-medium text-gray-800 dark:text-white">{currentUser.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-700"
                      >
                        Your Profile
                      </Link>

                      <Link
                      to="/orders"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-700"
                    >
                      Your Orders
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-700"
                    >
                      Settings
                    </Link>
                    </div>

                    <div className="border-t dark:border-gray-700 py-1">
                    <button
                      onClick={handleLogoutClick}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-primary-50 dark:hover:bg-primary-700"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>


              {/* Mobile Cart Icon */}
              <Link 
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="relative text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center"
              >
                <FaShoppingCart className="text-xl" />
                <span className="absolute -top-[0px] right-3 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              </Link>

              <DarkMode darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </div>
          </div>
        </div>
      )}

      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Logout Confirmation Dialog */}
      <AlertDialog
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Sign Out"
        message="Are you sure you want to sign out?"
      />
    </nav>
  );
};

export default Navbar;

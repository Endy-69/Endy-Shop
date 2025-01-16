import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {productsByCategory} from '../../data/products'

// Combined product data for search
const allProducts = productsByCategory;

// Flatten the products array for searching
const searchableProducts = Object.values(allProducts).flat();

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const modalRef = useRef();
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
      setSearchTerm('');
      setSearchResults([]);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }

    const searchTermLower = value.toLowerCase();
    const filtered = searchableProducts.filter(product =>
      product.title.toLowerCase().includes(searchTermLower) ||
      product.description.toLowerCase().includes(searchTermLower) ||
      product.category.toLowerCase().includes(searchTermLower)
    );
    setSearchResults(filtered);
    console.log(filtered);
  };

  const handleProductClick = (product) => {
    navigate(`/category/${product.category}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-lg shadow-xl mx-4"
      >
        {/* Search Input */}
        <div className="p-4 border-b dark:border-gray-700 flex items-center gap-3">
          <FaSearch className="text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products"
            className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-white placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <FaTimes />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="p-4 space-y-4">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ETB {product.price}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Category: {product.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : searchTerm ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No products found for "{searchTerm}"
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchModal; 
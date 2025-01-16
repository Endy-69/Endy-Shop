import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // List of paths where back button should not appear
  const excludedPaths = ['/', '/new-arrivals', '/categories', '/blog'];

  if (excludedPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-6"
    >
      <FaArrowLeft />
      <span>Back</span>
    </button>
  );
};

export default BackButton; 
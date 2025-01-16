import React from 'react';
import Blogs from '../components/Blogs/Blogs';

const Blog = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Our Blog
        </h1>
        <Blogs />
      </div>
    </div>
  );
};

export default Blog; 
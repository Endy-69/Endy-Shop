import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeadphones, FaClock, FaVolumeUp, FaLaptop, FaGamepad, FaVrCardboard, FaTablet, FaGlasses, FaMobile } from 'react-icons/fa';
// import BackButton from '../components/Shared/BackButton';

const categories = [
  {
    id: 1,
    name: 'Headphones',
    icon: FaHeadphones,
    path: '/category/headphones',
    description: 'Premium audio experience'
  },
  {
    id: 2,
    name: 'Smart phones',
    icon: FaMobile,
    path: '/category/smartphones',
    description: 'Premium audio experience'
  },
  {
    id: 3,
    name: 'Smart Watches',
    icon: FaClock,
    path: '/category/smartwatches',
    description: 'Stay connected in style'
  },
  {
    id: 4,
    name: 'Laptop',
    icon: FaLaptop,
    path: '/category/laptops',
    description: 'Brand new laptops'
  },
  {
    id: 5,
    name: 'VR',
    icon: FaVrCardboard,
    path: '/category/vr',
    description: 'Virtual reality systems'
  },
  {
    id: 6,
    name: 'Tablet',
    icon: FaTablet,
    path: '/category/tablets',
    description: 'Performance computing'
  },
  {
    id: 7,
    name: 'Smart Glass',
    icon: FaGlasses,
    path: '/category/smartglasses',
    description: 'High vision quality'
  },
  {
    id: 8,
    name: 'Gaming',
    icon: FaGamepad,
    path: '/category/gaming',
    description: 'Ultimate gaming gear'
  },
  {
    id: 9,
    name: 'Speaker',
    icon: FaVolumeUp,
    path: '/category/speakers',
    description: 'Premium audio experience'
  }
];

const Categories = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Browse Categories
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={category.path}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all p-6 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/30 transition-colors">
                <category.icon className="text-2xl text-primary-600 dark:text-primary-400" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {category.name}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {category.description}
              </p>
              
              <span className="text-primary-600 dark:text-primary-400 font-medium group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                Browse Products →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories; 
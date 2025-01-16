import React from 'react';
import { FaShoppingBag, FaTruck, FaUndo, FaHeadset } from 'react-icons/fa';
import heroImage from '../../assets/hero/hero1.png';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: FaShoppingBag,
    title: "Exclusive Deals",
    description: "Up to 70% off on selected items"
  },
  {
    icon: FaTruck,
    title: "Free Shipping",
    description: "On orders over ETB 50000"
  },
  {
    icon: FaUndo,
    title: "Easy Returns",
    description: "30-day return policy"
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    description: "Dedicated customer service"
  }
];

const Hero = () => {
  return (
    <div className="relative bg-gray-50 dark:bg-gray-900">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-pink-50 dark:from-primary-900/20 dark:to-pink-900/20 opacity-50"></div>
      
      {/* Main Hero Content */}
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="hidden lg:inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/50 rounded-full">
              <p className="text-primary-600 dark:text-primary-400 font-medium text-sm">
                🌟 Your Gateway to Premium Tech
              </p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
               Smart Tech for  
              <span className="text-primary-600 dark:text-primary-400 block text-5xl">
              Modern Life
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
              Explore our smart collection of premium electronics, from high-end headphones 
              to powerful computers. Find the perfect tech to enhance your digital lifestyle.
            </p>
            
            <div className="flex flex-wrap gap-4">

              <Link className="bg-primary-600 rounded-lg text-white hover:bg-primary-700 px-8 py-4"
                to='/categories'
              >
                
                  Shop Collection
                
              </Link>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[80%] after:h-[20px] after:bg-gradient-to-b after:from-black/20 after:to-transparent after:blur-xl after:-z-10 after:rounded-full">
              <img 
                src={heroImage} 
                alt="Hero Image"
                className="w-full h-auto rounded-2xl mix-blend-multiply dark:mix-blend-normal"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="text-2xl text-primary-600 dark:text-primary-400" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;

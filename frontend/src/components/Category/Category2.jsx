import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../Shared/Heading';
import { FaArrowRight } from 'react-icons/fa';
import feat3 from '../../assets/featured/feat-3.png';   
import feat1 from '../../assets/featured/feat-1.png'; 
import feat4 from '../../assets/featured/feat-4.png'; 
import feat2 from '../../assets/featured/feat-2.png'; 



const featuredCategories = [
  {
    id: "featuredwatch",
    title: "Smart Watch",
    description: "Lightwhight 4G smartwatch",
    image: feat3,
    itemCount: "2.5k+",
    discount: "Up to 20% Off",
    path: "smartwatches"
  },
  {
    id: 2,
    title: "HeadPhone",
    description: "Highest voice quality",
    image: feat1,
    itemCount: "1.2k+",
    discount: "New Arrivals",
    path: "headphones"
  },
  {
    id: 3,
    title: "VR",
    description: "Seamless vision and high quality",
    image: feat2,
    itemCount: "800+",
    discount: "20% Off",
    path: "vr"
  },
  {
    id: 4,
    title: "Laptop",
    description: "Laptop with amuhighsing performance",
    image: feat4,
    itemCount: "1.5k+",
    discount: "Special Deals",
    path: "laptops"
  }
];

const CategoryCard2 = ({ category }) => {
  // const itemCount = productsByCategory[category.path]?.length || 0;
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row h-full">
        {/* Image Section */}
        <div className="md:w-2/5 relative overflow-hidden">
          <img 
            src={category.image} 
            alt={category.title}
            className="w-full h-64 md:h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 bg-green-800 text-white px-4 py-1 rounded-lg text-sm font-medium content-center">
            {category.discount}
          </div>
        </div>

        {/* Content Section */}
        <div className="md:w-3/5 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {category.title}
              </h3>
              <span className="text-primary-600 dark:text-primary-400 font-medium">
                {category.itemCount} items
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 font-serif">
              {category.description}
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-auto">
            <button className="flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-4 transition-all">
                <div>
                  <Link 
                  to={`/category/${category.path}`}
                >
                Buy Now
                </Link>
                <FaArrowRight className="group-hover:transform group-hover:translate-x-2 transition-transform" />
                </div>              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Category2 = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <Heading
          title="Featured Categories"
          subtitle="Explore our brand collection of premium categories"
          className="text-center mb-12"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredCategories.map(category => (
            <CategoryCard2 key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category2;

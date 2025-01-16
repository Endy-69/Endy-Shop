import React from 'react';
import Heading from '../Shared/Heading';
import cat1 from '../../assets/category/headphone.png';   
import cat2 from '../../assets/category/phone.png';   
import cat3 from '../../assets/category/watch.png';  
import cat4 from '../../assets/category/laptop.png';  
import cat5 from '../../assets/category/vr.png'; 
import cat6 from '../../assets/category/tablet.png';   
import cat7 from '../../assets/category/glass.png';   
import cat8 from '../../assets/category/gaming.png';  
import cat9 from '../../assets/category/speaker.png'; 
import { Link } from 'react-router-dom';

// Import the product data to count items
import { productsByCategory } from '../../data/products';

const categoryData = [
  {
    id: 1,
    title: "HeadPhone",
    image: cat1,
    path: "headphones"
  },
  {
    id: 2,
    title: "Smart Phone",
    image: cat2, 
    path: "smartphones"
  },
  {
    id: 3,
    title: "Smart watch",
    image: cat3,
    path: "smartwatches"
  },
  {
    id: 4,
    title: "Laptop",
    image: cat4,
    path: "laptops"
  },
  {
    id: 5,
    title: "VR",
    image: cat5,
    path: "vr"
  },
  {
    id: 6,
    title: "Tablet",
    image: cat6,
    path: "tablets"
  },
  {
    id: 7,
    title: "Smart Glass",
    image: cat7,
    path: "smartglasses"
  },
  {
    id: 8,
    title: "Gaming",
    image: cat8,
    path: "gaming"
  },
  {
    id: 9,
    title: "Speaker",
    image: cat9,
    path: "speakers"
  },
  
];

const CategoryCard = ({ category }) => {
  // Get the number of items in this category
  const itemCount = productsByCategory[category.path]?.length || 0;

  return (
    <Link to={`/category/${category.path}`} className="group relative overflow-hidden rounded-xl cursor-pointer">
      <div className="relative h-[200px] w-full overflow-hidden bg-white dark:bg-gray-800">
        <img 
          src={category.image} 
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-semibold mb-2 transition-colors">
          {category.title}
        </h3>
        <p className="text-sm text-gray-300">
          {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
        </p>
        <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button className=" mt-4 px-6 py-2 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-gray-800 dark:hover:bg-primary-900 transition-colors text-sm font-medium hover:text-gray-200 dark:hover:text-gray-100">
            Explore Category
          </button>
        </div>
      </div>
    </Link>
  );
};

const Category = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <Heading
          title="Shop by Category"
          subtitle="Explore our wide range of fashion categories"
          className="text-center mb-12"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryData.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;

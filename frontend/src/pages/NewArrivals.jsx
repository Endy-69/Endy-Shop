import React from 'react';
import { useCart } from '../context/CartContext';
import newarival1 from "../assets/new/new1.png"
import newarival2 from "../assets/new/new2.png"

const products = [
  {
    id: 1,
    title: "Edifier W800BT Pro",
    price: 3500,
    image: newarival1,
    description: "Hybrid active noise cancellation technology"
  },
  {
    id: 2,
    title: "LIGE GT20 Smart Watch",
    price: 4000,
    image: newarival2,
    description: "IP67 Waterproof and Long Battery Life"
  },
  
];
const ProductCard = ({ product, onAddToCart }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, e);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-48 object-contain mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {product.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-primary-600 dark:text-primary-400 font-bold">
            ETB {product.price}
          </span>
          <button 
            onClick={handleAddToCart}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const NewArrivals = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          New Arrivals
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals; 
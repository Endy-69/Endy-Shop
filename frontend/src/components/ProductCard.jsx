import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, e);
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
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
          <span className="text-primary-600 dark:text-primary-600 font-bold">
            ${product.price}
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

export default ProductCard; 
import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productsByCategory } from '../data/products';

const ProductCard = ({ product, onAddToCart }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, e);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <img 
        src={product.image} 
        alt={product.title}
        className="w-full h-48 object-contain p-4"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 truncate">
          {product.title}
        </h3>
        <p className="text-primary-600 dark:text-primary-400 font-bold mb-4">
          ETB {product.price}
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
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

const CategoryProducts = () => {
  const { categoryType } = useParams();
  const products = productsByCategory[categoryType] || [];

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white capitalize">
          {categoryType?.replace('-', ' ')}
        </h1>
        
        {products.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts; 
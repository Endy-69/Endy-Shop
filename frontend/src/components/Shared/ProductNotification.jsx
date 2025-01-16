import React, { useEffect } from 'react';
import { FaShoppingCart, FaExclamationCircle } from 'react-icons/fa';

const ProductNotification = ({ message, position, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className={`absolute z-50 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm animate-fade-in-up ${
        type === 'success' 
          ? 'bg-green-500 text-white' 
          : 'bg-yellow-500 text-white'
      }`}
      style={{
        top: position.y,
        left: position.x,
        transform: 'translate(-50%, -120%)'
      }}
    >
      {type === 'success' ? (
        <FaShoppingCart className="text-lg" />
      ) : (
        <FaExclamationCircle className="text-lg" />
      )}
      {message}
    </div>
  );
};

export default ProductNotification; 
import React, { useEffect } from 'react';
import { FaCheck, FaExclamationCircle } from 'react-icons/fa';

const Notification = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div 
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ${
        type === 'success' 
          ? 'bg-green-500 text-white' 
          : 'bg-yellow-500 text-white'
      }`}
      style={{
        animation: 'slideIn 0.5s ease-out'
      }}
    >
      {type === 'success' ? (
        <FaCheck className="text-lg" />
      ) : (
        <FaExclamationCircle className="text-lg" />
      )}
      {message}
    </div>
  );
};

export default Notification; 
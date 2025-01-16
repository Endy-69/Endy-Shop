import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OrderSuccessModal = ({ isOpen, orderDetails }) => {
  const navigate = useNavigate();

  const handleBookOrder = () => {
    console.log('Booking order:', orderDetails);
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        handleBookOrder();
        navigate('/orders');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, navigate, orderDetails]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-xl p-5 mx-auto"
          >
            <div className="text-center">
              <FaCheckCircle className="mx-auto text-green-500 text-4xl mb-3" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Order Completed Successfully!
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Thank you for your purchase. Redirecting to orders...
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default OrderSuccessModal; 
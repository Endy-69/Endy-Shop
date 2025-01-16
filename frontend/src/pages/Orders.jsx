import React from 'react';
import { useOrders } from '../context/OrderContext';
import { FaBox, FaCalendarAlt } from 'react-icons/fa';
import BackButton from '../components/Shared/BackButton';

const Orders = () => {
  const { orders } = useOrders();

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <FaBox className="mx-auto text-4xl text-gray-400 dark:text-gray-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Orders Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              You haven't placed any orders yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Your Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              {/* Rest of your order display code */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders; 
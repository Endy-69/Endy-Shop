import { useState } from 'react';
import { orderService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

export const useOrderCompletion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { fetchOrders } = useOrders();

  const completeOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await orderService.completeOrder({
        ...orderData,
        date: new Date(),
        status: 'completed'
      });

      if (response.success) {
        // Refresh orders list
        await fetchOrders();
        // Navigate to orders page
        navigate('/orders');
        return response;
      } else {
        throw new Error(response.message || 'Failed to complete order');
      }
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { completeOrder, loading, error };
}; 
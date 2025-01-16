import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaPaypal, FaMobile, FaGooglePay } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PaymentModal = ({ isOpen, onClose, onSuccess, amount }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    // Credit Card
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    // PayPal
    paypalEmail: '',
    // TeleBirr
    phoneNumber: '',
    // Google Pay
    googleEmail: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // First validate the payment details
    if (!validatePaymentDetails()) return;

    setIsProcessing(true);
    setError('');

    try {
      // Shorter processing time
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Pass the selected payment method to onSuccess
      onSuccess(selectedMethod);
      onClose();
      
    } catch (error) {
      console.error('Payment error:', error);
      setError('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const validatePaymentDetails = () => {
    setError('');
    switch (selectedMethod) {
      case 'TeleBirr':
        if (!paymentDetails.phoneNumber.match(/^09\d{8}$/)) {
          setError('Please enter a valid TeleBirr phone number (starting with 09)');
          return false;
        }
        return true;

      case 'Credit Card':
        if (!paymentDetails.cardNumber || !paymentDetails.cardName || !paymentDetails.expiry || !paymentDetails.cvv) {
          setError('Please fill in all credit card details');
          return false;
        }
        return true;

      case 'PayPal':
        if (!paymentDetails.paypalEmail) {
          setError('Please enter your PayPal email');
          return false;
        }
        return true;

      case 'Google Pay':
        if (!paymentDetails.googleEmail) {
          setError('Please enter your Google Pay email');
          return false;
        }
        return true;

      default:
        setError('Please select a payment method');
        return false;
    }
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'Credit Card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                maxLength="16"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                name="cardName"
                value={paymentDetails.cardName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  maxLength="5"
                  value={paymentDetails.expiry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  maxLength="3"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 'PayPal':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              PayPal Email
            </label>
            <input
              type="email"
              name="paypalEmail"
              value={paymentDetails.paypalEmail}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="your@email.com"
              required
            />
          </div>
        );
      case 'TeleBirr':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={paymentDetails.phoneNumber}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '');
                // Ensure it starts with 0 if user types any number
                if (value && !value.startsWith('0')) {
                  value = '0' + value;
                }
                // Ensure second digit is 9 if there's more than 1 digit
                if (value.length >= 2 && value[1] !== '9') {
                  value = '09' + value.slice(2);
                }
                // Limit to 10 digits
                value = value.slice(0, 10);
                setPaymentDetails(prev => ({
                  ...prev,
                  phoneNumber: value
                }));
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter phone number (09...)"
              maxLength="10"
              pattern="09\d{8}"
              required
            />
          </div>
        );
      case 'Google Pay':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Google Pay Email
            </label>
            <input
              type="email"
              name="googleEmail"
              value={paymentDetails.googleEmail}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="your@gmail.com"
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderPaymentButton = () => {
    if (isProcessing) {
      return 'Processing...';
    }
    
    switch (selectedMethod) {
      case 'TeleBirr':
        return 'Pay with TeleBirr';
      case 'Credit Card':
        return 'Pay with Credit Card';
      case 'PayPal':
        return 'Pay with PayPal';
      case 'Google Pay':
        return 'Pay with Google Pay';
      default:
        return 'Pay Now';
    }
  };

  if (!isOpen) return null;

  // If user is not logged in, show login message
  if (!currentUser) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 py-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={onClose}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mx-auto"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Login Required
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Please log in to complete your purchase.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      onClose();
                      // Add logic to open login modal or navigate to login page
                    }}
                    className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center px-4 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mx-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Payment Method
            </h2>

            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600 dark:text-gray-300">Total Amount:</span>
                <span className="text-xl font-bold text-primary-600">ETB {amount.toFixed(2)}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: FaCreditCard, name: 'Credit Card' },
                  { icon: FaPaypal, name: 'PayPal' },
                  { icon: FaMobile, name: 'TeleBirr' },
                  { icon: FaGooglePay, name: 'Google Pay' }
                ].map((method) => (
                  <button
                    key={method.name}
                    onClick={() => setSelectedMethod(method.name)}
                    className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors
                      ${selectedMethod === method.name 
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-500'
                      }`}
                  >
                    <method.icon className="text-2xl text-primary-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{method.name}</span>
                  </button>
                ))}
              </div>

              {selectedMethod && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {renderPaymentForm()}
                  
                  {error && (
                    <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/10 p-2 rounded-lg">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-primary-400"
                  >
                    {renderPaymentButton()}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal; 
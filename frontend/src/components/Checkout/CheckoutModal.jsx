import React, { useState } from 'react';
import { FaTimes, FaPaypal, FaCreditCard, FaGooglePay, FaApplePay } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../Auth/AuthModal';

const PaymentMethod = ({ icon: Icon, name, selected, onSelect }) => (
  <div
    onClick={onSelect}
    className={`p-4 border rounded-lg cursor-pointer transition-all ${
      selected 
        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' 
        : 'border-gray-200 dark:border-gray-700 hover:border-primary-400'
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon className={`text-2xl ${selected ? 'text-primary-600' : 'text-gray-600 dark:text-gray-400'}`} />
      <span className={`font-medium ${selected ? 'text-primary-600' : 'text-gray-700 dark:text-gray-300'}`}>
        {name}
      </span>
    </div>
  </div>
);

const CheckoutModal = ({ isOpen, onClose, total }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const { cart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const paymentMethods = [
    { icon: FaPaypal, name: 'PayPal' },
    { icon: FaCreditCard, name: 'Credit Card' },
    { icon: FaGooglePay, name: 'Google Pay' },
    { icon: FaApplePay, name: 'Apple Pay' }
  ];

  const validateForm = () => {
    if (!selectedMethod) {
      setError('Please select a payment method');
      return false;
    }

    // Basic form validation
    if (!formData.firstName || !formData.lastName) {
      setError('Please enter your full name');
      return false;
    }

    if (!formData.address || !formData.city || !formData.state || !formData.zipCode) {
      setError('Please fill in all address fields');
      return false;
    }

    // Credit Card validation
    if (selectedMethod === 'Credit Card') {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
        setError('Please enter valid card details');
        return false;
      }

      // Basic credit card validation
      const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
      if (!/^\d{16}$/.test(cardNumberClean)) {
        setError('Invalid card number');
        return false;
      }

      if (!/^\d{3,4}$/.test(formData.cvv)) {
        setError('Invalid CVV');
        return false;
      }

      // Expiry date validation (MM/YY format)
      if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate)) {
        setError('Invalid expiry date (MM/YY)');
        return false;
      }
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Simulate payment processing
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate successful payment with 80% probability
          if (Math.random() > 0.2) {
            resolve();
          } else {
            reject(new Error('Payment failed. Please try again.'));
          }
        }, 2000);
      });

      // Payment successful
      alert('Payment processed successfully!');
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Checkout
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <FaTimes />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Order Summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Order Summary
              </h3>
              <div className="space-y-2">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.title} x {item.quantity}
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t dark:border-gray-700 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-800 dark:text-white">Total</span>
                    <span className="text-primary-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                {error}
              </div>
            )}

            {/* Payment Methods */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Select Payment Method
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <PaymentMethod
                    key={method.name}
                    icon={method.icon}
                    name={method.name}
                    selected={selectedMethod === method.name}
                    onSelect={() => {
                      setSelectedMethod(method.name);
                      setError('');
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Credit Card Fields (shown only when Credit Card is selected) */}
            {selectedMethod === 'Credit Card' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Card Details
                </h3>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange({
                    target: {
                      name: 'cardNumber',
                      value: formatCardNumber(e.target.value)
                    }
                  })}
                  maxLength="19"
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    maxLength="5"
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength="4"
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Shipping Address */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Shipping Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t dark:border-gray-700">
            <button
              onClick={handleCheckout}
              disabled={isProcessing || !selectedMethod}
              className={`w-full py-3 rounded-lg font-semibold text-white 
                ${isProcessing || !selectedMethod 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-primary-600 hover:bg-primary-700'
                } transition-colors`}
            >
              {isProcessing ? 'Processing...' : 'Complete Purchase'}
            </button>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          // Continue with checkout after successful login
          handleCheckout();
        }}
      />
    </>
  );
};

export default CheckoutModal; 
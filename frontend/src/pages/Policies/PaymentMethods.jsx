import React from 'react';
import { FaCreditCard, FaPaypal, FaGooglePay, FaMobile } from 'react-icons/fa';

const PaymentMethods = () => {
  const methods = [
    {
      icon: FaCreditCard,
      title: "Credit & Debit Cards",
      description: "We accept Visa, Mastercard, American Express, and Discover"
    },
    {
      icon: FaPaypal,
      title: "PayPal",
      description: "Safe and secure payments through PayPal"
    },
    {
      icon: FaMobile,
      title: "Tele Birr",
      description: "Quick and easy payments"
    },
    {
      icon: FaGooglePay,
      title: "Google Pay",
      description: "Fast checkout with Google Pay"
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Payment Methods
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {methods.map((method, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center gap-4 mb-4">
                  <method.icon className="text-3xl text-primary-600 dark:text-primary-400" />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {method.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {method.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Secure Payments
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              All payments are encrypted and processed securely. We never store your full credit card information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods; 
import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Shipping Policy
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Shipping Methods & Delivery Times
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>We offer the following shipping methods:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Standard Shipping (5-7 business days) - Free on orders over $100</li>
                  <li>Express Shipping (2-3 business days) - $15</li>
                  <li>Next Day Delivery - $25</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                International Shipping
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We currently ship to over 50 countries worldwide. International shipping rates and delivery times vary by location.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Order Tracking
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Once your order ships, you'll receive a tracking number via email to monitor your delivery status.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy; 
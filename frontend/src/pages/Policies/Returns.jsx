import React from 'react';


const Returns = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Returns & Exchanges
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Return Policy
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>We offer a 30-day return policy for most items. To be eligible for a return:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Items must be unused and in original condition</li>
                  <li>Must have original packaging and tags</li>
                  <li>Must include original receipt or proof of purchase</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Exchange Process
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                If you need a different size or color, we'll be happy to exchange your item. Simply initiate the exchange process through your account or contact our customer service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Refund Timeline
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Once we receive your return, refunds are typically processed within 3-5 business days. The refund will be issued to your original payment method.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns; 
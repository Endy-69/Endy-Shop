import React from 'react';

const SizeGuide = () => {
  const sizeCharts = {
    tops: [
      { size: 'XS', chest: '32-34', waist: '26-28', hips: '34-36' },
      { size: 'S', chest: '34-36', waist: '28-30', hips: '36-38' },
      { size: 'M', chest: '36-38', waist: '30-32', hips: '38-40' },
      { size: 'L', chest: '38-40', waist: '32-34', hips: '40-42' },
      { size: 'XL', chest: '40-42', waist: '34-36', hips: '42-44' }
    ]
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Size Guide
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Tops & T-Shirts
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-4 py-2 text-left text-gray-800 dark:text-white">Size</th>
                    <th className="px-4 py-2 text-left text-gray-800 dark:text-white">Chest (inches)</th>
                    <th className="px-4 py-2 text-left text-gray-800 dark:text-white">Waist (inches)</th>
                    <th className="px-4 py-2 text-left text-gray-800 dark:text-white">Hips (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeCharts.tops.map((item, index) => (
                    <tr key={index} className="border-t dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-800 dark:text-white font-medium">{item.size}</td>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{item.chest}</td>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{item.waist}</td>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{item.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                How to Measure
              </h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p><strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</p>
                <p><strong>Waist:</strong> Measure around your natural waistline, keeping the tape comfortably loose.</p>
                <p><strong>Hips:</strong> Measure around the fullest part of your hips.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide; 
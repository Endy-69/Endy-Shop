import React, { useState } from 'react';

const PasswordModal = ({ isOpen, onClose, onSubmit, password, setPassword }) => {
  if (!isOpen) return null; // Don't render if not open

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // Call the submit function passed as a prop
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
        <p className="mb-4">Please enter your password to confirm logout.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
            required
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 rounded-md px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-md px-4 py-2"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
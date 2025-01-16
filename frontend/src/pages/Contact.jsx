import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLB5UFu9jzTak_xDzqjDBOS7z4sQor1IM",
  authDomain: "endy-shop.firebaseapp.com",
  projectId: "endy-shop",
  storageBucket: "endy-shop.firebasestorage.app",
  messagingSenderId: "935853067998",
  appId: "1:935853067998:web:2093ea8cc7a3dc0bbd3c4f"
};

// Initialize Firebase only if it hasn't been initialized yet
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  if (error.code !== 'app/duplicate-app') {
    console.error('Firebase initialization error', error);
  }
}
const db = getFirestore(app);

const Contact = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Store the message in Firestore
      await addDoc(collection(db, 'Contact Messages'), formData);
      
      // Show success message
      setShowSuccessModal(true);
      // Reset form data
      setFormData({ firstName: '', lastName: '', email: '', message: '' });

      // Automatically hide the success message after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Contact Us</h1>
          
          {/* Success Message Popup */}
          {showSuccessModal && (
            <div className="fixed top-0 right-0 m-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> Your message has been sent successfully.</span>
            </div>
          )}

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
              <FaPhone className="text-3xl text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2 dark:text-white">Phone</h3>
              <p className="text-gray-600 dark:text-gray-400">+251 941 300 177</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
              <FaEnvelope className="text-3xl text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2 dark:text-white">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">endumc69@example.com</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
              <FaMapMarkerAlt className="text-3xl text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2 dark:text-white">Address</h3>
              <p className="text-gray-600 dark:text-gray-400">02 Kotebe, Addis Ababa, Ethiopia</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input 
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea 
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 
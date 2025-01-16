

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaBell, FaLock, FaGlobe, FaShieldAlt, FaPalette, FaCheck } from 'react-icons/fa';
import BackButton from '../components/Shared/BackButton';
import PasswordChangeModal from '../components/Settings/PasswordChangeModal';

const Settings = () => {
  const { user } = useAuth();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [showTwoFactorCode, setShowTwoFactorCode] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('userSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      emailNotifications: true,
      orderUpdates: true,
      promotions: false,
      twoFactorAuth: false,
      language: 'English',
      currency: 'ETB',
      theme: 'system'
    };
  });

  const [initialSettings, setInitialSettings] = useState({ ...settings });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const settingsChanged = Object.keys(settings).some(
      key => settings[key] !== initialSettings[key]
    );
    setHasChanges(settingsChanged);
  }, [settings, initialSettings]);

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelect = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const showSuccessNotification = () => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 flex items-center gap-2 z-50';
    notification.style.transform = 'translateX(100%)';
    notification.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      Settings updated successfully!
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  };

  const handleSaveChanges = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    setInitialSettings({ ...settings });
    showSuccessNotification();
    setHasChanges(false);
  };

  const handleResetChanges = () => {
    setSettings({ ...initialSettings });
    setHasChanges(false);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Settings</h1>
          <BackButton />
          {/* Notifications Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaBell className="text-primary-600 dark:text-primary-400" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Notifications
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-800 dark:text-white font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive emails about your account activity</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.emailNotifications}
                    onChange={() => handleToggle('emailNotifications')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaLock className="text-primary-600 dark:text-primary-400" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Security
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-800 dark:text-white font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.twoFactorAuth}
                    onChange={() => handleToggle('twoFactorAuth')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
              <button 
                onClick={() => setIsPasswordModalOpen(true)}
                className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:text-primary-700 dark:hover:text-primary-300"
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaGlobe className="text-primary-600 dark:text-primary-400" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Preferences
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-800 dark:text-white font-medium mb-2">
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => handleSelect('language', e.target.value)}
                  className="w-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                >
                  <option value="English">English</option>
                  <option value="Amharic" className='text-gray-500' disabled>Amharic</option>
                  <option value="A/Oromo" className='text-gray-500' disabled>A/Oromo</option>
                  <option value="Tigrihna" className='text-gray-500' disabled>Tigrigna</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-800 dark:text-white font-medium mb-2">
                  Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleSelect('currency', e.target.value)}
                  className="w-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                >
                  <option value="ETB">ETB </option>
                  <option value="USD" className='text-gray-500' disabled>USD </option>
                 
                </select>
              </div>
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-end gap-4 mt-8">
            {hasChanges && (
              <button 
                onClick={handleResetChanges}
                className="px-6 py-2 rounded-lg font-semibold text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            )}
            <button 
              onClick={handleSaveChanges}
              disabled={!hasChanges}
              className={`px-6 py-2 rounded-lg font-semibold text-white flex items-center gap-2 transition-all
                ${hasChanges 
                  ? 'bg-primary-600 hover:bg-primary-700 cursor-pointer' 
                  : 'bg-gray-400 cursor-not-allowed opacity-50'
                }`}
            >
              <FaCheck className="text-sm" />
              {hasChanges ? 'Save Changes' : 'No Changes'}
            </button>
          </div>
        </div>
      </div>

      <PasswordChangeModal 
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};

export default Settings;
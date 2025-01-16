import React, { useState } from 'react';
import { auth } from '../../firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = ({ onClose, switchToLogin }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/reset-password`,
        handleCodeInApp: true
      };

      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setMessage('Password reset link has been sent to your email. After resetting your password, you can log in with your new password.');
      setTimeout(() => {
        switchToLogin();
      }, 5000);
    } catch (error) {
      console.error('Password reset error:', error);
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email. Please check the email address or create a new account.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format. Please enter a valid email address.');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again later or contact support.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your internet connection and try again.');
          break;
        case 'auth/operation-not-allowed':
          setError('Password reset is not enabled. Please contact support.');
          break;
        default:
          setError(`Error: ${error.message || 'Failed to send reset email. Please try again or contact support.'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Reset Your Password
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your email"
            required
          />
        </div>

        {message && (
          <div className="text-sm text-green-600 dark:text-green-400 text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
            {message}
          </div>
        )}

        {error && (
          <div className="text-sm text-red-600 dark:text-red-400 text-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
            {error}
          </div>
        )}

        <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          <p>After clicking the reset link in your email:</p>
          <ol className="list-decimal list-inside mt-1 space-y-1">
            <li>Set your new password</li>
            <li>Return to the login page</li>
            <li>Sign in with your new password</li>
          </ol>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition duration-200 disabled:bg-primary-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send Reset Link'
          )}
        </button>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={switchToLogin}
            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword; 
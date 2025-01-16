import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential, deleteUser } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';
import { FaUser, FaEnvelope, FaCalendarAlt, FaEdit, FaCamera, FaKey, FaTrash } from 'react-icons/fa';
import AlertDialog from '../components/Shared/AlertDialog';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showReauthDialog, setShowReauthDialog] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, or GIF)');
      return;
    }

    setUploadingPhoto(true);
    setError('');
    setSuccess('');

    try {
      const storageRef = ref(storage, `profile-pictures/${currentUser.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      await updateProfile(currentUser, {
        photoURL: photoURL
      });

      setSuccess('Profile picture updated successfully!');
      // Force a reload to update the navbar image
      window.location.reload();
    } catch (error) {
      console.error('Error uploading photo:', error);
      setError('Failed to upload profile picture. Please try again.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await updateProfile(currentUser, {
        displayName: displayName
      });
      
      // Save address to localStorage
      localStorage.setItem(`address_${currentUser.uid}`, JSON.stringify(address));
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Validate passwords
    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      // Reauthenticate user first
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(currentUser, credential);

      // Update password
      await updatePassword(currentUser, newPassword);
      
      setSuccess('Password updated successfully!');
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      console.error('Change password error:', error);
      switch (error.code) {
        case 'auth/wrong-password':
          setError('Current password is incorrect');
          break;
        case 'auth/weak-password':
          setError('New password is too weak');
          break;
        default:
          setError('Failed to change password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load address from localStorage when component mounts
  useEffect(() => {
    if (currentUser) {
      const savedAddress = localStorage.getItem(`address_${currentUser.uid}`);
      if (savedAddress) {
        setAddress(JSON.parse(savedAddress));
      }
    }
  }, [currentUser]);

  // Add this new function to handle account deletion
  const handleDeleteAccount = async () => {
    try {
      if (!password) {
        setError('Please enter your password');
        return;
      }

      // First, get fresh credentials from user
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        password
      );

      try {
        // Reauthenticate first
        await reauthenticateWithCredential(currentUser, credential);
        
        // After successful reauthentication, show final confirmation
        if (window.confirm('Are you absolutely sure you want to delete your account? This action cannot be undone.')) {
          // Clear any stored data first
          localStorage.removeItem(`address_${currentUser.uid}`);
          localStorage.removeItem(`orders_${currentUser.uid}`);
          
          // Delete the user
          await deleteUser(currentUser);
          
          // Close any modals
          setShowReauthDialog(false);
          setShowDeleteAlert(false);
          
          // Navigate to home page
          navigate('/');
        } else {
          // User cancelled the final confirmation
          setShowReauthDialog(false);
          setPassword('');
        }
      } catch (error) {
        if (error.code === 'auth/wrong-password') {
          setError('Incorrect password. Please try again.');
        } else {
          setError('Failed to authenticate. Please try again.');
        }
        return;
      }
      
    } catch (error) {
      console.error('Delete account error:', error);
      setError('Failed to delete account. Please try again.');
    } finally {
      setPassword(''); // Clear the password field
    }
  };

  // Add this component for reauthentication
  const ReauthDialog = () => (
    <AlertDialog
      isOpen={showReauthDialog}
      onClose={() => {
        setShowReauthDialog(false);
        setPassword('');
        setError('');
      }}
      title="Confirm Account Deletion"
      message={
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400 text-center">
            For security, please enter your password to confirm account deletion.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your password"
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </div>
      }
      onConfirm={handleDeleteAccount}
      confirmText="Delete Account"
      cancelText="Cancel"
      isDangerous={true}
    />
  );

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              <FaEdit />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Profile Content */}
          <div className="space-y-6">
            {/* Profile Picture Section - Updated camera icon positioning */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative inline-block">
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    <FaUser className="w-16 h-16 text-primary-500 dark:text-primary-300" />
                  </div>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors flex items-center justify-center"
                  disabled={uploadingPhoto}
                >
                  <FaCamera className="w-5 h-5" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* User Information */}
            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Address Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => setAddress({...address, street: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter street address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({...address, city: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter city"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      State/Province
                    </label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) => setAddress({...address, state: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter state/province"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      value={address.zipCode}
                      onChange={(e) => setAddress({...address, zipCode: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter ZIP/postal code"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      value={address.country}
                      onChange={(e) => setAddress({...address, country: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter country"
                      required
                    />
                  </div>
                </div>

                {/* Error and Success messages */}
                {error && (
                  <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
                )}
                {success && (
                  <div className="text-green-600 dark:text-green-400 text-sm">{success}</div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition duration-200 disabled:bg-primary-400"
                >
                  {isLoading ? 'Updating...' : 'Update Profile'}
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FaUser className="text-primary-500 dark:text-primary-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {currentUser?.displayName || 'Not set'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FaEnvelope className="text-primary-500 dark:text-primary-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {currentUser?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FaCalendarAlt className="text-primary-500 dark:text-primary-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Account Created</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {currentUser?.metadata?.creationTime
                        ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
                        : 'Not available'}
                    </p>
                  </div>
                </div>

                {/* Display Address Information */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Address Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Street Address</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {address.street || 'Not set'}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">City</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {address.city || 'Not set'}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">State/Province</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {address.state || 'Not set'}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">ZIP/Postal Code</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {address.zipCode || 'Not set'}
                      </p>
                    </div>
                    <div className="md:col-span-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Country</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {address.country || 'Not set'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Change Password Section */}
            <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Account Actions
              </h2>
              <div className="space-y-2">
                <button 
                  onClick={() => setIsChangingPassword(!isChangingPassword)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <FaKey />
                  Change Password
                </button>

                {isChangingPassword && (
                  <form onSubmit={handleChangePassword} className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>

                    {error && (
                      <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
                    )}
                    {success && (
                      <div className="text-green-600 dark:text-green-400 text-sm">{success}</div>
                    )}

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition duration-200 disabled:bg-primary-400"
                      >
                        {isLoading ? 'Updating...' : 'Update Password'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsChangingPassword(false);
                          setError('');
                          setSuccess('');
                        }}
                        className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <button 
                  onClick={() => setShowDeleteAlert(true)}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors flex items-center gap-2"
                >
                  <FaTrash className="text-red-600" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog
        isOpen={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted."
        onConfirm={() => {
          setShowDeleteAlert(false);
          setShowReauthDialog(true);
        }}
        confirmText="Continue"
        cancelText="Cancel"
        isDangerous={true}
      />

      {/* Reauthentication Dialog */}
      <ReauthDialog />
    </div>
  );
};

export default Profile; 
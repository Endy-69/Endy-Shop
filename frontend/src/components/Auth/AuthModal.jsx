import React, { useState } from 'react';
import Modal from '../UI/Modal';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';

const AuthModal = ({ isOpen, onClose }) => {
  const [activeForm, setActiveForm] = useState('login');

  const switchForm = (formName) => {
    setActiveForm(formName);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-md mx-auto p-6">
        {activeForm === 'login' && (
          <Login 
            onClose={onClose}
            switchToRegister={() => switchForm('register')}
            switchToForgotPassword={() => switchForm('forgotPassword')}
          />
        )}
        {activeForm === 'register' && (
          <Register
            onClose={onClose}
            switchToLogin={() => switchForm('login')}
          />
        )}
        {activeForm === 'forgotPassword' && (
          <ForgotPassword
            onClose={onClose}
            switchToLogin={() => switchForm('login')}
          />
        )}
      </div>
    </Modal>
  );
};

export default AuthModal; 
import React, { useEffect, useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import AlertDialog from '../components/Shared/AlertDialog';
import OrderSuccessModal from '../components/OrderSuccessModal';
import PaymentModal from '../components/Payment/PaymentModal';
import AuthModal from '../components/Auth/AuthModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BackButton from '../components/Shared/BackButton';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { currentUser} = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const prevUserRef = useRef();

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateVAT = (subtotal) => {
    return subtotal * 0.15; // 15% VAT
  };

  const DELIVERY_FEE = 200; // 200 ETB delivery fee

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const vat = calculateVAT(subtotal);
    return subtotal + vat + DELIVERY_FEE;
  };

  const handleClearCart = () => {
    setShowAlert(true);
  };

  const confirmClearCart = () => {
    cart.forEach(item => removeFromCart(item.id));
    setShowAlert(false);
  };

  const handleCompletePurchase = () => {
    if (cart.length === 0) return;

    if (!currentUser) {
      // Show login modal instead of alert
      setShowAuthModal(true);
      return;
    }

    // Show payment modal
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentMethod) => {
    // Add order to history first
    const total = calculateTotal();
    const orderData = {
      items: [...cart],
      totalAmount: total,
      date: new Date().toISOString(),
      paymentMethod: paymentMethod,
      status: 'completed'
    };
    
    // Add to order history
    addOrder(orderData);
    
    // Clear the cart
    clearCart();
    
    // Close payment modal
    setShowPaymentModal(false);
    
    // Show success modal
    setShowSuccessModal(true);
  };

  useEffect(() => {
    // Check if the user has logged out
    if (prevUserRef.current && currentUser === null) {
      clearCart(); // Clear the cart if user logs out
    }
    prevUserRef.current = currentUser; // Update the ref with the current user
  }, [currentUser, clearCart]); // Add dependencies

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Shopping Cart</h1>
          {cart.length > 0 && (
            <button
              onClick={handleClearCart}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <FaTrash className="text-sm" />
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <FaShoppingCart className="text-6xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Your cart is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-contain rounded-md" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                    <p className="text-primary-600 dark:text-primary-400">ETB {item.price}</p>
                    
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="w-8 text-center">ETB {item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ETB {(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ETB {item.price} each
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm h-fit">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>ETB {calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>VAT (15%)</span>
                  <span>ETB {calculateVAT(calculateSubtotal()).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Delivery Fee</span>
                  <span>ETB {DELIVERY_FEE.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary-600">ETB {calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleCompletePurchase}
                disabled={cart.length === 0}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-primary-400 disabled:cursor-not-allowed"
              >
                Complete Purchase
              </button>
            </div>
          </div>
        )}
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        amount={calculateTotal()}
      />

      <AlertDialog
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={confirmClearCart}
        title="Clear Cart"
        message="Are you sure you want to remove all items from your cart?"
      />

      <OrderSuccessModal
        isOpen={showSuccessModal}
      />

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab="login"
      />
    </div>
  );
};

export default Cart;
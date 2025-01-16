import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import ProductNotification from '../components/Shared/ProductNotification';

const CartContext = createContext();

const cartReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state;
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
        localStorage.setItem('cart', JSON.stringify(newState.items));
        return newState;
      }

    case 'REMOVE_FROM_CART':
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
      localStorage.setItem('cart', JSON.stringify(newState.items));
      return newState;

    case 'UPDATE_QUANTITY':
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
      localStorage.setItem('cart', JSON.stringify(newState.items));
      return newState;

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
      };

    case 'CLEAR_CART':
      localStorage.removeItem('cart');
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  const addToCart = (product, event) => {
    const existingItem = state.items.find(item => item.id === product.id);
    dispatch({ type: 'ADD_TO_CART', payload: product });
    
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      x: rect.left + (rect.width / 2),
      y: rect.top
    };
    
    setNotification({
      message: existingItem ? 'Already in cart' : 'Added to cart',
      position,
      type: existingItem ? 'warning' : 'success'
    });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ 
      cart: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
      {notification && (
        <ProductNotification
          message={notification.message}
          position={notification.position}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
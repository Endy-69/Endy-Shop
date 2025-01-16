import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import ResponsiveContainer from './components/Layout/ResponsiveContainer';
import useScreenSize from './hooks/useScreenSize';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Banner from './components/Banner/Banner';
import Category from './components/Category/Category';
import Category2 from './components/Category/Category2';
import Blogs from './components/Blogs/Blogs';
import Footer from './components/Footer/Footer';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import NewArrivals from './pages/NewArrivals';
import Categories from './pages/Categories';
import Blog from './pages/Blog';
import CategoryProducts from './pages/CategoryProducts';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import ShippingPolicy from './pages/Policies/ShippingPolicy';
import Returns from './pages/Policies/Returns';
import PaymentMethods from './pages/Policies/PaymentMethods';
import SizeGuide from './pages/Policies/SizeGuide';
import ScrollToTop from './components/ScrollToTop';
import { NotificationProvider } from './context/NotificationContext';
import PrivateRoute from './components/PrivateRoute';
import { OrderProvider } from './context/OrderContext';
import { motion } from 'framer-motion';
import { UserProvider } from './context/UserContext';

const Home = () => (
  <>
    <Hero />
    <Banner />
    <Category />
    <Category2 />
    <Blogs />
  </>
);

const RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isReload = performance.navigation.type === 1;
    if (isReload && location.pathname !== '/') {
      navigate('/');
    }
  }, [navigate, location]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const { isMobile } = useScreenSize();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="w-full"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{
          duration: 0.15,
          ease: "linear"
        }}
      >
        <Routes location={location}>
          <Route path="/" element={
            <PageTransition>
              <ResponsiveContainer>
                <Home />
              </ResponsiveContainer>
            </PageTransition>
          } />
          <Route path="/cart" element={
            <PageTransition>
              <ResponsiveContainer>
                <Cart />
              </ResponsiveContainer>
            </PageTransition>
          } />
          <Route path="/contact" element={
            <PageTransition>
              <ResponsiveContainer>
                <Contact />
              </ResponsiveContainer>
            </PageTransition>
          } />
          <Route path="/new-arrivals" element={
            <PageTransition>
              <ResponsiveContainer>
                <NewArrivals />
              </ResponsiveContainer>
            </PageTransition>
          } />
          <Route path="/categories" element={
            <PageTransition>
              <ResponsiveContainer>
                <Categories />
              </ResponsiveContainer>
            </PageTransition>
          } />
          <Route path="/category/:categoryType" element={
            <PageTransition>
              <ResponsiveContainer>
                <CategoryProducts />
              </ResponsiveContainer>
            </PageTransition>
          } />
          <Route path="/blog" element={
            <PageTransition>
              <ResponsiveContainer>
                <Blog />
              </ResponsiveContainer>
            </PageTransition>
          } />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <PageTransition>
                  <ResponsiveContainer>
                    <Profile />
                  </ResponsiveContainer>
                </PageTransition>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <PrivateRoute>
                <PageTransition>
                  <ResponsiveContainer>
                    <Orders />
                  </ResponsiveContainer>
                </PageTransition>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <PrivateRoute>
                <PageTransition>
                  <ResponsiveContainer>
                    <Settings />
                  </ResponsiveContainer>
                </PageTransition>
              </PrivateRoute>
            } 
          />
          <Route path="/shipping-policy" element={
            <PageTransition>
              <ResponsiveContainer>
                <ShippingPolicy />
              </ResponsiveContainer>
            </PageTransition>
          } />
          <Route path="/returns" element={
            <PageTransition>
              <ResponsiveContainer>
                <Returns />
              </ResponsiveContainer>
            </PageTransition>
          } />
          <Route path="/payment-methods" element={
            <PageTransition>
              <ResponsiveContainer>
                <PaymentMethods />
              </ResponsiveContainer>
            </PageTransition>
          } />
          <Route path="/size-guide" element={
            <PageTransition>
              <ResponsiveContainer>
                <SizeGuide />
              </ResponsiveContainer>
            </PageTransition>
          } />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const { isMobile } = useScreenSize();

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <UserProvider>
      <OrderProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              <RedirectHandler />
              <ScrollToTop />
              <motion.div 
                className={`min-h-screen ${darkMode ? 'dark' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                <motion.div 
                  className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  style={{
                    transition: 'background-color 0.7s ease, color 0.7s ease'
                  }}
                >
                  <Navbar 
                    darkMode={darkMode} 
                    toggleDarkMode={toggleDarkMode}
                    isMobile={isMobile}
                  />
                  <AnimatedRoutes />
                  <Footer />
                </motion.div>
              </motion.div>
            </Router>
          </CartProvider>
        </AuthProvider>
      </OrderProvider>
    </UserProvider>
  );
}

export default App;

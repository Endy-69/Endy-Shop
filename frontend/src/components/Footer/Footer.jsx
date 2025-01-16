import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/categories' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const customerService = [
    { name: 'My Account', path: '/profile' },
    { name: 'Track Order', path: '/orders' },
    { name: 'Shipping Policy', path: '/shipping-policy' },
    { name: 'Returns & Exchanges', path: '/returns' },
    { name: 'Payment Methods', path: '/payment-methods' },
    // { name: 'Size Guide', path: '/size-guide' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Cookie Policy', path: '/cookie-policy' },
  ];

  const socialLinks = [
    { icon: FaFacebookF, url: 'https://facebook.com' },
    { icon: FaTwitter, url: 'https://twitter.com' },
    { icon: FaInstagram, url: 'https://instagram.com' },
    { icon: FaPinterest, url: 'https://pinterest.com' },
  ];

  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/">
            <h2 className="h-13 text-primary-600 text-xl font-bold font-mono">Endy-Shop</h2>

            </Link>
            <p className="text-sm leading-relaxed dark:text-gray-400">
              Discover the latest techinologies and explore our brand products. Your one-stop destination for new electronicies.
            </p>
            {/* Contact Info */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-primary-500" />
                <span className="text-sm">02 Kotebe, Addis Ababa</span>
              </div>
              <div className="flex items-center gap-3 mt-[10px] " >
                <FaPhoneAlt className="text-primary-500 mt-[-12px]" />
                <a href="tel:+251941300177" className="text-sm hover:text-primary-500 transition-colors mt-[10px]">
                  +251 941 300 177
                </a>
              </div>
              <div className="flex items-center gap-3 mt-[-50px] h-[20px]">
                <FaEnvelope className="text-primary-500 mt-[-12px]" />
                <a href="mailto:endumk69@gmail.com" className="text-sm hover:text-primary-500 transition-colors mt-[10px]">
                endumk69@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm hover:text-primary-500 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-3">
              {customerService.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path}
                    className="text-sm hover:text-primary-500 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter and get 10% off your first purchase
            </p>
            <form className="space-y-3" onSubmit={handleSubscribe}>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-primary-600 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors duration-300"
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © 2024 Endu Shop. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

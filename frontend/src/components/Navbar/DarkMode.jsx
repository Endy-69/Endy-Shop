import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

const DarkMode = ({ darkMode, toggleDarkMode }) => {
  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-500"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: darkMode ? 360 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute"
      >
        {darkMode ? (
          <FaSun className="text-xl text-yellow-500 transform transition-all duration-500" />
        ) : (
          <FaMoon className="text-xl text-gray-700 transform transition-all duration-500" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default DarkMode;

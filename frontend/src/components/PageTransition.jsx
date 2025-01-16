import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{
        duration: 0.15
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 
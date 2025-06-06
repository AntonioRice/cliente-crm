import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div variants={animations} initial="initial" animate="animate" transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  );
};

export default AnimatedPage;

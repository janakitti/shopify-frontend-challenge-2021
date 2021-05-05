import { motion } from "framer-motion";

interface IPopAnimationWrapperProps {
  children: React.ReactNode;
}

const PopAnimationWrapper = ({ children }: IPopAnimationWrapperProps) => {
  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PopAnimationWrapper;

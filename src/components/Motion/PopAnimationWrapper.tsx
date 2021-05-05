import { motion } from "framer-motion";

interface IPopAnimationWrapperProps {
  children: React.ReactNode;
  delay: number;
}

const PopAnimationWrapper = ({
  children,
  delay,
}: IPopAnimationWrapperProps) => {
  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PopAnimationWrapper;

import { Variants, motion } from "motion/react";

import cls from "./index.module.scss";

export const Loading = () => {
  const dotVariants: Variants = {
    pulse: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className={cls.main}>
      <motion.div
        animate="pulse"
        transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
        className={cls.container}
      >
        <motion.div className={cls.dot} variants={dotVariants} />
        <motion.div className={cls.dot} variants={dotVariants} />
        <motion.div className={cls.dot} variants={dotVariants} />
      </motion.div>
    </div>
  );
};

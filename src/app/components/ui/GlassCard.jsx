import React from "react";
import { motion } from "framer-motion";

export const GlassCard = ({
  children,
  className = "",
  onClick,
  hover = true,
  gradient = false
}) => {
  const baseClasses = gradient
    ? "bg-gradient-to-br from-white/90 to-white/60"
    : "bg-white/90";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.12)"
            }
          : undefined
      }
      onClick={onClick}
      className={`
        ${baseClasses}
        backdrop-blur-xl
        border border-white/60
        shadow-[0_8px_32px_rgb(0,0,0,0.06)]
        rounded-3xl
        p-6
        transition-all
        duration-300
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};
import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-bold rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300",
    secondary:
      "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300",
    ghost:
      "bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900",
    outline:
      "bg-white border-2 border-slate-200 hover:border-indigo-500 text-slate-700 hover:text-indigo-600",
    danger:
      "bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={`
        ${baseClasses}
        ${variantClasses[variant] ?? variantClasses.primary}
        ${sizeClasses[size] ?? sizeClasses.md}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}

      {!loading && icon && iconPosition === "left" && icon}

      {children}

      {!loading && icon && iconPosition === "right" && icon}
    </motion.button>
  );
};
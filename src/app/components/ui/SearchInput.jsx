import React from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = ""
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        size={20}
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-12 pr-12 py-3.5
          bg-white border-2 border-slate-200
          rounded-2xl
          focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500
          outline-none
          font-semibold text-sm
          placeholder:text-slate-400
          transition-all duration-200
        "
      />

      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => onChange("")}
            className="
              absolute right-4 top-1/2 -translate-y-1/2
              text-slate-400 hover:text-slate-600
              transition-colors
            "
          >
            <X size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
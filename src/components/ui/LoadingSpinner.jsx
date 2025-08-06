import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ 
  size = "default", 
  className = "", 
  text = "טוען..." 
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center justify-center ${className}`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`${sizeClasses[size]} text-teal-600`}
      >
        <Loader2 className="w-full h-full" />
      </motion.div>
      {text && (
        <span className="mr-2 text-slate-600 font-medium">{text}</span>
      )}
    </motion.div>
  );
}
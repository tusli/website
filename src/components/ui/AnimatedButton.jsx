import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AnimatedButton({ 
  children, 
  onClick, 
  className = "", 
  variant = "default", 
  size = "default",
  disabled = false,
  whileHover = { scale: 1.02 },
  whileTap = { scale: 0.98 },
  ...props 
}) {
  return (
    <motion.div
      whileHover={!disabled ? whileHover : {}}
      whileTap={!disabled ? whileTap : {}}
      transition={{ duration: 0.2 }}
      className="inline-block"
    >
      <Button
        onClick={onClick}
        className={`transition-all duration-300 ${className}`}
        variant={variant}
        size={size}
        disabled={disabled}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}
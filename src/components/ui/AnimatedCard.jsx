import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function AnimatedCard({ 
  children, 
  className = "", 
  hoverScale = 1.02,
  initialY = 20,
  delay = 0,
  duration = 0.6,
  ...props 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: initialY }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      whileHover={{ 
        scale: hoverScale,
        transition: { duration: 0.2 }
      }}
      className="h-full"
    >
      <Card 
        className={`transition-shadow duration-300 hover:shadow-xl ${className}`}
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  );
}
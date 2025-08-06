import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Search, Plane, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4" dir="rtl">
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated 404 Number */}
          <motion.div 
            className="mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="text-8xl md:text-9xl font-bold text-teal-600 opacity-20 mb-4">404</div>
          </motion.div>

          {/* Animated Plane Icon */}
          <motion.div
            className="mb-6"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <Plane className="w-10 h-10 text-teal-600" />
            </div>
          </motion.div>

          {/* Title and Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              אופס! איבדנו את הדרך
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              הדף שחיפשתם לא נמצא או שהכתובת השתנתה.
              אל תדאגו - נעזור לכם למצוא את הדרך הנכונה!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to={createPageUrl("Homepage")}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 font-semibold px-6 py-3 text-lg shadow-lg transition-all duration-300"
                  >
                    <Home className="mr-2 h-5 w-5" />
                    חזרה לעמוד הבית
                  </Button>
                </motion.div>
              </Link>
              
              <Link to={createPageUrl("Deals")}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full sm:w-auto border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-semibold px-6 py-3 text-lg transition-all duration-300"
                  >
                    <Search className="mr-2 h-5 w-5" />
                    צפו בדילים
                  </Button>
                </motion.div>
              </Link>
            </div>

            <Link to={createPageUrl("Contact")}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="ghost" 
                  className="text-slate-600 hover:text-teal-600 transition-colors duration-300"
                >
                  או צרו איתנו קשר לעזרה
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="mt-12 text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="flex justify-center space-x-2 space-x-reverse">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0 }}
                className="w-2 h-2 bg-teal-400 rounded-full"
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                className="w-2 h-2 bg-teal-400 rounded-full"
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
                className="w-2 h-2 bg-teal-400 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
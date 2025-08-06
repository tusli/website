import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, MapPin, Calendar, Star } from "lucide-react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=800&q=80", 
      title: "חופשת החלומות שלכם מתחילה כאן",
      subtitle: "גלו יעדים מדהימים עם הדילים הכי טובים בשוק"
    },
    {
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=800&q=80",
      title: "חוויות נסיעה ייחודיות ומותאמות אישית",
      subtitle: "אני אתכנן עבורכם את הטיול המושלם, בדיוק כמו שדמיינתם"
    },
    {
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=800&q=80",
      title: "חופשות רומנטיות ומשפחתיות",
      subtitle: "יצירת זכרונות יפים לכל החיים"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            {heroSlides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Deals")}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 font-semibold px-8 py-4 text-lg shadow-lg"
              >
                גלו את הדילים שלנו
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl("Contact")}>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-white text-white bg-black/20 hover:bg-white hover:text-teal-600 font-semibold px-8 py-4 text-lg"
              >
                קבלו ייעוץ חינם
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Slide Indicators - moved to top right corner */}
      <div className="absolute top-6 right-6 flex flex-col space-y-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            } hover:bg-white hover:scale-110`}
          />
        ))}
      </div>
    </section>
  );
}
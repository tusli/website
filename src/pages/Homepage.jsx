
import React, { useState, useEffect } from "react";
import { Deal } from "@/api/entities";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Plane, Star, Users, Clock, MapPin, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

import FeaturedDealsSection from "../components/homepage/FeaturedDealsSection.jsx";
import HeroSection from "../components/homepage/HeroSection.jsx";
import WhyChooseUsSection from "../components/homepage/WhyChooseUsSection.jsx";
import ServicesSection from "../components/homepage/ServicesSection.jsx";
import ProcessSection from "../components/homepage/ProcessSection.jsx";
import ContactSection from "../components/homepage/ContactSection.jsx";
import FAQ from "../components/shared/FAQ.jsx";

export default function Homepage() {
  const [featuredDeals, setFeaturedDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeaturedDeals();
  }, []);

  const loadFeaturedDeals = async () => {
    try {
      const deals = await Deal.filter({ featured: true, active: true }, '-created_date', 6);
      setFeaturedDeals(deals);
    } catch (error) {
      console.error("Error loading featured deals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              ברוכים הבאים לטוסלי נסיעות
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              אני מתמחה ביצירת חוויות נסיעה בלתי נשכחות המותאמות במיוחד עבורכם. 
              עם ניסיון עשיר בתחום, אני כאן כדי להפוך את חופשת החלומות שלכם למציאות.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center space-x-2 space-x-reverse text-teal-600">
                <CheckCircle className="w-6 h-6" />
                <span>ייעוץ מקצועי ואישי</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse text-teal-600">
                <CheckCircle className="w-6 h-6" />
                <span>מחירים תחרותיים</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse text-teal-600">
                <CheckCircle className="w-6 h-6" />
                <span>שירות 24/7</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Featured Deals */}
      <FeaturedDealsSection deals={featuredDeals} isLoading={isLoading} />

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Contact Section - New addition */}
      <ContactSection />

      {/* FAQ */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              עדיין לא משוכנעים?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              צפו בכל הדילים שלנו או צרו קשר לייעוץ אישי ללא התחייבות
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Deals")}>
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-white text-teal-600 hover:bg-slate-50 font-semibold px-8 py-4 text-lg"
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
      </section>
    </div>
  );
}


import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Calendar, ArrowLeft } from "lucide-react";
import AnimatedCard from "../ui/AnimatedCard.jsx";
import AnimatedButton from "../ui/AnimatedButton.jsx";
import LoadingSpinner from "../ui/LoadingSpinner.jsx";

export default function FeaturedDealsSection({ deals, isLoading }) {
  if (isLoading) {
    return (
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <LoadingSpinner size="lg" text="טוען דילים..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-8 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            דילים נבחרים
          </h2>
          <p className="text-xl text-slate-600">
            הזדמנויות מיוחדות שלא כדאי לפספס
          </p>
        </motion.div>

        {deals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center py-12"
          >
            <motion.div 
              className="text-6xl mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ✈️
            </motion.div>
            <h3 className="text-2xl font-semibold text-slate-700 mb-4">
              דילים חדשים בדרך!
            </h3>
            <p className="text-slate-600 mb-8">
              אנחנו עובדים קשה כדי להביא לכם את הדילים הטובים ביותר. חזרו בקרוב לעדכונים.
            </p>
            <Link to={createPageUrl("Contact")}>
              <AnimatedButton className="bg-teal-600 hover:bg-teal-700">
                הירשמו לעדכונים
              </AnimatedButton>
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {deals.map((deal, index) => (
                <AnimatedCard 
                  key={deal.id} 
                  delay={index * 0.1}
                  className="overflow-hidden border-0 shadow-lg group"
                >
                  <div className="relative">
                    <motion.img
                      src={deal.imageUrl || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                      alt={deal.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div 
                      className="absolute top-4 right-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    >
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        דיל חם 🔥
                      </div>
                    </motion.div>
                    {deal.price && (
                      <motion.div 
                        className="absolute bottom-4 left-4"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <div className="bg-black bg-opacity-75 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
                          <span className="text-lg font-bold">החל מ- {deal.price}{deal.currency || '₪'}</span>
                          {deal.pricePerPerson && (
                            <div className="text-xs opacity-90">לאדם</div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <motion.div 
                      className="flex items-center space-x-2 space-x-reverse text-teal-600 mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">{deal.destination}</span>
                    </motion.div>
                    <motion.h3 
                      className="text-xl font-bold text-slate-800 mb-3 line-clamp-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      {deal.title}
                    </motion.h3>
                    <motion.p 
                      className="text-slate-600 mb-4 line-clamp-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {deal.shortDescription || deal.description?.slice(0, 100) + "..."}
                    </motion.p>
                    <motion.div 
                      className="flex items-center justify-end"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <Link to={createPageUrl(`OfferDetails?id=${deal.slug || deal.id}`)}>
                        <AnimatedButton 
                          variant="outline" 
                          className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                          whileHover={{ scale: 1.05, x: -5 }}
                        >
                          פרטים נוספים
                          <ArrowLeft className="mr-2 h-4 w-4" />
                        </AnimatedButton>
                      </Link>
                    </motion.div>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link to={createPageUrl("Deals")}>
                <AnimatedButton 
                  size="lg" 
                  className="bg-teal-600 hover:bg-teal-700 font-semibold px-8 py-4 shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(20, 184, 166, 0.3)" }}
                >
                  צפו בכל הדילים
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </AnimatedButton>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

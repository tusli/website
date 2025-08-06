import React, { useState, useEffect } from 'react';
import { Destination } from '@/api/entities';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { Globe, ArrowLeft } from 'lucide-react';

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    setIsLoading(true);
    try {
      const fetchedDestinations = await Destination.filter({ published: true }, '-created_date');
      setDestinations(fetchedDestinations);
    } catch (error) {
      console.error("Error loading destinations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 py-12" dir="rtl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-12 w-1/2 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="shadow-lg">
                <Skeleton className="h-64 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-28" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Globe className="w-20 h-20 mx-auto text-teal-600 mb-6" />
          <h1 className="text-5xl font-bold text-slate-800 mb-4">יעדים מומלצים</h1>
          <p className="text-xl text-slate-600">גלו את המדריכים וההמלצות שלנו ליעדים הכי שווים בעולם</p>
        </motion.div>

        {destinations.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-slate-500 text-2xl py-16"
          >
            עוד רגע... אנחנו מכינים עבורכם מדריכי יעד חדשים.
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {destinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col group bg-white rounded-xl border border-slate-200">
                  <div className="overflow-hidden h-64 relative">
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h2 className="absolute bottom-4 right-4 text-3xl font-bold text-white">
                      {dest.name}
                    </h2>
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <p className="text-slate-600 line-clamp-3 leading-relaxed flex-grow">
                      {dest.shortDescription}
                    </p>
                    <div className="mt-4">
                      <Link to={createPageUrl(`DestinationDetails?id=${dest.slug || dest.id}`)}>
                        <Button variant="link" className="text-teal-600 hover:text-teal-700 p-0 font-semibold text-base">
                          קראו את המדריך המלא <ArrowLeft className="mr-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
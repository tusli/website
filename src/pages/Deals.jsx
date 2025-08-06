
import React, { useState, useEffect } from "react";
import { Deal } from "@/api/entities";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Calendar, Star, ArrowLeft, Plane } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import AnimatedButton from "@/components/ui/AnimatedButton";
import AnimatedCard from "@/components/ui/AnimatedCard";

const monthNames = [
  { value: "all", label: "כל החודשים" },
  { value: "1", label: "ינואר" },
  { value: "2", label: "פברואר" },
  { value: "3", label: "מרץ" },
  { value: "4", label: "אפריל" },
  { value: "5", label: "מאי" },
  { value: "6", label: "יוני" },
  { value: "7", label: "יולי" },
  { value: "8", label: "אוגוסט" },
  { value: "9", label: "ספטמבר" },
  { value: "10", label: "אוקטובר" },
  { value: "11", label: "נובמבר" },
  { value: "12", label: "דצמבר" }
];

export default function DealsPage() {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    loadDeals();
  }, []);

  useEffect(() => {
    filterAndSortDeals();
  }, [deals, searchTerm, selectedCategory, selectedMonth, sortBy]);

  const loadDeals = async () => {
    try {
      const fetchedDeals = await Deal.filter({ active: true }, '-created_date');
      setDeals(fetchedDeals);
    } catch (error) {
      console.error("Error loading deals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isDealAvailableInMonth = (deal, monthNumber) => {
    if (!deal.availableDateRanges || deal.availableDateRanges.length === 0) {
      return true; // אם אין תאריכים מוגדרים, מציג את הדיל בכל החודשים
    }

    return deal.availableDateRanges.some(dateRange => {
      if (!dateRange.startDate || !dateRange.endDate) {
        return true; // אם אין תאריכי התחלה/סיום, מציג את הדיל
      }

      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      const targetMonth = parseInt(monthNumber);

      // בדוק אם החודש המבוקש נכלל בטווח התאריכים
      const startMonth = startDate.getMonth() + 1;
      const endMonth = endDate.getMonth() + 1;
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();

      // אם הטווח חוצה שנים
      if (startYear !== endYear) {
        return (startMonth <= targetMonth && startYear === new Date().getFullYear()) ||
               (endMonth >= targetMonth && endYear === new Date().getFullYear());
      }

      // אם הטווח באותה שנה
      return targetMonth >= startMonth && targetMonth <= endMonth;
    });
  };

  const filterAndSortDeals = () => {
    let filtered = deals.filter(deal => {
      const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           deal.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (deal.description && deal.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || deal.category === selectedCategory;
      
      const matchesMonth = selectedMonth === "all" || isDealAvailableInMonth(deal, selectedMonth);
      
      return matchesSearch && matchesCategory && matchesMonth;
    });

    // Sort deals
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "featured":
          return (b.featured === true ? 1 : 0) - (a.featured === true ? 1 : 0);
        case "newest":
        default:
          return new Date(b.created_date) - new Date(a.created_date);
      }
    });

    setFilteredDeals(filtered);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton / Loading Spinner */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center"
            >
              <LoadingSpinner size="xl" text="טוען דילים מיוחדים..." />
            </motion.div>
          </div>

          {/* Filters Skeleton */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12" />
            ))}
          </div>

          {/* Deals Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-8 w-24" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-full">
                <Plane className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              הדילים שלנו
            </h1>
            <p className="text-xl opacity-90 mb-8">
              גלו מבחר דילים מיוחדים לחופשות בלתי נשכחות ברחבי העולם
            </p>
            <div className="text-lg">
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                {deals.length} דילים זמינים כעת
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6 shadow-lg border-0">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="חפש דילים..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 text-right"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="קטגוריה" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">כל הקטגוריות</SelectItem>
                  <SelectItem value="חופש">חופש</SelectItem>
                  <SelectItem value="עיר">טיולי עיר</SelectItem>
                  <SelectItem value="הרפתקאות">הרפתקאות</SelectItem>
                  <SelectItem value="תרבות">תרבות</SelectItem>
                  <SelectItem value="רומנטי">רומנטי</SelectItem>
                  <SelectItem value="משפחתי">משפחתי</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="חודש נסיעה" />
                </SelectTrigger>
                <SelectContent>
                  {monthNames.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="מיין לפי" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">החדשים ביותר</SelectItem>
                  <SelectItem value="featured">דילים מובלטים</SelectItem>
                  <SelectItem value="price-low">מחיר נמוך לגבוה</SelectItem>
                  <SelectItem value="price-high">מחיר גבוה לנמוך</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2 space-x-reverse text-slate-600">
                <Filter className="w-5 h-5" />
                <span className="font-medium">
                  {filteredDeals.length} תוצאות
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Deals Grid */}
        {filteredDeals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16"
          >
            <motion.div 
              className="text-6xl mb-6"
              animate={{ 
                rotate: [0, 10, -10, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                rotate: { repeat: Infinity, duration: 2 },
                y: { repeat: Infinity, duration: 1.5 }
              }}
            >
              🔍
            </motion.div>
            <h3 className="text-2xl font-semibold text-slate-700 mb-4">
              לא נמצאו דילים
            </h3>
            <p className="text-slate-600 mb-8">
              נסו לשנות את פרמטרי החיפוש או צרו איתנו קשר לדילים מותאמים אישית
            </p>
            <Link to={createPageUrl("Contact")}>
              <AnimatedButton 
                className="bg-teal-600 hover:bg-teal-700"
                whileHover={{ scale: 1.05 }}
              >
                צרו קשר לייעוץ אישי
              </AnimatedButton>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDeals.map((deal, index) => (
              <AnimatedCard
                key={deal.id}
                delay={index * 0.1}
                className="overflow-hidden border-0 shadow-lg h-full group"
              >
                <div className="relative">
                  <motion.img
                    src={deal.imageUrl || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                    alt={deal.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  {deal.featured && (
                    <motion.div 
                      className="absolute top-4 right-4"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    >
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        דיל מובלט ⭐
                      </div>
                    </motion.div>
                  )}
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
                <CardContent className="p-6 flex-1 flex flex-col">
                  <motion.div 
                    className="flex items-center space-x-2 space-x-reverse text-teal-600 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{deal.destination}</span>
                    {deal.category && (
                      <>
                        <span className="text-slate-300">•</span>
                        <span className="text-sm text-slate-500">{deal.category}</span>
                      </>
                    )}
                  </motion.div>

                  {/* Display available dates if they exist */}
                  {deal.availableDateRanges && deal.availableDateRanges.length > 0 && (
                    <motion.div 
                      className="flex items-center space-x-1 space-x-reverse text-slate-500 mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 + index * 0.1 }}
                    >
                      <Calendar className="w-3 h-3" />
                      <span className="text-xs">
                        {deal.availableDateRanges.map((range, i) => (
                          <span key={i}>
                            {range.description || `${new Date(range.startDate).toLocaleDateString('he-IL')} - ${new Date(range.endDate).toLocaleDateString('he-IL')}`}
                            {i < deal.availableDateRanges.length - 1 && ', '}
                          </span>
                        ))}
                      </span>
                    </motion.div>
                  )}

                  <motion.h3 
                    className="text-xl font-bold text-slate-800 mb-3 line-clamp-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {deal.title}
                  </motion.h3>
                  <motion.p 
                    className="text-slate-600 mb-4 line-clamp-3 flex-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {deal.shortDescription || deal.description?.slice(0, 120) + "..."}
                  </motion.p>
                  <motion.div 
                    className="flex items-center justify-end mt-auto"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Link to={createPageUrl(`OfferDetails?id=${deal.slug || deal.id}`)}>
                      <AnimatedButton 
                        className="bg-teal-600 hover:bg-teal-700 text-white shadow-md"
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
        )}
      </div>
    </div>
  );
}

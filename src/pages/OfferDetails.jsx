
import React, { useState, useEffect } from "react";
import { Deal } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, // Added DollarSign for the new price card
  CheckCircle, 
  XCircle,
  ArrowRight,
  Star,
  Phone,
  Mail
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

import DealGallery from "../components/deal/DealGallery.jsx";
import BookingForm from "../components/deal/BookingForm.jsx";

export default function OfferDetails() { // Renamed from OfferDetailsPage
  const [deal, setDeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const getDealIdFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  };

  useEffect(() => {
    const dealId = getDealIdFromUrl();
    if (dealId) {
      loadDeal(dealId);
    } else {
      setNotFound(true);
      setIsLoading(false);
    }
  }, []);

  const setMetaTags = (dealData) => {
    const setMeta = (property, content, isName = false) => {
      if (!content) return;
      const attribute = isName ? 'name' : 'property';
      let element = document.querySelector(`meta[${attribute}='${property}']`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const title = dealData.metaTitle || `${dealData.title} | טוסלי נסיעות`;
    const description = dealData.metaDescription || dealData.shortDescription;
    const pageUrl = window.location.href;
    const imageUrl = dealData.imageUrl;

    document.title = title;
    
    // Standard
    setMeta('description', description, true);
    
    // Open Graph (OG)
    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:url', pageUrl);
    setMeta('og:site_name', 'טוסלי נסיעות');
    setMeta('og:type', 'article');
    setMeta('og:image', imageUrl);
    setMeta('og:locale', 'he_IL');
    
    // Twitter Cards
    setMeta('twitter:card', 'summary_large_image', true);
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', description, true);
    setMeta('twitter:image', imageUrl, true);
  };

  const loadDeal = async (dealId) => {
    setIsLoading(true);
    setNotFound(false);
    try {
      const allDeals = await Deal.filter({ active: true });
      let dealData = allDeals.find(d => d.slug === dealId); // Changed to dealData
      if (!dealData) { // Changed to dealData
        dealData = allDeals.find(d => d.id === dealId); // Changed to dealData
      }

      if (dealData) {
        setDeal(dealData);
        setMetaTags(dealData); // Use the new function to set all meta tags
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error loading deal:", error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Skeleton className="h-96 w-full rounded-lg" />
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-24 w-full rounded-md" />
                <Skeleton className="h-24 w-full rounded-md" />
                <Skeleton className="h-24 w-full rounded-md" />
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !deal) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-bold text-slate-700 mb-6">אופס! דיל לא נמצא</h1>
        <p className="text-slate-600 text-lg mb-10">הדיל שחיפשתם אינו קיים או שהכתובת השתנתה.</p>
        <Link to={createPageUrl("Deals")}>
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-lg px-8 py-3">
            חזרה לכל הדילים <ArrowRight className="mr-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="flex justify-center items-center gap-2 mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-xl">{deal.destination}</span>
              {deal.category && (
                <>
                  <span className="text-white/70">•</span>
                  <span className="text-lg">{deal.category}</span>
                </>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {deal.title}
            </h1>
            {deal.shortDescription && (
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                {deal.shortDescription}
              </p>
            )}
            {deal.price && (
              <div className="text-center">
                <span className="text-3xl font-bold">החל מ- {deal.price}{deal.currency}</span>
                {deal.pricePerPerson && (
                  <span className="text-lg opacity-90 mr-2">לאדם</span>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <DealGallery 
              mainImage={deal.imageUrl} 
              gallery={deal.imageGallery || []} 
              title={deal.title}
            />
          </motion.div>

          {/* Deal Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* New Price Card - added as per outline for detailed display */}
            {deal.price && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-teal-700">
                    <DollarSign className="ml-2 h-6 w-6" />
                    מחיר
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2 space-x-reverse">
                    <span className="text-4xl font-bold text-teal-600">{deal.price}{deal.currency || '₪'}</span>
                    {deal.pricePerPerson && (
                      <span className="text-lg text-slate-600">/ לאדם</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Available Dates */}
            {deal.availableDateRanges && deal.availableDateRanges.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-teal-700">
                    <Calendar className="ml-2 h-6 w-6" />
                    תאריכים זמינים
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {deal.availableDateRanges.map((range, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                      <div>
                        <div className="font-medium">
                          {format(new Date(range.startDate), 'dd/MM/yyyy')} - {format(new Date(range.endDate), 'dd/MM/yyyy')}
                        </div>
                        {range.description && (
                          <div className="text-sm text-slate-600">{range.description}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Booking CTA */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-50 to-teal-100">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-teal-800 mb-4">מעוניינים בהצעה?</h3>
                <p className="text-teal-700 mb-6">השאירו פרטים ונחזור אליכם עם הצעה מותאמת אישית</p>
                <div className="space-y-3">
                  <Button 
                    onClick={() => setShowBookingForm(!showBookingForm)}
                    size="lg" 
                    className="w-full bg-teal-600 hover:bg-teal-700 text-lg py-3"
                  >
                    {showBookingForm ? 'סגור טופס' : 'קבלו הצעה מותאמת'}
                  </Button>
                  <div className="flex flex-col sm:flex-row gap-2 text-sm">
                    <a href="tel:050-408-7856" className="flex items-center justify-center text-teal-600 hover:text-teal-700">
                      <Phone className="w-4 h-4 ml-1" />
                      050-408-7856
                    </a>
                    <a href="mailto:tomer@tuslitravel.com" className="flex items-center justify-center text-teal-600 hover:text-teal-700">
                      <Mail className="w-4 h-4 ml-1" />
                      tomer@tuslitravel.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Booking Form */}
        {showBookingForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <BookingForm deal={deal} />
          </motion.div>
        )}

        {/* Deal Description with Markdown Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl text-slate-800">פרטי הדיל</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-bold text-slate-800 mb-4 mt-8 first:mt-0">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">{children}</h3>,
                  p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pr-6 mb-4 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pr-6 mb-4 space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-r-4 border-teal-500 pr-4 bg-teal-50 py-2 mb-4 text-slate-700 italic">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-slate-100 px-1 py-0.5 rounded text-sm font-mono">
                      {children}
                    </code>
                  ),
                  strong: ({ children }) => <strong className="font-semibold text-slate-800">{children}</strong>,
                  em: ({ children }) => <em className="italic text-slate-600">{children}</em>,
                  a: ({ href, children }) => (
                    <a href={href} className="text-teal-600 hover:text-teal-700 underline" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                }}
              >
                {deal.description}
              </ReactMarkdown>
            </CardContent>
          </Card>
        </motion.div>

        {/* Inclusions and Exclusions */}
        {((deal.inclusions && deal.inclusions.length > 0) || (deal.exclusions && deal.exclusions.length > 0)) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Inclusions */}
            {deal.inclusions && deal.inclusions.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <CheckCircle className="ml-2 h-6 w-6" />
                    מה כלול בדיל
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {deal.inclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 ml-2 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Exclusions */}
            {deal.exclusions && deal.exclusions.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <XCircle className="ml-2 h-6 w-6" />
                    מה לא כלול בדיל
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {deal.exclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <XCircle className="h-5 w-5 text-red-500 ml-2 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}

        {/* Back to Deals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link to={createPageUrl("Deals")}>
            <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white">
              <ArrowRight className="ml-2 h-5 w-5" />
              חזרה לכל הדילים
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { Destination } from '@/api/entities';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { ArrowRight, Plane } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function DestinationDetailsPage() {
  const [destination, setDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const getDestinationIdFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  };

  useEffect(() => {
    const destId = getDestinationIdFromUrl();
    if (destId) {
      loadDestination(destId);
    } else {
      setNotFound(true);
      setIsLoading(false);
    }
  }, []);

  const setMetaTags = (destData) => {
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

    const title = destData.metaTitle || destData.name + " | מדריך יעד | טוסלי נסיעות";
    const description = destData.metaDescription || destData.shortDescription;
    const pageUrl = window.location.href;
    const imageUrl = destData.imageUrl;

    document.title = title;

    // Standard
    setMeta('description', description, true);

    // OG
    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:url', pageUrl);
    setMeta('og:site_name', 'טוסלי נסיעות');
    setMeta('og:type', 'article');
    setMeta('og:image', imageUrl);
    setMeta('og:locale', 'he_IL');

    // Twitter
    setMeta('twitter:card', 'summary_large_image', true);
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', description, true);
    setMeta('twitter:image', imageUrl, true);
  };

  const loadDestination = async (destId) => {
    setIsLoading(true);
    setNotFound(false);
    try {
      const allDests = await Destination.filter({ published: true });
      let foundDest = allDests.find(d => d.slug === destId);
      if (!foundDest) {
        foundDest = allDests.find(d => d.id === destId);
      }

      if (foundDest) {
        setDestination(foundDest);
        setMetaTags(foundDest);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error loading destination:", error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 py-12" dir="rtl">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-xl rounded-lg p-8 md:p-12">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-72 w-full mb-8 rounded-md" />
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !destination) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center text-center p-6" dir="rtl">
        <h1 className="text-4xl font-bold text-slate-700 mb-6">אופס! יעד לא נמצא</h1>
        <p className="text-slate-600 text-lg mb-10">המדריך שחיפשתם אינו קיים או שהכתובת השתנתה.</p>
        <Link to={createPageUrl("Destinations")}>
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-lg px-8 py-3">
            חזרה לכל היעדים <ArrowRight className="mr-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 pb-12" dir="rtl">
      <div className="relative h-[50vh] bg-cover bg-center text-white flex items-end p-8" style={{ backgroundImage: `url(${destination.imageUrl})` }}>
         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
         <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl"
        >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{destination.name}</h1>
            <p className="text-xl md:text-2xl opacity-90">{destination.shortDescription}</p>
         </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-xl rounded-b-2xl -mt-10 relative z-20">
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 md:p-10 lg:p-12"
        >
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed prose-headings:text-slate-800 prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:mb-4 prose-ul:mb-4 prose-ol:mb-4 prose-li:mb-2 prose-strong:text-slate-800 prose-strong:font-semibold prose-em:text-slate-600 prose-blockquote:border-r-4 prose-blockquote:border-teal-500 prose-blockquote:pr-4 prose-blockquote:bg-teal-50 prose-blockquote:py-2 prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm">
              <ReactMarkdown>{destination.content}</ReactMarkdown>
            </div>
        </motion.article>
      </div>
      
       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <Card className="bg-teal-600 text-white shadow-lg overflow-hidden">
                <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-right">
                        <h3 className="text-2xl font-bold mb-2">רוצים לטוס ל{destination.name}?</h3>
                        <p className="opacity-90">אנחנו נתכנן לכם טיול מושלם ליעד החלומות שלכם. דברו איתנו!</p>
                    </div>
                     <Link to={`${createPageUrl("Contact")}?subject=${encodeURIComponent(`תכנון טיול ל${destination.name}`)}`}>
                        <Button size="lg" className="bg-white text-teal-700 hover:bg-slate-100 font-bold px-8 py-3 text-lg shrink-0">
                           <Plane className="ml-2 h-5 w-5"/> תכננו לי טיול
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Phone, Send, X } from 'lucide-react';

export default function TimedContactPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const popupShown = sessionStorage.getItem('contactPopupShown');

    if (!popupShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 30000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('contactPopupShown', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-5 right-5 z-50"
          dir="rtl"
        >
          <Card className="shadow-2xl border-2 border-teal-500 w-80 md:w-96">
            <CardHeader className="flex flex-row justify-between items-start pb-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-teal-100 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-800">מתלבטים?</CardTitle>
                  <p className="text-sm text-slate-500">אנחנו כאן כדי לעזור!</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleClose}>
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-5 leading-relaxed">
                ראינו שאתם מתעניינים... רוצים שיחת ייעוץ אישי בחינם וללא התחייבות?
              </p>
              <Link to={createPageUrl("Contact") + "?source=popup"} onClick={handleClose}>
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-lg py-3">
                  <Send className="ml-2 h-5 w-5" />
                  כן, דברו איתי!
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
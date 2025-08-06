
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Castle, Bus, Drama, Send } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function LondonPage() {
  React.useEffect(() => {
    document.title = "חופשה בלונדון | דילים וטיולים | טוסלי נסיעות";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "חולמים על חופשה בלונדון? מבתי המלוכה ועד השווקים התוססים, תכנון חופשה אורבנית מושלמת. חבילות, מלונות וכרטיסים למחזות זמר. צרו קשר.";
    }
  }, []);

  const features = [
    { icon: Castle, title: "היסטוריה ומלוכה", description: "בקרו בארמון בקינגהאם, מצודת לונדון וגלו את ההיסטוריה המרתקת של העיר." },
    { icon: Drama, title: "בירת התיאטרון העולמית", description: "חוויה תרבותית בלתי נשכחת עם מחזות הזמר וההצגות הטובות ביותר בווסט אנד." },
    { icon: Bus, title: "עיר ללא הפסקה", description: "מוזיאונים, גלריות, שופינג, שווקים, וחיי לילה תוססים. לונדון לא עוצרת לרגע." },
  ];

  const contactMessage = "היי, נשמח לקבל הצעה לחופשה בלונדון. אנו מעוניינים ב..., והתאריכים הם סביב...";

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50"
      dir="rtl"
    >
      <section 
        className="relative py-20 md:py-32 text-white bg-cover bg-center" 
        style={{ backgroundImage: "url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/861295a7f_ChatGPTImageJul25202503_39_17PM.png')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Bus className="w-16 h-16 mx-auto mb-6 text-red-400" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              לונדון קוראת לכם
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-95">
              העיר הקלאסית שלא מפסיקה להתחדש
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">החוויה הלונדונית המושלמת</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg text-center border-t-4 border-red-500 p-4">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-red-600" />
                  <CardTitle className="text-2xl font-semibold text-slate-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-700 via-gray-800 to-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Send className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              London Calling?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              צרו קשר ונתכנן עבורכם חופשה לונדונית אופנתית, תרבותית ומרגשת.
            </p>
            <Link to={`${createPageUrl("Contact")}?subject=${encodeURIComponent('פנייה לגבי חופשה בלונדון')}&message=${encodeURIComponent(contactMessage)}`}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-slate-800 hover:bg-slate-200 font-bold px-10 py-4 text-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                תכננו לי חופשה בלונדון
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

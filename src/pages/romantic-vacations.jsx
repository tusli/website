
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Heart, Star, Wine, Send, Sunset } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function RomanticVacationsPage() {
  React.useEffect(() => {
    document.title = "חופשות רומנטיות | טוסלי נסיעות";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "תכנון חופשות רומנטיות וירחי דבש ביעדים קסומים. חבילות מותאמות אישית לזוגות אוהבים, עם דגש על הפרטים הקטנים.";
    }
  }, []);

  const features = [
    { icon: Star, title: "מלונות בוטיק וסוויטות", description: "מבחר מלונות יוקרתיים וסוויטות מפנקות עם נוף עוצר נשימה ליצירת האווירה המושלמת." },
    { icon: Wine, title: "חוויות קולינריות", description: "המלצות והזמנות לארוחות ערב רומנטיות, טעימות יין וסיורים קולינריים." },
    { icon: Sunset, title: "פעילויות זוגיות", description: "תכנון ימי כיף הכוללים ספא זוגי, סיורים פרטיים ופעילויות ייחודיות נוספות." },
    { icon: Heart, title: "דיסקרטיות ותשומת לב", description: "תכנון קפדני ודיסקרטי של ירח דבש, הצעות נישואין וכל אירוע זוגי מיוחד." },
  ];

  const contactMessage = "היי, נשמח לקבל הצעה לתכנון חופשה רומנטית. היעדים שחשבנו עליהם הם..., והתאריכים הרצויים הם סביב...";

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
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-32 text-white bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502488346158-d3499a7b2121?q=80&w=1470&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Heart className="w-16 h-16 mx-auto mb-6 text-pink-400" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              חופשות רומנטיות בלתי נשכחות
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-95">
              חוגגים אהבה, יוצרים זיכרונות
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">מה הופך חופשה איתנו למושלמת?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg border-t-4 border-pink-500">
                <CardHeader>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <feature.icon className="w-10 h-10 text-pink-600" />
                    <CardTitle className="text-2xl font-semibold text-slate-800">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pink-600 via-pink-700 to-red-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Send className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              מוכנים לחופשה הזוגית הבאה שלכם?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              ספרו לנו על חופשת החלומות שלכם, ואנחנו נדאג להפוך אותה למציאות קסומה.
            </p>
            <Link to={`${createPageUrl("Contact")}?subject=${encodeURIComponent('פנייה לגבי חופשה רומנטית')}&message=${encodeURIComponent(contactMessage)}`}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-pink-700 hover:bg-slate-100 font-bold px-10 py-4 text-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                תכננו לי חופשה רומנטית
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

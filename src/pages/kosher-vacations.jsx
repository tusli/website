
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Star, UtensilsCrossed, Send, Calendar, Hotel } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function KosherVacationsPage() {
  React.useEffect(() => {
    document.title = "חופשות כשרות | טוסלי נסיעות";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "תכנון חופשות כשרות למהדרין בחו\"ל. מלונות כשרים, פתרונות לשבת וחגים, ומסלולים מותאמים לציבור הדתי ושומר המסורת.";
    }
  }, []);

  const features = [
    { icon: Hotel, title: "מלונות כשרים", description: "מגוון מלונות המציעים ארוחות כשרות למהדרין, או דירות עם מטבח מאובזר לבישול עצמי." },
    { icon: UtensilsCrossed, title: "מידע על אוכל כשר", description: "המלצות על מסעדות כשרות, חנויות עם מוצרים כשרים ושווקים מקומיים ביעדים השונים." },
    { icon: Calendar, title: "התאמה לשבת וחגים", description: "תכנון מסלולים ולינה במרחק הליכה מבתי כנסת, ופתרונות מותאמים לשמירת שבת." },
    { icon: Star, title: "חיבור לקהילה היהודית", description: "מידע על בתי כנסת, מרכזי חב\"ד ופעילויות של הקהילה היהודית המקומית." },
  ];

  const contactMessage = "היי, נשמח לקבל הצעה לתכנון חופשה כשרה. היעד המבוקש הוא..., והתאריכים הרצויים הם סביב... רמת הכשרות הנדרשת היא...";

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
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1591596784962-43e6b5478479?q=80&w=1470&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Star className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              חופשות כשרות בראש שקט
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-95">
              מטיילים בעולם, שומרים על המסורת
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">הפתרון המושלם לחופשה כשרה בחו"ל</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg border-t-4 border-blue-500">
                <CardHeader>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <feature.icon className="w-10 h-10 text-blue-600" />
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
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Send className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md::text-4xl font-bold mb-6">
              מתכננים חופשה כשרה?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              דברו איתנו! נשמח לתכנן עבורכם חופשה מושלמת שמתאימה בדיוק לצרכים שלכם.
            </p>
            <Link to={`${createPageUrl("Contact")}?subject=${encodeURIComponent('פנייה לגבי חופשה כשרה')}&message=${encodeURIComponent(contactMessage)}`}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-blue-700 hover:bg-slate-100 font-bold px-10 py-4 text-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                תכננו לי חופשה כשרה
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

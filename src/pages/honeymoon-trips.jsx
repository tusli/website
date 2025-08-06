
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Heart, Sparkles, Map, Send } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function HoneymoonTripsPage() {
  React.useEffect(() => {
    document.title = "ירח דבש מהאגדות | טוסלי נסיעות";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "תכנון ירח דבש בלתי נשכח. חבילות רומנטיות, מלונות בוטיק וחוויות זוגיות ביעדים הכי קסומים בעולם. צרו איתנו קשר להצעת חלומות.";
    }
  }, []);

  const features = [
    { icon: Map, title: "יעדים אקזוטיים", description: "מאיים טרופיים, ערים רומנטיות ונופים עוצרי נשימה - נתאים לכם את היעד המושלם." },
    { icon: Sparkles, title: "פינוקים ויוקרה", description: "מלונות מפנקים, סוויטות עם נוף, ארוחות שף וכל מה שצריך לחופשה מושלמת." },
    { icon: Heart, title: "שקט נפשי מלא", description: "אנחנו דואגים לכל הפרטים, מהטיסות ועד ההעברות, כדי שתוכלו פשוט ליהנות מהאהבה." },
  ];

  const contactMessage = "היי, נשמח לקבל הצעה לתכנון ירח דבש. היעדים שמעניינים אותנו הם..., והתאריכים הרצויים הם סביב...";

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
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560505298-6a38b183a655?q=80&w=1470&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Heart className="w-16 h-16 mx-auto mb-6 text-pink-400" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              ירח דבש מהאגדות
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-95">
              התחלה חדשה, חוויה בלתי נשכחת
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">התכנון שלנו, החלום שלכם</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg text-center border-t-4 border-pink-500 p-4">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-pink-600" />
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

      <section className="py-20 bg-gradient-to-br from-pink-600 via-pink-700 to-red-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Send className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              מוכנים להתחיל את החיים בסטייל?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              ספרו לנו על ירח הדבש שתמיד רציתם, ואנחנו נהפוך אותו למציאות.
            </p>
            <Link to={`${createPageUrl("Contact")}?subject=${encodeURIComponent('פנייה לגבי ירח דבש')}&message=${encodeURIComponent(contactMessage)}`}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-pink-700 hover:bg-slate-100 font-bold px-10 py-4 text-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                תכננו לי ירח דבש
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

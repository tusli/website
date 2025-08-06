
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Briefcase, Plane, Building, Send } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function BusinessTravelPage() {
  React.useEffect(() => {
    document.title = "נסיעות עסקיות וארגונים | טוסלי נסיעות";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "שירותי תיירות עסקית לחברות וארגונים. ניהול נסיעות עסקיות, תכנון כנסים וימי גיבוש בחו\"ל. פתרונות יעילים, חיסכון בעלויות ושירות VIP.";
    }
  }, []);

  const features = [
    { icon: Plane, title: "ניהול נסיעות יעיל", description: "הזמנת טיסות, מלונות והעברות לעובדים ומנהלים, תוך עמידה בתקציב ובלוחות זמנים." },
    { icon: Building, title: "תכנון כנסים ואירועים", description: "ארגון לוגיסטי מלא של כנסים, תערוכות וימי גיבוש לחברות בחו\"ל." },
    { icon: Briefcase, title: "חיסכון בזמן ובעלויות", description: "אנו ממקסמים את התקציב שלכם ומספקים פתרונות יצירתיים שחוסכים לכם כסף וכאב ראש." },
  ];

  const contactMessage = "היי, אנו מעוניינים בשירותי תיירות עסקית עבור החברה שלנו. נשמח לקבל פרטים על...";

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
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560439546-515643a755c6?q=80&w=1470&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Briefcase className="w-16 h-16 mx-auto mb-6 text-indigo-300" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              נסיעות עסקיות וארגונים
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-95">
              השותף שלך להצלחה גלובלית
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">שירותי תיירות לעסקים</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg text-center border-t-4 border-indigo-500 p-4">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
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

      <section className="py-20 bg-gradient-to-br from-indigo-700 via-slate-800 to-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Send className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              צריכים פתרון נסיעות לעסק?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              צרו קשר לקביעת פגישת ייעוץ ולהתאים פתרון תיירותי מדויק לצרכים של הארגון שלכם.
            </p>
            <Link to={`${createPageUrl("Contact")}?subject=${encodeURIComponent('פנייה לגבי נסיעות עסקיות')}&message=${encodeURIComponent(contactMessage)}`}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-indigo-700 hover:bg-slate-200 font-bold px-10 py-4 text-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                דברו עם מומחה
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}


import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { MountainSnow, Hotel, ShieldCheck, Send } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function SkiVacationsPage() {
  React.useEffect(() => {
    document.title = "חופשות סקי | טוסלי נסיעות";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "תכנון חופשות סקי באתרי הסקי הטובים באירופה. חבילות סקי כוללות טיסות, מלונות, סקי-פס וציוד. מתאים לכל הרמות, מגולשים מתחילים ועד מקצוענים.";
    }
  }, []);

  const features = [
    { icon: MountainSnow, title: "אתרי הסקי הטובים ביותר", description: "חבילות לאתרי הסקי המובילים באוסטריה, צרפת, איטליה ועוד, עם התאמה לרמת הגלישה שלכם." },
    { icon: Hotel, title: "מלונות על המסלול", description: "מבחר מלונות ודירות סקי אין/סקי אאוט לנוחות מקסימלית וחווית גלישה מושלמת." },
    { icon: ShieldCheck, title: "חבילה כוללת הכל", description: "טיסות, העברות, מלונות, סקי-פס, השכרת ציוד וביטוח - אנחנו דואגים להכל מראש." },
  ];

  const contactMessage = "היי, אנו מעוניינים בחופשת סקי. היעדים המועדפים הם..., והתאריכים הם סביב... רמת הגלישה שלנו היא...";

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
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611186871-797343502b55?q=80&w=1470&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <MountainSnow className="w-16 h-16 mx-auto mb-6 text-blue-300" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              חופשת סקי בלתי נשכחת
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-95">
              מהפסגות הלבנות של אירופה עד לאפרה סקי
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">חופשת הסקי המושלמת שלכם</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg text-center border-t-4 border-blue-500 p-4">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
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

      <section className="py-20 bg-gradient-to-br from-blue-700 via-sky-800 to-indigo-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Send className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              מוכנים לגלוש?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              השאירו פרטים ונחזור אליכם עם חבילת סקי מותאמת אישית.
            </p>
            <Link to={`${createPageUrl("Contact")}?subject=${encodeURIComponent('פנייה לגבי חופשת סקי')}&message=${encodeURIComponent(contactMessage)}`}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-blue-700 hover:bg-slate-100 font-bold px-10 py-4 text-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                תכננו לי חופשת סקי
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

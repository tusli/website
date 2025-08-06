
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Ship, Anchor, Waves, Send } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function CruisesPage() {
  React.useEffect(() => {
    document.title = "קרוזים וחופשות שייט | טוסלי נסיעות";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "הזמנת חופשות שייט וקרוזים ביעדים מדהימים. קרוזים לקריביים, לים התיכון, אלסקה ועוד, עם חברות השייט המובילות בעולם. בואו להפליג לחופשה.";
    }
  }, []);

  const features = [
    { icon: Ship, title: "חברות השייט המובילות", description: "אנו עובדים עם חברות השייט הטובות והאמינות ביותר כדי להבטיח לכם חוויה מושלמת." },
    { icon: Waves, title: "מגוון יעדים", description: "מהפיורדים של נורבגיה ועד לחופים האקזוטיים של הקריביים, תמצאו את הקרוז המושלם עבורכם." },
    { icon: Anchor, title: "הכל כלול (כמעט)", description: "רוב הקרוזים כוללים לינה, ארוחות, בידור ואטרקציות על האונייה, לחופשה בראש שקט." },
  ];

  const contactMessage = "היי, אנו מעוניינים בהצעה לקרוז. היעדים שמעניינים אותנו הם..., והתאריכים הרצויים הם סביב...";

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
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599881433027-e40a63e9e306?q=80&w=1470&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Ship className="w-16 h-16 mx-auto mb-6 text-sky-300" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              קרוזים וחופשות שייט
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-95">
              גלו עולם חדש בכל בוקר
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">החופשה שצפה על המים</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg text-center border-t-4 border-sky-500 p-4">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-sky-600" />
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

      <section className="py-20 bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Send className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              מוכנים להרים עוגן?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              צרו קשר וקבלו הצעה לחופשת שייט חלומית, עם כל הפינוקים והחוויות.
            </p>
            <Link to={`${createPageUrl("Contact")}?subject=${encodeURIComponent('פנייה לגבי קרוז')}&message=${encodeURIComponent(contactMessage)}`}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-sky-700 hover:bg-slate-100 font-bold px-10 py-4 text-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                קבלו הצעת מחיר לקרוז
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

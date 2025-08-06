
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Gem, Award, ConciergeBell, Send } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function LuxuryVacationsPage() {
  React.useEffect(() => {
    document.title = "חופשות יוקרה ובוטיק | טוסלי נסיעות";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "תכנון חופשות יוקרה בהתאמה אישית. מלונות 5 כוכבים, וילות פרטיות, שירותי קונסיירז' וחוויות אקסקלוסיביות. חופשת הפרימיום שלכם מתחילה כאן.";
    }
  }, []);

  const features = [
    { icon: Award, title: "סטנדרט בלתי מתפשר", description: "אנו בוחרים רק את המלונות, הריזורטים והשירותים הטובים ביותר בעולם." },
    { icon: ConciergeBell, title: "שירות קונסיירז' אישי", description: "מהזמנת מסעדות מישלן ועד טיסות פרטיות, אנחנו כאן לכל בקשה." },
    { icon: Gem, title: "פרטיות ודיסקרטיות", description: "תכנון מדויק ודיסקרטי המותאם לדרישות הגבוהות ביותר, עם תשומת לב לפרטים הקטנים." },
  ];

  const contactMessage = "היי, אנו מעוניינים בהצעה לחופשת יוקרה. היעדים שחשבנו עליהם הם..., והדגשים החשובים לנו הם...";

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
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Gem className="w-16 h-16 mx-auto mb-6 text-cyan-300" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              חופשות יוקרה ובוטיק
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-95">
              חוויה אקסקלוסיבית, שירות מעל ומעבר
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">חופשה ברמה אחרת</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg text-center border-t-4 border-cyan-500 p-4">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-cyan-600" />
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

      <section className="py-20 bg-gradient-to-br from-slate-800 via-gray-900 to-black text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Send className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              מוכנים לחוות את הטופ?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              צרו קשר לקבלת הצעה לחופשת פרימיום שתעלה על כל הציפיות.
            </p>
            <Link to={`${createPageUrl("Contact")}?subject=${encodeURIComponent('פנייה לגבי חופשת יוקרה')}&message=${encodeURIComponent(contactMessage)}`}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-gray-900 hover:bg-slate-200 font-bold px-10 py-4 text-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                קבלו הצעת פרימיום
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

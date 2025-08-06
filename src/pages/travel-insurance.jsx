import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ShieldCheck, HeartPulse, PhoneCall, Send } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function TravelInsurancePage() {
  React.useEffect(() => {
    document.title = "ביטוח נסיעות לחו\"ל | טוסלי נסיעות";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "אל תטוסו בלי ביטוח נסיעות! אנו מציעים פוליסות ביטוח מותאמות אישית לכל סוגי הנסיעות, כולל כיסוי רפואי, כבודה ועוד. טוסו בראש שקט.";
    }
  }, []);

  const features = [
    { icon: HeartPulse, title: "כיסוי רפואי מקיף", description: "כיסוי להוצאות רפואיות, אשפוז, פינוי רפואי ותרופות, כדי שתהיו מכוסים בכל מצב." },
    { icon: ShieldCheck, title: "הגנה על הכבודה והרכוש", description: "כיסוי למקרה של אובדן או גניבה של כבודה, מסמכים וציוד אישי." },
    { icon: PhoneCall, title: "מוקד חירום 24/7", description: "מוקד סיוע וחירום בעברית זמין עבורכם מסביב לשעון, מכל מקום בעולם." },
  ];

  const contactMessage = "היי, אשמח לקבל הצעה לביטוח נסיעות. אני טס/ה ל... בתאריכים...";

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
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1561442343-92a4a753ee5c?auto=format&fit=crop&w=1470&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-green-300" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              ביטוח נסיעות לחו"ל
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-95">
              טוסו בראש שקט, חזרו עם חיוך
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">הדבר הכי חשוב במזוודה</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg text-center border-t-4 border-green-500 p-4">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-green-600" />
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

      <section className="py-20 bg-gradient-to-br from-green-600 via-green-700 to-teal-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Send className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              עדיין לא עשיתם ביטוח?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              זה לוקח רק כמה דקות. צרו קשר ונדאג לכם לפוליסה המשתלמת והמתאימה ביותר עבורכם.
            </p>
            <Link to={`${createPageUrl("Contact")}?subject=${encodeURIComponent('פנייה לגבי ביטוח נסיעות')}&message=${encodeURIComponent(contactMessage)}`}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-green-700 hover:bg-slate-100 font-bold px-10 py-4 text-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                קבלו הצעה לביטוח
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
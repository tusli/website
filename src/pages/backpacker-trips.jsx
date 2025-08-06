
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Backpack, Compass, DollarSign, Send } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function BackpackerTripsPage() {
  React.useEffect(() => {
    document.title = "טיולי תרמילאים וצעירים | טוסלי נסיעות";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "מתכננים את הטיול הגדול? תכנון טיולי תרמילאים וצעירים לדרום אמריקה, המזרח ועוד. מסלולים מותאמים אישית, טיסות זולות וטיפים שיחסכו לכם כסף.";
    }
  }, []);

  const features = [
    { icon: Compass, title: "מסלולים גמישים", description: "נבנה יחד מסלול שמתאים בדיוק לקצב, לתחומי העניין ולתקציב שלכם." },
    { icon: DollarSign, title: "תכנון חכם", description: "טיפים לאטרקציות שוות, הוסטלים מומלצים ופתרונות שיחסכו לכם כסף בטיול." },
    { icon: Backpack, title: "בראש שקט", description: "אנחנו דואגים לבירוקרטיה, לטיסות ולביטוחים, כדי שאתם תתרכזו בחוויה." },
  ];

  const contactMessage = "היי, אני מתכנן/ת טיול תרמילאים. היעדים שחשבתי עליהם הם..., והתקופה היא סביב...";

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
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1470&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Backpack className="w-16 h-16 mx-auto mb-6 text-orange-400" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              הטיול הגדול שלכם מתחיל כאן
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-95">
              תכנון טיולי תרמילאים וצעירים בכל העולם
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">לטייל חכם, לחוות יותר</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg text-center border-t-4 border-orange-500 p-4">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-orange-600" />
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

      <section className="py-20 bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-700 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Send className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              בדרך להרפתקה?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              דברו איתנו! שיחת ייעוץ קצרה יכולה לחסוך לכם הרבה כסף וכאב ראש.
            </p>
            <Link to={`${createPageUrl("Contact")}?subject=${encodeURIComponent('פנייה לגבי טיול תרמילאים')}&message=${encodeURIComponent(contactMessage)}`}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-orange-700 hover:bg-slate-100 font-bold px-10 py-4 text-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                בואו נדבר על הטיול שלכם
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

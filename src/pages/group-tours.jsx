
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Users, Map, Wallet, Send } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function GroupToursPage() {
  React.useEffect(() => {
    document.title = "טיולי קבוצות מאורגנים | טוסלי נסיעות";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "תכנון וארגון טיולי קבוצות לחברים, משפחות וועדי עובדים. מסלולים מותאמים, מחירים אטרקטיביים וניהול לוגיסטי מלא. צרו קשר להצעת מחיר לקבוצה.";
    }
  }, []);

  const features = [
    { icon: Map, title: "מסלולים מותאמים לקבוצה", description: "נבנה עבורכם מסלול שמתאים לתחומי העניין, לגילאים ולקצב של כל חברי הקבוצה." },
    { icon: Wallet, title: "מחירים אטרקטיביים", description: "כוח הקנייה שלנו מאפשר לנו להשיג מחירים מעולים עבור טיסות, מלונות ואטרקציות לקבוצות." },
    { icon: Users, title: "ניהול לוגיסטי מלא", description: "מהזמנת הטיסות ועד תיאום האוטובוסים והמדריכים - אנחנו דואגים להכל." },
  ];

  const contactMessage = "היי, אנו מעוניינים לארגן טיול קבוצתי. אנחנו קבוצה של [מספר] אנשים. היעדים שחשבנו עליהם הם..., והתאריכים הם סביב...";

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
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?q=80&w=1470&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Users className="w-16 h-16 mx-auto mb-6 text-teal-300" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              טיולי קבוצות
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-95">
              חוויה משותפת, זיכרונות לכל החיים
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">לטייל ביחד זה כיף יותר (וקל יותר)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg text-center border-t-4 border-teal-500 p-4">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-teal-600" />
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

      <section className="py-20 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Send className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              מארגנים טיול לקבוצה?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              תנו לנו לעשות את העבודה הקשה. צרו קשר וקבלו הצעת מחיר משתלמת במיוחד לקבוצות.
            </p>
            <Link to={`${createPageUrl("Contact")}?subject=${encodeURIComponent('פנייה לגבי טיול קבוצות')}&message=${encodeURIComponent(contactMessage)}`}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-teal-700 hover:bg-slate-100 font-bold px-10 py-4 text-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                קבלו הצעת מחיר לקבוצה
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

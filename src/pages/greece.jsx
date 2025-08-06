
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Sun, Sailboat, Utensils, Send } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function GreecePage() {
  React.useEffect(() => {
    document.title = "חופשה ביוון | חבילות נופש וטיולים | טוסלי נסיעות";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "מתכננים חופשה ביוון? תכנון טיולים לאתונה, כרתים, רודוס וכל האיים. חבילות נופש, בטן-גב, וטיולים מותאמים אישית. צרו קשר להצעה.";
    }
  }, []);

  const features = [
    { icon: Sun, title: "חופים קסומים", description: "גלו את החופים המדהימים, המפרצים הנסתרים והמים הצלולים של איי יוון." },
    { icon: Utensils, title: "קולינריה ים-תיכונית", description: "טברנות אותנטיות, אוזו צונן, וטעמים בלתי נשכחים של המטבח היווני." },
    { icon: Sailboat, title: "איים עוצרי נשימה", description: "מסנטוריני הציורית ועד כרתים ההרפתקנית, נמצא לכם את האי המושלם." },
  ];

  const contactMessage = "היי, נשמח לקבל הצעה לחופשה ביוון. היעדים שמעניינים אותנו הם..., והתאריכים הם סביב...";

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
        style={{ backgroundImage: "url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/836a3d4cf_ChatGPTImageJul25202503_36_19PM.png')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Sun className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                יוון הקסומה מחכה לכם
                </h1>
                <p className="text-2xl md:text-3xl mb-8 opacity-95">
                חופים, טברנות, והרבה כחול בעיניים
                </p>
            </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">החוויה היוונית המושלמת</h2>
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

      <section className="py-20 bg-gradient-to-br from-blue-600 via-sky-700 to-blue-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Send className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              יאללה, טסים ליוון?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              צרו קשר ונתכנן יחד את החופשה היוונית המושלמת עבורכם.
            </p>
            <Link to={`${createPageUrl("Contact")}?subject=${encodeURIComponent('פנייה לגבי חופשה ביוון')}&message=${encodeURIComponent(contactMessage)}`}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-blue-700 hover:bg-slate-100 font-bold px-10 py-4 text-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                תכננו לי חופשה ביוון
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

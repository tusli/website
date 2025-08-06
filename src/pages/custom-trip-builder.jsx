
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Edit, Plane, CheckSquare, Send } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function CustomTripBuilderPage() {
  React.useEffect(() => {
    document.title = "בניית טיול בהתאמה אישית | טוסלי נסיעות";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "בנו את טיול החלומות שלכם! כלי לתכנון טיול בהתאמה אישית. ספרו לנו מה אתם רוצים, ואנחנו נבנה עבורכם הצעה מדויקת ללא עלות.";
    }
  }, []);

  const steps = [
    { icon: Edit, title: "1. ספרו לנו על החלום", description: "מהם היעדים, מה סגנון הטיול המועדף עליכם, ומה חשוב לכם שיהיה בחופשה." },
    { icon: Plane, title: "2. אנחנו בונים את המסלול", description: "נשתמש במומחיות שלנו כדי לבנות מסלול מפורט, כולל טיסות, מלונות ואטרקציות." },
    { icon: CheckSquare, title: "3. קבלו הצעה מותאמת", description: "נשלח לכם הצעה מסודרת וגמישה. תוכלו לשנות ולדייק אותה יחד איתנו עד שתהיה מושלמת." },
  ];
  
  const contactMessage = "היי, ברצוני לבנות טיול בהתאמה אישית.\nסגנון הטיול (בטן-גב, תרמילאים, עיר, טבע): \nיעדים מבוקשים: \nתאריכים גמישים סביב: \nמספר נוסעים: \nתקציב משוער: \nדגשים ובקשות מיוחדות: ";

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
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521295121783-8a321d551ac2?q=80&w=1470&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Edit className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              בניית טיול בהתאמה אישית
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-95">
              החופשה שלכם, בדיוק כמו שדמיינתם
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">3 שלבים פשוטים לטיול מושלם</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="shadow-lg text-center border-t-4 border-purple-500 p-4">
                <CardHeader>
                  <step.icon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <CardTitle className="text-2xl font-semibold text-slate-800">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-lg">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Send className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              מוכנים להתחיל לבנות?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              לחצו על הכפתור ועברו לדף יצירת הקשר. הכנו לכם תבנית נוחה כדי שלא תשכחו שום פרט חשוב.
            </p>
            <Link to={`${createPageUrl("Contact")}?subject=${encodeURIComponent('בקשה לבניית טיול אישי')}&message=${encodeURIComponent(contactMessage)}`}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-purple-700 hover:bg-slate-100 font-bold px-10 py-4 text-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                בנו לי את הטיול
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

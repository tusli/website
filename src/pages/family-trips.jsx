
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Users, Shield, Smile, Map, Sun, Send } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function FamilyTripsPage() {
  React.useEffect(() => {
    document.title = "טיולי משפחות | טוסלי נסיעות";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "תכנון טיולי משפחות בהתאמה אישית. יוצרים זיכרונות בלתי נשכחים עם מסלולים שמותאמים לכל הגילאים. קבלו הצעה עוד היום!";
    }
  }, []);

  const features = [
    { icon: Smile, title: "התאמה לכל הגילאים", description: "מסלולים שכיף גם לסבא וסבתא וגם לנכדים, עם אטרקציות שכולם אוהבים." },
    { icon: Shield, title: "שקט נפשי ובטיחות", description: "בחירת מלונות בטוחים, פתרונות תחבורה אמינים וליווי שלנו לאורך כל הדרך." },
    { icon: Map, title: "חיסכון בזמן ותכנון", description: "אנחנו דואגים לכל הלוגיסטיקה, כדי שאתם תתרכזו רק בליהנות מהזמן המשפחתי." },
    { icon: Sun, title: "גמישות מלאה", description: "הטיול מותאם לקצב שלכם, עם זמן למנוחה, בילויים ספונטניים ושינויים של הרגע האחרון." },
  ];

  const contactMessage = "היי, נשמח לקבל הצעה לתכנון טיול משפחתי. אנחנו [מספר] נפשות (מבוגרים וילדים). היעדים שחשבנו עליהם הם..., והתאריכים הרצויים הם סביב...";

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
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-32 text-white bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509305717900-84f40e046a85?q=80&w=1470&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Users className="w-16 h-16 mx-auto mb-6 text-teal-400" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              טיולי משפחות עם טוסלי
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-95">
              יוצרים זיכרונות בלתי נשכחים, חוויה אחת בכל פעם
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">למה לתכנן טיול משפחתי איתנו?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg border-t-4 border-teal-500">
                <CardHeader>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <feature.icon className="w-10 h-10 text-teal-600" />
                    <CardTitle className="text-2xl font-semibold text-slate-800">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Send className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              מוכנים להרפתקה המשפחתית הבאה?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              לחצו על הכפתור, מלאו את הפרטים החסרים, ואנחנו נחזור אליכם עם הצעה מותאמת אישית לטיול שתמיד חלמתם עליו.
            </p>
            <Link to={`${createPageUrl("Contact")}?subject=${encodeURIComponent('פנייה לגבי טיול משפחות')}&message=${encodeURIComponent(contactMessage)}`}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-teal-700 hover:bg-slate-100 font-bold px-10 py-4 text-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                תכננו לי טיול משפחתי
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

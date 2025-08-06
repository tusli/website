import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { FileText, Send, MessageCircle, Search, CheckCircle } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function RequestAQuotePage() {
  React.useEffect(() => {
    document.title = "בקשת הצעת מחיר | טוסלי נסיעות";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "בקשו הצעת מחיר מותאמת אישית לכל יעד ולכל סוג של חופשה. ספרו לנו על חלומכם, ואנחנו נהפוך אותו למציאות.";
    }
  }, []);

  const steps = [
    { icon: MessageCircle, title: "1. ספרו לנו על החלום", description: "מה היעד, מתי תרצו לטוס, מי הנוסעים ומה חשוב לכם שיהיה בחופשה." },
    { icon: Search, title: "2. אנחנו בונים את ההצעה", description: "נשתמש בידע ובקשרים שלנו כדי למצוא את הטיסות, המלונות והחוויות הטובות ביותר עבורכם." },
    { icon: CheckCircle, title: "3. קבלו הצעה מפורטת", description: "נשלח לכם הצעה מסודרת עם כל הפרטים, כולל מחיר סופי, ללא הפתעות." },
  ];
  
  const contactMessage = "היי, אשמח לקבל הצעת מחיר כללית.\nהיעד המבוקש: \nתאריכים גמישים סביב: \nמספר נוסעים: \nדגשים חשובים לחופשה: ";

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
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1631&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <FileText className="w-16 h-16 mx-auto mb-6 text-teal-400" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              בקשה להצעת מחיר
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-95">
              הצעד הראשון לחופשת החלומות שלכם
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">3 שלבים פשוטים להצעה מותאמת אישית</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="shadow-lg text-center border-t-4 border-teal-500 p-4">
                <CardHeader>
                  <step.icon className="w-12 h-12 mx-auto mb-4 text-teal-600" />
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Send className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              מוכנים להתחיל?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              לחצו על הכפתור כדי לעבור לטופס יצירת הקשר. שדות הנושא וההודעה כבר מולאו עבורכם כדי להקל על התהליך.
            </p>
            <Link to={`${createPageUrl("Contact")}?subject=${encodeURIComponent('בקשה כללית להצעת מחיר')}&message=${encodeURIComponent(contactMessage)}`}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-teal-700 hover:bg-slate-100 font-bold px-10 py-4 text-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                קבלו הצעת מחיר
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Mountain, Beef, Music, Send } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function ArgentinaPage() {
  React.useEffect(() => {
    document.title = "טיול לארגנטינה | טנגו, בשר ונופים | טוסלי נסיעות";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "מתכננים את הטיול הגדול לארגנטינה? מפטגוניה הקפואה ועד מפלי האיגואסו, תכנון טיולים לבואנוס איירס, ברילוצ'ה ועוד. בואו נבנה יחד את ההרפתקה שלכם.";
    }
  }, []);

  const features = [
    { icon: Mountain, title: "נופים עוצרי נשימה", description: "מהקרחונים של פטגוניה ועד הג'ונגלים של הצפון, ארגנטינה היא יבשת שלמה במדינה אחת." },
    { icon: Music, title: "תרבות ותשוקה", description: "חוו את קצב הטנגו ברחובות בואנוס איירס, ואת התרבות הססגונית של דרום אמריקה." },
    { icon: Beef, title: "חגיגה של בשר ויין", description: "אסאדו אמיתי, יינות מלבק מהמנדוסה וחוויה קולינרית שלא תישכח." },
  ];

  const contactMessage = "היי, אנו מתכננים טיול לארגנטינה. היעדים שמעניינים אותנו הם..., והתקופה היא סביב...";

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
        style={{ backgroundImage: "url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/a0b3eb767_ChatGPTImageJul25202503_35_06PM.png')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Mountain className="w-16 h-16 mx-auto mb-6 text-sky-300" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              ארגנטינה - לב דרום אמריקה
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-95">
              מסע של טבע, תרבות וטעמים
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">למה להתאהב בארגנטינה?</h2>
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

      <section className="py-20 bg-gradient-to-br from-sky-700 via-cyan-800 to-blue-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Send className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              בדרך להרפתקה הגדולה?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              צרו קשר ונתכנן יחד את הטיול שלכם לארגנטינה, מהפרט הקטן ועד הגדול.
            </p>
            <Link to={`${createPageUrl("Contact")}?subject=${encodeURIComponent('פנייה לגבי טיול לארגנטינה')}&message=${encodeURIComponent(contactMessage)}`}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-sky-700 hover:bg-slate-100 font-bold px-10 py-4 text-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                תכננו לי טיול לארגנטינה
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

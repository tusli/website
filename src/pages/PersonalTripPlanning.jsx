
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Plane, MessageSquare, CheckCircle, MapPinned, CalendarDays, Utensils, BedDouble, Car, Users, Smile, Gift, Clock, Send, Heart } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

export default function PersonalTripPlanningPage() {
  React.useEffect(() => {
    document.title = "תכנון מסלול טיול אישי | טוסלי נסיעות";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "שירות תכנון מסלול טיול אישי מבית טוסלי נסיעות. חופשה המותאמת בדיוק לכם - בחינם לגמרי!";
    }
  }, []);

  const serviceIncludes = [
    { icon: MapPinned, text: "מסלול יומי מפורט ומותאם אישית, צעד אחר צעד" },
    { icon: BedDouble, text: "המלצות לינה מגוונות: ממלונות בוטיק ועד דירות מקומיות" },
    { icon: Car, text: "פתרונות תחבורה: השכרת רכב, תחבורה ציבורית, טיסות פנים" },
    { icon: Utensils, text: "המלצות קולינריות: מסעדות אותנטיות, בתי קפה ושווקים" },
    { icon: CalendarDays, text: "שילוב אטרקציות ופעילויות לפי תחומי העניין שלכם" },
    { icon: Users, text: "התאמה מלאה למשפחות, זוגות, קבוצות ומטיילים עצמאיים" },
    { icon: Smile, text: "ליווי ותמיכה אונליין גם במהלך החופשה - הכל כלול!" },
  ];

  const whoIsThisFor = [
    { title: "טיול עצמאי ומדויק", description: "רוצים לטייל בקצב שלכם, אבל עם תוכנית מסודרת שתחסוך לכם זמן ותקלות." },
    { title: "שילוב חוויות ייחודי", description: "חולמים על טיול שמשלב תרבות, טבע, קולינריה והרפתקאות – בדיוק לפי הטעם שלכם." },
    { title: "מסלול לא שגרתי", description: "מחפשים לגלות מקומות פחות מתוירים ולהגיע לפינות חמד נסתרות, עם הכוונה מקצועית." },
    { title: "חיסכון בזמן וכאב ראש", description: "מעדיפים להשאיר את התכנון המורכב למומחה, ולהתרכז רק בהנאה מהחופשה." }
  ];

  const whyFree = [
    { icon: Heart, title: "אנחנו מרוויחים רק כשאתם מרוויחים", description: "המטרה שלי היא לתכנן לכם את החופשה הטובה ביותר. העמלה שלי מגיעה מהספקים עצמם, לא מכם." },
    { icon: Gift, title: "השקעה בקשר ארוך טווח", description: "אני מאמין שכשתקבלו שירות מעולה בחינם, תחזרו אליי בפעמים הבאות ותמליצו לחברים." },
    { icon: CheckCircle, title: "אין עלויות נסתרות", description: "המחיר שתשלמו הוא רק עבור הטיסות, המלונות והשירותים שתזמינו. התכנון והייעוץ - על החשבון שלי!" }
  ];

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
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1470&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={sectionVariants} initial="initial" animate="animate">
            <Plane className="w-16 h-16 mx-auto mb-6 text-teal-400" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              תכנון מסלול טיול אישי
            </h1>
            <p className="text-2xl md:text-3xl mb-4 opacity-95">
              חופשה שמתוכננת <span className="text-teal-400 font-semibold">בדיוק בשבילכם</span>
            </p>
            <div className="mt-10 p-6 bg-green-600/90 rounded-xl inline-block backdrop-filter backdrop-blur-md">
              <h2 className="text-xl md:text-2xl font-semibold flex items-center justify-center mb-2">
                <Gift className="ml-3 w-7 h-7 text-yellow-300" />
                שירות תכנון מלא - בחינם לגמרי!
              </h2>
              <p className="mt-3 text-lg max-w-2xl mx-auto opacity-90">
                רוצים טיול שהוא בדיוק בסטייל שלכם? נתחיל בשיחת ייעוץ חינמית בה נכיר אתכם ונבנה יחד את המסלול המושלם - בחינם לגמרי! אני מרוויח רק מהעמלות של הספקים, לא ממכם.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Free Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={sectionVariants} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">
              🎁 למה זה בחינם לגמרי?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {whyFree.map((item, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-green-500">
                  <CardHeader>
                    <item.icon className="w-12 h-12 mx-auto mb-3 text-green-600" />
                    <CardTitle className="text-xl font-semibold text-slate-800">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important to Know Section */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={sectionVariants} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }}>
            <Card className="shadow-xl border-0 bg-teal-50 p-6 md:p-8 rounded-xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-bold text-teal-700">📌 חשוב לדעת</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg text-slate-700">
                <p>
                  שירות תכנון מסלול אישי הוא שירות ייחודי, והוא <strong className="text-teal-600">שונה משירותי מכירת חבילות נופש, טיסות בודדות או מלונות קיימים באתר.</strong> 
                  אם ראיתם דיל מוכן שמוצא חן בעיניכם – אין צורך בתכנון מסלול מחדש, ואתם מוזמנים לפנות אלינו ישירות כדי להזמין אותו במחיר המופיע.
                </p>
                <p className="font-semibold pt-2 text-xl text-slate-800">תכנון אישי מתאים במיוחד למי שמחפש:</p>
              </CardContent>
            </Card>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {whoIsThisFor.map((item, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-teal-600 mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Does the Service Include? Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={sectionVariants} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">
              🧳 מה כולל שירות התכנון בחינם לגמרי?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {serviceIncludes.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 space-x-reverse bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-green-100">
                  <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                    <item.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-lg text-slate-700">{item.text}</p>
                </div>
              ))}
            </div>
            <Card className="bg-green-50 p-6 rounded-lg shadow-md mt-8">
              <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-right">
                <Heart className="w-10 h-10 text-red-500 mb-3 md:mb-0 md:ml-4" />
                <div>
                  <h3 className="text-2xl font-semibold text-slate-800">איך אני מרוויח?</h3>
                  <p className="text-lg text-slate-600 mt-1">
                    פשוט! אני מקבל עמלה מהמלונות, חברות התעופה וספקי השירותים כשאתם מזמינים דרכי. <span className="font-bold text-green-600">אתם לא משלמים עלות נוספת</span> - רק את מחיר השירותים עצמם.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={sectionVariants} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }}>
            <Send className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              מוכנים לקבל את הטיול המושלם בחינם?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              השאירו פרטים ונחזור אליכם לשיחת היכרות ותכנון בחינם לגמרי, או צרו קשר ישירות.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Contact") + "?subject=תכנון מסלול אישי"}>
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-white text-teal-700 hover:bg-slate-100 font-bold px-10 py-4 text-lg shadow-lg transform hover:scale-105 transition-transform"
                >
                  בואו נתחיל לתכנן!
                </Button>
              </Link>
              <Link to={createPageUrl("Contact")}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-teal-700 font-bold px-10 py-4 text-lg shadow-lg transform hover:scale-105 transition-transform"
                >
                  לכל דרכי יצירת הקשר
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}


import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Plane, Hotel, Users, Star, Send, MapPin, MessageSquare, Compass, Briefcase, Smile } from "lucide-react"; // Added new icons
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function AboutPage() {
  
  const services = [
    { text: "חבילות נופש מותאמות אישית: ליעדים מבוקשים באירופה, תאילנד, קפריסין, דובאי ועוד.", emoji: "✈️" },
    { text: "המלצות על מלונות ודירות נופש: בוטיק, ריזורטים, משפחתיים, כשרים או לא – לפי הצורך שלכם.", emoji: "🏨" },
    { text: "תכנון מסלולים אישיים: כולל שילוב של אטרקציות, תחבורה, לינה, והכל בקצב שמתאים לכם.", emoji: "📅" },
    { text: "מבצעים והטבות בלעדיות: כולל אפשרות לפריסת תשלומים, הנחות עונתיות והפתעות ללקוחות חוזרים.", emoji: "🎁" },
    { text: "שירות אישי, זמין ומהיר: גם בטלפון וגם בוואטסאפ. בלי המתנות, בלי טפסים מבלבלים – רק מענה אנושי ואכפתי.", emoji: "📲" },
  ];

  const whyChooseUs = [
    { text: "ליווי אישי וצמוד – תקבלו מענה אנושי, סבלני וזמין לאורך כל הדרך.", emoji: "💬", icon: MessageSquare },
    { text: "ניסיון, ידע וקשרים בשטח – אני מכיר את היעדים, יודע מה באמת שווה – ומה פחות.", emoji: "🧭", icon: Compass },
    { text: "חיסכון בזמן וכסף – אתם לא צריכים לבזבז שעות על השוואות מחירים. אני כבר בדקתי בשבילכם.", emoji: "🛫", icon: Briefcase }, // Using Briefcase as a placeholder for time/money saving
    { text: "שקט נפשי אמיתי – אני דואג לפרטים, כדי שאתם תתמקדו בחוויה.", emoji: "🧘", icon: Smile }, // Using Smile for peace of mind
  ];


  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-full">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4dbe46047_logo.jpeg" 
                  alt="לוגו טוסלי טרוול" 
                  className="h-12 w-12 rounded-full object-cover" // Make it round like other icons
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">אודות טוסלי טרוול</h1>
            <p className="text-xl text-white">
              החופשה המושלמת שלכם מתחילה כאן!
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-8 md:p-12 rounded-xl shadow-xl"
        >
          <p className="text-lg text-slate-700 leading-relaxed mb-6 text-center">
            נעים להכיר, אני <strong className="text-teal-600">תומר אוסזלק</strong> – המייסד והלב הפועם מאחורי <strong className="text-teal-600">Tusli Travel</strong>, סוכנות הנסיעות הדיגיטלית שלכם. הסוכנות קמה מתוך אהבה עמוקה לעולם ולתרבויות, ומתוך תשוקה אמיתית להפוך כל חופשה לחוויה בלתי נשכחת.
          </p>

          <div className="my-10 text-center">
            <h2 className="text-3xl font-semibold text-slate-800 mb-4">
              החזון שלנו: <span className="text-teal-600">הרבה יותר מסתם חופשה</span>
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              כל טיול הוא הזדמנות – לעצור, לנשום, להתמלא בהשראה וליצור זיכרונות שילוו אתכם לכל החיים. המשימה שלי בטוסלי טרוול היא לפשט את תהליך תכנון הנסיעה, להפוך אותו לנעים, מדויק ומהנה – ולדאוג לכם מהשלב הראשון של בחירת היעד ועד הרגע בו אתם חוזרים הביתה עם חיוך.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              אנחנו לא סוכנות רגילה. אנחנו לא מציעים פתרונות גנריים. אנחנו בונים טיולים בהתאמה אישית מלאה, עם יחס אישי אמיתי, הקשבה לכל פרט – והתמקדות במה שחשוב לכם באמת.
            </p>
          </div>

          <div className="my-12">
            <h3 className="text-2xl font-semibold text-slate-800 mb-8 text-center">מה תמצאו אצלנו?</h3>
            <ul className="space-y-6">
              {services.map((service, index) => (
                <li key={index} className="flex items-start space-x-3 space-x-reverse">
                  <span className="text-2xl flex-shrink-0 mt-1">{service.emoji}</span>
                  <span className="text-lg text-slate-700">{service.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="my-12 bg-teal-50 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-teal-700 mb-8 text-center">למה לבחור בטוסלי?</h3>
            <ul className="space-y-6">
              {whyChooseUs.map((reason, index) => (
                <li key={index} className="flex items-start space-x-3 space-x-reverse">
                   <span className="text-2xl flex-shrink-0 mt-1">{reason.emoji}</span>
                  <span className="text-lg text-slate-700">{reason.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="my-10 text-center">
             <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                בואו נתחיל לתכנן את <span className="text-teal-600">החופשה שלכם</span>
             </h3>
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              ספרו לי לאן אתם חולמים לנסוע – ואני אדאג לכל השאר.
            </p>
          </div>


          <div className="text-center bg-slate-100 p-6 rounded-lg">
            <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4dbe46047_logo.jpeg" 
                alt="לוגו טוסלי טרוול קטן" 
                className="h-16 w-16 mx-auto mb-4 rounded-full"
            />
            <p className="text-2xl font-bold text-teal-700">
              Tusli Travel – כי מגיעה לכם חופשה מעולה, <br className="sm:hidden"/>ולא פחות מזה.
            </p>
          </div>
          
          <div className="mt-12 text-center">
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-lg px-10 py-4">
                דברו איתי
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

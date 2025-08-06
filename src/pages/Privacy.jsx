import React from "react";
import { motion } from "framer-motion";
import { Shield, FileText, Mail, MapPin } from "lucide-react";

export default function PrivacyPage() {
  const lastUpdated = "30.05.2025"; // Keep this up-to-date if policy changes

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Hero Header */}
      <section className="hero-gradient py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-full">
                <Shield className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">מדיניות פרטיות של אתר טוסלי נסיעות</h1>
            <p className="text-lg opacity-90">עודכן לאחרונה: {lastUpdated}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-8 md:p-10 rounded-xl shadow-xl"
        >
          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
            <div className="text-center mb-8 border-b pb-4">
              <p><strong>שם העסק:</strong> טוסלי נסיעות</p>
              <p><strong>ח.פ.:</strong> 318456753</p>
              <p><strong>כתובת:</strong> רחוב שניר 10, חדרה</p>
              <p><strong>אימייל לפניות בנושא פרטיות:</strong> tomer@tuslitravel.com</p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">1. מטרת מדיניות הפרטיות</h2>
              <p>
                מדיניות זו נועדה להסביר כיצד טוסלי נסיעות שומרת על פרטיות המשתמשים באתר, בהתאם לחוק הגנת הפרטיות, התשמ"א–1981, ולכל דין רלוונטי. המדיניות חלה על מידע שנמסר על-ידך באופן יזום, ועל מידע שנאסף אוטומטית במהלך השימוש באתר.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">2. החלת המדיניות ועדכונים</h2>
              <p>
                מדיניות זו מהווה חלק בלתי נפרד מתנאי השימוש באתר. טוסלי נסיעות רשאית לעדכן אותה מעת לעת. עדכון מהותי יפורסם באתר או יישלח בדוא"ל למשתמשים, בהתאם לצורך. השימוש באתר לאחר עדכון מהווה הסכמה למדיניות החדשה.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">3. סוגי מידע שנאספים</h2>
              <h3 className="text-xl font-medium text-slate-700 mt-4 mb-2">3.1 מידע הנמסר על-ידך</h3>
              <p>
                בעת מילוי טופס יצירת קשר או בקשה להצעה, תתבקש למסור: שם מלא, טלפון, כתובת דוא"ל, יעד מבוקש, תאריכים, מספר נוסעים והעדפות אישיות.
              </p>
              <h3 className="text-xl font-medium text-slate-700 mt-4 mb-2">3.2 מידע שנאסף אוטומטית</h3>
              <p>
                בעת השימוש באתר נאסף מידע כללי וסטטיסטי: דפי ביקור, משך גלישה, סוג מכשיר, כתובת IP, ומידע שנאסף באמצעות קובצי Cookies – לשיפור חוויית השימוש.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">4. מטרות השימוש במידע</h2>
              <p>המידע נאסף ומשמש לצורך:</p>
              <ul className="list-disc pr-5 space-y-1">
                <li>יצירת קשר ומתן הצעות בהתאם לבקשת המשתמש</li>
                <li>שיפור חוויית המשתמש והתאמת שירותים</li>
                <li>שליחת עדכונים, מבצעים ופרסומים – רק לאחר הסכמה מפורשת</li>
                <li>אבטחת האתר וזיהוי שימושים אסורים</li>
                <li>עמידה בדרישות החוק והגנה משפטית</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">5. מסירת מידע לצדדים שלישיים</h2>
              <p>המידע שלך לא יועבר לאחרים, אלא באחד מהמקרים הבאים:</p>
                <ul className="list-disc pr-5 space-y-1">
                    <li>לצורך אספקת שירותים (למשל – חברת תעופה, מלון)</li>
                    <li>לספקי שירותים טכנולוגיים (CRM, דיוור, סליקה), בכפוף להתחייבות לסודיות</li>
                    <li>אם נדרש בצו משפטי או דרישת רשות מוסמכת</li>
                    <li>במקרה של מיזוג/מכירה של העסק לגוף אחר, בכפוף להמשך שמירה על המדיניות</li>
                </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">6. שימוש ב-Cookies</h2>
              <p>
                האתר משתמש בקובצי Cookies לצרכים טכניים, אבטחתיים ושיווקיים. תוכל לחסום או למחוק אותם דרך הגדרות הדפדפן, אך ייתכן שחלק מהפונקציות באתר לא יפעלו באופן תקין.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">7. אבטחת מידע</h2>
              <p>
                המידע מאוחסן במערכות מאובטחות. אנו משתמשים באמצעים טכניים וארגוניים כדי למנוע גישה לא מורשית, אך לא ניתן להבטיח בטחון מוחלט מפני חדירות.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">8. זכות לעיין, לתקן ולהסיר מידע</h2>
              <p>
                כל אדם זכאי לעיין במידע שנשמר עליו, ולבקש לתקן או למחוק אותו. לבקשות בנושא ניתן לפנות לכתובת: <a href="mailto:tomer@tuslitravel.com" className="text-teal-600 hover:underline">tomer@tuslitravel.com</a>
              </p>
              <p>
                במידה ואתה מקבל מאיתנו דיוור שיווקי – תוכל להסיר את עצמך בכל עת באמצעות קישור הסרה או פנייה ישירה.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">9. קישורים לאתרים חיצוניים</h2>
              <p>
                האתר עשוי לכלול קישורים לגורמים חיצוניים. איננו אחראים למדיניות הפרטיות של אתרים אלה. יש לקרוא את תנאיהם לפני מסירת פרטים.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">10. שונות</h2>
              <p>
                המדיניות מנוסחת בלשון זכר לנוחות בלבד ומתייחסת לכל המגדרים באופן שווה. מקום השיפוט הבלעדי לכל מחלוקת בנושא פרטיות הוא בבתי המשפט בעיר חדרה.
              </p>
            </section>
            
            <section className="pt-6 border-t mt-8">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <Mail className="ml-2 w-5 h-5 text-teal-600"/>
                פרטי יצירת קשר:
              </h3>
              <p><strong>טוסלי נסיעות</strong></p>
              <p className="flex items-center"><MapPin className="ml-2 w-4 h-4 text-slate-500"/>רחוב שניר 10, חדרה</p>
              <p><strong>ח.פ.</strong> 318456753</p>
              <p className="flex items-center">
                <Mail className="ml-2 w-4 h-4 text-slate-500"/>
                <a href="mailto:tomer@tuslitravel.com" className="text-teal-600 hover:underline">tomer@tuslitravel.com</a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
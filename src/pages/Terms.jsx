
import React from "react";
import { motion } from "framer-motion";
import { FileText, Landmark, Mail, MapPin } from "lucide-react";

export default function TermsPage() {
  const lastUpdated = "30.05.2025"; // Keep this up-to-date if terms change

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-full">
                <FileText className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">תנאי שימוש באתר טוסלי נסיעות</h1>
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
              <p><strong>אימייל לפניות:</strong> tomer@tuslitravel.com</p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">1. כללי</h2>
              <p>
                ברוכים הבאים לאתר "טוסלי נסיעות" (להלן: "האתר"). האתר מופעל על ידי טוסלי נסיעות, סוכנות נסיעות פרטית רשומה בישראל (ח.פ. 318456753). השימוש באתר כפוף לתנאים אלו ומהווה הסכמה מצדך לתנאי השימוש ומדיניות הפרטיות.
              </p>
              <p>
                תנאים אלו חלים על השימוש באתר בכל מכשיר (מחשב, טלפון נייד, טאבלט וכו'), והם מנוסחים בלשון זכר לצרכי נוחות בלבד, אך מיועדים לנשים וגברים כאחד.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">2. מהות השירותים</h2>
              <p>
                האתר משמש כפלטפורמה להצגת שירותי תיירות, ייעוץ אישי, דילים מותאמים אישית, והזמנת חבילות נופש, טיסות, לינה, הסעות ועוד. טוסלי נסיעות אינה ספק השירותים עצמם (טיסות, בתי מלון וכו'), אלא משמשת כמתווכת בינך לבין ספקים חיצוניים.
              </p>
              <p>
                <strong>שירות תכנון מסלול אישי:</strong> טוסלי נסיעות מציעה שירות תכנון מסלול טיול אישי. השירות כולל ייעוץ, בניית מסלול והצעות לרכיבים שונים של הטיול (טיסות, מלונות, אטרקציות וכו'). <strong>שירות התכנון עצמו ניתן ללא עלות נוספת עבור הלקוח.</strong> ההכנסות של טוסלי נסיעות מגיעות מעמלות המתקבלות מהספקים החיצוניים (כגון מלונות, חברות תעופה וכו') בעת הזמנת השירותים דרכה. הלקוח משלם רק את עלות השירותים בפועל (טיסות, מלונות וכו') כפי שמוצגים לו, ללא תוספת חיוב עבור שירות התכנון.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">3. ביצוע פניות והזמנות</h2>
              <p>
                באמצעות האתר תוכל/י למלא טופס יצירת קשר או בקשה להצעת מחיר. לאחר קבלת הפנייה, נציג מטוסלי נסיעות יחזור אליך להמשך טיפול אישי. מילוי טופס באתר אינו מהווה אישור להזמנה, אלא פנייה ראשונית בלבד.
              </p>
              <p>
                הזמנה סופית מתבצעת רק לאחר אישור בכתב (או בהודעת וואטסאפ/אימייל) מטעם טוסלי נסיעות ותשלום מלא או חלקי, בהתאם לתנאי הספק.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">4. מחירים ותשלומים</h2>
              <p>
                המחירים המופיעים באתר עבור דילים וחבילות קיימות נועדו להתרשמות וניתנים לשינוי. המחיר הסופי ייקבע ויאושר על ידי נציג טוסלי נסיעות במעמד סגירת ההזמנה.
              </p>
              <p>
                <strong>שירות תכנון מסלול אישי:</strong> כאמור בסעיף 2, שירות התכנון עצמו ניתן ללא עלות נוספת. הלקוח משלם רק את עלות השירותים בפועל (טיסות, מלונות, הסעות וכו') שיוזמנו דרך טוסלי נסיעות.
              </p>
              <p>
                ניתן לשלם תמיד בעד 3 תשלומים ללא ריבית, או בעד 12 תשלומים עם ריבית, לפי תנאים שיימסרו בעת ביצוע העסקה. תנאי הריבית ייקבעו ויוצגו ללקוח טרם אישור ההזמנה.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">5. ביטולים ושינויים</h2>
              <p>
                כל שינוי או ביטול של שירותים שהוזמנו (כגון טיסות, מלונות) כפוף למדיניות הספקים הרלוונטיים (חברות תעופה, מלונות וכו') ולחוק הגנת הצרכן.
              </p>
              <p>
                בהתאם לחוק, ניתן לבטל עסקה תוך 14 ימים ממועד ביצוע העסקה ובתנאי שהביטול מתבצע לפחות 7 ימי עסקים לפני תחילת השירות. דמי הביטול יהיו עד 5% או 100 ₪ – לפי הנמוך. ביטולים מאוחרים יותר יחויבו בהתאם למדיניות הספק ולדמי טיפול.
              </p>
              <p>
                <strong>לגבי שירות תכנון מסלול אישי:</strong> מכיוון ששירות התכנון עצמו ניתן ללא עלות, אין חיוב ספציפי עבור התכנון במקרה של ביטול. דמי הביטול, אם יחולו, יתייחסו לשירותים שהוזמנו בפועל (טיסות, מלונות וכו') ובהתאם לתנאי הספקים.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">6. אחריות</h2>
              <p>
                השירותים עצמם (טיסות, מלונות, הסעות וכו') מסופקים על ידי צדדים שלישיים. טוסלי נסיעות אינה אחראית על איכותם, זמינותם, או תקלות שיגרמו על ידי הספקים.
              </p>
              <p>
                יחד עם זאת, אנו עושים כמיטב יכולתנו כדי לעבוד עם ספקים אמינים בלבד ולספק ללקוחותינו ליווי אישי, מידע מדויק וטיפול מקצועי בכל מקרה.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">7. דרכונים, אשרות וביטוח</h2>
              <p>
                באחריות הנוסעים לוודא כי דרכונם בתוקף (לפחות 6 חודשים ממועד החזרה). בנוסף, באחריותם לבדוק האם נדרשות אשרות כניסה (ויזה), חיסונים או ביטוחים. טוסלי נסיעות ממליצה בחום לרכוש ביטוח נסיעות מתאים.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">8. שימוש באתר וקניין רוחני</h2>
              <p>
                האתר והתכנים המופיעים בו (כולל טקסטים, תמונות, גרפיקה, הצעות וכו') הם קניינה של טוסלי נסיעות ואין להעתיק, לשכפל, או להפיץ אותם ללא רשות מראש ובכתב.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">9. פרטיות ומאגר מידע</h2>
              <p>
                השימוש באתר כפוף למדיניות הפרטיות של טוסלי נסיעות, הכוללת מידע על שמירת נתונים, שימוש בעוגיות, ופנייה שיווקית בהסכמה. המידע נשמר במאגר רשום או פרטי, בהתאם להיקף הפעילות ולחוק הגנת הפרטיות.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">10. סמכות שיפוט</h2>
              <p>
                הדין החל על תנאים אלו הוא הדין הישראלי בלבד.
                מקום השיפוט הבלעדי לכל מחלוקת הנוגעת לשימוש באתר או לשירותים הניתנים בו יהיה בבתי המשפט המוסמכים בעיר חדרה.
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

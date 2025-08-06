
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "כמה זמן לפני הטיול צריך להזמין?",
    answer: "מומלץ להזמין לפחות 2-3 שבועות מראש לטיולים באירופה, ו-4-6 שבועות לטיולים למרחקים ארוכים. עם זאת, אנחנו יכולים לארגן גם טיולים דחופים בהתראה קצרה."
  },
  {
    question: "האם אתם מסייעים בהוצאת ויזה?",
    answer: "כן! אנחנו מספקים הדרכה מלאה לגבי דרישות הויזה ועוזרים במילוי הטפסים. בחלק מהמקרים אנחנו יכולים לסייע גם בהגשת הבקשה."
  },
  {
    question: "מה קורה אם אני צריך לבטל את הטיול?",
    answer: "מדיניות הביטולים תלויה בתנאים של כל ספק (מלון, חברת תעופה וכו'). אנחנו תמיד ממליצים על ביטוח ביטול טיול ונעזור לכם להבין את התנאים לפני ההזמנה."
  },
  {
    question: "איך זה עובד עם התשלומים?",
    answer: "ניתן לשלם בעד 3 תשלומים ללא ריבית, או בעד 12 תשלומים עם ריבית נמוכה. התשלום הראשון נדרש בזמן ההזמנה, והיתר ניתן לפריסה."
  },
  {
    question: "האם יש לכם זמינות 24/7?",
    answer: "כן! אנחנו זמינים לפניותיכם 24 שעות ביממה, 7 ימים בשבוע. במצבי חירום במהלך הטיול תמיד יש לנו מישהו שזמין לעזור."
  },
  {
    question: "מה כלול בשירותי התכנון?",
    answer: "השירות כולל תכנון מלא של המסלול, הזמנת טיסות ומלונות, סיוע בקבלת ויזה, המלצות על אטרקציות ומסעדות, וליווי אישי לאורך כל התהליך."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-20 bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            שאלות נפוצות
          </h2>
          <p className="text-xl text-slate-600">
            מצאו תשובות לשאלות הנפוצות ביותר
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-right p-6 flex justify-between items-center hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-slate-800">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Search, CheckCircle, Plane } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "צרו קשר",
    description: "ספרו לנו על החלום שלכם - לאן, מתי, עם מי ומה חשוב לכם",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: Search,
    title: "אנחנו מחפשים",
    description: "אנו בודקים את האפשרויות הטובות ביותר עבורכם ומכינים הצעה מותאמת",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: CheckCircle,
    title: "אישור והזמנה",
    description: "אחרי שאישרתם את ההצעה, אנחנו מזמינים הכל ומסדרים את כל הפרטים",
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  },
  {
    icon: Plane,
    title: "נוסעים!",
    description: "אתם יוצאים לחופשה עם ליווי אישי שלנו לאורך כל הדרך",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  }
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-slate-100"> {/* Changed background to slate-100 for contrast */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20" // Increased margin bottom
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            איך זה עובד?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            ארבעה שלבים פשוטים להפוך את חופשת החלומות שלכם למציאות
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line for larger screens */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-300 transform -translate-y-1/2 z-0"
               style={{width: 'calc(100% - 10rem)', margin: '0 auto'}}></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 lg:gap-y-0 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="relative mb-6">
                  <div className={`w-24 h-24 rounded-full ${step.bgColor} flex items-center justify-center shadow-lg`}>
                    <step.icon className={`w-12 h-12 ${step.color}`} />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center text-lg font-bold border-4 border-slate-100">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed px-2">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
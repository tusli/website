import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Shield, Clock, Users, MapPin, Award } from "lucide-react";

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: Star,
      title: "חוויה מותאמת אישית",
      description: "אני מתאים כל טיול לבדיוק לפי הרצונות והצרכים שלכם",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: Clock,
      title: "שירות מהיר ואמין",
      description: "המומחיות שלי זמינה עבורכם בכל שעה לכל שאלה או עזרה",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: MapPin,
      title: "יעדים בלעדיים",
      description: "גישה למקומות מיוחדים וחוויות שלא תמצאו בשום מקום אחר",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Award,
      title: "איכות מובטחת",
      description: "עם ניסיון רב בתחום, אני מתחייב לחוויה הטובה ביותר עבורכם",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            למה דווקא טוסלי נסיעות?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            אני לא רק סוכנות נסיעות - אני השותף שלכם ליצירת זכרונות בלתי נשכחים
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 rounded-full ${feature.color} mx-auto mb-6 flex items-center justify-center`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
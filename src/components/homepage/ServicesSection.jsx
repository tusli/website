import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Plane, Hotel, Car, ShieldCheck, Map, Ticket, Zap, CalendarCheck, MountainSnow, Users, Heart } from 'lucide-react';

const services = [
  { name: 'תכנון טיול אישי', icon: Map, color: 'text-lime-500', bgColor: 'bg-lime-100', link: 'PersonalTripPlanning' },
  { name: 'טיולי משפחות', icon: Users, color: 'text-orange-500', bgColor: 'bg-orange-100', link: 'family-trips' },
  { name: 'חופשות רומנטיות', icon: Heart, color: 'text-red-500', bgColor: 'bg-red-100', link: 'romantic-vacations' },
  { name: 'חופשות כשרות', icon: ShieldCheck, color: 'text-blue-500', bgColor: 'bg-blue-100', link: 'kosher-vacations' },
  { name: 'חבילות נופש', icon: CalendarCheck, color: 'text-teal-500', bgColor: 'bg-teal-100', link: 'Deals' },
  { name: 'כרטיסים והופעות', icon: Ticket, color: 'text-purple-500', bgColor: 'bg-purple-100', link: 'Contact' },
  { name: 'טיסות', icon: Plane, color: 'text-sky-500', bgColor: 'bg-sky-100', link: 'Contact' },
  { name: 'מלונות', icon: Hotel, color: 'text-indigo-500', bgColor: 'bg-indigo-100', link: 'Contact' },
  { name: 'השכרת רכב', icon: Car, color: 'text-yellow-500', bgColor: 'bg-yellow-100', link: 'Contact' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            השירותים שלנו
          </h2>
          <p className="text-xl text-slate-600 mt-4 max-w-3xl mx-auto">
            מתכנון טיול אישי ועד חופשות קונספט, אנחנו כאן כדי להגשים לכם כל חלום. כל שירות מגיע עם ליווי אישי, מקצועיות ומחויבות לחוויה מושלמת.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link to={createPageUrl(service.link)} className="group">
                <div
                  className={`p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center bg-white border border-transparent hover:border-teal-500 h-full`}
                >
                  <div className={`p-4 rounded-full ${service.bgColor} mb-5 transform group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`w-10 h-10 md:w-12 md:h-12 ${service.color}`} />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-800">
                    {service.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { SendEmail } from "@/api/integrations";
import { Inquiry } from "@/api/entities";

export default function BookingForm({ deal }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredDepartureDate: null,
    preferredReturnDate: null,
    adultsCount: 2,
    childrenCount: 0,
    additionalRequests: '',
    marketingConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "שם מלא הוא שדה חובה";
    if (!formData.email.trim()) {
      newErrors.email = "כתובת אימייל היא שדה חובה";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "כתובת אימייל לא תקינה";
    }
    if (!formData.phone.trim()) newErrors.phone = "מספר טלפון הוא שדה חובה";
    if (!formData.preferredDepartureDate) newErrors.preferredDepartureDate = "תאריך יציאה הוא שדה חובה";
    if (formData.adultsCount < 1) newErrors.adultsCount = "נדרש לפחות מבוגר אחד";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : (type === 'number' ? parseInt(value, 10) || 0 : value);
    setFormData(prev => ({ ...prev, [id]: val }));
    if (errors[id]) setErrors(prev => ({...prev, [id]: null}));
  };

  const handleDateChange = (date, field) => {
    setFormData(prev => ({ ...prev, [field]: date }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null}));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const emailSubject = `פנייה חדשה לגבי הדיל: ${deal.title}`;
      const departureDateFormatted = formData.preferredDepartureDate ? format(formData.preferredDepartureDate, 'dd/MM/yyyy') : 'לא צוין';
      const returnDateFormatted = formData.preferredReturnDate ? format(formData.preferredReturnDate, 'dd/MM/yyyy') : 'לא צוין';
      
      const emailBody = `
        <html dir="rtl">
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { padding: 20px; border: 1px solid #eee; border-radius: 5px; max-width: 600px; margin: auto; background-color: #f9f9f9; }
              h2 { color: #2A7D8A; border-bottom: 2px solid #2A7D8A; padding-bottom: 10px; }
              p { margin-bottom: 10px; }
              strong { color: #555; }
              .field { margin-bottom: 15px; padding: 10px; background-color: #fff; border-radius: 3px; border: 1px solid #ddd;}
              .message-content { white-space: pre-wrap; background-color: #e9f7f9; padding: 15px; border-radius: 3px; border: 1px solid #cce7eb; margin-top:15px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>${emailSubject}</h2>
              <div class="field"><p><strong>שם הדיל:</strong> ${deal.title}</p></div>
              <div class="field"><p><strong>שם מלא:</strong> ${formData.fullName}</p></div>
              <div class="field"><p><strong>אימייל:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p></div>
              <div class="field"><p><strong>טלפון:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p></div>
              <div class="field"><p><strong>תאריך יציאה מועדף:</strong> ${departureDateFormatted}</p></div>
              <div class="field"><p><strong>תאריך חזרה מועדף:</strong> ${returnDateFormatted}</p></div>
              <div class="field"><p><strong>מספר מבוגרים:</strong> ${formData.adultsCount}</p></div>
              <div class="field"><p><strong>מספר ילדים:</strong> ${formData.childrenCount}</p></div>
              <div class="field"><p><strong>הסכמה לדיוור:</strong> ${formData.marketingConsent ? 'כן' : 'לא'}</p></div>
              ${formData.additionalRequests ? `<div class="message-content"><strong>בקשות נוספות:</strong><br>${formData.additionalRequests.replace(/\n/g, "<br>")}</div>` : ''}
              <hr style="margin-top: 20px; margin-bottom: 10px; border: 0; border-top: 1px solid #ddd;">
              <p style="font-size: 0.9em; color: #777; text-align: center;">זוהי הודעה אוטומטית מאתר טוסלי נסיעות.</p>
            </div>
          </body>
        </html>
      `;

      await SendEmail({
        to: 'tomer@tuslitravel.com',
        subject: emailSubject,
        body: emailBody,
      });

      await Inquiry.create({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        preferredDepartureDate: formData.preferredDepartureDate ? formData.preferredDepartureDate.toISOString().split('T')[0] : null,
        preferredReturnDate: formData.preferredReturnDate ? formData.preferredReturnDate.toISOString().split('T')[0] : null,
        adultsCount: formData.adultsCount,
        childrenCount: formData.childrenCount,
        message: formData.additionalRequests,
        dealId: deal.id,
        dealTitle: deal.title,
        status: 'חדש',
        marketingConsent: formData.marketingConsent,
      });

      setSubmitStatus('success');
      setFormData({
        fullName: '', email: '', phone: '', preferredDepartureDate: null, preferredReturnDate: null,
        adultsCount: 2, childrenCount: 0, additionalRequests: '', marketingConsent: false
      });
    } catch (error) {
      console.error('Error submitting booking inquiry:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="shadow-xl border-0 mt-8">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-semibold text-slate-800 flex items-center">
            <Send className="ml-3 text-teal-600 h-7 w-7" />
            מעוניינים בדיל הזה? השאירו פרטים!
          </CardTitle>
          <p className="text-slate-600">נציג שלנו יחזור אליכם בהקדם עם כל הפרטים.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Label htmlFor="fullName" className="font-medium text-slate-700">שם מלא</Label>
              <Input 
                id="fullName" 
                value={formData.fullName} 
                onChange={handleInputChange} 
                placeholder="הכניסו שם מלא" 
                className={`mt-1 transition-all duration-300 focus:ring-2 focus:ring-teal-500 ${errors.fullName ? 'border-red-500 focus:ring-red-500' : ''}`} 
              />
              <AnimatePresence>
                {errors.fullName && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.fullName}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label htmlFor="email" className="font-medium text-slate-700">כתובת אימייל</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder="example@email.com" 
                  className={`mt-1 transition-all duration-300 focus:ring-2 focus:ring-teal-500 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`} 
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="phone" className="font-medium text-slate-700">מספר טלפון</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  placeholder="050-1234567" 
                  className={`mt-1 transition-all duration-300 focus:ring-2 focus:ring-teal-500 ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`} 
                />
                <AnimatePresence>
                  {errors.phone && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Label htmlFor="preferredDepartureDate" className="font-medium text-slate-700">תאריך יציאה מועדף</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-right font-normal mt-1 transition-all duration-300 hover:border-teal-500 ${!formData.preferredDepartureDate && "text-muted-foreground"} ${errors.preferredDepartureDate ? 'border-red-500' : ''}`}
                    >
                      <CalendarIcon className="ml-2 h-4 w-4" />
                      {formData.preferredDepartureDate ? format(formData.preferredDepartureDate, "dd/MM/yyyy") : <span>בחרו תאריך</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.preferredDepartureDate}
                      onSelect={(date) => handleDateChange(date, 'preferredDepartureDate')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <AnimatePresence>
                  {errors.preferredDepartureDate && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.preferredDepartureDate}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Label htmlFor="preferredReturnDate" className="font-medium text-slate-700">תאריך חזרה מועדף (אופציונלי)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-right font-normal mt-1 transition-all duration-300 hover:border-teal-500 ${!formData.preferredReturnDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="ml-2 h-4 w-4" />
                      {formData.preferredReturnDate ? format(formData.preferredReturnDate, "dd/MM/yyyy") : <span>בחרו תאריך</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.preferredReturnDate}
                      onSelect={(date) => handleDateChange(date, 'preferredReturnDate')}
                      disabled={{ before: formData.preferredDepartureDate || new Date() }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Label htmlFor="adultsCount" className="font-medium text-slate-700">
                  <Users className="inline-block h-4 w-4 ml-1 relative -top-0.5" />
                  מספר מבוגרים
                </Label>
                <Input 
                  id="adultsCount" 
                  type="number" 
                  min="1" 
                  value={formData.adultsCount} 
                  onChange={handleInputChange} 
                  className={`mt-1 transition-all duration-300 focus:ring-2 focus:ring-teal-500 ${errors.adultsCount ? 'border-red-500 focus:ring-red-500' : ''}`} 
                />
                <AnimatePresence>
                  {errors.adultsCount && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.adultsCount}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Label htmlFor="childrenCount" className="font-medium text-slate-700">מספר ילדים (אופציונלי)</Label>
                <Input 
                  id="childrenCount" 
                  type="number" 
                  min="0" 
                  value={formData.childrenCount} 
                  onChange={handleInputChange} 
                  className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-teal-500" 
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Label htmlFor="additionalRequests" className="font-medium text-slate-700">בקשות נוספות (אופציונלי)</Label>
              <Textarea 
                id="additionalRequests" 
                value={formData.additionalRequests} 
                onChange={handleInputChange} 
                placeholder="כל דבר נוסף שנרצה לדעת..." 
                rows={3} 
                className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-teal-500" 
              />
            </motion.div>

            <motion.div 
              className="flex items-center space-x-2 space-x-reverse"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Checkbox 
                id="marketingConsent" 
                checked={formData.marketingConsent}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, marketingConsent: checked }))}
              />
              <Label htmlFor="marketingConsent" className="text-sm font-medium text-slate-600 cursor-pointer">
                אני מאשר/ת קבלת מידע שיווקי ומבצעים מטוסלי נסיעות.
              </Label>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700 text-lg py-3 shadow-lg transition-all duration-300" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    שולח פנייה...
                  </div>
                ) : (
                  'שלח פנייה'
                )}
              </Button>
            </motion.div>

            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  className="text-center text-green-600 bg-green-50 p-4 rounded-md border border-green-200 flex items-center justify-center"
                >
                  <CheckCircle className="w-5 h-5 ml-2" />
                  הפנייה נשלחה בהצלחה! ניצור איתכם קשר בהקדם.
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  className="text-center text-red-600 bg-red-50 p-4 rounded-md border border-red-200"
                >
                  אירעה שגיאה בשליחת הפנייה. אנא נסו שוב מאוחר יותר או צרו קשר טלפונית.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
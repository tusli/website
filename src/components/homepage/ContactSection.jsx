
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SendEmail } from "@/api/integrations";
import { Inquiry } from "@/api/entities";
import { Send, Phone, Mail, MessageCircle, CheckCircle, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "שם מלא הוא שדה חובה";
    if (!formData.email.trim()) {
      newErrors.email = "כתובת אימייל היא שדה חובה";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "כתובת אימייל לא תקינה";
    }
    if (!formData.phone.trim()) newErrors.phone = "מספר טלפון הוא שדה חובה";
    if (!formData.message.trim()) newErrors.message = "הודעה היא שדה חובה";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
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
              .homepage-badge { background-color: #ff6b35; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px; font-weight: bold; display: inline-block; margin-bottom: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="homepage-badge">📧 פנייה מעמוד הבית</div>
              <h2>פנייה חדשה מאתר טוסלי נסיעות</h2>
              <div class="field">
                <p><strong>שם מלא:</strong> ${formData.fullName}</p>
              </div>
              <div class="field">
                <p><strong>אימייל:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
              </div>
              <div class="field">
                <p><strong>טלפון:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p>
              </div>
              <div class="message-content">
                <strong>הודעה:</strong><br>
                ${formData.message.replace(/\n/g, "<br>")}
              </div>
              <hr style="margin-top: 20px; margin-bottom: 10px; border: 0; border-top: 1px solid #ddd;">
              <p style="font-size: 0.9em; color: #777; text-align: center;">זוהי הודעה אוטומטית מאתר טוסלי נסיעות - נשלחה מעמוד הבית.</p>
            </div>
          </body>
        </html>
      `;
      
      await SendEmail({
        to: "tomer@tuslitravel.com",
        subject: `🏠 פנייה חדשה מעמוד הבית - ${formData.fullName}`,
        body: emailBody,
      });

      // Save inquiry to DB
      await Inquiry.create({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: `פנייה מעמוד הבית:\n\n${formData.message}`,
        status: "חדש",
        marketingConsent: false, // Default for homepage form
      });

      setSubmitStatus("success");
      setFormData({ fullName: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error sending email or saving inquiry:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Contact Info & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                מוכנים לחופשת החלומות?
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-6">
                השאירו פרטים ונחזור אליכם תוך מספר שעות עם הצעה מותאמת אישית
              </p>
            </div>

            {/* Quick Contact Options */}
            <div className="space-y-4">
              <motion.div 
                className="flex items-center space-x-3 space-x-reverse bg-white p-4 rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-orange-100 p-2 rounded-full">
                  <Phone className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">התקשרו עכשיו</p>
                  <a href="tel:+972504087856" className="text-orange-600 hover:text-orange-700 font-medium">
                    050-408-7856
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-3 space-x-reverse bg-white p-4 rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-green-100 p-2 rounded-full">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">שלחו וואטסאפ</p>
                  <a href="https://wa.me/972504087856" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-medium">
                    050-408-7856
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-3 space-x-reverse bg-white p-4 rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-blue-100 p-2 rounded-full">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">שלחו אימייל</p>
                  <a href="mailto:tomer@tuslitravel.com" className="text-blue-600 hover:text-blue-700 font-medium">
                    tomer@tuslitravel.com
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="pt-4">
              <Link to={createPageUrl("Contact")}>
                <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white">
                  לכל דרכי יצירת הקשר
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-teal-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800">
                  בואו נתחיל לתכנן!
                </CardTitle>
                <p className="text-slate-600">מלאו פרטים ונחזור אליכם בהקדם</p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="font-medium text-slate-700">שם מלא</Label>
                    <Input 
                      id="fullName" 
                      value={formData.fullName} 
                      onChange={handleInputChange} 
                      placeholder="השם המלא שלכם" 
                      className={`mt-1 ${errors.fullName ? 'border-red-500' : ''}`} 
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="font-medium text-slate-700">אימייל</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        placeholder="example@email.com" 
                        className={`mt-1 ${errors.email ? 'border-red-500' : ''}`} 
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="font-medium text-slate-700">טלפון</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        placeholder="050-1234567" 
                        className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`} 
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="font-medium text-slate-700">איך נוכל לעזור לכם?</Label>
                    <Textarea 
                      id="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      placeholder="ספרו לנו לאן אתם חולמים לנסוע, מתי ועם מי..." 
                      rows={4} 
                      className={`mt-1 ${errors.message ? 'border-red-500' : ''}`} 
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <div className="pt-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full bg-teal-600 hover:bg-teal-700 text-lg py-3 shadow-lg" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            שולח...
                          </div>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            שלחו פנייה
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>

                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
                    >
                      <div className="flex items-center justify-center mb-2">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                        <span className="text-green-800 font-semibold">הפנייה נשלחה בהצלחה!</span>
                      </div>
                      <p className="text-green-700 text-sm">נחזור אליכם תוך מספר שעות עם הצעה מותאמת</p>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-4 text-center"
                    >
                      <p className="text-red-700">אירעה שגיאה בשליחת הפנייה. אנא נסו שוב או התקשרו אלינו ישירות.</p>
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

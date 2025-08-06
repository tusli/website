
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Building, Clock, UserCircle, MessageSquare } from "lucide-react";
import { SendEmail } from "@/api/integrations";
import { Inquiry } from "@/api/entities"; // Import Inquiry entity

// Helper function for creating page URLs.
// In a real application, this would typically be part of a routing library (e.g., Next.js's useRouter, React Router's Link).
const createPageUrl = (pageName) => {
  if (pageName === "Privacy") {
    return "/privacy"; // Assuming a /privacy route for the privacy policy page
  }
  return `/${pageName.toLowerCase()}`; // General fallback for other pages
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    marketingConsent: false, // Add marketingConsent to form data
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Check if window is defined to avoid issues during server-side rendering
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const subject = urlParams.get('subject');
      const message = urlParams.get('message');
      
      if (subject || message) {
        setFormData(prev => ({
          ...prev,
          subject: subject || prev.subject, // Use existing subject if not provided in URL
          message: message || prev.message, // Use existing message if not provided in URL
        }));
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target; // Standard input fields
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
    if (!formData.subject.trim()) newErrors.subject = "נושא הפנייה הוא שדה חובה";
    if (!formData.message.trim()) newErrors.message = "תוכן ההודעה הוא שדה חובה";
    
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
            </style>
          </head>
          <body>
            <div class="container">
              <h2>פנייה חדשה מאתר טוסלי נסיעות (טופס כללי)</h2>
              <div class="field">
                <p><strong>שם מלא:</strong> ${formData.fullName}</p>
              </div>
              <div class="field">
                <p><strong>אימייל:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
              </div>
              <div class="field">
                <p><strong>טלפון:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p>
              </div>
              <div class="field">
                <p><strong>נושא:</strong> ${formData.subject}</p>
              </div>
              <div class="field">
                <p><strong>הסכמה לדיוור:</strong> ${formData.marketingConsent ? 'כן' : 'לא'}</p>
              </div>
              <div class="message-content">
                <strong>הודעה:</strong><br>
                ${formData.message.replace(/\n/g, "<br>")}
              </div>
              <hr style="margin-top: 20px; margin-bottom: 10px; border: 0; border-top: 1px solid #ddd;">
              <p style="font-size: 0.9em; color: #777; text-align: center;">זוהי הודעה אוטומטית מאתר טוסלי נסיעות.</p>
            </div>
          </body>
        </html>
      `;
      await SendEmail({
        to: "tomer@tuslitravel.com", // Replace with your admin email
        subject: `פנייה חדשה מאתר טוסלי: ${formData.subject}`,
        body: emailBody, // The body is now HTML
      });

      // Save inquiry to DB
      await Inquiry.create({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: `נושא: ${formData.subject}\n\n${formData.message}`, // Keep plain text for DB
        status: "חדש",
        marketingConsent: formData.marketingConsent,
      });

      setSubmitStatus("success");
      setFormData({ fullName: "", email: "", phone: "", subject: "", message: "", marketingConsent: false });
    } catch (error) {
      console.error("Error sending email or saving inquiry:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-full">
                <Mail className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">צרו איתנו קשר</h1>
            <p className="text-xl opacity-90">
              נשמח לשמוע מכם! השאירו פרטים ונחזור אליכם בהקדם או התקשרו.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-3xl font-semibold text-slate-800 flex items-center">
                  <Send className="ml-3 text-teal-600 h-8 w-8" />
                  השאירו פנייה
                </CardTitle>
                <p className="text-slate-600">מלאו את הטופס ונציג יחזור אליכם בהקדם האפשרי.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="fullName" className="font-medium text-slate-700">שם מלא</Label>
                    <Input id="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="הכניסו שם מלא" className={`mt-1 ${errors.fullName ? 'border-red-500' : ''}`} />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email" className="font-medium text-slate-700">כתובת אימייל</Label>
                      <Input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="example@email.com" className={`mt-1 ${errors.email ? 'border-red-500' : ''}`} />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="font-medium text-slate-700">מספר טלפון</Label>
                      <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="050-1234567" className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`} />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="font-medium text-slate-700">נושא הפנייה</Label>
                    <Input id="subject" value={formData.subject} onChange={handleInputChange} placeholder="לדוגמה: ייעוץ לגבי יעד, שאלה על דיל ספציפי" className={`mt-1 ${errors.subject ? 'border-red-500' : ''}`} />
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                  </div>
                  <div>
                    <Label htmlFor="message" className="font-medium text-slate-700">תוכן ההודעה</Label>
                    <Textarea id="message" value={formData.message} onChange={handleInputChange} placeholder="כתבו את הודעתכם כאן..." rows={5} className={`mt-1 ${errors.message ? 'border-red-500' : ''}`} />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  {/* Marketing Consent Checkbox */}
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id="marketingConsent"
                      checked={formData.marketingConsent}
                      // Use onCheckedChange for the Checkbox component as per its API
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, marketingConsent: checked }))
                      }
                    />
                    <Label htmlFor="marketingConsent" className="text-sm font-medium text-slate-600 cursor-pointer">
                      אני מאשר/ת קבלת מידע שיווקי ומבצעים מטוסלי נסיעות לפי <a href={createPageUrl("Privacy")} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">מדיניות הפרטיות</a>
                    </Label>
                  </div>
                  
                  <div>
                    <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-lg py-3" disabled={isSubmitting}>
                      {isSubmitting ? "שולח..." : "שלח פנייה"}
                    </Button>
                  </div>
                  {submitStatus === "success" && (
                    <p className="text-center text-green-600 bg-green-50 p-3 rounded-md">הפנייה נשלחה בהצלחה! ניצור קשר בהקדם.</p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-center text-red-600 bg-red-50 p-3 rounded-md">אירעה שגיאה בשליחת הפנייה. אנא נסו שוב או צרו קשר טלפונית.</p>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-3xl font-semibold text-slate-800 flex items-center">
                  <UserCircle className="ml-3 text-teal-600 h-8 w-8" />
                  פרטי התקשרות ישירים
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-lg">
                <div className="flex items-start">
                  <Phone className="ml-3 mt-1 text-teal-600 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800">טלפון</h4>
                    <a href="tel:+972504087856" className="text-slate-600 hover:text-teal-600 transition-colors">050-408-7856</a>
                  </div>
                </div>
                 <div className="flex items-start">
                  <MessageSquare className="ml-3 mt-1 text-teal-600 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800">וואטסאפ</h4>
                    <a href="https://wa.me/972504087856" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-teal-600 transition-colors">050-408-7856</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="ml-3 mt-1 text-teal-600 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800">דואר אלקטרוני</h4>
                    <a href="mailto:tomer@tuslitravel.com" className="text-slate-600 hover:text-teal-600 transition-colors">tomer@tuslitravel.com</a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-3xl font-semibold text-slate-800 flex items-center">
                  <Clock className="ml-3 text-teal-600 h-8 w-8" />
                  שעות פעילות
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-lg text-slate-600">
                <div className="text-center bg-teal-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-teal-600 mb-2">24/7</p>
                  <p className="text-slate-700">זמינים עבורכם בכל שעות היממה</p>
                  <p className="text-sm text-slate-500 mt-2">מענה מיידי לבקשות דחופות</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}



import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Plane, Info, Phone, FileText, Mail, MapPin, Briefcase, Menu, MessageSquare, Globe } from "lucide-react"; // Added Globe
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"; // Added Sheet components
import { motion, AnimatePresence } from "framer-motion";
import TimedContactPopup from "@/components/shared/TimedContactPopup";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    // Google Tag Manager Script
    const gtmScript = document.createElement('script');
    gtmScript.src = "https://www.googletagmanager.com/gtag/js?id=AW-17389329458";
    gtmScript.async = true;
    document.head.appendChild(gtmScript);

    const gtagScript = document.createElement('script');
    gtagScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-17389329458');
    `;
    document.head.appendChild(gtagScript);

    return () => {
      // Clean up scripts on component unmount
      if (document.head.contains(gtmScript)) {
        document.head.removeChild(gtmScript);
      }
      if (document.head.contains(gtagScript)) {
        document.head.removeChild(gtagScript);
      }
    }
  }, []);

  // Helper function to determine if a nav link is active
  const isActivePage = (pageName) => {
    if ((pageName === "SimpleBlog" || pageName === "PersonalTripPlanning") && location.pathname.includes(createPageUrl(pageName).slice(0, -1))) {
      return true;
    }
    if (pageName === "SimpleBlog" && location.pathname.includes(createPageUrl("SimpleBlogPostPage").split("SimpleBlogPostPage")[0])) {
      return true;
    }
    if (pageName === "Destinations" && location.pathname.includes(createPageUrl("Destinations").slice(0, -1))) {
      return true;
    }
    if (pageName === "Destinations" && location.pathname.includes(createPageUrl("DestinationDetails").split("DestinationDetails")[0])) {
      return true;
    }
    return location.pathname === createPageUrl(pageName);
  };

  const getPageMeta = (name) => {
    switch (name) {
      case "Homepage":
        return {
          title: "טוסלי נסיעות | תכנון טיולים וחבילות נופש בהתאמה אישית",
          description: "מתכננים חופשה? טוסלי נסיעות מתמחה בתכנון טיולים אישי, חבילות נופש ודילים לחו\"ל. שירות אישי, מחירים מעולים וליווי צמוד. צרו קשר לייעוץ חינם!"
        };
      case "Deals":
        return {
          title: "דילים לחו\"ל | מבצעי חופשות וחבילות נופש | טוסלי נסיעות",
          description: "גלו את הדילים החמים ביותר לחו\"ל! חבילות נופש, טיסות זולות ומבצעים ליעדים אהובים. הזמינו עכשיו את החופשה הבאה שלכם במחיר מנצח."
        };
      case "Contact":
        return {
          title: "יצירת קשר | ייעוץ ותכנון טיולים | טוסלי נסיעות",
          description: "צרו קשר עם טוסלי נסיעות לקבלת ייעוץ חינם לתכנון הטיול הבא שלכם. זמינים בוואטסאפ, בטלפון או במייל לשירות אישי ומקצועי."
        };
      case "About":
        return {
          title: "אודות טוסלי נסיעות | סוכן הנסיעות האישי שלך",
          description: "הכירו את תומר אוסזלק והסיפור מאחורי טוסלי נסיעות. אנו מתמחים בתכנון חופשות בוטיק עם יחס אישי, ניסיון, וחיסכון בזמן וכסף."
        };
      case "Privacy":
        return {
          title: "מדיניות פרטיות | טוסלי נסיעות",
          description: "מדיניות הפרטיות של אתר טוסלי נסיעות. אנו מחויבים לשמירה על המידע האישי שלך. קרא/י עוד על האופן בו אנו משתמשים בנתונים."
        };
      case "Terms":
        return {
          title: "תנאי שימוש | טוסלי נסיעות",
          description: "תנאי השימוש בשירותי טוסלי נסיעות. מידע חשוב על תהליך ההזמנה, תשלומים, מדיניות ביטולים ואחריות."
        };
      case "SimpleBlog":
        return {
          title: "בלוג תיירות וטיולים | טיפים והמלצות | טוסלי נסיעות",
          description: "בלוג הנסיעות של טוסלי עם מיטב הטיפים, המדריכים וההמלצות ליעדים חמים בעולם. כל מה שצריך לדעת לפני שטסים לחו\"ל."
        };
      case "PersonalTripPlanning":
        return {
          title: "תכנון טיול אישי לחו\"ל | מסלול בהתאמה אישית | טוסלי",
          description: "רוצים טיול שתפור עליכם? שירות תכנון מסלול טיול אישי בחינם! בניית מסלול, המלצות לינה, אטרקציות וליווי צמוד ללא עלות נוספת."
        };
      case "OfferDetails":
         // Title and description for OfferDetails will be set dynamically within the page component
        return {
          title: "פרטי הצעה | טוסלי נסיעות", 
          description: "צפו בפרטים המלאים של ההצעה המיוחדת שלנו."
        };
      case "SimpleBlogPostPage":
        // Title and description for SimpleBlogPostPage will be set dynamically within the page component
        return {
          title: "מאמר מהבלוג | טוסלי נסיעות",
          description: "קראו את המאמר המלא שלנו."
        };
      case "family-trips":
        return {
          title: "תכנון טיולי משפחות לחו\"ל | טוסלי נסיעות",
          description: "מתכננים טיול משפחתי? אנו נבנה לכם חופשה מושלמת המותאמת לכל הגילאים, כולל אטרקציות לילדים, מלונות מומלצים ופתרונות לוגיסטיים."
        };
      case "request-a-quote":
        return {
          title: "בקשת הצעת מחיר לחופשה | טוסלי נסיעות",
          description: "קבלו הצעת מחיר מותאמת אישית לטיול הבא שלכם. ספרו לנו על יעד החלומות שלכם, ואנחנו נדאג להפוך אותו למציאות במחיר משתלם."
        };
      case "romantic-vacations":
        return {
            title: "חופשות רומנטיות לזוגות | ירח דבש | טוסלי נסיעות",
            description: "מחפשים חופשה זוגית מושלמת? תכנון חופשות רומנטיות וירחי דבש מפנקים ביעדים קסומים. חבילות בוטיק עם דגש על כל הפרטים הקטנים."
        };
      case "kosher-vacations":
        return {
            title: "חופשות כשרות בחו\"ל | פתרונות לדתיים | טוסלי נסיעות",
            description: "תכנון חופשות כשרות למהדרין בחו\"ל. פתרונות לינה, אוכל כשר, והתאמה לשבתות וחגים למטייל הדתי ושומר המסורת. טוסו בראש שקט."
        };
      case "honeymoon-trips":
        return {
            title: "ירח דבש מהאגדות | חבילות לזוגות | טוסלי נסיעות",
            description: "תכנון ירח דבש בלתי נשכח ביעדים אקזוטיים ורומנטיים. חבילות ירח דבש מותאמות אישית ליצירת חוויה של פעם בחיים. צרו קשר לייעוץ."
        };
      case "backpacker-trips":
        return {
            title: "טיולי תרמילאים וצעירים | תכנון הטיול הגדול | טוסלי נסיעות",
            description: "מתכננים את הטיול הגדול? תכנון מסלולים, טיסות זולות וטיפים לתרמילאים במזרח, דרום אמריקה ועוד. בואו לתכנן את ההרפתקה שלכם."
        };
      case "luxury-vacations":
        return {
            title: "חופשות יוקרה | חבילות פרימיום | טוסלי נסיעות",
            description: "תכנון חופשות יוקרה אקסקלוסיביות. מלונות 5 כוכבים, וילות פרטיות, שירותי קונסיירז' וחוויות ייחודיות ברמה הגבוהה ביותר. חופשת החלומות שלכם."
        };
      case "ski-vacations":
        return {
            title: "חופשות סקי באירופה | חבילות סקי | טוסלי נסיעות",
            description: "חבילות סקי ודילים לאתרי הסקי המובילים באירופה. חופשות סקי באוסטריה, צרפת ואיטליה כולל סקי-פס, ציוד ומלונות. מתאים לכל הרמות."
        };
      case "group-tours":
        return {
            title: "טיולי קבוצות מאורגנים | טוסלי נסיעות",
            description: "ארגון טיולי קבוצות לחברים, משפחות וועדי עובדים. תכנון מסלולים, מחירים אטרקטיביים וניהול לוגיסטי מלא לחוויה קבוצתית מושלמת."
        };
      case "last-minute-deals":
        return {
            title: "דילים של הרגע האחרון | טיסות וחבילות | טוסלי נסיעות",
            description: "ספונטניים? מצאו דילים של הרגע האחרון לטיסות וחבילות נופש במחירים מנצחים. הזדמנויות שאסור לפספס לחופשה מיידית."
        };
      case "business-travel":
        return {
            title: "נסיעות עסקיות וארגונים | פתרונות תיירות | טוסלי נסיעות",
            description: "שירותי תיירות עסקית לחברות וארגונים. ניהול נסיעות, תכנון כנסים וימי גיבוש בחו\"ל. שירות יעיל וחיסכון בעלויות."
        };
      case "cruises":
        return {
            title: "חופשות שייט וקרוזים | דילים והזמנות | טוסלי נסיעות",
            description: "הזמינו חופשת שייט חלומית. קרוזים לקריביים, אירופה ואלסקה עם חברות השייט המובילות. גלו עולם שלם על המים."
        };
      case "travel-insurance":
        return {
            title: "ביטוח נסיעות לחו\"ל | השוואה ורכישה | טוסלי נסיעות",
            description: "אל תטוסו בלי כיסוי. רכישת ביטוח נסיעות מותאם אישית לחו\"ל, כולל כיסוי רפואי, כבודה וביטול טיסה. טוסו בראש שקט."
        };
      case "custom-trip-builder":
        return {
            title: "בניית טיול בהתאמה אישית | טוסלי נסיעות",
            description: "השתמשו בכלי לתכנון טיול אישי ובנו את חופשת החלומות שלכם. ספרו לנו מה אתם רוצים, ואנחנו נבנה עבורכם הצעה מדויקת ללא עלות."
        };
      case "greece":
        return {
            title: "חופשה ביוון | חבילות נופש וטיולים | טוסלי נסיעות",
            description: "מתכננים חופשה ביוון? תכנון טיולים לאתונה, כרתים, רודוס וכל האיים. חבילות נופש, בטן-גב, וטיולים מותאמים אישית. צרו קשר להצעה."
        };
      case "dubai":
        return {
            title: "חופשה בדובאי | דילים ומלונות | טוסלי נסיעות",
            description: "חולמים על חופשה בדובאי? גורדי שחקים, קניוני ענק, אטרקציות ויוקרה. אנו נתכנן לכם חופשה בלתי נשכחת בעיר העתיד. צרו קשר להצעה."
        };
      case "argentina":
        return {
            title: "טיול לארגנטינה | טנגו, בשר ונופים | טוסלי נסיעות",
            description: "מתכננים את הטיול הגדול לארגנטינה? מפטגוניה הקפואה ועד מפלי האיגואסו, תכנון טיולים לבואנוס איירס, ברילוצ'ה ועוד. בואו נבנה יחד את ההרפתקה שלכם."
        };
      case "london":
        return {
            title: "חופשה בלונדון | דילים וטיולים | טוסלי נסיעות",
            description: "חולמים על חופשה בלונדון? מבתי המלוכה ועד השווקים התוססים, תכנון חופשה אורבנית מושלמת. חבילות, מלונות וכרטיסים למחזות זמר. צרו קשר."
        };
      case "paris":
        return {
            title: "חופשה בפריז | חופשה רומנטית בעיר האורות | טוסלי נסיעות",
            description: "פריז, עיר האורות והרומנטיקה, מחכה לכם. תכנון חופשה בפריז כולל המלצות על מלונות, אטרקציות, מסעדות וטיולים. צרו קשר לחופשה פריזאית מושלמת."
        };
      case "sports-packages":
        return {
            title: "חבילות ספורט | כרטיסים למשחקים באירופה | טוסלי נסיעות",
            description: "חולמים לראות את הקבוצה שלכם בלייב? חבילות ספורט למשחקי כדורגל וספורט באירופה, כולל כרטיסים, טיסות ומלונות. צרו קשר והבטיחו את מקומכם ביציע."
        };
      case "concert-packages":
        return {
            title: "חבילות להופעות בחו\"ל | טוסלי נסיעות",
            description: "טוסו לראות את האמנים הגדולים בעולם! חבילות להופעות ופסטיבלים בחו\"ל, כולל כרטיסים, טיסות ומלונות. הבטיחו את מקומכם בחוויה מוזיקלית בלתי נשכחת."
        };
      case "Destinations":
        return {
          title: "יעדים מומלצים לטיולים | טוסלי נסיעות",
          description: "גלו יעדים מומלצים לחופשה הבאה שלכם. מדריכים, טיפים והצעות ליעדים פופולריים כמו איטליה, יוון, תאילנד ועוד."
        };
       case "DestinationDetails":
        return {
          title: "מדריך יעד | טוסלי נסיעות",
          description: "כל מה שצריך לדעת על היעד שבחרתם."
        };
      default:
        return {
          title: "טוסלי נסיעות | תכנון חופשות לחו\"ל",
          description: "החופשה הבאה שלכם מתחילה כאן. תכנון טיולים ודילים מיוחדים לחו\"ל."
        };
    }
  };

  useEffect(() => {
    const setMeta = (property, content, isName = false) => {
      if (!content) return;
      const attribute = isName ? 'name' : 'property';
      let element = document.querySelector(`meta[${attribute}='${property}']`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Only update meta if not on a page that handles it dynamically
    if (currentPageName !== "OfferDetails" && currentPageName !== "SimpleBlogPostPage" && currentPageName !== "DestinationDetails") {
      const { title, description } = getPageMeta(currentPageName);
      document.title = title;

      const pageUrl = window.location.href;
      // A beautiful default image for previews - CHANGED TO LOGO
      const defaultImage = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4dbe46047_logo.jpeg";

      // Standard meta tags
      setMeta('description', description, true);
      
      // Open Graph
      setMeta('og:title', title);
      setMeta('og:description', description);
      setMeta('og:url', pageUrl);
      setMeta('og:site_name', 'טוסלי נסיעות');
      setMeta('og:type', 'website');
      setMeta('og:image', defaultImage);
      setMeta('og:locale', 'he_IL');
      
      // Twitter Card
      setMeta('twitter:card', 'summary_large_image', true);
      setMeta('twitter:title', title, true);
      setMeta('twitter:description', description, true);
      setMeta('twitter:image', defaultImage, true);
    }
  }, [currentPageName, location.pathname]); 

  const navLinks = [
    { to: "Homepage", icon: Home, label: "עמוד הבית" },
    { to: "Deals", icon: Plane, label: "דילים חמים" },
    { to: "PersonalTripPlanning", icon: Briefcase, label: "תכנון אישי" },
    { to: "Destinations", icon: Globe, label: "יעדים" },
    { to: "SimpleBlog", icon: FileText, label: "בלוג" },
    { to: "About", icon: Info, label: "אודות" },
    { to: "Contact", icon: Phone, label: "צרו קשר" },
  ];

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": "טוסלי נסיעות | Tusli Travel",
          "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4dbe46047_logo.jpeg",
          "@id": "https://tusli.co.il",
          "url": "https://tusli.co.il",
          "telephone": "+972504087856",
          "email": "tomer@tuslitravel.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "רחוב שניר 10",
            "addressLocality": "חדרה",
            "addressCountry": "IL"
          },
          "priceRange": "$$",
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "00:00",
              "closes": "23:59"
            }
          ]
        })}}
      />
      <style jsx global>{`
        :root {
          --header-height: 65px; /* Adjust as needed */
        }
        body {
          padding-top: var(--header-height);
        }
        @media (min-width: 768px) { /* md breakpoint */
          body {
            padding-top: 0; /* Remove padding for desktop as header is sticky but not fixed covering content */
          }
        }
      `}</style>
      {/* Header */}
      <header 
        className="bg-white shadow-md z-20 fixed top-0 left-0 right-0 md:static"
        style={{ height: 'var(--header-height)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
          {/* Logo */}
          <Link to={createPageUrl("Homepage")} className="flex items-center space-x-2 space-x-reverse flex-shrink-0">
            <motion.img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4dbe46047_logo.jpeg" 
              alt="Tusli Travel Logo" 
              className="h-10 w-10 rounded-full object-cover" 
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <span className="text-xl font-bold text-slate-800 hidden sm:block">טוסלי נסיעות</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 space-x-reverse items-center">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} icon={link.icon} isActivePage={isActivePage}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-7 w-7 text-slate-700" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm bg-white p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b">
                     <Link to={createPageUrl("Homepage")} className="flex items-center space-x-2 space-x-reverse" onClick={() => setIsMobileMenuOpen(false)}>
                        <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4dbe46047_logo.jpeg" alt="Tusli Travel Logo" className="h-10 w-10 rounded-full object-cover" />
                        <span className="text-xl font-bold text-slate-800">טוסלי נסיעות</span>
                      </Link>
                  </div>
                  <nav className="flex-grow p-6 space-y-3">
                    {navLinks.map((link, index) => (
                       <motion.div 
                        key={link.to}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                       >
                        <SheetClose asChild>
                          <NavLink 
                            to={link.to} 
                            icon={link.icon} 
                            isActivePage={isActivePage}
                            className="text-xl w-full justify-start py-3 px-3 rounded-md"
                          >
                            {link.label}
                          </NavLink>
                        </SheetClose>
                      </motion.div>
                    ))}
                  </nav>
                  <div className="p-6 border-t">
                    <Link to={createPageUrl("Contact")} onClick={() => setIsMobileMenuOpen(false)}>
                       <Button className="w-full bg-teal-600 hover:bg-teal-700 text-lg">
                         <Phone className="ml-2 h-5 w-5"/>
                         דברו איתנו
                       </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <Separator className="bg-slate-200 hidden md:block" />
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y:15 }}
            animate={{ opacity: 1, y:0 }}
            exit={{ opacity: 0, y:15 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1: About & Contact */}
            <div className="space-y-4">
              <Link to={createPageUrl("Homepage")} className="flex items-center space-x-2 space-x-reverse">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4dbe46047_logo.jpeg" 
                  alt="Tusli Travel Logo" 
                  className="h-10 w-10 rounded-full object-cover" 
                />
                <span className="text-xl font-bold text-white">טוסלי נסיעות</span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed">
                סוכנות בוטיק לתכנון טיולים וחופשות בהתאמה אישית. אנו יוצרים חוויות נסיעה בלתי נשכחות עם יחס אישי, שירות מקצועי ומחירים אטרקטיביים.
              </p>
              <div className="space-y-2 pt-2">
                 <p className="text-slate-300 text-sm flex items-center">
                    <Phone className="w-4 h-4 ml-2 text-teal-400" />
                    <a href="tel:+972504087856" className="hover:text-teal-300 transition-colors">050-408-7856</a>
                  </p>
                  <p className="text-slate-300 text-sm flex items-center">
                    <MessageSquare className="w-4 h-4 ml-2 text-teal-400" />
                    <a href="https://wa.me/972504087856" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition-colors">WhatsApp</a>
                  </p>
                  <p className="text-slate-300 text-sm flex items-center">
                    <Mail className="w-4 h-4 ml-2 text-teal-400" />
                    <a href="mailto:tomer@tuslitravel.com" className="hover:text-teal-300 transition-colors">tomer@tuslitravel.com</a>
                  </p>
              </div>
            </div>

            {/* Column 2: Trip Types */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">סוגי טיולים</h3>
              <ul className="space-y-2">
                <li><Link to={createPageUrl("family-trips")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">טיולי משפחות</Link></li>
                <li><Link to={createPageUrl("romantic-vacations")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">חופשות רומנטיות</Link></li>
                <li><Link to={createPageUrl("honeymoon-trips")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">ירח דבש</Link></li>
                <li><Link to={createPageUrl("backpacker-trips")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">טיולי תרמילאים</Link></li>
                <li><Link to={createPageUrl("kosher-vacations")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">חופשות כשרות</Link></li>
                <li><Link to={createPageUrl("luxury-vacations")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">חופשות יוקרה</Link></li>
                <li><Link to={createPageUrl("ski-vacations")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">חופשות סקי</Link></li>
                <li><Link to={createPageUrl("group-tours")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">טיולי קבוצות</Link></li>
              </ul>
            </div>

            {/* Column 3: Destinations & Packages */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">יעדים וחבילות</h3>
              <ul className="space-y-2">
                <li><Link to={createPageUrl("greece")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">יוון</Link></li>
                <li><Link to={createPageUrl("dubai")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">דובאי</Link></li>
                <li><Link to={createPageUrl("london")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">לונדון</Link></li>
                <li><Link to={createPageUrl("paris")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">פריז</Link></li>
                <li><Link to={createPageUrl("argentina")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">ארגנטינה</Link></li>
                <li className="pt-2"><Link to={createPageUrl("sports-packages")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">חבילות ספורט</Link></li>
                <li><Link to={createPageUrl("concert-packages")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">חבילות הופעות</Link></li>
                <li><Link to={createPageUrl("cruises")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">קרוזים ושייט</Link></li>
              </ul>
            </div>

            {/* Column 4: Information & Navigation */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">מידע וניווט</h3>
              <ul className="space-y-2">
                <li><Link to={createPageUrl("Deals")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">דילים חמים</Link></li>
                <li><Link to={createPageUrl("PersonalTripPlanning")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">תכנון טיול אישי</Link></li>
                 <li><Link to={createPageUrl("custom-trip-builder")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">בניית טיול אישי</Link></li>
                <li><Link to={createPageUrl("SimpleBlog")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">הבלוג שלנו</Link></li>
                <li><Link to={createPageUrl("About")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">מי אנחנו</Link></li>
                <li><Link to={createPageUrl("Contact")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">צרו קשר</Link></li>
                <li className="pt-2"><Link to={createPageUrl("Privacy")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">מדיניות פרטיות</Link></li>
                <li><Link to={createPageUrl("Terms")} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">תנאי שימוש</Link></li>
              </ul>
            </div>
          </div>

          <Separator className="bg-slate-700 my-8" />

          <div className="text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} טוסלי נסיעות. כל הזכויות שמורות.
          </div>
        </div>
      </footer>

      {/* Timed Contact Popup */}
      {currentPageName !== 'Contact' && <TimedContactPopup />}
    </div>
  );
}

// Helper component for navigation links
function NavLink({ to, icon: Icon, children, isActivePage, className: propClassName = "" }) { // Added propClassName
  const activeClassName = "text-teal-600 font-semibold bg-teal-50"; // Added bg-teal-50 for active mobile link
  const inactiveClassName = "text-slate-600 hover:text-teal-600 hover:bg-slate-100"; // Added hover:bg-slate-100 for mobile link

  const baseClasses = "flex items-center transition-colors duration-200 ease-in-out";
  const desktopClasses = "text-lg"; // For desktop
  const mobileClasses = "text-xl w-full justify-start py-3 px-3 rounded-md"; // For mobile, taken from existing logic

  // Determine if it's a mobile link context (could be based on a prop or screen size in a real app)
  // For now, we'll assume if propClassName contains 'text-xl' it's mobile-like.
  const isMobileContext = propClassName.includes("text-xl"); 

  const currentActiveClassName = isMobileContext ? `text-teal-600 font-semibold bg-teal-50/80` : "text-teal-600 font-semibold";
  const currentInactiveClassName = isMobileContext ? `text-slate-700 hover:text-teal-700 hover:bg-slate-100/80` : "text-slate-600 hover:text-teal-600";

  const className = isActivePage(to) ? currentActiveClassName : currentInactiveClassName;
  
  return (
    <motion.div
      whileHover={{ x: isActivePage(to) ? 0 : 2 }} // Slight move on hover for non-active links
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link to={createPageUrl(to)} className={`${baseClasses} ${isMobileContext ? mobileClasses : desktopClasses} ${className} ${propClassName}`}>
        {Icon && <Icon className={`h-5 w-5 ${isMobileContext ? 'ml-3' : 'ml-2'}`} />} {/* Adjusted margin for mobile icon */}
        {children}
      </Link>
    </motion.div>
  );
}


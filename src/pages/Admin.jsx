
import React, { useState, useEffect } from 'react';
import { User } from '@/api/entities';
import { Deal } from '@/api/entities';
import { Inquiry } from '@/api/entities';
import { SimpleBlogPost } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Settings, Package, MessageSquare, FileText, PlusCircle, List, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

// Import Admin Components
import DealManagementTab from '../components/admin/DealManagementTab.jsx';
import InquiryManagementTab from '../components/admin/InquiryManagementTab.jsx';
import SimpleBlogManagementTab from '../components/admin/SimpleBlogManagementTab.jsx';

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState(null); // Keep currentUser for display
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin status
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Keep navigate for logout

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const user = await User.me();
        if (user) {
          setCurrentUser(user); // Set currentUser if logged in
          if (user.role === 'admin') {
            setIsAdmin(true); // Set isAdmin to true if user is admin
          }
        }
        // If user is logged in but not admin, isAdmin remains false,
        // and the component will render the permission error.
      } catch (error) {
        // User is not logged in or session expired, redirect to login page.
        // After successful login, they will be redirected back to this Admin page.
        console.error("Error fetching user, initiating login redirect:", error);
        await User.loginWithRedirect(window.location.href);
        return; // Stop further execution until redirection completes
      } finally {
        setIsLoading(false); // Always set loading to false once check is done
      }
    };
    checkAdminStatus();
  }, []); // Empty dependency array means this runs once on mount

  const handleLogout = async () => {
    try {
      await User.logout();
      navigate(createPageUrl('Homepage')); // Redirect to homepage after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-100" dir="rtl">
        <p className="text-xl text-slate-700">טוען נתונים...</p>
      </div>
    );
  }

  // Display permission error if not an admin
  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-100">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-md mx-auto">
           <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
           <h1 className="text-3xl font-bold text-slate-800">אין לך הרשאה</h1>
           <p className="text-slate-600 mt-2 mb-6">
             עליך להתחבר עם חשבון אדמין כדי לגשת לדף זה. ייתכן שאתה מחובר עם חשבון שאינו מורשה.
           </p>
           <Button
            onClick={async () => {
              await User.logout(); // Logout current non-admin user
              await User.loginWithRedirect(window.location.href); // Redirect for a new login
            }}
            className="bg-teal-600 hover:bg-teal-700 text-white"
           >
            התחבר עם חשבון אחר
           </Button>
        </div>
      </div>
    );
  }

  // Admin content is rendered only if isAdmin is true
  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 md:p-8" dir="rtl">
      <header className="mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">לוח בקרה - טוסלי נסיעות</h1>
            {/* Display user's name if available (currentUser would be set if isAdmin is true) */}
            {currentUser && <p className="text-slate-600">ברוך הבא, {currentUser.full_name || currentUser.email}!</p>}
          </div>
          <Button variant="outline" onClick={handleLogout} className="text-red-600 border-red-600 hover:bg-red-50">
            <LogOut className="ml-2 h-5 w-5" />
            התנתק
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <Tabs defaultValue="deals" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-200 p-2 rounded-lg mb-6">
            <TabsTrigger value="deals" className="flex items-center justify-center gap-2 py-3 data-[state=active]:bg-teal-600 data-[state=active]:text-white data-[state=active]:shadow-md">
              <Package className="h-5 w-5" />
              ניהול דילים
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="flex items-center justify-center gap-2 py-3 data-[state=active]:bg-teal-600 data-[state=active]:text-white data-[state=active]:shadow-md">
              <MessageSquare className="h-5 w-5" />
              פניות מלקוחות
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center justify-center gap-2 py-3 data-[state=active]:bg-teal-600 data-[state=active]:text-white data-[state=active]:shadow-md">
              <FileText className="h-5 w-5" />
              ניהול בלוג
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deals">
            <DealManagementTab />
          </TabsContent>
          <TabsContent value="inquiries">
            <InquiryManagementTab />
          </TabsContent>
          <TabsContent value="blog">
            <SimpleBlogManagementTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

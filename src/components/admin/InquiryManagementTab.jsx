import React, { useState, useEffect, useCallback } from 'react';
import { Inquiry } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CheckCircle, XCircle, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

export default function InquiryManagementTab() {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [notification, setNotification] = useState({ type: '', message: '' });

  const inquiryStatuses = ["חדש", "בטיפול", "נענה"];

  const showSuccessNotification = (message) => {
    setNotification({ type: 'success', message });
    setTimeout(() => setNotification({ type: '', message: '' }), 3000);
  };

  const showErrorNotification = (message) => {
    setNotification({ type: 'error', message });
    setTimeout(() => setNotification({ type: '', message: '' }), 3000);
  };

  const loadInquiries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedInquiries = await Inquiry.list('-created_date');
      setInquiries(fetchedInquiries);
    } catch (err) {
      setError('שגיאה בטעינת הפניות: ' + err.message);
      showErrorNotification('שגיאה בטעינת הפניות: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInquiries();
  }, [loadInquiries]);

  const handleStatusChange = async (inquiry, newStatus) => {
    try {
      await Inquiry.update(inquiry.id, { status: newStatus });
      showSuccessNotification("סטטוס הפנייה עודכן בהצלחה!");
      setInquiries(prevInquiries => 
        prevInquiries.map(item => 
          item.id === inquiry.id ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      showErrorNotification("שגיאה בעדכון סטטוס הפנייה: " + err.message);
      console.error("Failed to update inquiry status:", err);
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    if (filter === 'all') return true;
    return inquiry.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center" dir="rtl">
        <h2 className="text-2xl font-bold text-slate-800">פניות מלקוחות</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">סנן לפי סטטוס:</span>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="בחר סטטוס" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">הכל</SelectItem>
              {inquiryStatuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {notification.message && (
        <div className={`p-3 mb-4 rounded-md text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} flex items-center gap-2`} dir="rtl">
          {notification.type === 'success' ? <CheckCircle className="h-5 w-5"/> : <XCircle className="h-5 w-5"/>}
          {notification.message}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4" dir="rtl">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/6"></div>
                  </div>
                  <div className="text-sm text-slate-600 space-y-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/5 pt-1"></div>
                  </div>
                  <div className="mt-3 h-16 bg-gray-100 rounded"></div>
                </div>
                <div className="shrink-0">
                  <div className="h-10 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-600 py-4 bg-red-50 rounded-md" dir="rtl">{error}</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md" dir="rtl">
          {filteredInquiries.length > 0 ? (
            <div className="space-y-4">
              {filteredInquiries.map((inquiry) => (
                <Card key={inquiry.id} className="p-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg font-bold">{inquiry.fullName}</h3>
                        <Badge 
                          className={
                            inquiry.status === "חדש" ? "bg-blue-100 text-blue-800" :
                            inquiry.status === "בטיפול" ? "bg-yellow-100 text-yellow-800" :
                            inquiry.status === "נענה" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {inquiry.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-slate-600 space-y-1">
                        <p><a href={`mailto:${inquiry.email}`} className="hover:underline">{inquiry.email}</a></p>
                        <p><a href={`tel:${inquiry.phone}`} className="hover:underline">{inquiry.phone}</a></p>
                        {inquiry.dealTitle && <p><strong>דיל:</strong> {inquiry.dealTitle}</p>}
                        {inquiry.preferredDepartureDate && <p><strong>תאריך יציאה מועדף:</strong> {format(new Date(inquiry.preferredDepartureDate), 'dd/MM/yyyy', { locale: he })}</p>}
                        {inquiry.preferredReturnDate && <p><strong>תאריך חזרה מועדף:</strong> {format(new Date(inquiry.preferredReturnDate), 'dd/MM/yyyy', { locale: he })}</p>}
                        {inquiry.adultsCount && <p><strong>מבוגרים:</strong> {inquiry.adultsCount}</p>}
                        {inquiry.childrenCount && <p><strong>ילדים:</strong> {inquiry.childrenCount} {inquiry.childrenAges && `(גילאים: ${inquiry.childrenAges})`}</p>}
                        <p className="text-xs text-slate-400 pt-1">
                          {inquiry.created_date ? format(new Date(inquiry.created_date), 'd בMMMM, yyyy HH:mm', { locale: he }) : ''}
                        </p>
                      </div>
                      {inquiry.marketingConsent && (
                          <div className="flex items-center text-xs text-green-600 mt-2">
                            <CheckCircle className="w-3 h-3 ml-1" />
                            <span>מסכים לקבלת דיוור</span>
                          </div>
                        )}
                      <p className="mt-3 whitespace-pre-wrap bg-slate-50 p-3 rounded-md">{inquiry.message || 'אין הודעה נוספת.'}</p>
                    </div>
                    <div className="shrink-0">
                      <DropdownMenu dir="rtl">
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">שנה סטטוס <ChevronDown className="mr-2 h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {inquiryStatuses.map(status => (
                            <DropdownMenuItem key={status} onClick={() => handleStatusChange(inquiry, status)}>
                              {status}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-600 py-8">לא נמצאו פניות התואמות את החיפוש או הסינון.</p>
          )}
        </div>
      )}
    </div>
  );
}
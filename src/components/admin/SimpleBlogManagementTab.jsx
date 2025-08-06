
import React, { useState, useEffect, useCallback } from 'react';
import { SimpleBlogPost } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Edit3, Trash2, Search, AlertTriangle, CheckCircle as CheckIcon, XCircle, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import ImageUploader from './ImageUploader.jsx';
import { createPageUrl } from '@/utils';
import { Badge } from '@/components/ui/badge'; // Added Badge import as it's used in the new post list display

const initialPostState = {
  title: '',
  content: '',
  excerpt: '',
  imageUrl: '',
  slug: '',
  metaTitle: '',
  metaDescription: '',
  published: false,
};

export default function SimpleBlogManagementTab() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(initialPostState);
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [notification, setNotification] = useState({ type: '', message: '' });

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedPosts = await SimpleBlogPost.list('-created_date');
      setPosts(fetchedPosts);
    } catch (err) {
      setError('שגיאה בטעינת הפוסטים: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleInputChange = (field, value) => {
    let newPost = { ...currentPost, [field]: value };
    if (field === 'title' && !isEditing && !newPost.slug) { // Auto-generate slug only for new posts and if slug is empty
      newPost.slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    setCurrentPost(newPost);
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };
  
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: '', message: '' }), 4000);
  };

  const validateForm = () => {
    const errors = {};
    if (!currentPost.title.trim()) errors.title = 'כותרת הפוסט היא שדה חובה.';
    if (!currentPost.content.trim()) errors.content = 'תוכן הפוסט הוא שדה חובה.';
    if (!currentPost.slug.trim()) errors.slug = 'מזהה URL (Slug) הוא שדה חובה.';
    else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(currentPost.slug)) errors.slug = 'מזהה URL יכול להכיל רק אותיות קטנות באנגלית, מספרים ומקפים.';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    try {
      if (isEditing && currentPost.id) {
        await SimpleBlogPost.update(currentPost.id, currentPost);
        showNotification('success', 'הפוסט עודכן בהצלחה!');
      } else {
        await SimpleBlogPost.create(currentPost);
        showNotification('success', 'הפוסט נוצר בהצלחה!');
      }
      setIsFormOpen(false); // Close the form after successful submission
      fetchPosts();
    } catch (err) {
      showNotification('error', 'שגיאה בשמירת הפוסט: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Modified handleEditPost to handle both new and existing posts
  const handleEditPost = (post) => {
    if (post) { // Editing existing post
      setIsEditing(true);
      setCurrentPost({ ...initialPostState, ...post }); // Ensure initialPostState props are present
    } else { // Adding new post
      setIsEditing(false);
      setCurrentPost(initialPostState);
    }
    setFormErrors({}); // Clear form errors
    setIsFormOpen(true); // Open the dialog
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את הפוסט הזה?')) {
      setIsLoading(true);
      try {
        await SimpleBlogPost.delete(postId);
        showNotification('success', 'הפוסט נמחק בהצלחה!');
        fetchPosts();
      } catch (err) {
        showNotification('error', 'שגיאה במחיקת הפוסט: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6"> {/* Main container with spacing */}
      {/* Header section */}
      <div className="flex flex-row items-center justify-between pb-3 bg-white rounded-t-lg p-5 border-b shadow-md">
        <h2 className="text-2xl font-bold text-slate-800">ניהול בלוג</h2>
        <Button onClick={() => handleEditPost(null)} className="bg-teal-600 hover:bg-teal-700 shadow-md">
          <PlusCircle className="ml-2 h-5 w-5" /> {/* ml-2 places icon to the right of RTL text */}
          הוסף פוסט חדש
        </Button>
      </div>

      <div className="p-5 bg-white rounded-lg shadow-md"> {/* Content area for search, notifications, and post list */}
        {notification.message && (
          <div className={`p-3 mb-5 rounded-md text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} flex items-center gap-2 shadow`}>
            {notification.type === 'success' ? <CheckIcon className="h-5 w-5"/> : <XCircle className="h-5 w-5"/>}
            {notification.message}
          </div>
        )}
        <div className="mb-6 relative">
          <Search className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="חפש פוסטים לפי כותרת..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 text-right h-11 rounded-md border-slate-300 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>

        {isLoading && <p className="text-center text-slate-600 py-6 text-lg">טוען פוסטים...</p>}
        {error && <p className="text-center text-red-600 py-6 bg-red-50 rounded-md border border-red-200">{error}</p>}
        
        {!isLoading && !error && filteredPosts.length === 0 && (
          <p className="text-center text-slate-500 py-10 text-xl">לא נמצאו פוסטים. נסו להוסיף פוסט חדש!</p>
        )}

        {!isLoading && !error && filteredPosts.length > 0 && (
          <div className="space-y-4"> {/* Container for the list of post cards */}
            <h3 className="text-xl font-semibold mb-4 text-slate-700 text-right">פוסטים קיימים</h3>
            {filteredPosts.map((post) => (
              <Card key={post.id} className="flex items-start p-4 gap-4 shadow-sm border border-slate-200">
                 {/* Image on the left, consistent with modern RTL UIs for cards */}
                 <img 
                    src={post.imageUrl || 'https://via.placeholder.com/150'} 
                    alt={post.title} 
                    className="w-32 h-32 object-cover rounded-md flex-shrink-0" 
                 />
                <div className="flex-grow text-right"> {/* Align text content to the right */}
                  <h4 className="text-lg font-bold text-slate-800">{post.title}</h4>
                   <Badge variant={post.published ? "default" : "destructive"} className={`${post.published ? 'bg-green-500' : 'bg-red-500'} text-white mt-1`}>
                    {post.published ? 'מפורסם' : 'טיוטה'}
                  </Badge>
                  <p className="text-sm text-slate-600 line-clamp-2 mt-2">
                    {post.excerpt || (post.content ? post.content.substring(0, 150) + '...' : 'אין תקציר.')}
                  </p>
                  {post.published && post.slug && (
                    <a href={createPageUrl(`SimpleBlogPostPage/${post.slug}`)} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 hover:underline mt-2 inline-flex items-center">
                      <ExternalLink className="h-4 w-4 ml-1" /> {/* ml-1 places icon to the right of RTL text */}
                      צפה בפוסט
                    </a>
                  )}
                </div>
                <div className="flex flex-col gap-2 self-center shrink-0">
                  <Button variant="outline" size="sm" onClick={() => handleEditPost(post)} className="flex items-center justify-end"> {/* Align button text to the right */}
                     <Edit3 className="ml-1 h-4 w-4" /> {/* ml-1 places icon to the right of RTL text */}
                    ערוך
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post.id)} className="flex items-center justify-end">
                     <Trash2 className="ml-1 h-4 w-4" /> {/* ml-1 places icon to the right of RTL text */}
                    מחק
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl"> {/* dir="rtl" for RTL layout */}
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="text-2xl font-semibold text-slate-800">{isEditing ? 'ערוך פוסט' : 'הוסף פוסט חדש'}</DialogTitle>
          </DialogHeader>
          {/* Scrollable div for form content */}
          <div className="max-h-[70vh] overflow-y-auto p-1 pr-4"> 
            <form onSubmit={handleSubmit} className="space-y-5 p-1 pt-5">
              <div>
                <Label htmlFor="post-title" className="font-medium text-slate-700">כותרת הפוסט *</Label>
                <Input id="post-title" value={currentPost.title} onChange={(e) => handleInputChange('title', e.target.value)} className={`mt-1.5 h-11 rounded-md text-right ${formErrors.title ? 'border-red-500' : 'border-slate-300'}`} />
                {formErrors.title && <p className="text-red-500 text-sm mt-1 text-right">{formErrors.title}</p>}
              </div>
              
              <div>
                <Label htmlFor="post-slug" className="font-medium text-slate-700">מזהה URL (Slug) *</Label>
                <Input id="post-slug" value={currentPost.slug} onChange={(e) => handleInputChange('slug', e.target.value)} placeholder="auto-generated-from-title" className={`mt-1.5 h-11 rounded-md text-right ${formErrors.slug ? 'border-red-500' : 'border-slate-300'}`} />
                {formErrors.slug && <p className="text-red-500 text-sm mt-1 text-right">{formErrors.slug}</p>}
                <p className="text-xs text-slate-500 mt-1 text-right">אותיות קטנות באנגלית, מספרים ומקפים (-). אם נשאר ריק, ייווצר אוטומטית מהכותרת.</p>
              </div>

              <div>
                <Label htmlFor="post-content" className="font-medium text-slate-700">תוכן הפוסט (תומך Markdown) *</Label>
                <Textarea id="post-content" value={currentPost.content} onChange={(e) => handleInputChange('content', e.target.value)} placeholder="כתוב את תוכן הפוסט כאן..." rows={12} className={`mt-1.5 rounded-md text-right ${formErrors.content ? 'border-red-500' : 'border-slate-300'}`}/>
                {formErrors.content && <p className="text-red-500 text-sm mt-1 text-right">{formErrors.content}</p>}
              </div>

              <div>
                <Label htmlFor="post-excerpt" className="font-medium text-slate-700">תקציר (אופציונלי)</Label>
                <Textarea id="post-excerpt" value={currentPost.excerpt} onChange={(e) => handleInputChange('excerpt', e.target.value)} placeholder="תקציר קצר לתצוגה ברשימת הפוסטים (עד 160 תווים מומלץ)" rows={3} className="mt-1.5 rounded-md border-slate-300 text-right"/>
              </div>
              
              <ImageUploader
                label="תמונה ראשית (אופציונלי)"
                currentImageUrl={currentPost.imageUrl}
                onImageUpload={(url) => handleInputChange('imageUrl', url)}
              />

              <div className="border-t pt-5 space-y-3">
                  <h3 className="text-lg font-medium text-slate-700 text-right">הגדרות SEO (אופציונלי)</h3>
                  <div>
                    <Label htmlFor="post-metaTitle" className="font-medium text-slate-600">כותרת מטא</Label>
                    <Input id="post-metaTitle" value={currentPost.metaTitle} onChange={(e) => handleInputChange('metaTitle', e.target.value)} className="mt-1.5 h-11 rounded-md border-slate-300 text-right" placeholder="כותרת לדפדפן ולמנועי חיפוש"/>
                  </div>
                  <div>
                    <Label htmlFor="post-metaDescription" className="font-medium text-slate-600">תיאור מטא</Label>
                    <Textarea id="post-metaDescription" value={currentPost.metaDescription} onChange={(e) => handleInputChange('metaDescription', e.target.value)} rows={2} className="mt-1.5 rounded-md border-slate-300 text-right" placeholder="תיאור קצר למנועי חיפוש (עד 160 תווים)"/>
                  </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse pt-3"> {/* space-x-reverse for RTL layout of checkbox and label */}
                <Checkbox id="post-published" checked={currentPost.published} onCheckedChange={(checked) => handleInputChange('published', Boolean(checked))} className="w-5 h-5"/>
                <Label htmlFor="post-published" className="font-medium text-slate-700 cursor-pointer text-base">פרסם פוסט</Label>
              </div>
              
              <DialogFooter className="pt-8">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="h-11 rounded-md px-6">ביטול</Button>
                </DialogClose>
                <Button type="submit" disabled={isLoading} className="bg-teal-600 hover:bg-teal-700 h-11 rounded-md px-6 shadow-sm">
                  {isLoading ? (isEditing ? 'מעדכן...' : 'יוצר...') : (isEditing ? 'שמור שינויים' : 'צור פוסט')}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

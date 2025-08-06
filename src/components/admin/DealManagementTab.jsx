
import React, { useState, useEffect } from 'react';
import { Deal } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Save, X, Calendar, MapPin, DollarSign, Image as ImageIcon, ListPlus, PlusCircle, Check } from 'lucide-react';
import ImageUploader from './ImageUploader.jsx';
import MultiImageUploader from './MultiImageUploader.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';


const commonInclusionsPresets = [
  "טיסות הלוך ושוב",
  "מלון ברמה נבחרת",
  "ארוחת בוקר",
  "העברות משדה התעופה למלון וחזרה",
  "כבודה (מזוודה/טרולי)",
  "ביטוח רפואי בסיסי"
];

const commonExclusionsPresets = [
  "ארוחות נוספות (צהריים/ערב)",
  "ביטוח נסיעות מורחב",
  "הוצאות אישיות",
  "טיפים",
  "מס עירוני (אם קיים, לתשלום במלון)"
];


export default function DealManagementTab() {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingDeal, setEditingDeal] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Renamed from isFormOpen to better reflect dialog state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    destination: '',
    price: '',
    currency: '₪',
    pricePerPerson: true,
    inclusions: [''],
    exclusions: [''],
    imageUrl: '',
    imageGallery: [],
    category: '',
    featured: false,
    slug: '',
    metaTitle: '',
    metaDescription: '',
    active: true,
    availableDateRanges: [{ startDate: '', endDate: '', description: '' }]
  });

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    setIsLoading(true);
    try {
      const fetchedDeals = await Deal.list('-created_date');
      setDeals(fetchedDeals);
    } catch (error) {
      console.error('Error loading deals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) || '' : value)
    }));
  };

  const handleSelectChange = (value, field) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (index, value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), field === 'availableDateRanges' ? { startDate: '', endDate: '', description: '' } : '']
    }));
  };

  const removeArrayItem = (index, field) => {
    setFormData(prev => {
      const newList = prev[field].filter((_, i) => i !== index);
      // Ensure there's always at least one empty string if the list becomes empty (for inclusions/exclusions)
      if ((field === 'inclusions' || field === 'exclusions') && newList.length === 0) {
        return { ...prev, [field]: [''] };
      }
      return { ...prev, [field]: newList };
    });
  };
  
  const addPresetToField = (field, presetValue) => {
    setFormData(prev => {
      const currentItems = prev[field] ? [...prev[field]] : [''];
      // Filter out empty strings before checking for existence, but keep them for the update logic
      const existingNonEmptyItems = currentItems.filter(item => item && item.trim() !== '');
  
      if (existingNonEmptyItems.includes(presetValue)) {
        return { ...prev }; // Preset already exists
      }
  
      // Find the first empty string slot to replace
      const emptySlotIndex = currentItems.findIndex(item => item !== undefined && item.trim() === '');
  
      let updatedItems;
      if (emptySlotIndex !== -1) {
        updatedItems = [...currentItems];
        updatedItems[emptySlotIndex] = presetValue;
        // If the last item was replaced and it wasn't the only empty slot, add a new empty one
        if (emptySlotIndex === updatedItems.length - 1 && updatedItems.filter(item => item !== undefined && item.trim() === '').length === 0) {
            updatedItems.push('');
        } else if (emptySlotIndex !== updatedItems.length - 1 && updatedItems.filter(item => item !== undefined && item.trim() === '').length === 0) {
            updatedItems.push('');
        }
      } else {
        // If no empty slot, add the preset and a new empty slot
        updatedItems = [...existingNonEmptyItems, presetValue, ''];
      }
      
      return { ...prev, [field]: updatedItems };
    });
  };


  const handleDateRangeChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      availableDateRanges: prev.availableDateRanges.map((range, i) => 
        i === index ? { ...range, [field]: value } : range
      )
    }));
  };

  const generateSlug = (title) => {
    if (!title) return '';
    return title
      .toLowerCase()
      .replace(/[א-ת\s]+/g, '-') // Replace Hebrew and spaces with a single dash
      .replace(/[^a-z0-9-]/g, '') // Remove non-alphanumeric chars except dash
      .replace(/-+/g, '-') // Replace multiple dashes with single
      .replace(/^-+|-+$/g, ''); // Trim dashes from start/end
  };
  
  useEffect(() => {
    // Auto-generate slug only for new deals when title is typed and slug is empty
    if (!editingDeal && formData.title && !formData.slug) {
        const newSlug = generateSlug(formData.title);
        setFormData(prev => ({ ...prev, slug: newSlug }));
    }
  }, [formData.title]); // Dependency on formData.title to re-run when title changes


  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      shortDescription: '',
      destination: '',
      price: '',
      currency: '₪',
      pricePerPerson: true,
      inclusions: [''],
      exclusions: [''],
      imageUrl: '',
      imageGallery: [],
      category: '',
      featured: false,
      slug: '',
      metaTitle: '',
      metaDescription: '',
      active: true,
      availableDateRanges: [{ startDate: '', endDate: '', description: '' }]
    });
    setEditingDeal(null);
    setIsEditing(false); // Close the dialog
  };

  const handleEditDeal = (deal) => { // Renamed from handleEdit
    if (deal) { // If a deal object is passed, it's an edit operation
      setEditingDeal(deal);
      setFormData({
        title: deal.title || '',
        description: deal.description || '',
        shortDescription: deal.shortDescription || '',
        destination: deal.destination || '',
        price: deal.price || '',
        currency: deal.currency || '₪',
        pricePerPerson: deal.pricePerPerson !== undefined ? deal.pricePerPerson : true,
        inclusions: (deal.inclusions && deal.inclusions.length > 0) ? [...deal.inclusions, ''] : [''], // Add an empty string for new input
        exclusions: (deal.exclusions && deal.exclusions.length > 0) ? [...deal.exclusions, ''] : [''], // Add an empty string for new input
        imageUrl: deal.imageUrl || '',
        imageGallery: deal.imageGallery || [],
        category: deal.category || '',
        featured: deal.featured || false,
        slug: deal.slug || '',
        metaTitle: deal.metaTitle || '',
        metaDescription: deal.metaDescription || '',
        active: deal.active !== undefined ? deal.active : true,
        availableDateRanges: (deal.availableDateRanges && deal.availableDateRanges.length > 0) 
          ? deal.availableDateRanges 
          : [{ startDate: '', endDate: '', description: '' }]
      });
    } else { // If no deal object, it's a new deal operation
      resetForm(); // Reset form for new entry (also sets editingDeal to null and closes dialog)
    }
    setIsEditing(true); // Open the dialog
  };
  
  const handleSaveDeal = async (e) => { // Renamed from handleSubmit
    e.preventDefault();
    setIsLoading(true); // Indicate loading during submit
  
    const finalSlug = formData.slug || generateSlug(formData.title);
    const dataToSave = {
      ...formData,
      slug: finalSlug,
      price: formData.price ? parseFloat(formData.price) : null, // Ensure price is a number or null
      // Filter out empty strings from inclusions/exclusions before saving
      inclusions: (formData.inclusions || []).filter(item => item && item.trim() !== ''),
      exclusions: (formData.exclusions || []).filter(item => item && item.trim() !== ''),
      availableDateRanges: (formData.availableDateRanges || []).filter(range => range.startDate && range.endDate)
    };
  
    try {
      if (editingDeal) {
        await Deal.update(editingDeal.id, dataToSave);
      } else {
        await Deal.create(dataToSave);
      }
      resetForm(); // This will also close the dialog via setIsEditing(false)
      loadDeals(); // Reload deals to show changes
    } catch (error) {
      console.error('Error saving deal:', error);
      alert('שגיאה בשמירת הדיל: ' + error.message); // Provide user feedback
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleDeleteDeal = async (dealId) => { // Renamed from handleDelete
    if (window.confirm('האם אתה בטוח שברצונך למחוק את הדיל הזה? לא ניתן לשחזר פעולה זו.')) {
      setIsLoading(true);
      try {
        await Deal.delete(dealId);
        loadDeals(); // Refresh the list
      } catch (error) {
        console.error('Error deleting deal:', error);
        // Optionally: show an error message to the user
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">ניהול דילים</h2>
        <Button onClick={() => handleEditDeal(null)} className="bg-teal-600 hover:bg-teal-700">
          <PlusCircle className="ml-2 h-5 w-5" />
          הוסף דיל חדש
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-slate-600">טוען דילים...</div>
      ) : deals.length === 0 ? (
        <p className="text-slate-500 text-center py-10">לא נמצאו דילים. לחץ על "הוסף דיל חדש" כדי להתחיל.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-slate-700">דילים קיימים</h3>
          <div className="space-y-4">
            {deals.map(deal => (
              <Card key={deal.id} className="flex flex-col md:flex-row items-start p-4 gap-4">
                <img src={deal.imageUrl || 'https://via.placeholder.com/150'} alt={deal.title} className="w-full md:w-48 h-48 md:h-auto object-cover rounded-md" />
                <div className="flex-grow">
                  <h4 className="text-lg font-bold">{deal.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-slate-500 my-2">
                    <MapPin className="w-4 h-4" />
                    <span>{deal.destination}</span>
                    <Badge variant={deal.active ? "default" : "destructive"} className={`${deal.active ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                      {deal.active ? 'פעיל' : 'לא פעיל'}
                    </Badge>
                    {deal.featured && <Badge className="bg-yellow-400 text-black">מובלט</Badge>}
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                    {deal.shortDescription || deal.description?.substring(0,100) + "..."}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
                    {deal.inclusions?.map((item, i) => (
                        <span key={i} className="flex items-center"><Check className="w-3 h-3 text-green-500 ml-1" />{item}</span>
                    ))}
                  </div>
                </div>
                <div className="flex md:flex-col gap-2 self-start md:self-center shrink-0">
                  <Button variant="outline" size="sm" onClick={() => handleEditDeal(deal)}>
                    <Edit className="ml-1 h-4 w-4" /> ערוך
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteDeal(deal.id)}>
                    <Trash2 className="ml-1 h-4 w-4" /> מחק
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {isEditing && (
        <Dialog open={isEditing} onOpenChange={resetForm}>
          <DialogContent className="max-w-3xl" dir="rtl">
            <DialogHeader>
              <DialogTitle>{editingDeal ? 'עריכת דיל' : 'הוספת דיל חדש'}</DialogTitle>
            </DialogHeader>
            <div className="max-h-[80vh] overflow-y-auto p-1 pr-4">
              <form onSubmit={handleSaveDeal} className="space-y-4">
                <Tabs defaultValue="basic" dir="rtl">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
                    <TabsTrigger value="basic">מידע בסיסי</TabsTrigger>
                    <TabsTrigger value="content">תוכן</TabsTrigger>
                    <TabsTrigger value="dates">תאריכים</TabsTrigger>
                    <TabsTrigger value="seo">SEO ומדיה</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">כותרת הדיל *</Label>
                        <Input id="title" value={formData.title} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <Label htmlFor="destination">יעד *</Label>
                        <Input id="destination" value={formData.destination} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="shortDescription">תיאור קצר (לרשימות)</Label>
                      <Textarea id="shortDescription" value={formData.shortDescription} onChange={handleInputChange} rows={2} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="price">מחיר (החל מ-)</Label>
                            <Input id="price" type="number" value={formData.price} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="currency">מטבע</Label>
                            <Select value={formData.currency} onValueChange={(value) => handleSelectChange(value, 'currency')}>
                                <SelectTrigger><SelectValue placeholder="בחר מטבע" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="₪">₪ (ש"ח)</SelectItem>
                                    <SelectItem value="$">$ (דולר)</SelectItem>
                                    <SelectItem value="€">€ (אירו)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end">
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <Checkbox id="pricePerPerson" checked={formData.pricePerPerson} onCheckedChange={(checked) => setFormData(prev => ({...prev, pricePerPerson: checked}))} />
                                <Label htmlFor="pricePerPerson" className="cursor-pointer">המחיר הוא לאדם</Label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="category">קטגוריה</Label>
                        <Select value={formData.category} onValueChange={(value) => handleSelectChange(value, 'category')}>
                            <SelectTrigger><SelectValue placeholder="בחר קטגוריה" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="חופש">חופש</SelectItem>
                                <SelectItem value="עיר">טיולי עיר</SelectItem>
                                <SelectItem value="הרפתקאות">הרפתקאות</SelectItem>
                                <SelectItem value="תרבות">תרבות</SelectItem>
                                <SelectItem value="רומנטי">רומנטי</SelectItem>
                                <SelectItem value="משפחתי">משפחתי</SelectItem>
                                <SelectItem value="יוקרה">יוקרה</SelectItem>
                                <SelectItem value="קרוז">קרוז</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-4 space-x-reverse pt-2">
                        <div className="flex items-center space-x-2 space-x-reverse">
                            <Checkbox id="featured" checked={formData.featured} onCheckedChange={(checked) => setFormData(prev => ({...prev, featured: checked}))} />
                            <Label htmlFor="featured" className="cursor-pointer">דיל מובלט</Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                            <Checkbox id="active" checked={formData.active} onCheckedChange={(checked) => setFormData(prev => ({...prev, active: checked}))} />
                            <Label htmlFor="active" className="cursor-pointer">פעיל</Label>
                        </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="content" className="space-y-4">
                    <div>
                      <Label htmlFor="description">תיאור מלא של הדיל (תומך Markdown)</Label>
                      <Textarea id="description" value={formData.description} onChange={handleInputChange} rows={6} />
                      <p className="text-xs text-slate-500 mt-1">ניתן להשתמש בתחביר Markdown לעיצוב טקסט, כגון **טקסט מודגש**, *טקסט נטוי*, רשימות ועוד.</p>
                    </div>
                    
                    {/* Inclusions */}
                    <div>
                      <Label>מה כלול בדיל</Label>
                      <div className="mt-1 space-y-2">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {commonInclusionsPresets.map(preset => (
                            <Button key={preset} type="button" variant="outline" size="sm" onClick={() => addPresetToField('inclusions', preset)}>
                              <Plus className="ml-1 h-4 w-4"/> {preset}
                            </Button>
                          ))}
                        </div>
                        {(formData.inclusions || ['']).map((inclusion, index) => (
                          <div key={`inclusion-${index}`} className="flex items-center gap-2">
                            <Input
                              value={inclusion}
                              onChange={(e) => handleArrayChange(index, e.target.value, 'inclusions')}
                              placeholder="לדוגמה: טיסות הלוך ושוב"
                            />
                            {formData.inclusions.length > 1 && (
                              <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(index, 'inclusions')} className="text-red-500 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('inclusions')}>
                          <Plus className="ml-1 h-4 w-4" /> הוסף פריט
                        </Button>
                      </div>
                    </div>

                    {/* Exclusions */}
                    <div>
                      <Label>מה לא כלול בדיל</Label>
                      <div className="mt-1 space-y-2">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {commonExclusionsPresets.map(preset => (
                            <Button key={preset} type="button" variant="outline" size="sm" onClick={() => addPresetToField('exclusions', preset)}>
                              <Plus className="ml-1 h-4 w-4"/> {preset}
                            </Button>
                          ))}
                        </div>
                        {(formData.exclusions || ['']).map((exclusion, index) => (
                          <div key={`exclusion-${index}`} className="flex items-center gap-2">
                            <Input
                              value={exclusion}
                              onChange={(e) => handleArrayChange(index, e.target.value, 'exclusions')}
                              placeholder="לדוגמה: ביטוח נסיעות"
                            />
                            {formData.exclusions.length > 1 && (
                              <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(index, 'exclusions')} className="text-red-500 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('exclusions')}>
                          <Plus className="ml-1 h-4 w-4" /> הוסף פריט
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="dates" className="space-y-4">
                    <Label>טווחי תאריכים זמינים (אופציונלי)</Label>
                    {(formData.availableDateRanges || [{ startDate: '', endDate: '', description: '' }]).map((range, index) => (
                      <Card key={index} className="p-4 space-y-3 bg-slate-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`startDate-${index}`}>תאריך התחלה</Label>
                            <Input 
                              type="date" 
                              id={`startDate-${index}`} 
                              value={range.startDate} 
                              onChange={(e) => handleDateRangeChange(index, 'startDate', e.target.value)} 
                            />
                          </div>
                          <div>
                            <Label htmlFor={`endDate-${index}`}>תאריך סיום</Label>
                            <Input 
                              type="date" 
                              id={`endDate-${index}`} 
                              value={range.endDate} 
                              onChange={(e) => handleDateRangeChange(index, 'endDate', e.target.value)} 
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor={`dateDescription-${index}`}>תיאור לטווח (לדוגמה: 'חגי תשרי')</Label>
                          <Input 
                            id={`dateDescription-${index}`} 
                            value={range.description} 
                            onChange={(e) => handleDateRangeChange(index, 'description', e.target.value)} 
                          />
                        </div>
                        {formData.availableDateRanges.length > 1 && (
                          <Button type="button" variant="link" size="sm" onClick={() => removeArrayItem(index, 'availableDateRanges')} className="text-red-500 p-0">
                            הסר טווח תאריכים
                          </Button>
                        )}
                      </Card>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('availableDateRanges')}>
                      <Plus className="ml-1 h-4 w-4" /> הוסף טווח תאריכים
                    </Button>
                  </TabsContent>

                  <TabsContent value="seo" className="space-y-4">
                    <div>
                      <Label htmlFor="slug">כתובת URL ידידותית (Slug)</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input 
                          id="slug" 
                          value={formData.slug} 
                          onChange={(e) => setFormData(prev => ({...prev, slug: generateSlug(e.target.value)}))} 
                          placeholder="לדוגמה: paris-romantic-getaway" 
                          className="text-left" // Ensure text alignment is LTR
                          dir="ltr" // Explicitly set direction for the input
                        />
                        <Button type="button" variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, slug: generateSlug(prev.title) }))}>
                          ייצר אוטומטית
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">השתמש באותיות קטנות באנגלית, מספרים ומקפים (-). אם השדה ריק, ה-slug ייווצר אוטומטית מהכותרת.</p>
                    </div>
                    <div>
                      <Label htmlFor="metaTitle">כותרת SEO (Meta Title)</Label>
                      <Input id="metaTitle" value={formData.metaTitle} onChange={handleInputChange} placeholder="כותרת שתופיע בגוגל (עד 60 תווים מומלץ)" />
                    </div>
                    <div>
                      <Label htmlFor="metaDescription">תיאור SEO (Meta Description)</Label>
                      <Textarea id="metaDescription" value={formData.metaDescription} onChange={handleInputChange} rows={2} placeholder="תיאור קצר שיופיע בגוגל (עד 160 תווים מומלץ)" />
                    </div>
                    <div>
                        <Label>תמונה ראשית</Label>
                        <ImageUploader
                            currentImageUrl={formData.imageUrl}
                            onImageUpload={(url) => setFormData(prev => ({...prev, imageUrl: url}))}
                            onImageRemove={() => setFormData(prev => ({...prev, imageUrl: ''}))}
                        />
                    </div>
                    <div>
                        <Label>גלריית תמונות נוספות</Label>
                        <MultiImageUploader
                            currentImageUrls={formData.imageGallery}
                            onImagesUpload={(urls) => setFormData(prev => ({...prev, imageGallery: [...prev.imageGallery, ...urls]}))}
                            onImageRemove={(urlToRemove) => setFormData(prev => ({...prev, imageGallery: prev.imageGallery.filter(url => url !== urlToRemove)}))}
                        />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={resetForm}>ביטול</Button>
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                    <Save className="ml-2 h-5 w-5" />
                    {editingDeal ? 'שמור שינויים' : 'צור דיל'}
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

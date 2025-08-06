import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UploadFile } from '@/api/integrations';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

export default function MultiImageUploader({ 
  currentImageUrls = [], 
  onImagesUpload, 
  onImageRemove,
  label = "תמונות נוספות"
}) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadPromises = files.map(file => UploadFile({ file }));
      const results = await Promise.all(uploadPromises);
      const urls = results.map(result => result.file_url);
      
      if (onImagesUpload) {
        onImagesUpload(urls);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('שגיאה בהעלאת התמונות: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (urlToRemove) => {
    if (onImageRemove) {
      onImageRemove(urlToRemove);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {currentImageUrls.map((url, index) => (
          <Card key={index} className="relative p-2 group">
            <img 
              src={url} 
              alt={`תמונה ${index + 1}`} 
              className="w-full h-24 object-cover rounded-md"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
              onClick={() => handleRemove(url)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Card>
        ))}
        
        <Card className="border-dashed border-2 border-slate-300 hover:border-slate-400 transition-colors">
          <label className="flex flex-col items-center justify-center h-24 cursor-pointer text-slate-500 hover:text-slate-600">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-500"></div>
                <span className="text-xs mt-1">מעלה...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="h-6 w-6 mb-1" />
                <span className="text-xs">הוסף תמונות</span>
              </div>
            )}
          </label>
        </Card>
      </div>
      
      <p className="text-xs text-slate-500">
        ניתן לבחור מספר תמונות בבת אחת. התמונות יתווספו לגלריה הקיימת.
      </p>
    </div>
  );
}
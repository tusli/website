import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadFile } from '@/api/integrations';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export default function ImageUploader({ 
  label, 
  currentImageUrl, 
  onImageUpload, 
  placeholder = "העלו תמונה או הכניסו קישור",
  className = ""
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [manualUrl, setManualUrl] = useState(currentImageUrl || '');
  const [uploadError, setUploadError] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('אנא בחרו קובץ תמונה בלבד');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('גודל הקובץ לא יכול לעלות על 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      const result = await UploadFile({ file });
      if (result && result.file_url) {
        setManualUrl(result.file_url);
        onImageUpload(result.file_url);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError('שגיאה בהעלאת הקובץ. אנא נסו שוב.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleManualUrlChange = (url) => {
    setManualUrl(url);
    onImageUpload(url);
  };

  const clearImage = () => {
    setManualUrl('');
    onImageUpload('');
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <Label className="font-medium text-slate-700">{label}</Label>
      
      {/* Current Image Preview */}
      {manualUrl && (
        <div className="relative inline-block">
          <img 
            src={manualUrl} 
            alt="תצוגה מקדימה" 
            className="w-32 h-32 object-cover rounded-lg border shadow-sm"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
            onClick={clearImage}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* Upload Section */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* File Upload Button */}
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          <Button
            type="button"
            variant="outline"
            disabled={isUploading}
            className="w-full sm:w-auto"
          >
            <Upload className="ml-2 h-4 w-4" />
            {isUploading ? 'מעלה...' : 'העלו תמונה'}
          </Button>
        </div>

        <span className="text-slate-500 self-center">או</span>

        {/* Manual URL Input */}
        <Input
          type="url"
          placeholder={placeholder}
          value={manualUrl}
          onChange={(e) => handleManualUrlChange(e.target.value)}
          className="flex-1"
        />
      </div>

      {/* Error Message */}
      {uploadError && (
        <p className="text-red-600 text-sm">{uploadError}</p>
      )}

      {/* Help Text */}
      <p className="text-xs text-slate-500">
        קבצים נתמכים: JPG, PNG, GIF. גודל מקסימלי: 5MB
      </p>
    </div>
  );
}
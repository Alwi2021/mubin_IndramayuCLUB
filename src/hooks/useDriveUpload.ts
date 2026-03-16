import { useState } from 'react';

export const useDriveUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadToDrive = async (content: any, type: 'comment' | 'photo') => {
    setIsUploading(true);
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "Indramayuclubmakrifat@gmail.com";
    console.log(`Nur 1: Menghubungkan ke ${adminEmail}...`);
    
    try {
      const res = await fetch('/api/drive/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          content: typeof content === 'string' ? content : JSON.stringify(content), 
          fileName: `Nur1-${type}-${Date.now()}.md` 
        })
      });
      const data = await res.json();
      setIsUploading(false);
      return data;
    } catch (error) {
      console.error("Drive Upload Error:", error);
      setIsUploading(false);
      return { success: false, error };
    }
  };

  return { uploadToDrive, isUploading };
};

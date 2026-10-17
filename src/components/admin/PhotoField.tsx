import React, { useState } from 'react';
import { supabase, PHOTO_BUCKET } from '../../lib/supabase';
import { resizeImage } from '../../lib/imageResize';
import { ImagePlus } from 'lucide-react';

interface Props {
  id: string;
  value: string | null;
  onChange: (url: string | null) => void;
  onError: (msg: string) => void;
}

/** Photo picker: shrinks the picture, uploads it to Supabase Storage, returns the public link. */
export const PhotoField: React.FC<Props> = ({ id, value, onChange, onError }) => {
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File | undefined) => {
    if (!file || !supabase) return;
    setUploading(true);
    try {
      const blob = await resizeImage(file);
      const path = `${id}-${Date.now()}.jpg`;
      const { error } = await supabase.storage.from(PHOTO_BUCKET).upload(path, blob, { contentType: 'image/jpeg', upsert: true });
      if (error) throw error;
      onChange(supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl);
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Photo upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="w-32 h-24 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
        {value ? <img src={value} alt="" className="w-full h-full object-cover" /> : <ImagePlus className="w-7 h-7 text-slate-400" />}
      </div>
      <div className="space-y-2">
        <label className="inline-block px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold cursor-pointer">
          {uploading ? 'Uploading...' : value ? 'Change photo' : 'Choose photo'}
          <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => upload(e.target.files?.[0])} />
        </label>
        {value && <button type="button" onClick={() => onChange(null)} className="block text-xs text-red-600 underline">Remove photo</button>}
        <p className="text-[11px] text-slate-500">Take it from your phone. It is shrunk automatically.</p>
      </div>
    </div>
  );
};
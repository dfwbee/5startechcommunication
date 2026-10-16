import React, { useState } from 'react';
import { supabase, DEVICES_TABLE, PHOTO_BUCKET } from '../../lib/supabase';
import { resizeImage } from '../../lib/imageResize';
import { DeviceRow } from '../../lib/loadInventory';
import { USED_CATEGORIES } from '../../data/ukUsedData';
import { X, Plus, Trash2, ImagePlus } from 'lucide-react';

interface Props {
  device: DeviceRow | null;          // null = adding a new one
  nextId: string;
  nextOrder: number;
  onClose: () => void;
  onSaved: () => void;
}

const DEFAULT_SPECS: Record<string, string[]> = {
  laptops: ['Processor', 'RAM', 'Storage', 'Display'],
  macbooks: ['Processor', 'RAM', 'Storage', 'Display'],
  desktops: ['Processor', 'RAM', 'Storage'],
  'all-in-one': ['Processor', 'RAM', 'Storage', 'Display'],
  monitors: ['Size', 'Resolution', 'Ports'],
  tablets: ['Storage', 'Connectivity', 'Display'],
  printers: ['Type', 'Speed', 'Features'],
  accessories: ['Connection', 'Outputs', 'Power'],
};

const input = 'w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white';
const label = 'block text-xs font-semibold text-slate-700';

export const DeviceForm: React.FC<Props> = ({ device, nextId, nextOrder, onClose, onSaved }) => {
  const isNew = !device;
  const [category, setCategory] = useState(device?.category ?? 'laptops');
  const [brand, setBrand] = useState(device?.brand ?? '');
  const [model, setModel] = useState(device?.model ?? '');
  const [grade, setGrade] = useState<'A' | 'B'>(device?.grade ?? 'A');
  const [price, setPrice] = useState(device?.price ? String(device.price) : '');
  const [available, setAvailable] = useState(device?.available ?? true);
  const [tags, setTags] = useState((device?.tags ?? []).join(', '));
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>(
    device?.specs?.length ? device.specs : DEFAULT_SPECS.laptops.map((l) => ({ label: l, value: '' }))
  );
  const [imageUrl, setImageUrl] = useState<string | null>(device?.image_url ?? null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const id = device?.id ?? nextId;

  const changeCategory = (c: string) => {
    setCategory(c as DeviceRow['category']);
    // On a NEW device, swap in the right spec labels when nothing has been typed yet
    if (isNew && specs.every((s) => !s.value.trim())) {
      setSpecs((DEFAULT_SPECS[c] ?? []).map((l) => ({ label: l, value: '' })));
    }
  };

  const uploadPhoto = async (file: File | undefined) => {
    if (!file || !supabase) return;
    setUploading(true);
    setError('');
    try {
      const blob = await resizeImage(file);
      const path = `${id}-${Date.now()}.jpg`;
      const { error: upErr } = await supabase.storage.from(PHOTO_BUCKET).upload(path, blob, { contentType: 'image/jpeg', upsert: true });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path);
      setImageUrl(data.publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Photo upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    if (!brand.trim() || !model.trim()) { setError('Please enter the brand and model.'); return; }
    setSaving(true);
    setError('');
    const row = {
      id,
      available,
      category,
      brand: brand.trim(),
      model: model.trim(),
      grade,
      price: parseInt(price.replace(/[^0-9]/g, ''), 10) || 0,
      specs: specs.filter((s) => s.label.trim() && s.value.trim()).map((s) => ({ label: s.label.trim(), value: s.value.trim() })),
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      image_url: imageUrl,
      sort_order: device?.sort_order ?? nextOrder,
    };
    const { error: dbErr } = await supabase.from(DEVICES_TABLE).upsert(row);
    setSaving(false);
    if (dbErr) { setError(`Could not save: ${dbErr.message}`); return; }
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 overflow-y-auto p-3 sm:p-6">
      <form onSubmit={save} className="relative mx-auto w-full max-w-2xl bg-white rounded-2xl shadow-xl my-4">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-heading font-black text-lg text-slate-900">{isNew ? 'Add a device' : `Edit ${device!.brand} ${device!.model}`} <span className="text-xs font-mono text-slate-400">{id}</span></h2>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1.5 rounded-lg hover:bg-slate-100"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-5 space-y-5">
          {error && <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">{error}</div>}

          {/* Photo */}
          <div>
            <span className={label}>Photo</span>
            <div className="mt-1 flex items-center gap-4">
              <div className="w-32 h-24 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                {imageUrl ? <img src={imageUrl} alt="" className="w-full h-full object-cover" /> : <ImagePlus className="w-7 h-7 text-slate-400" />}
              </div>
              <div className="space-y-2">
                <label className="inline-block px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold cursor-pointer">
                  {uploading ? 'Uploading...' : imageUrl ? 'Change photo' : 'Choose photo'}
                  <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => uploadPhoto(e.target.files?.[0])} />
                </label>
                {imageUrl && <button type="button" onClick={() => setImageUrl(null)} className="block text-xs text-red-600 underline">Remove photo</button>}
                <p className="text-[11px] text-slate-500">Take it from your phone. It is shrunk automatically.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className={label}>Category
              <select value={category} onChange={(e) => changeCategory(e.target.value)} className={`${input} mt-1`}>
                {USED_CATEGORIES.filter((c) => c.id !== 'all').map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </label>
            <label className={label}>Grade
              <select value={grade} onChange={(e) => setGrade(e.target.value as 'A' | 'B')} className={`${input} mt-1`}>
                <option value="A">A (clean, little wear)</option>
                <option value="B">B (light scuffs)</option>
              </select>
            </label>
            <label className={label}>Brand
              <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g. Dell" className={`${input} mt-1`} />
            </label>
            <label className={label}>Model
              <input value={model} onChange={(e) => setModel(e.target.value)} placeholder="e.g. Latitude 5420" className={`${input} mt-1`} />
            </label>
            <label className={label}>Price (Naira)
              <input inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 310000 (empty = Ask for price)" className={`${input} mt-1`} />
            </label>
            <label className={label}>Tags (separate with commas)
              <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Best seller, Lightweight" className={`${input} mt-1`} />
            </label>
          </div>

          {/* Specs */}
          <div>
            <span className={label}>Specs</span>
            <div className="mt-1 space-y-2">
              {specs.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <input value={s.label} onChange={(e) => setSpecs((p) => p.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} placeholder="Name (RAM)" className={`${input} w-1/3`} />
                  <input value={s.value} onChange={(e) => setSpecs((p) => p.map((x, j) => j === i ? { ...x, value: e.target.value } : x))} placeholder="Value (16GB)" className={`${input} flex-1`} />
                  <button type="button" onClick={() => setSpecs((p) => p.filter((_, j) => j !== i))} aria-label="Remove spec" className="p-2 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button type="button" onClick={() => setSpecs((p) => [...p, { label: '', value: '' }])} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-800"><Plus className="w-3.5 h-3.5" /> Add a spec line</button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-800">
            <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} className="w-4 h-4" />
            Available (untick to hide it from the website, e.g. when sold)
          </label>
        </div>

        <div className="px-5 py-4 border-t border-slate-200 flex justify-end gap-2 bg-slate-50 rounded-b-2xl">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 bg-white">Cancel</button>
          <button type="submit" disabled={saving || uploading} className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-semibold">
            {saving ? 'Saving...' : 'Save device'}
          </button>
        </div>
      </form>
    </div>
  );
};

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ProductRow, PRODUCTS_TABLE, PRODUCT_CATEGORIES } from '../../lib/loadProducts';
import { PhotoField } from './PhotoField';
import { X, Plus, Trash2 } from 'lucide-react';

interface Props {
  product: ProductRow | null;   // null = adding a new one
  nextOrder: number;
  onClose: () => void;
  onSaved: () => void;
}

const input = 'w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white';
const label = 'block text-xs font-semibold text-slate-700';

export const ProductForm: React.FC<Props> = ({ product, nextOrder, onClose, onSaved }) => {
  const isNew = !product;
  const [id] = useState(product?.id ?? `prod-${Date.now().toString(36)}`);
  const [category, setCategory] = useState<ProductRow['category']>(product?.category ?? 'laptops');
  const [condition, setCondition] = useState<ProductRow['condition']>(product?.condition ?? 'Brand New');
  const [grade, setGrade] = useState(product?.grade ?? '');
  const [brand, setBrand] = useState(product?.brand ?? '');
  const [model, setModel] = useState(product?.model ?? '');
  const [name, setName] = useState(product?.name ?? '');
  const [shortDesc, setShortDesc] = useState(product?.short_description ?? '');
  const [fullDesc, setFullDesc] = useState(product?.full_description ?? '');
  const [price, setPrice] = useState(product?.price ? String(product.price) : '');
  const [priceNote, setPriceNote] = useState(product?.price_note ?? '');
  const [warranty, setWarranty] = useState(product?.warranty ?? '');
  const [tags, setTags] = useState((product?.tags ?? []).join(', '));
  const [available, setAvailable] = useState(product?.available ?? true);
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>(
    product?.specs?.length ? product.specs : [{ label: '', value: '' }]
  );
  const [imageUrl, setImageUrl] = useState<string | null>(product?.image_url ?? null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    if (!name.trim()) { setError('Please enter the product name.'); return; }
    setSaving(true);
    setError('');
    const row = {
      id,
      available,
      category,
      condition,
      grade: grade.trim() || null,
      brand: brand.trim(),
      model: model.trim(),
      name: name.trim(),
      short_description: shortDesc.trim(),
      full_description: fullDesc.trim(),
      specs: specs.filter((s) => s.label.trim() && s.value.trim()).map((s) => ({ label: s.label.trim(), value: s.value.trim() })),
      price: parseInt(price.replace(/[^0-9]/g, ''), 10) || 0,
      price_note: priceNote.trim() || null,
      warranty: warranty.trim(),
      image_url: imageUrl,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      sort_order: product?.sort_order ?? nextOrder,
    };
    const { error: dbErr } = await supabase.from(PRODUCTS_TABLE).upsert(row);
    setSaving(false);
    if (dbErr) { setError(`Could not save: ${dbErr.message}`); return; }
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 overflow-y-auto p-3 sm:p-6">
      <form onSubmit={save} className="relative mx-auto w-full max-w-2xl bg-white rounded-2xl shadow-xl my-4">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-heading font-black text-lg text-slate-900">{isNew ? 'Add a product' : 'Edit product'}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1.5 rounded-lg hover:bg-slate-100"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-5 space-y-5">
          {error && <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">{error}</div>}

          <div>
            <span className={label}>Photo</span>
            <div className="mt-1"><PhotoField id={id} value={imageUrl} onChange={setImageUrl} onError={setError} /></div>
          </div>

          <label className={label}>Product name (shown as the title)
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. HP EliteBook 840 G8 Executive Business Laptop" className={`${input} mt-1`} />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className={label}>Category
              <select value={category} onChange={(e) => setCategory(e.target.value as ProductRow['category'])} className={`${input} mt-1`}>
                {PRODUCT_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </label>
            <label className={label}>Condition
              <select value={condition} onChange={(e) => setCondition(e.target.value as ProductRow['condition'])} className={`${input} mt-1`}>
                <option value="Brand New">Brand New</option>
                <option value="Certified Refurbished">Certified Refurbished</option>
              </select>
            </label>
            <label className={label}>Brand
              <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g. HP" className={`${input} mt-1`} />
            </label>
            <label className={label}>Model
              <input value={model} onChange={(e) => setModel(e.target.value)} placeholder="e.g. EliteBook 840 G8" className={`${input} mt-1`} />
            </label>
            <label className={label}>Price (Naira)
              <input inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 685000 (empty = Ask for price)" className={`${input} mt-1`} />
            </label>
            <label className={label}>Price note (small text under the price)
              <input value={priceNote} onChange={(e) => setPriceNote(e.target.value)} placeholder="e.g. Brand new in box" className={`${input} mt-1`} />
            </label>
            <label className={label}>Condition label (optional)
              <input value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="e.g. Factory Sealed Box" className={`${input} mt-1`} />
            </label>
            <label className={label}>Warranty
              <input value={warranty} onChange={(e) => setWarranty(e.target.value)} placeholder="e.g. 12 Months Manufacturer Warranty" className={`${input} mt-1`} />
            </label>
          </div>

          <label className={label}>Short description (shown on the card)
            <textarea rows={2} value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} className={`${input} mt-1`} />
          </label>
          <label className={label}>Full description (shown in the Spec Sheet)
            <textarea rows={4} value={fullDesc} onChange={(e) => setFullDesc(e.target.value)} className={`${input} mt-1`} />
          </label>

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

          <label className={label}>Tags (separate with commas)
            <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Core i7, 16GB RAM, Lightweight" className={`${input} mt-1`} />
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-800">
            <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} className="w-4 h-4" />
            Available (untick to hide it from the website, e.g. when out of stock)
          </label>
        </div>

        <div className="px-5 py-4 border-t border-slate-200 flex justify-end gap-2 bg-slate-50 rounded-b-2xl">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 bg-white">Cancel</button>
          <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-semibold">
            {saving ? 'Saving...' : 'Save product'}
          </button>
        </div>
      </form>
    </div>
  );
};
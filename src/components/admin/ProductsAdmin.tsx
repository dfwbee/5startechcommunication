import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase, PHOTO_BUCKET } from '../../lib/supabase';
import { ProductRow, PRODUCTS_TABLE, PRODUCT_CATEGORIES } from '../../lib/loadProducts';
import { ProductForm } from './ProductForm';
import { Plus, Pencil, Trash2, Search, Eye, EyeOff } from 'lucide-react';

/** The "Main Products" tab: laptops, desktops, printers, CCTV, networking (new and refurbished). */
export const ProductsAdmin: React.FC = () => {
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [editing, setEditing] = useState<ProductRow | null | 'new'>(null);
  const [toast, setToast] = useState('');

  const flash = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const load = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setError('');
    const { data, error } = await supabase.from(PRODUCTS_TABLE).select('*').order('sort_order', { ascending: true });
    if (error) setError(`Could not load products: ${error.message}. Did you run supabase/products.sql?`);
    else setRows((data ?? []) as ProductRow[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) =>
      (category === 'all' || r.category === category) &&
      (!q || `${r.name} ${r.brand} ${r.model}`.toLowerCase().includes(q))
    );
  }, [rows, query, category]);

  const nextOrder = useMemo(() => rows.reduce((m, r) => Math.max(m, r.sort_order), 0) + 1, [rows]);

  const updatePrice = async (r: ProductRow, value: string) => {
    const price = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
    if (price === r.price || !supabase) return;
    const { error } = await supabase.from(PRODUCTS_TABLE).update({ price }).eq('id', r.id);
    if (error) { flash(`Price not saved: ${error.message}`); return; }
    setRows((p) => p.map((x) => (x.id === r.id ? { ...x, price } : x)));
    flash('Price saved');
  };

  const toggleAvailable = async (r: ProductRow) => {
    if (!supabase) return;
    const { error } = await supabase.from(PRODUCTS_TABLE).update({ available: !r.available }).eq('id', r.id);
    if (error) { flash(`Not saved: ${error.message}`); return; }
    setRows((p) => p.map((x) => (x.id === r.id ? { ...x, available: !r.available } : x)));
    flash(r.available ? 'Hidden from website' : 'Now showing on website');
  };

  const remove = async (r: ProductRow) => {
    if (!supabase) return;
    if (!window.confirm(`Delete "${r.name}" for good?\n\nTip: to just hide it, use the eye button instead.`)) return;
    const { error } = await supabase.from(PRODUCTS_TABLE).delete().eq('id', r.id);
    if (error) { flash(`Not deleted: ${error.message}`); return; }
    const file = r.image_url?.split(`/${PHOTO_BUCKET}/`)[1];
    if (file) await supabase.storage.from(PHOTO_BUCKET).remove([decodeURIComponent(file)]);
    setRows((p) => p.filter((x) => x.id !== r.id));
    flash('Deleted');
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <div>
          <h1 className="font-heading font-black text-2xl">Main Products</h1>
          <p className="text-xs text-slate-500">Laptops, desktops, printers, CCTV and networking &middot; {rows.length} products &middot; {rows.filter((r) => r.available).length} showing on the website</p>
        </div>
        <button onClick={() => setEditing('new')} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold">
          <Plus className="w-4 h-4" /> Add product
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, brand or model" className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm bg-white" />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white">
          <option value="all">All categories</option>
          {PRODUCT_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>

      {error && <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
      {loading && <p className="text-sm text-slate-500">Loading products...</p>}

      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
        {filtered.map((r) => (
          <div key={r.id} className={`p-3 flex flex-wrap items-center gap-3 ${r.available ? '' : 'opacity-60'}`}>
            <div className="w-14 h-12 rounded bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center text-[10px] text-slate-400">
              {r.image_url ? <img src={r.image_url} alt="" className="w-full h-full object-cover" /> : 'No photo'}
            </div>
            <div className="flex-1 min-w-[180px]">
              <div className="text-sm font-semibold leading-snug">{r.name}</div>
              <div className="text-[11px] text-slate-500">{PRODUCT_CATEGORIES.find((c) => c.id === r.category)?.label} &middot; {r.condition}{!r.available && ' · HIDDEN'}</div>
            </div>
            <label className="text-[11px] text-slate-500">
              Price (₦)
              <input
                key={`${r.id}-${r.price}`}
                defaultValue={r.price || ''}
                inputMode="numeric"
                placeholder="Ask for price"
                onBlur={(e) => updatePrice(r, e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
                className="block w-32 mt-0.5 px-2 py-1.5 rounded border border-slate-300 text-sm text-slate-900"
              />
            </label>
            <div className="flex items-center gap-1">
              <button onClick={() => toggleAvailable(r)} title={r.available ? 'Hide from website' : 'Show on website'} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
                {r.available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button onClick={() => setEditing(r)} title="Edit / photo" className="p-2 rounded-lg hover:bg-slate-100 text-blue-800"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => remove(r)} title="Delete" className="p-2 rounded-lg hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {!loading && filtered.length === 0 && <p className="p-6 text-sm text-slate-500 text-center">No products found.</p>}
      </div>
      <p className="text-[11px] text-slate-400">Edit a price and press Enter or tap away to save it. Changes show on the website straight away.</p>

      {editing && (
        <ProductForm
          product={editing === 'new' ? null : editing}
          nextOrder={nextOrder}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); flash('Saved'); load(); }}
        />
      )}
      {toast && <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm shadow-lg">{toast}</div>}
    </>
  );
};
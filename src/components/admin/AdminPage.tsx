import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, DEVICES_TABLE, PHOTO_BUCKET } from '../../lib/supabase';
import { DeviceRow } from '../../lib/loadInventory';
import { USED_CATEGORIES } from '../../data/ukUsedData';
import { formatNaira } from '../../lib/quote';
import { AdminLogin } from './AdminLogin';
import { DeviceForm } from './DeviceForm';
import { Plus, Pencil, Trash2, Search, LogOut, ExternalLink, Eye, EyeOff } from 'lucide-react';

const AdminPage: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [rows, setRows] = useState<DeviceRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [editing, setEditing] = useState<DeviceRow | null | 'new'>(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!supabase) { setChecking(false); return; }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setChecking(false); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const flash = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const load = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setError('');
    const { data, error } = await supabase.from(DEVICES_TABLE).select('*').order('sort_order', { ascending: true });
    if (error) setError(`Could not load devices: ${error.message}`);
    else setRows((data ?? []) as DeviceRow[]);
    setLoading(false);
  }, []);

  useEffect(() => { if (session) load(); }, [session, load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) =>
      (category === 'all' || r.category === category) &&
      (!q || `${r.id} ${r.brand} ${r.model}`.toLowerCase().includes(q))
    );
  }, [rows, query, category]);

  const nextId = useMemo(() => {
    const max = rows.reduce((m, r) => Math.max(m, parseInt(r.id.replace(/\D/g, ''), 10) || 0), 0);
    return `UK-${String(max + 1).padStart(3, '0')}`;
  }, [rows]);
  const nextOrder = useMemo(() => rows.reduce((m, r) => Math.max(m, r.sort_order), 0) + 1, [rows]);

  const updatePrice = async (r: DeviceRow, value: string) => {
    const price = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
    if (price === r.price || !supabase) return;
    const { error } = await supabase.from(DEVICES_TABLE).update({ price }).eq('id', r.id);
    if (error) { flash(`Price not saved: ${error.message}`); return; }
    setRows((p) => p.map((x) => (x.id === r.id ? { ...x, price } : x)));
    flash('Price saved');
  };

  const toggleAvailable = async (r: DeviceRow) => {
    if (!supabase) return;
    const { error } = await supabase.from(DEVICES_TABLE).update({ available: !r.available }).eq('id', r.id);
    if (error) { flash(`Not saved: ${error.message}`); return; }
    setRows((p) => p.map((x) => (x.id === r.id ? { ...x, available: !r.available } : x)));
    flash(r.available ? 'Hidden from website' : 'Now showing on website');
  };

  const remove = async (r: DeviceRow) => {
    if (!supabase) return;
    if (!window.confirm(`Delete ${r.brand} ${r.model} (${r.id}) for good?\n\nTip: to just hide it, use the eye button instead.`)) return;
    const { error } = await supabase.from(DEVICES_TABLE).delete().eq('id', r.id);
    if (error) { flash(`Not deleted: ${error.message}`); return; }
    // best effort: also remove its photo file
    const file = r.image_url?.split(`/${PHOTO_BUCKET}/`)[1];
    if (file) await supabase.storage.from(PHOTO_BUCKET).remove([decodeURIComponent(file)]);
    setRows((p) => p.filter((x) => x.id !== r.id));
    flash('Deleted');
  };

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
        <div className="max-w-md bg-white rounded-2xl border border-slate-200 p-6 text-sm text-slate-700 space-y-2">
          <h1 className="font-heading font-black text-lg">Admin is not connected yet</h1>
          <p>The Supabase keys are missing. The developer needs to add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> (see SETUP_SUPABASE.md).</p>
        </div>
      </div>
    );
  }
  if (checking) return <div className="min-h-screen flex items-center justify-center text-sm text-slate-500">Loading...</div>;
  if (!session) return <AdminLogin />;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="font-heading font-black">5Startech <span className="text-amber-600">Admin</span></div>
          <div className="flex items-center gap-3 text-xs">
            <a href={import.meta.env.BASE_URL} className="inline-flex items-center gap-1 text-blue-800 font-semibold"><ExternalLink className="w-3.5 h-3.5" /> View website</a>
            <button onClick={() => supabase!.auth.signOut()} className="inline-flex items-center gap-1 text-slate-600"><LogOut className="w-3.5 h-3.5" /> Sign out</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div>
            <h1 className="font-heading font-black text-2xl">UK-Used Devices</h1>
            <p className="text-xs text-slate-500">{rows.length} devices &middot; {rows.filter((r) => r.available).length} showing on the website</p>
          </div>
          <button onClick={() => setEditing('new')} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold">
            <Plus className="w-4 h-4" /> Add device
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by brand, model or ID" className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm bg-white" />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white">
            {USED_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>

        {error && <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
        {loading && <p className="text-sm text-slate-500">Loading devices...</p>}

        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
          {filtered.map((r) => (
            <div key={r.id} className={`p-3 flex flex-wrap items-center gap-3 ${r.available ? '' : 'opacity-60'}`}>
              <div className="w-14 h-12 rounded bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center text-[10px] text-slate-400">
                {r.image_url ? <img src={r.image_url} alt="" className="w-full h-full object-cover" /> : 'No photo'}
              </div>
              <div className="flex-1 min-w-[160px]">
                <div className="text-sm font-semibold">{r.brand} {r.model}</div>
                <div className="text-[11px] text-slate-500 font-mono">{r.id} &middot; Grade {r.grade} &middot; {r.category}{!r.available && ' · HIDDEN'}</div>
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
          {!loading && filtered.length === 0 && <p className="p-6 text-sm text-slate-500 text-center">No devices found.</p>}
        </div>
        <p className="text-[11px] text-slate-400">Edit a price and press Enter or tap away to save it. Changes show on the website straight away.</p>
      </main>

      {editing && (
        <DeviceForm
          device={editing === 'new' ? null : editing}
          nextId={nextId}
          nextOrder={nextOrder}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); flash('Saved'); load(); }}
        />
      )}

      {toast && <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm shadow-lg">{toast}</div>}
    </div>
  );
};

export default AdminPage;

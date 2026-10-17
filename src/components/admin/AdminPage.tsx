import React, { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, supabaseEnvStatus } from '../../lib/supabase';
import { AdminLogin } from './AdminLogin';
import { UsedAdmin } from './UsedAdmin';
import { ProductsAdmin } from './ProductsAdmin';
import { LogOut, ExternalLink } from 'lucide-react';

type Tab = 'products' | 'used';

const AdminPage: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<Tab>('products');

  useEffect(() => {
    if (!supabase) { setChecking(false); return; }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setChecking(false); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
        <div className="max-w-md bg-white rounded-2xl border border-slate-200 p-6 text-sm text-slate-700 space-y-2">
          <h1 className="font-heading font-black text-lg">Admin is not connected yet</h1>
          <p>This build of the website did not receive the Supabase keys.</p>
          <ul className="text-xs space-y-1">
            <li>VITE_SUPABASE_URL: <strong className={supabaseEnvStatus.hasUrl && !supabaseEnvStatus.urlIsPlaceholder ? 'text-emerald-600' : 'text-red-600'}>{!supabaseEnvStatus.hasUrl ? 'MISSING' : supabaseEnvStatus.urlIsPlaceholder ? 'still the placeholder' : 'found'}</strong></li>
            <li>VITE_SUPABASE_ANON_KEY: <strong className={supabaseEnvStatus.hasKey ? 'text-emerald-600' : 'text-red-600'}>{supabaseEnvStatus.hasKey ? 'found' : 'MISSING'}</strong></li>
          </ul>
          <p className="text-xs text-slate-500">Add both in the host's Environment Variables (exact names above, enabled for Production), then trigger a NEW deployment. See SETUP_SUPABASE.md.</p>
        </div>
      </div>
    );
  }
  if (checking) return <div className="min-h-screen flex items-center justify-center text-sm text-slate-500">Loading...</div>;
  if (!session) return <AdminLogin />;

  const tabBtn = (id: Tab, text: string) => (
    <button
      onClick={() => setTab(id)}
      className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
        tab === id ? 'bg-blue-900 border-blue-900 text-white' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
      }`}
    >
      {text}
    </button>
  );

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
        <div className="flex gap-2">
          {tabBtn('products', 'Main Products')}
          {tabBtn('used', 'UK Used')}
        </div>
        {tab === 'products' ? <ProductsAdmin /> : <UsedAdmin />}
      </main>
    </div>
  );
};

export default AdminPage;
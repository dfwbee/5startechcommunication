import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setError('Wrong email or password.');
    setBusy(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div>
          <h1 className="font-heading font-black text-xl text-slate-900">5Startech Admin</h1>
          <p className="text-xs text-slate-500">Sign in to manage UK-used devices.</p>
        </div>
        {error && <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">{error}</div>}
        <label className="block text-xs font-semibold text-slate-700">
          Email
          <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
        </label>
        <label className="block text-xs font-semibold text-slate-700">
          Password
          <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
        </label>
        <button type="submit" disabled={busy}
          className="w-full py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 disabled:opacity-60 text-white font-semibold text-sm">
          {busy ? 'Signing in...' : 'Sign in'}
        </button>
        <a href={import.meta.env.BASE_URL} className="block text-center text-xs text-slate-500 underline">Back to website</a>
      </form>
    </div>
  );
};

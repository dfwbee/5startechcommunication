import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** null when the .env values are missing, so the site still works (it falls back to the CSV / built-in list). */
export const supabase: SupabaseClient | null =
  url && key && !url.includes('YOUR-PROJECT') ? createClient(url, key) : null;

export const DEVICES_TABLE = 'uk_devices';
export const PHOTO_BUCKET = 'device-photos';

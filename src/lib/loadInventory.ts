import { UsedDevice, UsedCategory } from '../types';
import { USED_DEVICES } from '../data/ukUsedData';
import { supabase, DEVICES_TABLE } from './supabase';

const VALID: UsedCategory[] = ['laptops', 'macbooks', 'desktops', 'all-in-one', 'monitors', 'tablets', 'printers', 'accessories'];

/** Minimal CSV parser (handles quotes, commas and line breaks inside quotes). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;
  const src = text.replace(/^﻿/, '');
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"' && src[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else cell += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && src[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      if (row.some((x) => x.trim() !== '')) rows.push(row);
      row = [];
    } else cell += c;
  }
  row.push(cell);
  if (row.some((x) => x.trim() !== '')) rows.push(row);
  return rows;
}

const split = (v: string) => v.split(';').map((x) => x.trim()).filter(Boolean);

export function csvToDevices(text: string): UsedDevice[] {
  const rows = parseCsv(text);
  if (rows.length < 2) return [];
  const head = rows[0].map((h) => h.trim().toLowerCase());
  const col = (r: string[], name: string) => (r[head.indexOf(name)] ?? '').trim();
  const out: UsedDevice[] = [];
  rows.slice(1).forEach((r, i) => {
    const brand = col(r, 'brand');
    const model = col(r, 'model');
    const category = col(r, 'category').toLowerCase() as UsedCategory;
    if (!brand && !model) return;                                  // empty row
    if (!VALID.includes(category)) return;                          // unknown category
    if (['no', 'n', 'false', 'sold'].includes(col(r, 'available').toLowerCase())) return; // hidden / sold
    const price = parseInt(col(r, 'price').replace(/[^0-9]/g, ''), 10) || 0;
    out.push({
      id: col(r, 'id') || `UK-NEW-${i + 1}`,
      category,
      brand,
      model,
      name: `${brand} ${model}`.trim(),
      grade: col(r, 'grade').toUpperCase() === 'B' ? 'B' : 'A',
      price,
      specs: split(col(r, 'specs')).map((s) => {
        const k = s.indexOf(':');
        return k > 0 ? { label: s.slice(0, k).trim(), value: s.slice(k + 1).trim() } : { label: 'Spec', value: s };
      }),
      tags: split(col(r, 'tags')),
      imageUrl: col(r, 'image') || undefined,
    });
  });
  return out;
}

/** Row shape in the Supabase table `uk_devices` */
export interface DeviceRow {
  id: string;
  available: boolean;
  category: UsedCategory;
  brand: string;
  model: string;
  grade: 'A' | 'B';
  price: number;
  specs: { label: string; value: string }[];
  tags: string[];
  image_url: string | null;
  sort_order: number;
}

export const rowToDevice = (r: DeviceRow): UsedDevice => ({
  id: r.id,
  category: r.category,
  brand: r.brand,
  model: r.model,
  name: `${r.brand} ${r.model}`.trim(),
  grade: r.grade === 'B' ? 'B' : 'A',
  price: Number(r.price) || 0,
  specs: Array.isArray(r.specs) ? r.specs : [],
  tags: Array.isArray(r.tags) ? r.tags : [],
  imageUrl: r.image_url || undefined,
});

async function fromSupabase(): Promise<UsedDevice[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from(DEVICES_TABLE)
    .select('*')
    .eq('available', true)
    .order('sort_order', { ascending: true });
  if (error || !data) return null; // not set up / offline: fall back
  return (data as DeviceRow[]).map(rowToDevice);
}

async function fromCsv(): Promise<UsedDevice[] | null> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}uk-used-inventory.csv?v=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const text = await res.text();
    if (text.trim().startsWith('<')) return null; // host returned an HTML page
    const list = csvToDevices(text);
    return list.length ? list : null;
  } catch {
    return null;
  }
}

/**
 * Order of truth:
 * 1. Supabase (the owner's admin panel) - used even if it is empty, so deleting everything really empties the list
 * 2. uk-used-inventory.csv
 * 3. the built-in list in ukUsedData.ts
 */
export async function loadInventory(): Promise<UsedDevice[]> {
  return (await fromSupabase()) ?? (await fromCsv()) ?? USED_DEVICES;
}

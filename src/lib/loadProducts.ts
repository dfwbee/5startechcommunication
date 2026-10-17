import { Product, ProductCategory } from '../types';
import { PRODUCTS_DATA } from '../data/mockData';
import { supabase } from './supabase';
import { formatNaira } from './quote';

export const PRODUCTS_TABLE = 'products';

export const PRODUCT_CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'laptops', label: 'Laptops' },
  { id: 'desktops', label: 'Desktops' },
  { id: 'printers', label: 'Printers' },
  { id: 'cctv', label: 'CCTV / NVR' },
  { id: 'networking', label: 'Networking Accessories' },
];

/** Row shape in the Supabase table `products` */
export interface ProductRow {
  id: string;
  available: boolean;
  category: ProductCategory;
  condition: 'Brand New' | 'Certified Refurbished';
  grade: string | null;
  brand: string;
  model: string;
  name: string;
  short_description: string;
  full_description: string;
  specs: { label: string; value: string }[];
  price: number;
  price_note: string | null;
  warranty: string;
  image_url: string | null;
  tags: string[];
  sort_order: number;
}

export const rowToProduct = (r: ProductRow): Product => ({
  id: r.id,
  name: r.name,
  category: r.category,
  categoryLabel: PRODUCT_CATEGORIES.find((c) => c.id === r.category)?.label ?? r.category,
  condition: r.condition === 'Brand New' ? 'Brand New' : 'Certified Refurbished',
  grade: r.grade || undefined,
  brand: r.brand,
  model: r.model,
  shortDescription: r.short_description || '',
  fullDescription: r.full_description || r.short_description || '',
  specs: Array.isArray(r.specs) ? r.specs : [],
  priceFormatted: Number(r.price) > 0 ? formatNaira(Number(r.price)) : 'Ask for price',
  priceNote: r.price_note || undefined,
  warranty: r.warranty || '',
  inStock: true,
  imageUrl: r.image_url || '',
  tags: Array.isArray(r.tags) ? r.tags : [],
});

/** Supabase first; if it is not set up or fails, the built-in list is shown so the site never goes blank. */
export async function loadProducts(): Promise<Product[]> {
  if (!supabase) return PRODUCTS_DATA;
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select('*')
    .eq('available', true)
    .order('sort_order', { ascending: true });
  if (error || !data) return PRODUCTS_DATA;
  return (data as ProductRow[]).map(rowToProduct);
}
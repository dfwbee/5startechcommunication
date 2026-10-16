export type ThemeMode = 'default' | 'dark' | 'light';

export type ProductCategory = 'laptops' | 'desktops' | 'printers' | 'cctv' | 'networking';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  condition: 'Brand New' | 'Certified Refurbished';
  grade?: string;
  brand: string;
  model: string;
  shortDescription: string;
  fullDescription: string;
  specs: { label: string; value: string }[];
  priceFormatted: string;
  priceNote?: string;
  warranty: string;
  inStock: boolean;
  featured?: boolean;
  imageUrl: string;
  tags: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  summary: string;
  detailedScope: string[];
  deliverables: string[];
  typicalTurnaround: string;
  idealFor: string;
  iconName: string;
  badge: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'cctv' | 'networking' | 'computers' | 'repairs' | 'office';
  categoryLabel: string;
  location: string;
  clientType: string;
  description: string;
  scopeHighlights: string[];
  imageUrl: string;
  completionYear: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  organization: string;
  location: string;
  rating: number;
  quote: string;
  serviceCategory: string;
  isPlaceholderNotice: string;
  /** 'bought' = customer purchased; 'referred' = came via a friend/relative/colleague */
  source?: 'bought' | 'referred';
  /** Only set true once a real customer has approved this exact text. Unverified ones show a "Sample" tag. */
  verified?: boolean;
}

export type UsedCategory =
  | 'laptops'
  | 'macbooks'
  | 'desktops'
  | 'all-in-one'
  | 'monitors'
  | 'tablets'
  | 'printers'
  | 'accessories';

export interface UsedDevice {
  id: string;
  category: UsedCategory;
  brand: string;
  model: string;
  name: string;
  /** A = like-new, minimal wear. B = visible light cosmetic wear, fully functional. */
  grade: 'A' | 'B';
  specs: { label: string; value: string }[];
  /** Price in Naira (number, so we can sort/filter) */
  price: number;
  tags: string[];
  /** Optional: drop in a real photo URL (e.g. /devices/uk-001.jpg) and it replaces the icon tile */
  imageUrl?: string;
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  serviceOrProduct: string;
  quantityOrScale: string;
  projectTimeline: string;
  message: string;
  preferredContact: 'whatsapp' | 'phone' | 'email';
}

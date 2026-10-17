import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { PRODUCTS_DATA, BUSINESS_INFO } from '../data/mockData';
import { Product } from '../types';
import { loadProducts } from '../lib/loadProducts';
import { ProductDetailModal } from './ProductDetailModal';
import { 
  Search, 
  Shield, 
  MessageSquare, 
  ArrowRight, 
  Laptop, 
  Monitor, 
  Printer, 
  Camera, 
  Network, 
  Layers,
  Eye,
  CheckCircle2
} from 'lucide-react';

interface ProductsSectionProps {
  onOpenQuote: (productOrService?: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onOpenQuote }) => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);

  // The owner edits these in the admin page (#admin). Falls back to the built-in list if Supabase is not set up.
  useEffect(() => { loadProducts().then(setProducts); }, []);

  const isLight = theme === 'light';

  const categories = [
    { id: 'all', label: 'All Inventory', icon: Layers },
    { id: 'laptops', label: 'Business Laptops', icon: Laptop },
    { id: 'desktops', label: 'Workstation Towers', icon: Monitor },
    { id: 'printers', label: 'Heavy-Duty Copiers', icon: Printer },
    { id: 'cctv', label: 'CCTV & Security', icon: Camera },
    { id: 'networking', label: 'Structured Networking', icon: Network },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Condition filter
      if (selectedCondition !== 'all') {
        if (selectedCondition === 'new' && product.condition !== 'Brand New') return false;
        if (selectedCondition === 'refurbished' && product.condition !== 'Certified Refurbished') return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchBrand = product.brand.toLowerCase().includes(query);
        const matchModel = product.model.toLowerCase().includes(query);
        const matchDesc = product.shortDescription.toLowerCase().includes(query);
        const matchTags = product.tags.some(t => t.toLowerCase().includes(query));
        if (!matchName && !matchBrand && !matchModel && !matchDesc && !matchTags) {
          return false;
        }
      }
      return true;
    });
  }, [products, selectedCategory, selectedCondition, searchQuery]);

  return (
    <section 
      id="products" 
      className={`py-16 lg:py-24 transition-colors duration-200 border-b ${
        isLight 
          ? 'bg-slate-50 text-slate-900 border-slate-200' 
          : 'bg-[#080D1A] text-slate-100 border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block">
              In-Stock Lagos Hardware Inventory
            </span>
            
            <h2 className={`font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Enterprise Computing &amp; Security Hardware
            </h2>
            
            <p className={`text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              High-performance business laptops, robust desktop towers, heavy-duty office printers, 4K commercial CCTV arrays, and pure copper networking infrastructure in Ikeja.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenQuote('Hardware Bulk Procurement Quote')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-heading font-semibold text-xs tracking-wide transition-all shadow-sm active:scale-95"
            >
              <span>Request Bulk RFQ</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Category Pills & Filters Bar */}
        <div className="space-y-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-xs whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-blue-900 border-blue-900 text-white font-bold shadow-xs'
                      : isLight
                        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Condition Filter Row */}
          <div className={`p-3 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}>
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models or specs (e.g. Core i7, 4K, NVMe)..."
                className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' 
                    : 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-500'
                }`}
              />
            </div>

            {/* Condition Filters */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs">
              <span className={`text-xs font-medium hidden md:inline ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Hardware Grade:
              </span>
              
              <div className={`p-1 rounded-lg border flex gap-1 ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800'
              }`}>
                {[
                  { id: 'all', label: 'All Units' },
                  { id: 'new', label: 'Brand New Sealed' },
                  { id: 'refurbished', label: 'Certified Refurbished (Grade A)' },
                ].map((cond) => (
                  <button
                    key={cond.id}
                    type="button"
                    onClick={() => setSelectedCondition(cond.id)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                      selectedCondition === cond.id
                        ? 'bg-blue-900 text-white font-semibold shadow-xs'
                        : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cond.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className={`p-12 text-center rounded-2xl border space-y-3 ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}>
            <p className="text-base font-semibold">No hardware found matching your criteria.</p>
            <p className="text-xs text-slate-500">Try adjusting your search terms or clearing the category filter.</p>
            <button
              type="button"
              onClick={() => { setSelectedCategory('all'); setSelectedCondition('all'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-lg bg-blue-900 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%205Startech%20Communication,%20I%20am%20interested%20in%20the%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.priceFormatted)}).%20Please%20confirm%20availability.`;

              return (
                <div
                  key={product.id}
                  className={`rounded-xl border transition-all duration-200 flex flex-col justify-between overflow-hidden group ${
                    isLight 
                      ? 'bg-white border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md' 
                      : 'bg-[#101728] border-slate-800 hover:border-blue-500/50 hover:bg-[#152038]'
                  }`}
                >
                  <div>
                    {/* Image Container with Badges */}
                    <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600"><Layers className="w-14 h-14" strokeWidth={1.25} /></div>
                      )}
                      
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded shadow-xs ${
                          product.condition === 'Brand New'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-blue-800 text-white'
                        }`}>
                          {product.condition}
                        </span>

                        {product.grade && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-900/90 text-amber-300 border border-slate-700">
                            {product.grade}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 right-3">
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-700">
                          {product.categoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold text-blue-700 dark:text-blue-400">{product.brand}</span>
                        <span>{product.model}</span>
                      </div>

                      <h3 className={`font-heading font-bold text-lg leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-2 ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                        {product.name}
                      </h3>

                      <p className={`text-xs leading-relaxed line-clamp-2 ${
                        isLight ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        {product.shortDescription}
                      </p>

                      {/* Specs Tag Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {product.tags.map((tag, idx) => (
                          <span 
                            key={idx}
                            className={`text-[11px] px-2 py-0.5 rounded border ${
                              isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Pricing & Warranty */}
                      <div className="pt-3 flex items-baseline justify-between border-t border-slate-200 dark:border-slate-800">
                        <div>
                          <div className="font-heading font-black text-xl text-blue-900 dark:text-blue-400">
                            {product.priceFormatted}
                          </div>
                          {product.priceNote && (
                            <span className="text-[11px] text-slate-500 block">
                              {product.priceNote}
                            </span>
                          )}
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold block flex items-center justify-end gap-1">
                            <Shield className="w-3.5 h-3.5" />
                            <span>Written Warranty</span>
                          </span>
                          <span className="text-xs text-slate-500">
                            {product.warranty}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Card Actions: Spec Sheet + Order via WhatsApp */}
                  <div className={`p-4 border-t grid grid-cols-2 gap-2 text-xs font-semibold ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
                  }`}>
                    <button
                      type="button"
                      onClick={() => setActiveModalProduct(product)}
                      className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 transition-colors ${
                        isLight 
                          ? 'border-slate-300 hover:bg-slate-200 text-slate-700' 
                          : 'border-slate-700 hover:bg-slate-800 text-slate-200'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                      <span>Spec Sheet</span>
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Order on WhatsApp</span>
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Product Spec Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onOpenQuote={(name) => onOpenQuote(name)}
      />
    </section>
  );
};
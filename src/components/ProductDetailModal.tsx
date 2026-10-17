import React from 'react';
import { Product } from '../types';
import { useTheme } from '../context/ThemeContext';
import { BUSINESS_INFO } from '../data/mockData';
import { X, Check, Shield, MessageSquare, ArrowRight, Tag, Box, CheckCircle2 } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenQuote: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenQuote
}) => {
  const { theme } = useTheme();

  if (!product) return null;

  const isLight = theme === 'light';

  const modalBg = isLight 
    ? 'bg-white border-slate-200 text-slate-900 shadow-xl' 
    : 'bg-[#101728] border-slate-800 text-slate-100 shadow-xl';

  const whatsappMessage = encodeURIComponent(
    `Hello 5Startech Communication, I am interested in purchasing/inquiring about the ${product.name} (Ref: ${product.model}, Price: ${product.priceFormatted}). Please confirm stock and delivery timeline.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className={`relative w-full max-w-3xl rounded-2xl border overflow-hidden my-8 z-10 transition-all ${modalBg}`}>
        
        {/* Header bar */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
              {product.categoryLabel}
            </span>
            <span className={`text-xs px-2.5 py-0.5 rounded font-semibold border ${
              product.condition === 'Brand New' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-300' 
                : 'bg-slate-100 border-slate-200 text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
            }`}>
              {product.condition} {product.grade ? `• ${product.grade}` : ''}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Image */}
            <div className="md:col-span-5 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-4/3 bg-slate-950">
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Details & Pricing */}
            <div className="md:col-span-7 space-y-3">
              <span className="text-xs text-blue-700 dark:text-blue-400 font-semibold uppercase tracking-wider block">
                {product.brand} • Model: {product.model}
              </span>
              
              <h3 className={`font-heading font-black text-xl sm:text-2xl leading-snug ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {product.name}
              </h3>

              <div className="flex items-baseline gap-3 pt-1">
                <span className={`font-heading font-black text-2xl sm:text-3xl ${
                  isLight ? 'text-blue-950' : 'text-blue-400'
                }`}>
                  {product.priceFormatted}
                </span>
                {product.priceNote && (
                  <span className="text-xs text-slate-500">
                    ({product.priceNote})
                  </span>
                )}
              </div>

              {/* Warranty badge */}
              <div className={`p-2.5 rounded-lg border flex items-center gap-2 text-xs ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}>
                <Shield className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0" />
                <span className="font-semibold">{product.warranty}</span>
              </div>

              <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {product.fullDescription}
              </p>
            </div>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h4 className="font-heading font-bold text-xs tracking-wider uppercase text-blue-900 dark:text-blue-300">
              Verified Technical Specifications
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {product.specs.map((spec, i) => (
                <div 
                  key={i} 
                  className={`p-2.5 rounded-lg border flex justify-between gap-2 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <span className="text-slate-500">{spec.label}:</span>
                  <span className={`font-semibold text-right ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className={`px-6 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
        }`}>
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Stock Status: In Stock (Lagos Pickup / Delivery)</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wide transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenQuote(product.name);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-heading font-semibold text-xs tracking-wide transition-all shadow-xs"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
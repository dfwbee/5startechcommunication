import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { TESTIMONIALS_DATA } from '../data/mockData';
import { Star, Quote, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { theme } = useTheme();

  const isLight = theme === 'light';

  return (
    <section 
      id="testimonials" 
      className={`py-16 lg:py-24 transition-colors duration-200 border-b ${
        isLight 
          ? 'bg-white text-slate-900 border-slate-200' 
          : 'bg-[#0B111E] text-slate-100 border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block">
            Client Reviews &amp; Operational Track Record
          </span>
          
          <h2 className={`font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Trusted by Lagos Offices, Institutions &amp; SMEs
          </h2>
          
          <p className={`text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Direct feedback from corporate managers, legal practices, educational institutions, and businesses across Lagos who rely on Startech for computing hardware and security.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className={`p-6 sm:p-8 rounded-xl border flex flex-col justify-between transition-all duration-200 ${
                isLight 
                  ? 'bg-slate-50/70 border-slate-200 hover:border-blue-400 shadow-xs' 
                  : 'bg-[#101728] border-slate-800 hover:border-blue-500/40'
              }`}
            >
              <div className="space-y-4">
                {/* Rating stars and quote glyph */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  <Quote className="w-6 h-6 text-slate-400/40" />
                </div>

                {/* Service Tag */}
                <div className="text-xs text-blue-700 dark:text-blue-400 font-semibold uppercase tracking-wider">
                  {item.source === 'referred' ? 'Referred by word of mouth' : 'Service'}: {item.serviceCategory}
                </div>

                {/* Quote Text */}
                <p className={`text-sm sm:text-base leading-relaxed ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Client Info & Verification Tag */}
              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {item.clientName}
                  </div>
                  <div className="text-xs text-slate-500">
                    {item.role}, {item.organization} • {item.location}
                  </div>
                </div>

                {item.verified ? (
                  <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{item.source === 'referred' ? 'Referred Customer' : 'Verified Purchase'}</span>
                  </div>
                ) : (
                  <div className="text-[11px] font-semibold px-2 py-0.5 rounded border border-amber-500/50 text-amber-700 dark:text-amber-400" title={item.isPlaceholderNotice}>
                    Sample
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

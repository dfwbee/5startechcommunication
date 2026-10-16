import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { BUSINESS_INFO } from '../data/mockData';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Laptop, 
  Camera, 
  Network, 
  Phone,
  FileCheck,
  Building2,
  Clock,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
  onBrowseProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onBrowseProducts }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'computing' | 'surveillance' | 'networking'>('computing');

  const isLight = theme === 'light';

  return (
    <section 
      id="home" 
      className={`relative pt-10 pb-16 lg:pt-16 lg:pb-24 border-b transition-colors duration-200 ${
        isLight 
          ? 'bg-slate-50 text-slate-900 border-slate-200' 
          : 'bg-[#0B111E] text-slate-100 border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust & Verification Row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold border ${
            isLight 
              ? 'bg-white border-blue-200 text-blue-900 shadow-xs' 
              : 'bg-blue-950/60 border-blue-800 text-blue-300'
          }`}>
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>CAC Registered Corporate Vendor: <strong>{BUSINESS_INFO.cacNumber}</strong></span>
          </div>

          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium border ${
            isLight 
              ? 'bg-white border-slate-200 text-slate-700 shadow-xs' 
              : 'bg-slate-900/60 border-slate-800 text-slate-300'
          }`}>
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Same-Day Lagos Mainland &amp; 24h Island Dispatch</span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Authoritative Enterprise Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            <h1 className={`font-heading font-black text-3xl sm:text-4xl lg:text-[3.25rem] tracking-tight leading-[1.14] ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Enterprise Computing Hardware, Structured Cabling &amp; Surveillance in Lagos.
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Supplying corporate offices, educational institutions, and businesses across Nigeria with certified business laptops, high-performance desktop towers, commercial CCTV/NVR arrays, and precision chip-level IT engineering services.
            </p>

            {/* Core Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 pb-1">
              <div className={`p-3 rounded-lg border ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Written Warranties</span>
                </div>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  6–12 months replacement guarantee on all hardware.
                </p>
              </div>

              <div className={`p-3 rounded-lg border ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Chip-Level Lab</span>
                </div>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Component motherboard &amp; precision printer repair Alimosho.
                </p>
              </div>

              <div className={`p-3 rounded-lg border ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Corporate Billing</span>
                </div>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Official FIRS TIN, VAT invoices, and procurement terms.
                </p>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onBrowseProducts}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-heading font-semibold text-base tracking-wide shadow-sm active:scale-95 transition-all"
                id="hero-browse-products-btn"
              >
                <span>Browse In-Stock Hardware</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <button
                type="button"
                onClick={onOpenQuote}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border font-heading font-semibold text-base transition-all ${
                  isLight 
                    ? 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800 shadow-xs' 
                    : 'border-slate-700 bg-slate-900 hover:bg-slate-800 text-white'
                }`}
                id="hero-request-quote-btn"
              >
                <span>Request Formal Quotation / RFQ</span>
              </button>

              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%205Startech%20Communication,%20I%20would%20like%20to%20inquire%20about%20your%20hardware%20and%20IT%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg border text-sm font-semibold transition-all ${
                  isLight
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    : 'border-emerald-600/40 bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/40'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <span>WhatsApp Desk</span>
              </a>
            </div>

            {/* Address & Fast Contact Bar */}
            <div className={`pt-4 border-t flex flex-wrap items-center gap-y-2 gap-x-6 text-xs ${
              isLight ? 'border-slate-200 text-slate-600' : 'border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>Workshop: <strong>No 20, Dada Abiye Street, Alimosho, Lagos</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>Engineering Hotline: <strong>{BUSINESS_INFO.phone}</strong></span>
              </div>
            </div>

          </div>

          {/* Right Column: Commercial Hardware & Services Showcase Card */}
          <div className="lg:col-span-5">
            <div className={`rounded-xl border overflow-hidden shadow-lg transition-all ${
              isLight 
                ? 'bg-white border-slate-200' 
                : 'bg-[#101728] border-slate-800'
            }`}>
              
              {/* Card Header */}
              <div className={`px-5 py-4 border-b flex items-center justify-between ${
                isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}>
                <div>
                  <h3 className={`font-heading font-bold text-sm tracking-wide uppercase ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    Commercial Procurement Highlights
                  </h3>
                  <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Available for immediate inspection &amp; dispatch in Lagos
                  </p>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700/50">
                  Ready in Alimosho
                </span>
              </div>

              {/* Showcase Category Switcher */}
              <div className={`grid grid-cols-3 border-b text-xs ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
              }`}>
                <button
                  type="button"
                  onClick={() => setActiveTab('computing')}
                  className={`py-3 px-2 flex items-center justify-center gap-1.5 font-semibold transition-colors ${
                    activeTab === 'computing'
                      ? 'border-b-2 border-blue-900 text-blue-900 dark:text-blue-400 dark:border-blue-400 bg-white dark:bg-slate-800'
                      : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Laptop className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Workstations</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('surveillance')}
                  className={`py-3 px-2 flex items-center justify-center gap-1.5 font-semibold transition-colors ${
                    activeTab === 'surveillance'
                      ? 'border-b-2 border-blue-900 text-blue-900 dark:text-blue-400 dark:border-blue-400 bg-white dark:bg-slate-800'
                      : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Camera className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>CCTV &amp; NVR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('networking')}
                  className={`py-3 px-2 flex items-center justify-center gap-1.5 font-semibold transition-colors ${
                    activeTab === 'networking'
                      ? 'border-b-2 border-blue-900 text-blue-900 dark:text-blue-400 dark:border-blue-400 bg-white dark:bg-slate-800'
                      : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Network className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Networking</span>
                </button>
              </div>

              {/* Tab 1: Workstations */}
              {activeTab === 'computing' && (
                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                        Enterprise Ultrabook
                      </span>
                      <h4 className={`font-heading font-black text-lg ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        Dell Latitude 7420 / HP EliteBook 840
                      </h4>
                      <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        Grade A+ Refurbished &amp; Brand New Sealed Available
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs text-slate-500 block">From</span>
                      <span className="font-heading font-black text-xl text-blue-900 dark:text-blue-400">
                        ₦385,000
                      </span>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                    isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900/60 border-slate-800 text-slate-300'
                  }`}>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Processor:</span>
                      <span className="font-medium">Intel Core i7 11th Gen vPro</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Memory &amp; Storage:</span>
                      <span className="font-medium">16GB DDR4 RAM | 512GB NVMe SSD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Warranty:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">6 Months Written Guarantee</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={onBrowseProducts}
                      className={`py-2 px-3 rounded-lg border text-center transition-colors ${
                        isLight ? 'border-slate-300 hover:bg-slate-100 text-slate-800' : 'border-slate-700 hover:bg-slate-800 text-white'
                      }`}
                    >
                      View All Laptops
                    </button>
                    <a
                      href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%205Startech,%20I%20am%20interested%20in%20the%20Dell%20Latitude%207420%20/%20HP%20EliteBook%20laptop.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-center flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Order on WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Tab 2: CCTV & Surveillance */}
              {activeTab === 'surveillance' && (
                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                        Commercial Security Kit
                      </span>
                      <h4 className={`font-heading font-black text-lg ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        Hikvision 8-Camera 4K ColorVu IP Kit
                      </h4>
                      <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        Full Night Color Vision + AcuSense AI Motion Alerts
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs text-slate-500 block">Complete Kit</span>
                      <span className="font-heading font-black text-xl text-blue-900 dark:text-blue-400">
                        ₦340,000
                      </span>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                    isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900/60 border-slate-800 text-slate-300'
                  }`}>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Hardware Included:</span>
                      <span className="font-medium">8x 5MP Cameras + 8CH PoE NVR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Storage:</span>
                      <span className="font-medium">2TB Western Digital Purple Surveillance HDD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Mobile Access:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">Hik-Connect iOS/Android App</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={onOpenQuote}
                      className={`py-2 px-3 rounded-lg border text-center transition-colors ${
                        isLight ? 'border-slate-300 hover:bg-slate-100 text-slate-800' : 'border-slate-700 hover:bg-slate-800 text-white'
                      }`}
                    >
                      Request Site Survey
                    </button>
                    <a
                      href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%205Startech,%20I%20would%20like%20a%20quote%20for%20the%208-Camera%20CCTV%20Surveillance%20installation.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-center flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Inquire CCTV Kit</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Tab 3: Networking & Infrastructure */}
              {activeTab === 'networking' && (
                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                        Office Infrastructure
                      </span>
                      <h4 className={`font-heading font-black text-lg ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        Cat6A Pure Copper Cabling &amp; Gigabit Switch
                      </h4>
                      <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        High-speed LAN backbone for modern offices &amp; server racks
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs text-slate-500 block">From</span>
                      <span className="font-heading font-black text-xl text-blue-900 dark:text-blue-400">
                        ₦165,000
                      </span>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                    isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900/60 border-slate-800 text-slate-300'
                  }`}>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cable Grade:</span>
                      <span className="font-medium">100% Solid Pure Copper 23AWG (305m)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Rack Hardware:</span>
                      <span className="font-medium">9U / 12U Server Cabinets &amp; Patch Panels</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Certification:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">Fluke Cable Testing Certified</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={onOpenQuote}
                      className={`py-2 px-3 rounded-lg border text-center transition-colors ${
                        isLight ? 'border-slate-300 hover:bg-slate-100 text-slate-800' : 'border-slate-700 hover:bg-slate-800 text-white'
                      }`}
                    >
                      Request Cabling Quote
                    </button>
                    <a
                      href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%205Startech,%20I%20need%20structured%20cabling%20and%20networking%20hardware%20for%20our%20office.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-center flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Inquire Network Gear</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Bottom Quick Notice */}
              <div className={`px-5 py-3 border-t text-xs flex items-center justify-between ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}>
                <span>Corporate Pro-Forma invoices issued in 60 mins</span>
                <span className="font-semibold text-blue-700 dark:text-blue-400">FIRS TIN Compliant</span>
              </div>

            </div>
          </div>

        </div>

        {/* Credibility Ribbon: 4 Key Benchmarks */}
        <div className={`mt-14 pt-8 border-t grid grid-cols-2 md:grid-cols-4 gap-6 text-center ${
          isLight ? 'border-slate-200' : 'border-slate-800'
        }`}>
          <div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-blue-900 dark:text-blue-400">
              12+ Years
            </div>
            <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Serving Corporate Lagos
            </p>
          </div>

          <div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-blue-900 dark:text-blue-400">
              1,200+
            </div>
            <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Workstations Deployed
            </p>
          </div>

          <div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400">
              100% Tested
            </div>
            <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Written Warranty on All Units
            </p>
          </div>

          <div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-amber-600 dark:text-amber-400">
              Same-Day
            </div>
            <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Lagos Mainland Dispatch
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

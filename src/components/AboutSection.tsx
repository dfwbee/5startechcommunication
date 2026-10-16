import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { BUSINESS_INFO } from '../data/mockData';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  Award,
  CreditCard,
  Building
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { theme } = useTheme();

  const isLight = theme === 'light';

  return (
    <section 
      id="about" 
      className={`py-16 lg:py-24 transition-colors duration-200 border-b ${
        isLight 
          ? 'bg-white text-slate-900 border-slate-200' 
          : 'bg-[#0B111E] text-slate-100 border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Left Story, Right Credentials & Service Territory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Company Introduction */}
          <div className="lg:col-span-7 space-y-6">
            
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block">
              Corporate Profile &amp; Governance
            </span>

            <h2 className={`font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Bridging Hardware Precision with Enterprise Reliability
            </h2>

            <div className={`space-y-4 text-base leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
              <p>
                <strong>5Startech Communication</strong> is a registered Nigerian technology infrastructure contractor and commercial hardware vendor based in the Alimosho technology corridor of Lagos State.
              </p>

              <p>
                Founded to solve the persistent procurement dilemmas faced by Nigerian enterprises—unreliable grey-market sellers, unverified component histories, and lack of after-sales warranties—we provide verified enterprise computing systems, commercial IP surveillance, and structured networking with full corporate accountability.
              </p>

              <p>
                Our engineering team maintains an in-house chip-level testing and micro-soldering laboratory. Every workstation and network component undergoes rigorous 32-point stress analysis before dispatch, ensuring that your corporate deployment is immune to unexpected downtime.
              </p>
            </div>

            {/* Core Values Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className={`p-4 rounded-xl border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}>
                <span className="font-heading font-bold text-sm text-blue-900 dark:text-blue-300 block">
                  Authentic Hardware
                </span>
                <span className={`text-xs mt-1 block ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  100% verified genuine components and Grade-A tested workstations.
                </span>
              </div>

              <div className={`p-4 rounded-xl border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}>
                <span className="font-heading font-bold text-sm text-blue-900 dark:text-blue-300 block">
                  Field Engineering
                </span>
                <span className={`text-xs mt-1 block ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Certified technicians for structured Cat6A/fiber and CCTV rigging.
                </span>
              </div>

              <div className={`p-4 rounded-xl border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}>
                <span className="font-heading font-bold text-sm text-blue-900 dark:text-blue-300 block">
                  Written Guarantee
                </span>
                <span className={`text-xs mt-1 block ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Formal 6–12 months written warranty documents with rapid local swap.
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Business Credentials (CAC / SMEDAN / Banking) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Business Credentials Card */}
            <div className={`rounded-xl border p-6 sm:p-7 shadow-sm transition-all ${
              isLight 
                ? 'bg-slate-50 border-slate-200' 
                : 'bg-[#101728] border-slate-800'
            }`}>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                <FileText className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                <h3 className={`font-heading font-bold text-sm tracking-wider uppercase ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Corporate Compliance &amp; Onboarding
                </h3>
              </div>

              <p className={`text-xs leading-relaxed mb-5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                5Startech Communication operates in full compliance with Nigerian commercial statutes. Official documentation is available upon request for corporate vendor onboarding, tenders, and Purchase Orders.
              </p>

              {/* CAC & SMEDAN Boxes */}
              <div className="space-y-3 text-xs">
                
                {/* CAC Registration Box */}
                <div className={`p-4 rounded-lg border flex items-start gap-3.5 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                }`}>
                  <div className="p-2 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-400 shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        Corporate Affairs Commission (CAC)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 font-semibold">
                        Registered
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Entity Number: <strong className="text-blue-900 dark:text-blue-300">{BUSINESS_INFO.cacDisplay}</strong>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Certified business name registered under CAMA regulations.
                    </p>
                  </div>
                </div>

                {/* SMEDAN Box */}
                <div className={`p-4 rounded-lg border flex items-start gap-3.5 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                }`}>
                  <div className="p-2 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-400 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        SMEDAN Nigeria MSME Certified
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 font-semibold">
                        Verified
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Certificate ID: <strong className="text-blue-900 dark:text-blue-300">{BUSINESS_INFO.smedanPlaceholder}</strong>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Small and Medium Enterprises Development Agency verified contractor.
                    </p>
                  </div>
                </div>

                {/* Invoicing & Bank Terms */}
                <div className={`p-4 rounded-lg border flex items-start gap-3.5 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                }`}>
                  <div className="p-2 rounded bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-400 shrink-0">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <span className={`font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Corporate Billing &amp; Tax Compliance
                    </span>
                    <p className="text-[11px] text-slate-500">
                      FIRS Tax Identification Number (TIN) provided on all official pro-forma invoices. Corporate bank transfer accounts for approved B2B Purchase Orders.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Lagos Operational Territory Card */}
            <div className={`rounded-xl border p-6 sm:p-7 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#101728] border-slate-800'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                <h4 className={`font-heading font-bold text-xs tracking-wider uppercase ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Lagos Field Engineering &amp; Delivery Coverage
                </h4>
              </div>

              <p className={`text-xs mb-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Our technicians provide direct on-site pickup, site inspections, and installations across:
              </p>

              <div className="flex flex-wrap gap-1.5">
                {BUSINESS_INFO.serviceAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className={`text-xs px-2.5 py-1 rounded-md border ${
                      isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    • {area}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;

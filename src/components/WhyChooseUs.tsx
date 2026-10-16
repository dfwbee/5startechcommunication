import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { WHY_CHOOSE_US_POINTS } from '../data/mockData';
import { 
  Shield, 
  CheckCircle2, 
  Tag, 
  Award, 
  Layers, 
  Clock, 
  Users, 
  ArrowRight,
  XCircle,
  Building2,
  FileCheck
} from 'lucide-react';

interface WhyChooseUsProps {
  onOpenQuote: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenQuote }) => {
  const { theme } = useTheme();

  const isLight = theme === 'light';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="w-5 h-5 text-blue-700 dark:text-blue-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-blue-700 dark:text-blue-400" />;
      case 'Tag': return <Tag className="w-5 h-5 text-blue-700 dark:text-blue-400" />;
      case 'Award': return <Award className="w-5 h-5 text-blue-700 dark:text-blue-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-blue-700 dark:text-blue-400" />;
      case 'Clock': return <Clock className="w-5 h-5 text-blue-700 dark:text-blue-400" />;
      case 'Users': return <Users className="w-5 h-5 text-blue-700 dark:text-blue-400" />;
      default: return <Shield className="w-5 h-5 text-blue-700 dark:text-blue-400" />;
    }
  };

  return (
    <section 
      id="why-us" 
      className={`py-16 lg:py-24 transition-colors duration-200 border-b ${
        isLight 
          ? 'bg-white text-slate-900 border-slate-200' 
          : 'bg-[#0B111E] text-slate-100 border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block">
            Quality Assurance &amp; Vendor Standards
          </span>
          
          <h2 className={`font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Why Procurement Officers &amp; Businesses Choose 5Startech
          </h2>
          
          <p className={`text-base sm:text-lg leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            We eliminate the risks of informal electronics markets by providing formal CAC vendor registration, 32-point hardware stress tests, written legal warranties, and prompt Lagos field engineering.
          </p>
        </div>

        {/* 7 Key Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {WHY_CHOOSE_US_POINTS.map((point, index) => (
            <div
              key={index}
              className={`p-6 sm:p-7 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                isLight 
                  ? 'bg-slate-50/70 border-slate-200 hover:border-blue-400 hover:bg-white shadow-xs' 
                  : 'bg-[#101728] border-slate-800 hover:border-blue-500/40'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                    isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
                  }`}>
                    {getIcon(point.iconName)}
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${
                    isLight ? 'bg-blue-100 text-blue-900' : 'bg-blue-950 text-blue-300 border border-blue-800'
                  }`}>
                    {point.highlight}
                  </span>
                </div>

                <h3 className={`font-heading font-bold text-lg ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {point.title}
                </h3>

                <p className={`text-sm leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {point.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Commercial Standard</span>
              </div>
            </div>
          ))}

          {/* Call to Action Box in the grid */}
          <div className={`p-6 sm:p-7 rounded-xl border flex flex-col justify-between ${
            isLight 
              ? 'bg-blue-950 text-white border-blue-900 shadow-md' 
              : 'bg-blue-950/70 text-white border-blue-800'
          }`}>
            <div className="space-y-3">
              <span className="text-xs text-amber-400 uppercase tracking-wider font-bold">
                B2B Procurement Partnership
              </span>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
                Equipment &amp; IT Support for Your Workplace
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                Consult with our senior technical engineering team. We provide itemized quotations, SLA agreements, and corporate vendor onboarding documents.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenQuote}
              className="mt-6 w-full py-3 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
            >
              <span>Request Vendor Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Technical Standard Comparison Table: Startech vs Informal Vendors */}
        <div className={`rounded-2xl border p-6 sm:p-8 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#101728] border-slate-800'
        }`}>
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block">
              Vendor Comparison
            </span>
            <h3 className={`font-heading font-black text-xl sm:text-2xl mt-1 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              How 5Startech Standards Compare
            </h3>
            <p className={`text-xs sm:text-sm mt-1 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Why certified corporate procurement prevents catastrophic hardware and network failure.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b text-xs uppercase tracking-wider ${
                  isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800 text-slate-400'
                }`}>
                  <th className="pb-3 pr-4 font-semibold">Standard &amp; Deliverable</th>
                  <th className="pb-3 px-4 text-blue-900 dark:text-blue-300 font-bold">5Startech Communication</th>
                  <th className="pb-3 pl-4 text-slate-400 font-semibold">Informal / Roadside Sellers</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-800/80'}`}>
                {[
                  {
                    factor: 'Refurbished Workstation Testing',
                    startech: '32-point hardware stress test (thermal, RAM cycles, NVMe SMART health)',
                    other: 'Visual power-on check only; hidden motherboard or thermal defects',
                  },
                  {
                    factor: 'Network Cabling Material',
                    startech: '100% Solid Bare Copper 23AWG (Zero packet drop, 100W PoE safe)',
                    other: 'Copper-Clad Aluminum (CCA) that overheats, degrades, and drops packets',
                  },
                  {
                    factor: 'Surveillance Hard Drives',
                    startech: 'Dedicated 24/7 WD Purple / Seagate SkyHawk surveillance drives',
                    other: 'Recycled desktop PC drives that burn out after months of continuous recording',
                  },
                  {
                    factor: 'After-Sales Warranty & Recourse',
                    startech: 'Written formal warranty certificate with prompt Lagos replacement',
                    other: 'Verbal promises only; difficult to claim or reach post-sale',
                  },
                  {
                    factor: 'Rack Dressing & Labeling',
                    startech: 'Laser-labeled patch panels, Velcro management, verified Fluke certification',
                    other: 'Unorganized tangled wiring that makes ongoing maintenance difficult',
                  }
                ].map((row, idx) => (
                  <tr key={idx} className={isLight ? 'hover:bg-white transition-colors' : 'hover:bg-slate-900/50 transition-colors'}>
                    <td className={`py-3.5 pr-4 font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                      {row.factor}
                    </td>
                    <td className="py-3.5 px-4 text-emerald-700 dark:text-emerald-400 font-medium">
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{row.startech}</span>
                      </div>
                    </td>
                    <td className="py-3.5 pl-4 text-slate-500">
                      <div className="flex items-start gap-1.5">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{row.other}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SERVICES_DATA } from '../data/mockData';
import { 
  Laptop, 
  Wrench, 
  ShieldCheck, 
  Network, 
  Cpu, 
  Headphones, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Clock,
  Check
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { theme } = useTheme();
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const isLight = theme === 'light';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop': return <Laptop className="w-5 h-5 text-blue-700 dark:text-blue-400" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-blue-700 dark:text-blue-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-blue-700 dark:text-blue-400" />;
      case 'Network': return <Network className="w-5 h-5 text-blue-700 dark:text-blue-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-blue-700 dark:text-blue-400" />;
      case 'Headphones': return <Headphones className="w-5 h-5 text-blue-700 dark:text-blue-400" />;
      default: return <Cpu className="w-5 h-5 text-blue-700 dark:text-blue-400" />;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedServiceId(prev => prev === id ? null : id);
  };

  return (
    <section 
      id="services" 
      className={`py-16 lg:py-24 transition-colors duration-200 ${
        isLight 
          ? 'bg-white text-slate-900 border-b border-slate-200' 
          : 'bg-[#0B111E] text-slate-100 border-b border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block">
            Commercial IT Solutions &amp; Engineering
          </span>
          
          <h2 className={`font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Comprehensive IT Hardware, Infrastructure &amp; Security
          </h2>
          
          <p className={`text-base sm:text-lg leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            From corporate workstation procurement and chip-level motherboard diagnostics to commercial CCTV surveillance arrays and certified structured cabling, we deliver end-to-end technology craftsmanship across Lagos.
          </p>
        </div>

        {/* 6 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service) => {
            const isExpanded = expandedServiceId === service.id;

            return (
              <div
                key={service.id}
                className={`rounded-xl border transition-all duration-200 flex flex-col justify-between group ${
                  isLight 
                    ? 'bg-slate-50/70 border-slate-200 hover:border-blue-400 hover:bg-white shadow-xs hover:shadow-md' 
                    : 'bg-[#101728] border-slate-800 hover:border-blue-500/50 hover:bg-[#152038]'
                }`}
              >
                <div className="p-6 sm:p-7 space-y-4">
                  {/* Card Top: Service Badge & SLA Turnaround */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded ${
                      isLight ? 'bg-blue-100 text-blue-900' : 'bg-blue-950 text-blue-300 border border-blue-800'
                    }`}>
                      {service.badge}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{service.typicalTurnaround}</span>
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-2 pt-1">
                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center border ${
                      isLight 
                        ? 'bg-white border-slate-200 shadow-xs' 
                        : 'bg-slate-900 border-slate-800'
                    }`}>
                      {getIcon(service.iconName)}
                    </div>
                    
                    <h3 className={`font-heading font-black text-xl tracking-tight group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      {service.title}
                    </h3>

                    <p className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      {service.tagline}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className={`text-sm leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    {service.summary}
                  </p>

                  {/* Expandable Technical Scope */}
                  {isExpanded && (
                    <div className={`mt-4 pt-4 border-t space-y-3 text-xs ${
                      isLight ? 'border-slate-200 text-slate-700' : 'border-slate-800 text-slate-300'
                    }`}>
                      <div>
                        <span className="font-bold text-blue-900 dark:text-blue-300 block mb-2 uppercase tracking-wide text-[11px]">
                          Technical Deliverables:
                        </span>
                        <ul className="space-y-2">
                          {service.detailedScope.slice(0, 3).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 text-slate-500">
                        <span><strong>Target Clients:</strong> {service.idealFor}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className={`px-6 py-4 border-t flex items-center justify-between text-xs font-semibold ${
                  isLight ? 'bg-white/80 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'
                }`}>
                  <button
                    type="button"
                    onClick={() => toggleExpand(service.id)}
                    className="inline-flex items-center gap-1 text-slate-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>{isExpanded ? 'Less Details' : 'View Scope'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="inline-flex items-center gap-1 text-blue-700 dark:text-blue-400 hover:underline font-bold"
                  >
                    <span>Inquire / Book</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Structured Service & Engagement Process */}
        <div className={`mt-20 p-8 sm:p-10 rounded-2xl border ${
          isLight 
            ? 'bg-slate-50 border-slate-200' 
            : 'bg-[#101728] border-slate-800'
        }`}>
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block">
              Transparent Execution
            </span>
            <h3 className={`font-heading font-black text-2xl sm:text-3xl ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              How Our Service &amp; Installation Works
            </h3>
            <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Predictable, professional, and fully documented from initial diagnosis to warranty handover.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Request & Preliminary Scope',
                description: 'Submit your hardware requirements, repair issue, or installation goals via our quote portal or WhatsApp desk.'
              },
              {
                step: '2',
                title: 'Physical Survey / Diagnostics',
                description: 'Our certified engineers conduct on-site inspections or chip-level lab diagnostics with clear itemized estimates.'
              },
              {
                step: '3',
                title: 'Implementation & Stress Test',
                description: 'We execute clean rack installations, structured Cat6A cabling, or hardware deployment using authentic components.'
              },
              {
                step: '4',
                title: 'Handover & Written Warranty',
                description: 'Rigorous client test sign-off, invoice delivery with FIRS TIN, and guaranteed after-sales engineering SLA.'
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-xl border flex flex-col space-y-3 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-900 text-white font-heading font-bold text-sm flex items-center justify-center">
                  {item.step}
                </div>
                <h4 className={`font-heading font-bold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {item.title}
                </h4>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => onSelectService('General Hardware & Service Booking')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-heading font-semibold text-sm shadow-sm transition-all active:scale-95"
            >
              <span>Book a Diagnostic / Site Survey</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

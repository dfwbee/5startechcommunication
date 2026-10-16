import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/mockData';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  const isLight = theme === 'light';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Engineering Services', href: '#services' },
    { name: 'Hardware Catalog', href: '#products' },
    { name: 'UK Used Devices', href: '#uk-used' },
    { name: 'Quality Assurance', href: '#why-us' },
    { name: 'Corporate Profile', href: '#about' },
    { name: 'Field Deployments', href: '#projects' },
    { name: 'Request Quote', href: '#contact' },
  ];

  return (
    <footer className={`border-t transition-colors duration-200 ${
      isLight 
        ? 'bg-slate-900 text-slate-300 border-slate-800' 
        : 'bg-[#060A13] text-slate-300 border-slate-800'
    }`}>
      
      {/* Main Footer Links Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-lg tracking-tight text-white">
                  5STARTECH COMMUNICATION
                </span>
                <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                  Enterprise IT &amp; Security Hardware
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              Lagos-based technology solutions provider specializing in the supply of verified new and refurbished business workstations, enterprise printers, commercial CCTV/NVR surveillance, and structured networking infrastructure.
            </p>

            {/* CAC & SMEDAN Compliance Tag in Footer */}
            <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950/60 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Nigerian Commercial Compliance</span>
              </div>
              <div className="text-slate-400">CAC Reg No: <strong className="text-white">{BUSINESS_INFO.cacNumber}</strong></div>
              <div className="text-slate-400">SMEDAN MSME: <strong className="text-white">{BUSINESS_INFO.smedanPlaceholder}</strong></div>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-200">
              Core Services
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-slate-400 hover:text-white transition-colors block"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Lagos Contact & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-200">
              Technical Desk &amp; Hours
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  {BUSINESS_INFO.address}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="text-slate-300 hover:text-white transition-colors">
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="text-slate-300 hover:text-white transition-colors">
                  {BUSINESS_INFO.email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%205Startech%20Communication`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Helpdesk</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Copyright &copy; 2026 5Startech Communication. All rights reserved. <a href="/#admin" className="ml-2 text-slate-600 hover:text-slate-300 underline">Admin login</a>
          </div>

          <div className="flex items-center gap-4">
            <span>Lagos, Nigeria</span>
            <span>•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

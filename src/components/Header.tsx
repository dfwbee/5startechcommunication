import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { BUSINESS_INFO } from '../data/mockData';
import { 
  Menu, 
  X, 
  Phone, 
  MessageSquare, 
  Sun, 
  Moon, 
  Monitor, 
  Cpu, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  onOpenQuote: (prefillService?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote }) => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Products', href: '#products' },
    { name: 'UK Used', href: '#uk-used' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Theme-dependent styles
  const isLight = theme === 'light';
  const isDark = theme === 'dark';

  const headerBg = isLight 
    ? (isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm' : 'bg-white/80 backdrop-blur-sm')
    : isDark
      ? (isScrolled ? 'bg-[#030712]/95 backdrop-blur-md border-b border-slate-800 shadow-xl shadow-black/40' : 'bg-[#030712]/80 backdrop-blur-sm')
      : (isScrolled ? 'bg-[#0B111E]/95 backdrop-blur-md border-b border-slate-800/80 shadow-xl shadow-black/30' : 'bg-[#0B111E]/80 backdrop-blur-sm');

  const textColor = isLight ? 'text-slate-700 hover:text-amber-600' : 'text-slate-300 hover:text-amber-400';
  const logoTextColor = isLight ? 'text-slate-900' : 'text-white';
  const subTextColor = isLight ? 'text-slate-500' : 'text-slate-400';

  return (
    <header className={`sticky top-0 z-50 w-full transition-colors duration-200 ${headerBg}`}>
      {/* Top micro-bar for Lagos credentials & fast WhatsApp */}
      <div className={`hidden md:block text-xs py-2 px-4 border-b ${
        isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-950/80 border-slate-800 text-slate-300'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>CAC Reg No: <strong>{BUSINESS_INFO.cacNumber}</strong></span>
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="hidden lg:inline text-slate-500 dark:text-slate-400">
           Alimosho Engineering Workshop &amp; Island Corporate Dispatch
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a 
              href={`tel:${BUSINESS_INFO.phone}`} 
              className="inline-flex items-center gap-1.5 font-medium hover:text-blue-600 dark:hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <a 
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%205Startech%20Communication,%20I%20would%20like%20to%20inquire%20about%20your%20hardware%20and%20services.`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold hover:underline transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Wordmark */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="flex items-center gap-3 group focus:outline-none"
            id="brand-logo"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-blue-900 border border-blue-800 flex items-center justify-center text-white font-black shadow-sm group-hover:bg-blue-800 transition-colors">
              <Cpu className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className={`font-heading font-black text-lg sm:text-xl tracking-tight ${logoTextColor}`}>
                  5STARTECH
                </span>
                <span className="font-heading font-bold text-xs sm:text-sm tracking-wide text-blue-700 dark:text-blue-400 uppercase">
                  COMMUNICATION
                </span>
              </div>
              <span className={`text-[11px] font-medium tracking-normal ${subTextColor}`}>
                Enterprise IT Hardware &amp; Surveillance • Lagos
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`px-2 xl:px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-150 ${textColor}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Controls: Theme Switcher & Quote CTA */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Clean Light/Dark Toggle */}
            <button
              type="button"
              onClick={() => setTheme(isLight ? 'dark' : 'light')}
              className={`p-2 rounded-lg border transition-colors ${
                isLight ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
              title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label="Toggle theme"
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Quote Button */}
            <button
              type="button"
              onClick={() => onOpenQuote()}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-heading font-semibold text-sm tracking-wide shadow-sm active:scale-95 transition-all duration-150"
              id="header-quote-btn"
            >
              <span>Request Quote / RFQ</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Mobile Menu & Theme button */}
          <div className="flex sm:hidden items-center gap-2">
            {/* Quick Mobile Theme Button */}
            <button
              type="button"
              onClick={() => {
                if (theme === 'default') setTheme('light');
                else if (theme === 'light') setTheme('dark');
                else setTheme('default');
              }}
              className={`p-2 rounded-md border ${
                isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 border-slate-800 text-amber-400'
              }`}
              aria-label="Cycle Theme"
            >
              {theme === 'light' ? <Sun className="w-4 h-4" /> : theme === 'dark' ? <Moon className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
            </button>

            {/* Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md ${
                isLight ? 'text-slate-800 hover:bg-slate-100' : 'text-slate-200 hover:bg-slate-800'
              }`}
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`sm:hidden border-b px-4 pt-2 pb-6 space-y-3 transition-all ${
          isLight ? 'bg-white border-slate-200' : isDark ? 'bg-[#030712] border-slate-800' : 'bg-[#0B111E] border-slate-800'
        }`}>
          <div className="flex flex-col space-y-1 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`px-3 py-2 rounded-md text-base font-medium ${
                  isLight ? 'text-slate-800 hover:bg-slate-100' : 'text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-heading font-semibold text-sm tracking-wide shadow-sm"
            >
              <span>Request Quote / RFQ</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>

            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%205Startech%20Communication,%20I%20need%20a%20quote%20for%20hardware/repair.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-600/40 text-emerald-700 dark:text-emerald-400 font-medium text-xs tracking-wide"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp Directly</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

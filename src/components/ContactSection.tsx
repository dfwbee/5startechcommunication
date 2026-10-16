import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { BUSINESS_INFO } from '../data/mockData';
import { sendQuoteViaWhatsApp, sendQuoteViaEmail } from '../lib/quote';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Building2
} from 'lucide-react';

interface ContactSectionProps {
  initialServiceOrProduct?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialServiceOrProduct = '' }) => {
  const { theme } = useTheme();

  const isLight = theme === 'light';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceNeeded: initialServiceOrProduct || 'Hardware Sales & Procurement',
    quantity: '1 - 5 units',
    message: '',
    contactPreference: 'whatsapp' as 'whatsapp' | 'phone' | 'email'
  });

  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (submittedSuccess) setSubmittedSuccess(false);
  };

  const toFields = () => ({
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    item: formData.serviceNeeded,
    quantity: formData.quantity,
    details: formData.message,
  });

  // Nothing is stored on a server. The request goes straight to the owner's WhatsApp or email inbox.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, contact phone number, and brief description of requirements.');
      return;
    }
    setErrorMessage('');
    if (formData.contactPreference === 'email') sendQuoteViaEmail(toFields());
    else sendQuoteViaWhatsApp(toFields());
    setSubmittedSuccess(true);
  };

  const handleWhatsAppDirect = () => sendQuoteViaWhatsApp(toFields());

  return (
    <section 
      id="contact" 
      className={`py-16 lg:py-24 transition-colors duration-200 border-b ${
        isLight 
          ? 'bg-slate-50 text-slate-900 border-slate-200' 
          : 'bg-[#0B111E] text-slate-100 border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block">
            Direct Commercial Communication &amp; RFQs
          </span>
          
          <h2 className={`font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Request an Itemized Quotation or Book Consultation
          </h2>
          
          <p className={`text-base sm:text-lg leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            Connect directly with our Alimosho engineering desk. Rapid turnaround on formal pro-forma invoices, site surveys, and commercial hardware specifications.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp Callout Banner */}
            <div className={`p-6 rounded-xl border flex flex-col justify-between space-y-4 ${
              isLight 
                ? 'bg-emerald-50 border-emerald-200' 
                : 'bg-emerald-950/30 border-emerald-800/60'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-heading font-bold text-base ${
                    isLight ? 'text-emerald-900' : 'text-emerald-300'
                  }`}>
                    Fast WhatsApp Technical Desk
                  </h3>
                  <p className={`text-xs ${isLight ? 'text-emerald-800' : 'text-emerald-400/90'}`}>
                    Direct line to our senior hardware engineers for instant stock availability &amp; pro-forma issuance.
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%20Startech%20%26%20Communications,%20I%20would%20like%20to%20request%20a%20quote.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-xs transition-colors"
                id="contact-whatsapp-btn"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>

            {/* Official Business Details Card */}
            <div className={`rounded-xl border p-6 space-y-5 ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#101728] border-slate-800'
            }`}>
              <h4 className={`font-heading font-bold text-sm uppercase tracking-wider ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                Engineering Desk Contact Details
              </h4>

              <div className="space-y-4 text-xs">
                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-400 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase">Phone Hotline</span>
                    <a 
                      href={`tel:${BUSINESS_INFO.phone}`} 
                      className={`text-sm font-semibold hover:text-blue-600 transition-colors ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-400 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase">Official Corporate Email</span>
                    <a 
                      href={`mailto:${BUSINESS_INFO.email}`} 
                      className={`text-sm font-semibold hover:text-blue-600 transition-colors ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Lagos Address */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase">Workshop &amp; Walk-in Lab</span>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      {BUSINESS_INFO.address}
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-400 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase">Business Hours</span>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      {BUSINESS_INFO.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Corporate Vendor Credential Banner */}
            <div className={`p-4 rounded-xl border flex items-center gap-3 text-xs ${
              isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-[#101728] border-slate-800 text-slate-300'
            }`}>
              <ShieldCheck className="w-5 h-5 text-blue-700 dark:text-blue-400 shrink-0" />
              <span>
                CAC Reg No: <strong>{BUSINESS_INFO.cacNumber}</strong> • FIRS Tax Compliant
              </span>
            </div>

          </div>

          {/* Right Column: Complete Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className={`rounded-xl border p-6 sm:p-8 shadow-xs ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#101728] border-slate-800'
            }`}>
              
              <div className="mb-6 space-y-1">
                <h3 className={`font-heading font-black text-2xl ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Submit Hardware or Service Inquiry
                </h3>
                <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Fill out this brief form to receive an itemized quote or book a technical consultation.
                </p>
              </div>

              {submittedSuccess ? (
                <div className={`p-8 rounded-xl border text-center space-y-4 ${
                  isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                }`}>
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-xl">
                      Almost done: press Send
                    </h4>
                    <p className="text-xs sm:text-sm max-w-md mx-auto">
                      Thank you, <strong>{formData.name}</strong>. We opened a ready-written message for <strong>{formData.serviceNeeded}</strong>. It only reaches us once you press <strong>Send</strong> in {formData.contactPreference === 'email' ? 'your email app' : 'WhatsApp'}.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-semibold text-xs tracking-wide flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open WhatsApp Again</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedSuccess(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          serviceNeeded: 'Hardware Sales & Procurement',
                          quantity: '1 - 5 units',
                          message: '',
                          contactPreference: 'whatsapp'
                        });
                      }}
                      className="text-xs underline hover:text-slate-900 dark:hover:text-white"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {errorMessage && (
                    <div className="p-3 rounded-lg border border-red-200 bg-red-50 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                        isLight ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        Full Name / Company Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Tunde Balogun / Apex Legal Ltd"
                        className={`w-full px-3.5 py-2.5 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                          isLight 
                            ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' 
                            : 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                        isLight ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 0802 345 6789"
                        className={`w-full px-3.5 py-2.5 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                          isLight 
                            ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' 
                            : 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email & Service Needed */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                        isLight ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. procurement@company.ng"
                        className={`w-full px-3.5 py-2.5 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                          isLight 
                            ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' 
                            : 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                        isLight ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        Service or Hardware Scope *
                      </label>
                      <select
                        name="serviceNeeded"
                        value={formData.serviceNeeded}
                        onChange={handleChange}
                        className={`w-full px-3.5 py-2.5 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                          isLight 
                            ? 'bg-slate-50 border-slate-300 text-slate-900' 
                            : 'bg-slate-900 border-slate-700 text-white'
                        }`}
                      >
                        <option value="Hardware Sales & Procurement">Hardware Sales (Laptops, Desktops, Printers)</option>
                        <option value="Computer & Printer Repair">Computer &amp; Printer Diagnostics / Repair</option>
                        <option value="CCTV/NVR Installation">CCTV/NVR Security Camera Installation</option>
                        <option value="Networking Solutions">Networking Solutions &amp; Structured Cabling</option>
                        <option value="IT Maintenance & SLA">IT Maintenance Retainer (Proactive Support)</option>
                        <option value="General Enterprise Consultation">Other Enterprise Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Quantity and Preferred Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                        isLight ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        Estimated Quantity
                      </label>
                      <select
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className={`w-full px-3.5 py-2.5 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                          isLight 
                            ? 'bg-slate-50 border-slate-300 text-slate-900' 
                            : 'bg-slate-900 border-slate-700 text-white'
                        }`}
                      >
                        <option value="Single Device / 1 unit">Single Device / 1 Unit</option>
                        <option value="2 - 5 units (Small Office)">2 – 5 Units (Small Office)</option>
                        <option value="6 - 20 units (Growing SME)">6 – 20 Units (Growing SME)</option>
                        <option value="20+ units (Corporate Tender)">20+ Units (Enterprise Fleet)</option>
                        <option value="Site Survey Inspection Only">Site Survey Inspection Only</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                        isLight ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        Preferred Contact Method
                      </label>
                      <div className="flex gap-2">
                        {(['whatsapp', 'phone', 'email'] as const).map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, contactPreference: method }))}
                            className={`flex-1 py-2 rounded-lg text-xs font-medium uppercase border transition-all ${
                              formData.contactPreference === method
                                ? 'bg-blue-900 border-blue-900 text-white font-bold'
                                : isLight ? 'bg-slate-50 border-slate-300 text-slate-700' : 'bg-slate-900 border-slate-700 text-slate-400'
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                      isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      Specific Hardware Requirements or Problem Description *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please specify hardware models (e.g. Dell Core i7, Hikvision 8-Channel NVR, Cat6 pure copper) or issue details (e.g. laptop power failure, fuser paper jam, office cabling)..."
                      className={`w-full px-3.5 py-2.5 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                        isLight 
                          ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' 
                          : 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500'
                      }`}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:flex-1 py-3 px-6 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-heading font-semibold text-sm tracking-wide shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2"
                      id="contact-submit-btn"
                    >
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>{formData.contactPreference === 'email' ? 'Send Quote by Email' : 'Send Quote Request'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="w-full sm:w-auto py-3 px-5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 text-center pt-1">
                    Strict client confidentiality. We do not disclose corporate contact details.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

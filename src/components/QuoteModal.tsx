import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { sendQuoteViaWhatsApp, sendQuoteViaEmail } from '../lib/quote';
import { X, Mail, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillServiceOrProduct?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  prefillServiceOrProduct = ''
}) => {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceOrItem: prefillServiceOrProduct || 'Hardware Sales & Procurement',
    quantity: '1 Unit (Individual/Single Device)',
    timeline: 'Immediate / Today',
    details: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [sentVia, setSentVia] = useState<'whatsapp' | 'email'>('whatsapp');
  const [error, setError] = useState('');

  // Re-fill whenever the modal opens, so the item always matches the button that was clicked.
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setError('');
      setFormData(prev => ({ ...prev, serviceOrItem: prefillServiceOrProduct || 'Hardware Sales & Procurement' }));
    }
  }, [isOpen, prefillServiceOrProduct]);

  if (!isOpen) return null;

  const isLight = theme === 'light';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toFields = () => ({
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    item: formData.serviceOrItem,
    quantity: formData.quantity,
    timeline: formData.timeline,
    details: formData.details,
  });

  // Nothing is stored on a server. The request goes straight to the owner's WhatsApp or email inbox.
  const send = (via: 'whatsapp' | 'email') => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please enter your name and phone number so we can reach you.');
      return;
    }
    setError('');
    setSentVia(via);
    if (via === 'whatsapp') sendQuoteViaWhatsApp(toFields());
    else sendQuoteViaEmail(toFields());
    setIsSuccess(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send('whatsapp');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className={`relative w-full max-w-xl rounded-2xl border overflow-hidden my-8 z-10 transition-all ${
        isLight 
          ? 'bg-white border-slate-200 text-slate-900 shadow-xl' 
          : 'bg-[#101728] border-slate-800 text-slate-100 shadow-xl'
      }`}>
        
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
        }`}>
          <div>
            <h3 className="font-heading font-black text-lg">
              Request Itemized Commercial Quotation
            </h3>
            <p className="text-xs text-blue-700 dark:text-blue-400 font-semibold">
              5Startech Communication • Lagos Engineering Team
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-heading font-bold text-xl">
                {sentVia === 'whatsapp' ? 'Almost done: press Send in WhatsApp' : 'Almost done: press Send in your email app'}
              </h4>
              <p className="text-xs sm:text-sm max-w-sm mx-auto text-slate-600 dark:text-slate-400">
                We opened a ready-written message for <strong>{formData.serviceOrItem}</strong>. Your request only reaches us once you press <strong>Send</strong> there. We will reply on <strong>{formData.phone}</strong>.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => sendQuoteViaWhatsApp(toFields())}
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-semibold text-xs tracking-wide flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp Again</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setIsSuccess(false); onClose(); }}
                  className="px-4 py-2 text-xs underline hover:text-slate-900 dark:hover:text-white"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-2.5 rounded-lg border border-red-200 bg-red-50 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-600 dark:text-slate-400">
                    Your Name / Company *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Babatunde Adeleke"
                    className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-600 dark:text-slate-400">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 0802 345 6789"
                    className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-600 dark:text-slate-400">
                  Item or Service Required *
                </label>
                <input
                  type="text"
                  required
                  name="serviceOrItem"
                  value={formData.serviceOrItem}
                  onChange={handleChange}
                  placeholder="e.g. Dell Latitude 7420, 8-Ch Hikvision CCTV, Printer Repair"
                  className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-600 dark:text-slate-400">
                    Quantity / Project Scale
                  </label>
                  <select
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                    }`}
                  >
                    <option value="1 Unit (Individual/Single Device)">1 Unit (Single Device)</option>
                    <option value="2 - 5 Units (Small Team)">2 – 5 Units (Small Team)</option>
                    <option value="6 - 15 Units (Medium Office)">6 – 15 Units (Medium Office)</option>
                    <option value="15+ Units (Corporate Fleet)">15+ Units (Corporate Fleet)</option>
                    <option value="Site Survey / Full Office Setup">Site Survey / Full Setup</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-600 dark:text-slate-400">
                    Deployment Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                    }`}
                  >
                    <option value="Immediate / Today">Immediate (Today in Lagos)</option>
                    <option value="Within 48 - 72 Hours">Within 48 – 72 Hours</option>
                    <option value="Next Week">Next Week</option>
                    <option value="Planning / Budgeting Phase">Planning / Budgeting Phase</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-600 dark:text-slate-400">
                  Additional Details or Delivery Address
                </label>
                <textarea
                  name="details"
                  rows={3}
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Specify exact RAM/SSD preferences, camera channel count, or site address (e.g. Victoria Island, Ikeja, Lekki)..."
                  className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 px-5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-semibold text-xs tracking-wide shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Quote Request on WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => send('email')}
                  className="w-full sm:w-auto py-3 px-4 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-heading font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-colors active:scale-95"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Send by Email</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

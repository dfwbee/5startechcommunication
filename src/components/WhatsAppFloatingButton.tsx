import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/mockData';
import { MessageSquare, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const defaultMessage = encodeURIComponent(
    'Hello 5Startech Communication, I am browsing your enterprise catalog and would like to inquire about hardware availability and commercial pricing.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Mini Tooltip */}
      {showTooltip && (
        <div className="relative bg-slate-900 text-white text-xs px-3.5 py-2.5 rounded-xl shadow-lg border border-slate-700 max-w-xs flex items-center gap-2">
          <span>Need rapid hardware quotation or Lagos repair advice?</span>
          <button 
            type="button" 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Dismiss chat tip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-semibold text-xs tracking-wide shadow-lg transition-transform active:scale-95"
        id="floating-whatsapp-btn"
        aria-label="Chat on WhatsApp with 5Startech Technical Desk"
      >
        <MessageSquare className="w-4 h-4 fill-white" />
        <span className="hidden sm:inline">WhatsApp Technical Desk</span>
      </a>
    </div>
  );
};

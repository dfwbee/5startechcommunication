import { BUSINESS_INFO } from '../data/mockData';

export interface QuoteFields {
  name: string;
  phone: string;
  email?: string;
  item: string;
  quantity?: string;
  timeline?: string;
  details?: string;
}

export function buildQuoteMessage(f: QuoteFields): string {
  const lines = [
    `*5STARTECH QUOTE REQUEST*`,
    `*Name:* ${f.name || 'Not given'}`,
    `*Phone:* ${f.phone || 'Not given'}`,
    f.email ? `*Email:* ${f.email}` : '',
    `*Item / Service:* ${f.item}`,
    f.quantity ? `*Quantity:* ${f.quantity}` : '',
    f.timeline ? `*Timeline:* ${f.timeline}` : '',
    `*Notes:* ${f.details?.trim() || 'Please send me a quotation.'}`,
  ];
  return lines.filter(Boolean).join('\n');
}

/** Opens WhatsApp with the quote pre-filled. The owner receives it as a normal WhatsApp chat. */
export function sendQuoteViaWhatsApp(f: QuoteFields): void {
  const url = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(buildQuoteMessage(f))}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/** Opens the customer's email app with the quote pre-filled, addressed to the business inbox. */
export function sendQuoteViaEmail(f: QuoteFields): void {
  const subject = `Quote request: ${f.item}`;
  const body = buildQuoteMessage(f).replace(/\*/g, '');
  window.location.href = `mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const formatNaira = (n: number) => '₦' + n.toLocaleString('en-NG');

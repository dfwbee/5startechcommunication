import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { BUSINESS_INFO } from '../data/mockData';
import { USED_DEVICES, USED_CATEGORIES, USED_WARRANTY_MONTHS } from '../data/ukUsedData';
import { formatNaira } from '../lib/quote';
import { UsedDevice } from '../types';
import { loadInventory } from '../lib/loadInventory';
import {
  Search, ShieldCheck, MessageSquare, ArrowRight, Laptop, Monitor, Printer, Tablet,
  Plug, Apple, MonitorSmartphone, PcCase, BadgeCheck, Plane, Wrench, Truck, ClipboardCheck
} from 'lucide-react';

interface UKUsedSectionProps {
  onOpenQuote: (itemOrService?: string) => void;
}

const PAGE_SIZE = 12;

const categoryIcon = (c: UsedDevice['category']) => {
  switch (c) {
    case 'laptops': return Laptop;
    case 'macbooks': return Apple;
    case 'desktops': return PcCase;
    case 'all-in-one': return MonitorSmartphone;
    case 'monitors': return Monitor;
    case 'tablets': return Tablet;
    case 'printers': return Printer;
    default: return Plug;
  }
};

/** Shows the owner's photo if one exists (public/devices/UK-001.jpg, or the "image" column), otherwise the icon. */
const DeviceImage: React.FC<{ device: UsedDevice; Icon: React.ElementType; isLight: boolean }> = ({ device, Icon, isLight }) => {
  const src = device.imageUrl || `${import.meta.env.BASE_URL}devices/${device.id}.jpg`;
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <Icon className={`w-14 h-14 ${isLight ? 'text-slate-400' : 'text-slate-600'}`} strokeWidth={1.25} />;
  }
  return <img src={src} alt={device.name} loading="lazy" onError={() => setFailed(true)} className="w-full h-full object-cover" />;
};

export const UKUsedSection: React.FC<UKUsedSectionProps> = ({ onOpenQuote }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [category, setCategory] = useState<string>('all');
  const [grade, setGrade] = useState<'all' | 'A' | 'B'>('all');
  const [sort, setSort] = useState<'default' | 'low' | 'high'>('default');
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [devices, setDevices] = useState<UsedDevice[]>(USED_DEVICES);

  // The owner edits public/uk-used-inventory.csv (Excel / Google Sheets). It is read here when the page opens.
  useEffect(() => { loadInventory().then(setDevices); }, []);

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: devices.length };
    devices.forEach((x) => { m[x.category] = (m[x.category] || 0) + 1; });
    return m;
  }, [devices]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = devices.filter((x) => {
      if (category !== 'all' && x.category !== category) return false;
      if (grade !== 'all' && x.grade !== grade) return false;
      if (!q) return true;
      const hay = [x.name, x.brand, x.id, ...x.tags, ...x.specs.map((s) => s.value)].join(' ').toLowerCase();
      return hay.includes(q);
    });
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [devices, category, grade, sort, query]);

  const shown = filtered.slice(0, visible);

  const resetPaging = () => setVisible(PAGE_SIZE);

  const card = isLight ? 'bg-white border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md' : 'bg-[#101728] border-slate-800 hover:border-amber-500/50';
  const muted = isLight ? 'text-slate-600' : 'text-slate-400';

  const trust = [
    { icon: ShieldCheck, title: `${USED_WARRANTY_MONTHS}-Month Warranty`, text: 'Every UK-used device is covered for hardware faults.' },
    { icon: Plane, title: 'Sourced from the UK', text: 'Ex-corporate and ex-lease stock, shipped to Lagos.' },
    { icon: ClipboardCheck, title: 'Tested Before Sale', text: 'Battery, screen, ports, keyboard and storage checked.' },
    { icon: Truck, title: 'Pickup or Lagos Delivery', text: 'Collect in Alimosho or get it delivered.' },
  ];

  return (
    <section
      id="uk-used"
      className={`py-16 lg:py-24 border-b transition-colors duration-200 ${
        isLight ? 'bg-white text-slate-900 border-slate-200' : 'bg-[#0B111E] text-slate-100 border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <BadgeCheck className="w-4 h-4" /> UK Used &middot; {devices.length} Devices Listed
            </span>
            <h2 className={`font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Quality UK-Used Laptops, Desktops &amp; More
            </h2>
            <p className={`text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Genuine business-class machines from the UK at a fraction of the new price, each one tested and backed by our {USED_WARRANTY_MONTHS}-month warranty.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenQuote('UK Used - Sourcing Request (tell us what you need)')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-heading font-semibold text-xs tracking-wide transition-all shadow-sm active:scale-95 shrink-0"
          >
            <span>Can&apos;t find it? Request a Quote</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {trust.map((t) => (
            <div key={t.title} className={`p-4 rounded-xl border flex gap-3 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
              <t.icon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-heading font-bold text-sm">{t.title}</div>
                <p className={`text-xs leading-relaxed ${muted}`}>{t.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4">
          {USED_CATEGORIES.map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => { setCategory(c.id); resetPaging(); }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium whitespace-nowrap border transition-all ${
                  active
                    ? 'bg-blue-900 border-blue-900 text-white font-bold'
                    : isLight ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{c.label}</span>
                <span className={`text-[11px] px-1.5 rounded ${active ? 'bg-white/20' : isLight ? 'bg-slate-100' : 'bg-slate-800'}`}>{counts[c.id] ?? 0}</span>
              </button>
            );
          })}
        </div>

        {/* Search / grade / sort */}
        <div className={`p-3 rounded-xl border flex flex-col lg:flex-row items-stretch lg:items-center gap-3 mb-8 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); resetPaging(); }}
              placeholder="Search e.g. ThinkPad, i7, 16GB, MacBook, UK-014..."
              aria-label="Search UK used devices"
              className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                isLight ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-500'
              }`}
            />
          </div>

          <div className={`p-1 rounded-lg border flex gap-1 text-xs ${isLight ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
            {([['all', 'Any grade'], ['A', 'Grade A'], ['B', 'Grade B']] as const).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => { setGrade(id); resetPaging(); }}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  grade === id ? 'bg-blue-900 text-white font-semibold' : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            aria-label="Sort devices"
            className={`px-3 py-2 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-blue-600 ${
              isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
            }`}
          >
            <option value="default">Sort: Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        <p className={`text-xs mb-4 ${muted}`}>Showing {shown.length} of {filtered.length} devices</p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className={`p-12 text-center rounded-2xl border space-y-3 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
            <p className="text-base font-semibold">No devices match that search.</p>
            <p className={`text-xs ${muted}`}>Try fewer words, or ask us to source it for you.</p>
            <div className="flex justify-center gap-2 pt-1">
              <button type="button" onClick={() => { setCategory('all'); setGrade('all'); setQuery(''); }} className="px-4 py-2 rounded-lg bg-blue-900 text-white text-xs font-semibold">Reset filters</button>
              <button type="button" onClick={() => onOpenQuote(`UK Used - Sourcing Request: ${query}`.trim())} className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold">Request this device</button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {shown.map((x) => {
              const Icon = categoryIcon(x.category);
              const priceText = x.price > 0 ? formatNaira(x.price) : 'price on request';
              const itemLabel = `UK Used: ${x.name} (${x.id}) - ${priceText}`;
              const wa = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello 5Startech, I'm interested in the UK-used ${x.name} (${x.id}) listed at ${priceText}. Is it available?`)}`;
              return (
                <article key={x.id} className={`rounded-xl border flex flex-col overflow-hidden transition-all duration-200 ${card}`}>
                  {/* Image or icon tile */}
                  <div className={`relative h-36 flex items-center justify-center ${isLight ? 'bg-slate-100' : 'bg-slate-900'}`}>
                    <DeviceImage device={x} Icon={Icon} isLight={isLight} />
                    <span className="absolute top-3 left-3 text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500 text-slate-950">UK Used</span>
                    <span className={`absolute top-3 right-3 text-[11px] font-semibold px-2 py-0.5 rounded border ${
                      x.grade === 'A' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-800 text-slate-100 border-slate-700'
                    }`}>Grade {x.grade}</span>
                    <span className="absolute bottom-2 right-3 text-[11px] font-mono text-slate-500">{x.id}</span>
                  </div>

                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">{x.brand}</div>
                      <h3 className={`font-heading font-bold text-base leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>{x.model}</h3>
                    </div>

                    <dl className="text-xs space-y-1">
                      {x.specs.map((s) => (
                        <div key={s.label} className="flex justify-between gap-3">
                          <dt className="text-slate-500 shrink-0">{s.label}</dt>
                          <dd className={`text-right font-medium ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{s.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-auto pt-3 border-t border-slate-200 dark:border-slate-800">
                      <div className="flex items-end justify-between gap-2">
                        <div>
                          <div className="font-heading font-black text-xl text-blue-900 dark:text-amber-400">{x.price > 0 ? formatNaira(x.price) : 'Ask for price'}</div>
                          <div className="text-[11px] text-slate-500">Confirm on quote</div>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 text-right">
                          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                          <span>{USED_WARRANTY_MONTHS}-mo warranty</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`p-3 border-t grid grid-cols-2 gap-2 text-xs font-semibold ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'}`}>
                    <button
                      type="button"
                      onClick={() => onOpenQuote(itemLabel)}
                      className="py-2 px-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Get Quote</span>
                    </button>
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {visible < filtered.length && (
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className={`px-6 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${
                isLight ? 'border-slate-300 hover:bg-slate-100 text-slate-800' : 'border-slate-700 hover:bg-slate-800 text-slate-100'
              }`}
            >
              Show {Math.min(PAGE_SIZE, filtered.length - visible)} more devices
            </button>
          </div>
        )}

        {/* Warranty + grading + how it works */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-14">
          <div className={`p-6 rounded-xl border space-y-3 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
            <h3 className="font-heading font-bold text-lg flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-500" /> {USED_WARRANTY_MONTHS}-Month Warranty</h3>
            <ul className={`text-sm space-y-1.5 list-disc pl-5 ${muted}`}>
              <li>Covers hardware faults under normal use.</li>
              <li>We repair or replace the faulty part or unit.</li>
              <li>Does not cover liquid damage, drops or misuse.</li>
              <li>Keep your invoice. It is your warranty proof.</li>
            </ul>
          </div>
          <div className={`p-6 rounded-xl border space-y-3 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
            <h3 className="font-heading font-bold text-lg flex items-center gap-2"><Wrench className="w-5 h-5 text-amber-500" /> What Grade A / B Means</h3>
            <ul className={`text-sm space-y-1.5 ${muted}`}>
              <li><strong className={isLight ? 'text-slate-900' : 'text-white'}>Grade A:</strong> clean body, little or no visible wear.</li>
              <li><strong className={isLight ? 'text-slate-900' : 'text-white'}>Grade B:</strong> light scuffs or marks on the body. Works exactly the same and costs less.</li>
              <li>Both grades pass the same function tests.</li>
            </ul>
          </div>
          <div className={`p-6 rounded-xl border space-y-3 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
            <h3 className="font-heading font-bold text-lg flex items-center gap-2"><ClipboardCheck className="w-5 h-5 text-blue-500" /> How to Buy</h3>
            <ol className={`text-sm space-y-1.5 list-decimal pl-5 ${muted}`}>
              <li>Tap <strong>Get Quote</strong> on any device.</li>
              <li>Send it on WhatsApp or email. It reaches us instantly.</li>
              <li>We confirm stock and final price.</li>
              <li>Pay, then pick up or get delivery in Lagos.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

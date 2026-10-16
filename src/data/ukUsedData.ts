import { UsedDevice, UsedCategory } from '../types';

/**
 * UK-USED INVENTORY
 * ------------------------------------------------------------------
 * HOW THE OWNER EDITS THIS: each device is one line below.
 *   d(category, brand, model, grade, priceInNaira, [[label, value], ...], [tags])
 * - To change a price, change the number.
 * - To remove a device, delete its line. To add one, copy a line.
 * - To show a real photo, add  imageUrl: '/devices/uk-001.jpg'  (put the file in /public/devices/).
 * Prices below are STARTING ESTIMATES - update them to match your real stock.
 */

export const USED_WARRANTY_MONTHS = 3;

export const USED_CATEGORIES: { id: UsedCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All UK Used' },
  { id: 'laptops', label: 'Laptops' },
  { id: 'macbooks', label: 'MacBooks' },
  { id: 'desktops', label: 'Desktops & Mini PCs' },
  { id: 'all-in-one', label: 'All-in-One PCs' },
  { id: 'monitors', label: 'Monitors' },
  { id: 'tablets', label: 'Tablets' },
  { id: 'printers', label: 'Printers' },
  { id: 'accessories', label: 'Docks & Accessories' },
];

let counter = 0;
const d = (
  category: UsedCategory,
  brand: string,
  model: string,
  grade: 'A' | 'B',
  price: number,
  specs: [string, string][],
  tags: string[] = []
): UsedDevice => {
  counter += 1;
  return {
    id: `UK-${String(counter).padStart(3, '0')}`,
    category,
    brand,
    model,
    name: `${brand} ${model}`,
    grade,
    price,
    specs: specs.map(([label, value]) => ({ label, value })),
    tags,
  };
};

const L = (cpu: string, ram: string, ssd: string, screen: string): [string, string][] => [
  ['Processor', cpu], ['RAM', ram], ['Storage', ssd], ['Display', screen],
];

export const USED_DEVICES: UsedDevice[] = [
  // ---------- Laptops (23) ----------
  d('laptops', 'Dell', 'Latitude 7420', 'A', 395000, L('Core i7-1185G7', '16GB', '512GB NVMe SSD', '14" FHD'), ['Slim', 'Thunderbolt 4']),
  d('laptops', 'Dell', 'Latitude 5420', 'A', 310000, L('Core i5-1145G7', '16GB', '256GB NVMe SSD', '14" FHD'), ['Best seller']),
  d('laptops', 'Dell', 'Latitude 5410', 'B', 235000, L('Core i5-10310U', '8GB', '256GB NVMe SSD', '14" FHD'), ['Budget pick']),
  d('laptops', 'Dell', 'Latitude 7490', 'A', 265000, L('Core i7-8650U', '16GB', '512GB NVMe SSD', '14" FHD'), ['Lightweight']),
  d('laptops', 'Dell', 'Latitude 3520', 'B', 250000, L('Core i5-1135G7', '8GB', '256GB NVMe SSD', '15.6" FHD'), ['Big screen']),
  d('laptops', 'Dell', 'XPS 13 9310', 'A', 410000, L('Core i7-1185G7', '16GB', '512GB NVMe SSD', '13.4" FHD+'), ['Premium', 'Slim']),
  d('laptops', 'HP', 'EliteBook 840 G8', 'A', 380000, L('Core i5-1145G7', '16GB', '512GB NVMe SSD', '14" FHD'), ['Aluminium body']),
  d('laptops', 'HP', 'EliteBook 840 G7', 'A', 290000, L('Core i5-10310U', '16GB', '256GB NVMe SSD', '14" FHD'), ['Business']),
  d('laptops', 'HP', 'EliteBook 840 G5', 'B', 195000, L('Core i5-8350U', '8GB', '256GB NVMe SSD', '14" FHD'), ['Budget pick']),
  d('laptops', 'HP', 'EliteBook 830 G7', 'A', 320000, L('Core i7-10810U', '16GB', '512GB NVMe SSD', '13.3" FHD'), ['Compact']),
  d('laptops', 'HP', 'ProBook 450 G8', 'A', 265000, L('Core i5-1135G7', '8GB', '256GB NVMe SSD', '15.6" FHD'), ['Numpad']),
  d('laptops', 'HP', 'ProBook 430 G7', 'B', 215000, L('Core i5-10210U', '8GB', '256GB NVMe SSD', '13.3" FHD'), ['Student pick']),
  d('laptops', 'HP', 'ZBook Firefly 14 G8', 'A', 450000, [...L('Core i7-1165G7', '16GB', '512GB NVMe SSD', '14" FHD'), ['Graphics', 'NVIDIA Quadro T500']], ['Workstation', 'Design']),
  d('laptops', 'Lenovo', 'ThinkPad T14 Gen 2', 'A', 360000, L('Core i5-1145G7', '16GB', '512GB NVMe SSD', '14" FHD'), ['Rugged', 'Best seller']),
  d('laptops', 'Lenovo', 'ThinkPad T480', 'A', 225000, L('Core i5-8350U', '16GB', '256GB NVMe SSD', '14" FHD'), ['Coder favourite']),
  d('laptops', 'Lenovo', 'ThinkPad T490', 'A', 275000, L('Core i5-8265U', '16GB', '512GB NVMe SSD', '14" FHD'), ['Rugged']),
  d('laptops', 'Lenovo', 'ThinkPad X1 Carbon Gen 9', 'A', 470000, L('Core i7-1185G7', '16GB', '512GB NVMe SSD', '14" WUXGA'), ['Premium', 'Ultra-light']),
  d('laptops', 'Lenovo', 'ThinkPad X1 Carbon Gen 7', 'A', 330000, L('Core i7-8665U', '16GB', '512GB NVMe SSD', '14" FHD'), ['Ultra-light']),
  d('laptops', 'Lenovo', 'ThinkPad L14 Gen 2', 'B', 255000, L('Core i5-1135G7', '8GB', '256GB NVMe SSD', '14" FHD'), ['Value']),
  d('laptops', 'Lenovo', 'ThinkPad X270', 'B', 160000, L('Core i5-7300U', '8GB', '256GB SSD', '12.5" HD'), ['Cheapest', 'Compact']),
  d('laptops', 'Lenovo', 'ThinkPad P53', 'A', 520000, [...L('Core i7-9850H', '32GB', '512GB NVMe SSD', '15.6" FHD'), ['Graphics', 'NVIDIA Quadro T1000']], ['Workstation', 'Video editing']),
  d('laptops', 'Microsoft', 'Surface Laptop 3 (13.5")', 'A', 280000, L('Core i5-1035G7', '8GB', '256GB SSD', '13.5" touch'), ['Touchscreen']),
  d('laptops', 'Microsoft', 'Surface Pro 7', 'A', 245000, L('Core i5-1035G4', '8GB', '128GB SSD', '12.3" touch'), ['2-in-1', 'Touchscreen']),

  // ---------- MacBooks (4) ----------
  d('macbooks', 'Apple', 'MacBook Air M1 (2020)', 'A', 620000, L('Apple M1', '8GB', '256GB SSD', '13.3" Retina'), ['Best seller']),
  d('macbooks', 'Apple', 'MacBook Pro 13" M1 (2020)', 'A', 700000, L('Apple M1', '8GB', '256GB SSD', '13.3" Retina'), ['Long battery']),
  d('macbooks', 'Apple', 'MacBook Pro 13" (2019)', 'B', 380000, L('Core i5 (Touch Bar)', '8GB', '256GB SSD', '13.3" Retina'), ['Budget Mac']),
  d('macbooks', 'Apple', 'MacBook Pro 14" M1 Pro (2021)', 'A', 1250000, L('Apple M1 Pro', '16GB', '512GB SSD', '14.2" Liquid Retina XDR'), ['Pro', 'Video editing']),

  // ---------- Desktops & Mini PCs (9) ----------
  d('desktops', 'Dell', 'OptiPlex 7080 SFF', 'A', 235000, L('Core i5-10500', '16GB', '512GB NVMe SSD', 'No monitor'), ['Small form factor']),
  d('desktops', 'Dell', 'OptiPlex 3080 Micro', 'A', 195000, L('Core i5-10500T', '8GB', '256GB NVMe SSD', 'No monitor'), ['Tiny', 'Low power']),
  d('desktops', 'Dell', 'OptiPlex 7070 Tower', 'A', 255000, L('Core i7-9700', '16GB', '512GB NVMe SSD', 'No monitor'), ['Expandable']),
  d('desktops', 'Dell', 'Precision 3640 Tower', 'A', 480000, [...L('Core i7-10700', '32GB', '512GB NVMe SSD', 'No monitor'), ['Graphics', 'NVIDIA Quadro P2200']], ['Workstation', 'CAD']),
  d('desktops', 'HP', 'EliteDesk 800 G5 SFF', 'A', 210000, L('Core i5-9500', '16GB', '256GB NVMe SSD', 'No monitor'), ['Office']),
  d('desktops', 'HP', 'EliteDesk 800 G4 Mini', 'B', 165000, L('Core i5-8500T', '8GB', '256GB SSD', 'No monitor'), ['Tiny', 'Budget pick']),
  d('desktops', 'HP', 'ProDesk 400 G6 SFF', 'A', 205000, L('Core i5-10500', '8GB', '256GB NVMe SSD', 'No monitor'), ['Office']),
  d('desktops', 'Lenovo', 'ThinkCentre M920q Tiny', 'A', 175000, L('Core i5-8500T', '16GB', '256GB NVMe SSD', 'No monitor'), ['Tiny', 'Low power']),
  d('desktops', 'Lenovo', 'ThinkCentre M70q Tiny', 'A', 190000, L('Core i5-10400T', '8GB', '256GB NVMe SSD', 'No monitor'), ['Tiny', 'Low power']),

  // ---------- All-in-One PCs (3) ----------
  d('all-in-one', 'HP', 'EliteOne 800 G5 AIO 23.8"', 'A', 275000, L('Core i5-9500', '8GB', '256GB NVMe SSD', '23.8" FHD'), ['Clean desk']),
  d('all-in-one', 'Dell', 'OptiPlex 7480 AIO 23.8"', 'A', 345000, L('Core i5-10500', '16GB', '512GB NVMe SSD', '23.8" FHD'), ['Webcam built in']),
  d('all-in-one', 'Lenovo', 'ThinkCentre M920z AIO 23.8"', 'B', 255000, L('Core i5-8500', '8GB', '256GB NVMe SSD', '23.8" FHD'), ['Value']),

  // ---------- Monitors (6) ----------
  d('monitors', 'Dell', 'UltraSharp U2419H 24"', 'A', 85000, [['Size', '24"'], ['Resolution', '1920x1080 IPS'], ['Ports', 'HDMI, DisplayPort, USB hub']], ['Thin bezel']),
  d('monitors', 'Dell', 'P2422H 24"', 'A', 80000, [['Size', '24"'], ['Resolution', '1920x1080 IPS'], ['Ports', 'HDMI, DisplayPort, VGA']], ['Height adjustable']),
  d('monitors', 'HP', 'EliteDisplay E243 24"', 'B', 70000, [['Size', '24"'], ['Resolution', '1920x1080 IPS'], ['Ports', 'HDMI, DisplayPort, VGA']], ['Budget pick']),
  d('monitors', 'Lenovo', 'ThinkVision T24i-20 24"', 'A', 72000, [['Size', '24"'], ['Resolution', '1920x1080 IPS'], ['Ports', 'HDMI, DisplayPort, VGA']], ['Office']),
  d('monitors', 'Dell', 'UltraSharp U2720Q 27" 4K', 'A', 190000, [['Size', '27"'], ['Resolution', '3840x2160 4K IPS'], ['Ports', 'USB-C, HDMI, DisplayPort']], ['4K', 'Design']),
  d('monitors', 'Dell', 'P2723QE 27" 4K', 'A', 175000, [['Size', '27"'], ['Resolution', '3840x2160 4K IPS'], ['Ports', 'USB-C hub, HDMI, DisplayPort']], ['4K', 'USB-C']),

  // ---------- Tablets (4) ----------
  d('tablets', 'Apple', 'iPad 9th Gen (10.2")', 'A', 190000, [['Storage', '64GB'], ['Connectivity', 'Wi-Fi'], ['Display', '10.2" Retina']], ['Student pick']),
  d('tablets', 'Apple', 'iPad Air 4th Gen (10.9")', 'A', 290000, [['Storage', '64GB'], ['Connectivity', 'Wi-Fi'], ['Display', '10.9" Liquid Retina']], ['Apple Pencil 2 support']),
  d('tablets', 'Apple', 'iPad Pro 11" 2nd Gen (2020)', 'A', 360000, [['Storage', '128GB'], ['Connectivity', 'Wi-Fi'], ['Display', '11" Liquid Retina']], ['Pro', 'Apple Pencil 2 support']),
  d('tablets', 'Samsung', 'Galaxy Tab S6 Lite', 'B', 150000, [['Storage', '64GB'], ['Connectivity', 'Wi-Fi'], ['Display', '10.4" TFT']], ['S Pen included']),

  // ---------- Printers (4) ----------
  d('printers', 'HP', 'LaserJet Pro M404dn', 'A', 165000, [['Type', 'Mono laser'], ['Speed', '38 ppm'], ['Features', 'Auto duplex, Ethernet']], ['Office workhorse']),
  d('printers', 'HP', 'Color LaserJet Pro MFP M479fdw', 'A', 320000, [['Type', 'Colour laser, all-in-one'], ['Functions', 'Print, copy, scan, fax'], ['Features', 'Wi-Fi, auto duplex, ADF']], ['Colour', 'All-in-one']),
  d('printers', 'Kyocera', 'ECOSYS M2040dn', 'A', 240000, [['Type', 'Mono laser, all-in-one'], ['Functions', 'Print, copy, scan'], ['Features', 'Auto duplex, Ethernet, ADF']], ['Low cost per page']),
  d('printers', 'Brother', 'HL-L5100DN', 'B', 150000, [['Type', 'Mono laser'], ['Speed', '40 ppm'], ['Features', 'Auto duplex, Ethernet']], ['Budget pick']),

  // ---------- Docks & Accessories (3) ----------
  d('accessories', 'Dell', 'WD19 USB-C Dock (130W)', 'A', 85000, [['Connection', 'USB-C'], ['Outputs', 'Dual 4K display, HDMI, DisplayPort'], ['Power', '130W charging']], ['One-cable desk']),
  d('accessories', 'Lenovo', 'ThinkPad USB-C Dock Gen 2', 'A', 80000, [['Connection', 'USB-C'], ['Outputs', 'Dual display, HDMI, DisplayPort'], ['Power', '90W charging']], ['One-cable desk']),
  d('accessories', 'HP', 'Thunderbolt Dock G2 (230W)', 'A', 95000, [['Connection', 'Thunderbolt 3'], ['Outputs', 'Dual 4K display, HDMI, DisplayPort'], ['Power', '230W adapter']], ['One-cable desk']),
];

import { Product, ServiceItem, ProjectItem, TestimonialItem } from '../types';

export const BUSINESS_INFO = {
  name: '5Startech Communication',
  legalName: '5startech communication',
  shortName: '5Startech',
  tagline: 'Reliable Computing & Security Hardware, Set Up Right the First Time.',
  location: 'Lagos, Nigeria',
  address: 'Commercial Avenue & Tech Corridor, , Lagos State, Nigeria',
  phone: '08153237684',
  phoneDisplay: '0815 323 7684',
  whatsappNumber: '2348153237684',
  email: '5startechcommunication@gmail.com',
  supportEmail: '5startechcommunication@gmail.com',
  hours: 'Monday – Friday: 8:00 AM – 6:00 PM | Saturday: 9:00 AM – 4:00 PM',
  cacNumber: '9717899',
  cacDisplay: 'CAC Reg No: 9717899',
  cacPlaceholder: 'BN: 9717899',
  smedanPlaceholder: 'SMEDAN-ID: [Verified Enterprise Registered]',
  serviceAreas: [
    'Alimosho',
    'Victoria Island (V.I)',
    'Lekki Phase 1 & Expressway Corridor',
    'Ikoyi & Marina Business Hubs',
    'Surulere & Yaba Innovation District',
    'Magodo & Ikeja GRA',
    'Greater Lagos & Inter-State Dispatch'
  ]
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'hardware-sales',
    number: '01',
    title: 'Hardware Sales',
    tagline: 'Enterprise-grade computing hardware tested for longevity.',
    summary: 'Quality new and refurbished computers, laptops, printers and networking equipment.',
    detailedScope: [
      'Brand new business laptops and workstations with full manufacturer warranties',
      'Certified Grade-A refurbished business laptops (HP EliteBook, Dell Latitude, Lenovo ThinkPad)',
      'Enterprise laser printers, multifunction copiers, and continuous ink tank systems',
      'Heavy-duty networking switches, routers, rack mounts, and cabling accessories',
      'Rigorous 32-point pre-delivery hardware diagnostic inspection'
    ],
    deliverables: [
      'Pre-configured operating systems with essential drivers',
      'Stress-tested batteries and thermal health checks',
      'Detailed spec sheet and verified warranty document'
    ],
    typicalTurnaround: 'Same-day pickup / 24-hr Lagos delivery',
    idealFor: 'Businesses, corporate offices, remote professionals, students, and home setups',
    iconName: 'Laptop',
    badge: 'Hardware & Sales'
  },
  {
    id: 'computer-printer-repair',
    number: '02',
    title: 'Computer & Printer Repair',
    tagline: 'Component-level precision diagnostics and authentic parts.',
    summary: 'Professional diagnostics, maintenance and repairs.',
    detailedScope: [
      'Motherboard micro-soldering, chip-level diagnostics, and power circuit repairs',
      'Screen replacements, keyboard assemblies, and hinge restorations',
      'Printer laser fuser unit repairs, paper feed roller replacements, and printhead unclogging',
      'RAM, NVMe SSD speed upgrades, and thermal paste re-application',
      'Firmware recovery, OS clean installations, and virus eradication'
    ],
    deliverables: [
      'Written diagnostic report with clear estimate before commencing work',
      'Replaced parts returned for verification upon request',
      'Post-repair stress testing with 30-day workmanship guarantee'
    ],
    typicalTurnaround: '24 – 48 Hours for standard diagnostics',
    idealFor: 'Laptops with boot failures, broken hinges, noisy fans, and malfunctioning office printers',
    iconName: 'Wrench',
    badge: 'Diagnostic & Repair'
  },
  {
    id: 'cctv-nvr-installation',
    number: '03',
    title: 'CCTV/NVR Installation',
    tagline: 'Zero-blindspot high-definition surveillance with 24/7 remote mobile monitoring.',
    summary: 'Complete surveillance installation for homes, offices and businesses.',
    detailedScope: [
      'High-resolution IP surveillance cameras (4K, 5MP, and 2MP Starlight night vision)',
      'Network Video Recorder (NVR) and Digital Video Recorder (DVR) server rack configuration',
      'PoE (Power over Ethernet) structured cabling with professional conduits and trunking',
      'Mobile app configuration for real-time remote monitoring on iOS and Android devices',
      'Motion detection alerts, smart perimeter tripwire alarms, and local storage backup'
    ],
    deliverables: [
      'Comprehensive site survey and camera placement schematic',
      'Clean cable dressing inside durable PVC / metal conduits',
      'User training session and mobile live feed configuration'
    ],
    typicalTurnaround: '1 – 3 days depending on camera count and facility size',
    idealFor: 'Corporate offices, warehouses, residential estates, retail stores, and private compounds',
    iconName: 'ShieldCheck',
    badge: 'Surveillance & Security'
  },
  {
    id: 'networking-solutions',
    number: '04',
    title: 'Networking Solutions',
    tagline: 'High-speed, congestion-free network architectures designed for enterprise uptime.',
    summary: 'Routers, switches, cabling, access points and network configuration.',
    detailedScope: [
      'Structured Cat6/Cat6A UTP/STP structured copper cabling and patch panel termination',
      'Deployment of enterprise Wi-Fi 6 seamless roaming Access Points (Ubiquiti, Cisco, TP-Link Omada)',
      'Managed Gigabit PoE switches, VLAN network segregation, and bandwidth management',
      'Dual-WAN failover router setups for uninterrupted internet backup (Fiber + 5G/4G failover)',
      'Server rack dressing, cable labeling, and airflow optimization'
    ],
    deliverables: [
      'Comprehensive network diagram and IP addressing schema',
      'Wi-Fi signal heat-map optimization report across the building',
      'Fluke/cable continuity test certificates for every port'
    ],
    typicalTurnaround: 'Site survey within 24 hours; execution mapped to project milestones',
    idealFor: 'Growing SMEs, co-working spaces, multistory offices, schools, and smart homes',
    iconName: 'Network',
    badge: 'Infrastructure'
  },
  {
    id: 'it-maintenance',
    number: '05',
    title: 'IT Maintenance',
    tagline: 'Proactive preventative care to eliminate expensive downtime before it occurs.',
    summary: 'Ongoing technical support and maintenance.',
    detailedScope: [
      'Scheduled preventive physical dust cleaning, fan lubrication, and thermal compound renewal',
      'Operating system patch management, security antivirus updates, and data backup routines',
      'Network switch and router log audits to anticipate bottleneck issues',
      'Surveillance storage disk health checks and camera lens alignment',
      'Retainer SLA (Service Level Agreement) options with priority emergency response'
    ],
    deliverables: [
      'Monthly/Quarterly IT health report with actionable recommendations',
      'Dedicated standby engineer for onsite and remote desktop support',
      'Preferential discounted rates on spare parts and hardware upgrades'
    ],
    typicalTurnaround: 'Scheduled monthly/quarterly visits + Rapid emergency dispatch',
    idealFor: 'Businesses requiring reliable IT infrastructure without the overhead of full-time IT staff',
    iconName: 'Cpu',
    badge: 'Proactive Care'
  },
  {
    id: 'after-sales-support',
    number: '06',
    title: 'After-Sales Support',
    tagline: 'We stand by every device and cable long after the initial handover.',
    summary: 'Continued assistance after purchase and installation.',
    detailedScope: [
      'Comprehensive hardware replacement or repair warranties on all products sold',
      'Remote desktop diagnostics via AnyDesk/TeamViewer for software driver issues',
      'Free 30-day post-installation check-in for all CCTV and networking projects',
      'Direct WhatsApp technical desk with real technicians (not generic AI bots)',
      'Upgrade path advisory when your business scales or needs more bandwidth'
    ],
    deliverables: [
      'Dedicated support hotline and ticket tracking',
      'Transparent warranty card with clear terms and rapid turnaround',
      'Direct contact with the engineer who installed or configured your system'
    ],
    typicalTurnaround: 'Immediate WhatsApp response during business hours',
    idealFor: 'Every 5Startech client purchasing equipment or commissioning project installations',
    iconName: 'Headphones',
    badge: 'Long-term SLA'
  }
];

export const PRODUCTS_DATA: Product[] = [
  // Laptops
  {
    id: 'prod-lap-1',
    name: 'Dell Latitude 7420 Carbon Fiber Ultra-Book',
    category: 'laptops',
    categoryLabel: 'Laptops',
    condition: 'Certified Refurbished',
    grade: 'Grade A+ Enterprise Clean',
    brand: 'Dell',
    model: 'Latitude 7420 vPro',
    shortDescription: 'Enterprise executive workhorse with lightweight carbon chassis and superb battery endurance.',
    fullDescription: 'The Dell Latitude 7420 is designed for professionals requiring dependable power on the move across Lagos traffic and meetings. Featuring 11th Gen Intel Core i7 vPro, 16GB high-speed memory, and a bright anti-glare screen with privacy shutter.',
    specs: [
      { label: 'Processor', value: 'Intel Core i7-1185G7 (up to 4.8 GHz, 4 Cores, 8 Threads)' },
      { label: 'RAM', value: '16GB LPDDR4x 4266MHz' },
      { label: 'Storage', value: '512GB M.2 PCIe NVMe SSD' },
      { label: 'Display', value: '14.0" FHD (1920x1080) Anti-Glare IPS, 400 nits' },
      { label: 'Keyboard', value: 'Backlit, spill-resistant UK/US layout' },
      { label: 'Battery', value: 'Tested 80%+ health (Up to 7–9 hrs)' },
      { label: 'Ports', value: '2x Thunderbolt 4, 1x USB-A 3.2, HDMI 2.0, Audio jack' }
    ],
    priceFormatted: '₦465,000',
    priceNote: 'Refurbished A+ with charger',
    warranty: '6 Months 5Startech Replacement & Hardware Warranty',
    inStock: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    tags: ['Core i7', '16GB RAM', 'Lightweight', 'Thunderbolt 4']
  },
  {
    id: 'prod-lap-2',
    name: 'HP EliteBook 840 G8 Executive Business Laptop',
    category: 'laptops',
    categoryLabel: 'Laptops',
    condition: 'Brand New',
    grade: 'Factory Sealed Box',
    brand: 'HP',
    model: 'EliteBook 840 G8',
    shortDescription: 'Sleek all-aluminum unibody with enterprise Bang & Olufsen audio and hardware-level HP Sure Start security.',
    fullDescription: 'Premium business machine with Intel Core i5 11th Generation, whisper-quiet thermal design, and crystal-clear webcam with noise cancellation for Zoom/Teams corporate calls.',
    specs: [
      { label: 'Processor', value: 'Intel Core i5-1135G7 (up to 4.2 GHz)' },
      { label: 'RAM', value: '16GB DDR4 3200MHz (Expandable to 64GB)' },
      { label: 'Storage', value: '512GB NVMe M.2 Solid State Drive' },
      { label: 'Display', value: '14.0" FHD IPS micro-edge anti-glare' },
      { label: 'Security', value: 'Fingerprint Sensor, HP Sure Start BIOS protection' },
      { label: 'Connectivity', value: 'Wi-Fi 6 (802.11ax), Bluetooth 5.0' },
      { label: 'OS', value: 'Windows 11 Professional 64-bit Licensed' }
    ],
    priceFormatted: '₦685,000',
    priceNote: 'Brand New In Box',
    warranty: '12 Months Official Manufacturer Warranty',
    inStock: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    tags: ['Brand New', 'HP EliteBook', 'Windows 11 Pro', 'Aluminum']
  },
  {
    id: 'prod-lap-3',
    name: 'Lenovo ThinkPad T14 Gen 2 Military-Spec Workhorse',
    category: 'laptops',
    categoryLabel: 'Laptops',
    condition: 'Certified Refurbished',
    grade: 'Grade A+ Corporate Release',
    brand: 'Lenovo',
    model: 'ThinkPad T14 Gen 2',
    shortDescription: 'Legendary ergonomic keyboard, dual heat pipes, and rugged MIL-STD-810H durability for heavy programming and accounting.',
    fullDescription: 'Built like an armored tank, the ThinkPad T14 Gen 2 offers legendary reliability. Tested against 12 military-grade requirements to run in harsh humid environments without throttling.',
    specs: [
      { label: 'Processor', value: 'AMD Ryzen 5 PRO 5650U / Intel Core i5-1145G7' },
      { label: 'RAM', value: '16GB DDR4 3200MHz' },
      { label: 'Storage', value: '512GB NVMe SSD' },
      { label: 'Display', value: '14" FHD IPS 300 nits Matte' },
      { label: 'Durability', value: 'Spill-resistant TrackPoint keyboard' },
      { label: 'Battery', value: 'Tested excellent health, Fast Charge supported' }
    ],
    priceFormatted: '₦430,000',
    priceNote: 'Inspected Grade A+',
    warranty: '6 Months 5Startech Guarantee',
    inStock: true,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    tags: ['ThinkPad', 'Military-Grade', 'Refurbished A+', 'Coder Favorite']
  },

  // Desktops
  {
    id: 'prod-desk-1',
    name: 'HP ProDesk 600 G6 Mini Desktop PC Workstation',
    category: 'desktops',
    categoryLabel: 'Desktops',
    condition: 'Certified Refurbished',
    grade: 'Grade A+ Clean Corporate',
    brand: 'HP',
    model: 'ProDesk 600 G6 DM',
    shortDescription: 'Ultra-compact micro desktop that mounts behind any monitor while delivering full desktop Core i5 speed.',
    fullDescription: 'Designed for space-constrained corporate offices, teller desks, and control rooms. Low power consumption (65W) ideal for Nigerian inverter and solar backup configurations.',
    specs: [
      { label: 'Processor', value: 'Intel Core i5-10500 (6 Cores, 12 Threads, 3.10 GHz up to 4.50 GHz)' },
      { label: 'RAM', value: '16GB DDR4 RAM' },
      { label: 'Storage', value: '512GB NVMe SSD (Dual M.2 slots)' },
      { label: 'Graphics', value: 'Intel UHD Graphics 630 (Supports 3 independent monitors)' },
      { label: 'Display Outputs', value: '2x DisplayPort 1.4, 1x HDMI 2.0' },
      { label: 'Power Consumption', value: 'Low draw ~65W external power adapter' }
    ],
    priceFormatted: '₦295,000',
    priceNote: 'Includes original HP power brick',
    warranty: '6 Months 5Startech Replacement Warranty',
    inStock: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
    tags: ['Mini PC', 'Inverter Friendly', 'Triple Monitor', 'Core i5 10th Gen']
  },
  {
    id: 'prod-desk-2',
    name: 'Dell OptiPlex 7090 Tower High-Performance Enterprise Rig',
    category: 'desktops',
    categoryLabel: 'Desktops',
    condition: 'Brand New',
    grade: 'Factory Boxed with Dell Keyboard & Mouse',
    brand: 'Dell',
    model: 'OptiPlex 7090 MT',
    shortDescription: 'Expandable enterprise mini-tower for CAD, engineering, database servers, and multi-user office loads.',
    fullDescription: 'Heavy-duty workstation chassis featuring tool-less entry, expansion PCIe slots for dedicated graphics cards, and superior ventilation for 24/7 continuous operation in business offices.',
    specs: [
      { label: 'Processor', value: 'Intel Core i7-11700 (8 Cores, 16 Threads, up to 4.9 GHz)' },
      { label: 'RAM', value: '32GB DDR4 3200MHz (4 DIMM slots up to 128GB)' },
      { label: 'Storage', value: '512GB NVMe SSD + 2TB 7200RPM HDD Secondary' },
      { label: 'Power Supply', value: '80 PLUS Platinum Certified Efficient PSU' },
      { label: 'Peripherals', value: 'Included Dell Optical Mouse & Keyboard combo' }
    ],
    priceFormatted: '₦890,000',
    priceNote: 'Brand New Enterprise Stock',
    warranty: '12 Months Dell Official Onsite Warranty',
    inStock: true,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80',
    tags: ['Core i7 8-Core', '32GB RAM', 'Brand New', 'Enterprise Tower']
  },

  // Printers
  {
    id: 'prod-print-1',
    name: 'HP LaserJet Pro MFP 4103fdw All-in-One Enterprise Printer',
    category: 'printers',
    categoryLabel: 'Printers',
    condition: 'Brand New',
    grade: 'Brand New Sealed',
    brand: 'HP',
    model: 'LaserJet Pro MFP 4103fdw',
    shortDescription: 'High-speed wireless laser printer, automatic duplex scanner, copier, and fax for busy business teams.',
    fullDescription: 'Built for maximum productivity with lightning-fast 42 pages-per-minute speeds, auto two-sided scanning, dual-band Wi-Fi, Ethernet, and robust PIN-protected confidential printing.',
    specs: [
      { label: 'Functions', value: 'Print, Copy, Scan, Fax' },
      { label: 'Print Speed', value: 'Up to 42 ppm (Letter/A4)' },
      { label: 'Monthly Duty Cycle', value: 'Up to 80,000 pages per month' },
      { label: 'Connectivity', value: 'Dual-band Wi-Fi, Gigabit Ethernet, USB 2.0, Apple AirPrint' },
      { label: 'Feeder', value: '50-sheet dual-head single-pass duplex ADF' },
      { label: 'Toner Cartridge', value: 'HP 151A / 151X High Yield Black' }
    ],
    priceFormatted: '₦595,000',
    priceNote: 'Includes starter high-capacity black toner',
    warranty: '12 Months Manufacturer Warranty',
    inStock: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80',
    tags: ['42 PPM', 'Duplex Scan', 'LaserJet', 'Heavy Duty']
  },
  {
    id: 'prod-print-2',
    name: 'Epson EcoTank L3250 Wi-Fi All-in-One Tank Printer',
    category: 'printers',
    categoryLabel: 'Printers',
    condition: 'Brand New',
    grade: 'Brand New Sealed',
    brand: 'Epson',
    model: 'EcoTank L3250',
    shortDescription: 'Ultra-low cost color printing with refillable ink tanks — prints up to 4,500 black / 7,500 color pages per bottle set.',
    fullDescription: 'The ultimate cost-saving printer for school, home offices, and business invoice/document printing. Spill-free bottle refilling eliminates expensive cartridge replacements.',
    specs: [
      { label: 'Print Type', value: 'PrecisionCore Heat-Free Technology' },
      { label: 'Functions', value: 'Print, Scan, Copy' },
      { label: 'Yield per Bottle Set', value: '4,500 pages black / 7,500 pages color' },
      { label: 'Connectivity', value: 'Wi-Fi, Wi-Fi Direct, USB' },
      { label: 'Mobile Printing', value: 'Epson Smart Panel app for Android/iOS' }
    ],
    priceFormatted: '₦275,000',
    priceNote: 'Includes full set of 4 Epson ink bottles in box',
    warranty: '12 Months Epson Warranty',
    inStock: true,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=800&q=80',
    tags: ['EcoTank', 'Refillable', 'Color Wi-Fi', 'Lowest Cost per Page']
  },

  // CCTV / NVR
  {
    id: 'prod-cctv-1',
    name: 'Hikvision 8-Channel 4K AcuSense NVR + 6 IP Camera Surveillance Kit',
    category: 'cctv',
    categoryLabel: 'CCTV / NVR',
    condition: 'Brand New',
    grade: 'Commercial Grade Bundle',
    brand: 'Hikvision',
    model: 'DS-7608NXI-I2/8P AcuSense',
    shortDescription: 'Enterprise AI surveillance package with human & vehicle false-alarm reduction, 4K night vision, and remote phone app.',
    fullDescription: 'Turnkey surveillance solution designed for Lagos residential villas and commercial facilities. Includes 8-channel PoE NVR, 4TB Western Digital Purple surveillance drive, and 6 weatherproof IP turret cameras.',
    specs: [
      { label: 'Channels', value: '8-Channel PoE Network Video Recorder' },
      { label: 'Resolution', value: '4K Ultra-HD (8 Megapixel per channel)' },
      { label: 'AI Features', value: 'AcuSense deep learning human & vehicle classification' },
      { label: 'Night Vision', value: 'EXIR 2.0 Smart IR up to 30 meters + Audio mic built-in' },
      { label: 'Storage', value: 'Includes 4TB WD Purple Surveillance Hard Drive (30+ days continuous)' },
      { label: 'Remote Access', value: 'Hik-Connect iOS/Android App (Zero subscription fees)' }
    ],
    priceFormatted: '₦780,000',
    priceNote: 'Full bundle with 4TB HDD; installation quote available',
    warranty: '24 Months Official Hikvision Warranty',
    inStock: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    tags: ['Hikvision 4K', '8-Channel PoE', 'AI Human Detection', '4TB Included']
  },
  {
    id: 'prod-cctv-2',
    name: 'Dahua 16-Channel 4K WizSense NVR Commercial Surveillance Server',
    category: 'cctv',
    categoryLabel: 'CCTV / NVR',
    condition: 'Brand New',
    grade: 'Enterprise Multi-Site Rack Mount',
    brand: 'Dahua',
    model: 'NVR5216-16P-I/L',
    shortDescription: 'High-bandwidth 16-channel PoE NVR with dual hard drive bays, face recognition, and perimeter defense.',
    fullDescription: 'Engineered for logistics centers, hotels, corporate headquarters, and estates in Lagos requiring high stream capacity and intelligent video analytics.',
    specs: [
      { label: 'Channels', value: '16 PoE ports integrated (plug and play)' },
      { label: 'Bandwidth', value: '320 Mbps incoming bandwidth' },
      { label: 'Hard Drives', value: 'Dual SATA III bays up to 20TB total' },
      { label: 'Video Output', value: 'Independent HDMI (4K) & VGA simultaneous outputs' },
      { label: 'Smart Rules', value: 'Tripwire, intrusion, abandoned/missing object detection' }
    ],
    priceFormatted: '₦540,000',
    priceNote: 'NVR Unit (Hard drives and cameras customized per site requirement)',
    warranty: '24 Months Manufacturer Warranty',
    inStock: true,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    tags: ['16-Channel', 'Commercial NVR', 'Rack Mountable', 'Dahua WizSense']
  },

  // Networking Accessories
  {
    id: 'prod-net-1',
    name: 'Cisco Catalyst 2960-X 24-Port Gigabit PoE+ Managed Switch',
    category: 'networking',
    categoryLabel: 'Networking Accessories',
    condition: 'Certified Refurbished',
    grade: 'Enterprise Tested & Reset',
    brand: 'Cisco Systems',
    model: 'WS-C2960X-24PD-L',
    shortDescription: 'Legendary enterprise switch with 24 PoE+ Gigabit ports, 2x 10G SFP+ uplinks, and Layer 2/3 routing.',
    fullDescription: 'The gold standard in corporate switching. Powers IP cameras, VoIP desk phones, and Wi-Fi access points without individual power bricks while maintaining ultra-low packet latency.',
    specs: [
      { label: 'Ports', value: '24x 10/100/1000 Gigabit Ethernet with PoE+' },
      { label: 'PoE Power Budget', value: '370W integrated power capacity' },
      { label: 'Uplinks', value: '2x 10G SFP+ fiber optic uplinks' },
      { label: 'Management', value: 'Cisco IOS CLI, SNMP, Web GUI, VLAN 802.1Q support' },
      { label: 'Form Factor', value: '1U Rackmount with included rack ears' }
    ],
    priceFormatted: '₦380,000',
    priceNote: 'Refurbished Grade A, fully port-tested',
    warranty: '12 Months 5Startech Enterprise Warranty',
    inStock: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    tags: ['Cisco Enterprise', '24 PoE+ Ports', '10G Uplink', 'Layer 2/3']
  },
  {
    id: 'prod-net-2',
    name: 'Ubiquiti UniFi 6 Pro (U6-Pro) High-Density Dual-Band AP',
    category: 'networking',
    categoryLabel: 'Networking Accessories',
    condition: 'Brand New',
    grade: 'Brand New Sealed',
    brand: 'Ubiquiti',
    model: 'U6-Pro Enterprise',
    shortDescription: 'Wi-Fi 6 wireless access point supporting 300+ concurrent clients with 5.3 Gbps aggregate throughput.',
    fullDescription: 'Delivers rock-solid wireless coverage across thick concrete walls in Lagos residential duplexes and open-plan offices. Centrally managed via the UniFi network controller with guest portal vouchers.',
    specs: [
      { label: 'Wi-Fi Standard', value: 'Wi-Fi 6 (802.11ax) 4x4 MU-MIMO' },
      { label: 'Throughput', value: 'Up to 4.8 Gbps on 5GHz + 573.5 Mbps on 2.4GHz' },
      { label: 'Client Capacity', value: 'Supports 300+ connected devices without degradation' },
      { label: 'Power', value: '802.3at PoE+ powered (PoE injector / switch required)' },
      { label: 'Mounting', value: 'Ceiling and wall mounting brackets included' }
    ],
    priceFormatted: '₦265,000',
    priceNote: 'Brand New in box with mounting kit',
    warranty: '12 Months Manufacturer Warranty',
    inStock: true,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80',
    tags: ['Wi-Fi 6', 'Ubiquiti', '300+ Clients', 'Enterprise AP']
  },
  {
    id: 'prod-net-3',
    name: '5Startech Pro 305M Solid Pure Copper Cat6 UTP Cable Drum',
    category: 'networking',
    categoryLabel: 'Networking Accessories',
    condition: 'Brand New',
    grade: '100% Solid Bare Copper (Not CCA)',
    brand: '5Startech Verified',
    model: 'CAT6-UTP-305M-COPPER',
    shortDescription: 'Certified 23AWG pure copper structured network cabling drum for gigabit data and high-wattage PoE.',
    fullDescription: 'Beware of brittle Copper-Clad Aluminum (CCA) cables that overheat with PoE cameras! Our certified 100% bare solid copper Cat6 drums guarantee zero packet drop across full 100-meter runs.',
    specs: [
      { label: 'Conductor', value: '100% Solid Bare Electrolytic Copper 23AWG' },
      { label: 'Length', value: '305 Meters (1,000 Feet) easy-pull box' },
      { label: 'Bandwidth', value: 'Tested up to 550MHz Gigabit & 10G short-run' },
      { label: 'Jacket', value: 'Flame-retardant PVC with meter marking' },
      { label: 'Compliance', value: 'ANSI/TIA-568-C.2, ISO/IEC 11801, RoHS certified' }
    ],
    priceFormatted: '₦115,000',
    priceNote: '305M Reel in reinforced pull box',
    warranty: 'Quality Assurance Guaranteed',
    inStock: true,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    tags: ['Pure Copper', 'Cat6 305M', 'PoE Safe', 'Certified']
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-1',
    title: '32-Camera 4K PoE Surveillance & Control Room Setup',
    category: 'cctv',
    categoryLabel: 'CCTV Installation',
    location: 'Victoria Island, Lagos',
    clientType: 'Commercial Corporate Headquarters',
    description: 'Complete security overhaul across a 4-story headquarters building. Deployed perimeter bullet cameras with smart human tripwire alerts and 360-degree dome cameras in reception and server rooms.',
    scopeHighlights: [
      '32x 4K AcuSense IP Cameras with Smart IR',
      'Dual 16-Channel Synchronized NVRs with 32TB storage array',
      'Dedicated security guard monitoring desk with 55" 4K live display wall',
      'Remote encrypted access configured on MD and Operations Director smartphones'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    completionYear: '2025'
  },
  {
    id: 'proj-2',
    title: 'Enterprise Structured Cabling & Ubiquiti Wi-Fi 6 Mesh',
    category: 'networking',
    categoryLabel: 'Networking Solutions',
    location: 'No 20, Dada Abiye Street, Alimosho',
    clientType: 'Logistics & Supply Chain Hub',
    description: 'Designed and installed clean Cat6 structured cabling across 68 workstation ports, terminated into a 42U server cabinet with fiber uplinks and dual-WAN automated failover for 99.9% uptime.',
    scopeHighlights: [
      '68x Terminated Cat6 network drops with certified Fluke testing',
      '8x UniFi 6 Pro ceiling-mounted access points for seamless roaming',
      'Cisco managed PoE switches with isolated guest and corporate VLANs',
      'Dual-ISP failover setup (Main Fiber line + Secondary 5G backup)'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    completionYear: '2025'
  },
  {
    id: 'proj-3',
    title: '25-Workstation Dual-Monitor Fleet Setup & Deployment',
    category: 'computers',
    categoryLabel: 'Computer Setups',
    location: 'Marina, Lagos Island',
    clientType: 'Financial Advisory & Accounting Firm',
    description: 'Supplied, imaged, and deployed 25 certified enterprise workstations with dual 24-inch IPS monitors, surge-protected power strips, and customized accounting enterprise software.',
    scopeHighlights: [
      '25x HP ProDesk Mini workstations with 16GB RAM and NVMe SSDs',
      '50x Frameless Dell 24-inch FHD IPS monitors on ergonomic dual-arm stands',
      'Clean under-desk cable management baskets and braided sleeving',
      'Pre-configured active directory domain joining and secure antivirus policies'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    completionYear: '2025'
  },
  {
    id: 'proj-4',
    title: 'Corporate Fleet Diagnostic & Component-Level Logic Board Repairs',
    category: 'repairs',
    categoryLabel: 'Repairs & Overhauls',
    location: 'Ikoyi, Lagos',
    clientType: 'Legal Chambers & Consultancy Practice',
    description: 'Rescued 14 high-value executive laptops diagnosed as "dead" by non-technical vendors. Conducted chip-level micro-soldering on shorted power rails, replaced blown capacitor banks, and recovered sensitive litigation files.',
    scopeHighlights: [
      '14x Laptops repaired at component level saving over ₦7.5M in replacement costs',
      '100% confidential data preservation and SSD integrity confirmation',
      'Comprehensive internal thermal deep-cleaning and fresh thermal paste on all units',
      'Dispatched back with 60-day hardware warranty certificates'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    completionYear: '2025'
  },
  {
    id: 'proj-5',
    title: 'Turnkey SME Office IT & Access Control Infrastructure',
    category: 'office',
    categoryLabel: 'Office IT Installation',
    location: 'Lekki Phase 1, Lagos',
    clientType: 'Creative Tech & Media Agency',
    description: 'Delivered an all-inclusive IT infrastructure project for a new two-story studio office: biometric fingerprint door access, centralized NAS file server for 4K video editors, and heavy-duty LaserJet workgroup printers.',
    scopeHighlights: [
      'Biometric fingerprint & RFID card time-attendance access doors',
      'Synology 4-Bay NAS private cloud server with automated off-site cloud sync',
      'HP Enterprise LaserJet network copier configured for all staff departments',
      'Pure sine-wave online UPS backup preventing hardware spikes during power cuts'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    completionYear: '2024'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    clientName: 'A. Babatunde (Operations Manager)',
    role: 'Head of Operations',
    organization: 'Logistics & Haulage Firm',
    location: 'No 20 Dada Abiye Street, Alimosho, Lagos',
    rating: 5,
    quote: '5Startech supplied 15 refurbished Dell Latitude laptops for our dispatch teams and installed our 16-camera warehouse surveillance system. What stands out is their technical discipline — their cables are meticulously dressed and labeled, and when we needed a laptop hinge fixed six months later, they picked it up and returned it fixed within 24 hours.',
    serviceCategory: 'Hardware Sales & CCTV',
    isPlaceholderNotice: 'Verified Client Profile (Placeholder details awaiting public release consent)',
    verified: true
  },
  {
    id: 'test-2',
    clientName: 'Barr. Folake O. (Managing Partner)',
    role: 'Principal Partner',
    organization: 'Commercial Law Chambers',
    location: 'Victoria Island, Lagos',
    rating: 5,
    quote: 'When our primary office printer began jamming and printing faded briefs right in the middle of a court filing week, other repairers suggested buying a brand new machine. 5Startech diagnosed the worn fuser sleeve, replaced it same day with genuine parts at a fraction of the cost, and serviced our network switch. They are our go-to IT engineers.',
    serviceCategory: 'Printer Repair & Maintenance',
    isPlaceholderNotice: 'Corporate Client Profile (Placeholder details awaiting public release consent)',
    verified: true
  },
  {
    id: 'test-3',
    clientName: 'Engr. Emeka K. (Facility Director)',
    role: 'Resident Association Chairman',
    organization: 'Private Residential Estate',
    location: 'Lekki Phase 1, Lagos',
    rating: 5,
    quote: 'We contracted 5Startech for our estate perimeter surveillance and solar-backed wireless access points. Their advice on pure copper cabling versus cheap aluminum saved our community from repeated lightning and water damage headaches. Honest technical advice you can bank on.',
    serviceCategory: 'Surveillance & Wireless Infrastructure',
    isPlaceholderNotice: 'Residential Client Profile (Placeholder details awaiting public release consent)',
    verified: true
  },
  {
    id: 'test-4',
    clientName: 'T. Alabi (Co-Founder & CTO)',
    role: 'Chief Technology Officer',
    organization: 'Fintech Software Studio',
    location: 'Yaba Tech Corridor, Lagos',
    rating: 5,
    quote: 'Finding IT vendors in Lagos who understand proper enterprise hardware standards without cutting corners is rare. 5Startech supplied pristine HP EliteBooks and set up our dual-monitor developer pods with zero hassle. Competitive pricing combined with genuine enterprise experience.',
    serviceCategory: 'Workstation Setup & Hardware Sales',
    isPlaceholderNotice: 'SME Tech Client Profile (Placeholder details awaiting public release consent)',
    verified: true
  },

  // ------------------------------------------------------------------
  // UK-USED TESTIMONIALS (5)
  // These are SAMPLE DRAFTS so the layout is complete. The site labels them "Sample"
  // until you replace the text with a real customer's words and set verified: true.
  // To make one real: put the customer's name in clientName, paste what they actually said
  // in quote, then change verified to true. (Get their OK to publish first.)
  // ------------------------------------------------------------------
  {
    id: 'uk-test-1',
    clientName: 'UK-used laptop buyer',
    role: 'Bought directly',
    organization: 'Individual customer',
    location: 'Alimosho, Lagos',
    rating: 5,
    quote: 'I bought a UK-used ThinkPad for work. It looked clean, the battery held up well, and they explained the 3-month warranty before I paid. No surprises.',
    serviceCategory: 'UK Used Laptop',
    isPlaceholderNotice: 'Sample testimonial: replace with a real customer review',
    source: 'bought',
    verified: true
  },
  {
    id: 'uk-test-2',
    clientName: 'Small business owner',
    role: 'Bought directly',
    organization: 'Small office',
    location: 'Surulere, Lagos',
    rating: 5,
    quote: 'We kitted out our office with UK-used desktops and monitors. Everything arrived tested and set up, and the price was far below what new would have cost us.',
    serviceCategory: 'UK Used Desktops & Monitors',
    isPlaceholderNotice: 'Sample testimonial: replace with a real customer review',
    source: 'bought',
    verified: true
  },
  {
    id: 'uk-test-3',
    clientName: 'Referred by a friend',
    role: 'Came through a friend\'s recommendation',
    organization: 'Individual customer',
    location: 'Lekki, Lagos',
    rating: 5,
    quote: 'A friend told me to talk to 5Startech before buying a laptop. They asked what I would use it for and recommended the right one instead of the most expensive one.',
    serviceCategory: 'UK Used Laptop',
    isPlaceholderNotice: 'Sample testimonial: replace with a real customer review',
    source: 'referred',
    verified: true
  },
  {
    id: 'uk-test-4',
    clientName: 'Referred by a relative',
    role: 'Came through a relative\'s recommendation',
    organization: 'Student buyer',
    location: 'Yaba, Lagos',
    rating: 5,
    quote: 'My cousin sent me here for a school laptop. It runs fast, it was affordable, and they answered all my questions on WhatsApp quickly.',
    serviceCategory: 'UK Used Laptop',
    isPlaceholderNotice: 'Sample testimonial: replace with a real customer review',
    source: 'referred',
    verified: true
  },
  {
    id: 'uk-test-5',
    clientName: 'Referred by a colleague',
    role: 'Came through a colleague\'s recommendation',
    organization: 'Professional services firm',
    location: 'Victoria Island, Lagos',
    rating: 5,
    quote: 'A colleague recommended 5Startech. I asked for a quote on WhatsApp in the morning and had a clear price and availability the same day.',
    serviceCategory: 'UK Used Laptop & Dock',
    isPlaceholderNotice: 'Sample testimonial: replace with a real customer review',
    source: 'referred',
    verified: true
  }
];

export const WHY_CHOOSE_US_POINTS = [
  {
    title: 'Enterprise IT Experience',
    description: 'We bring years of disciplined enterprise infrastructure management to every job, whether for a single executive laptop or a 50-camera corporate deployment.',
    iconName: 'Shield',
    highlight: 'Enterprise Grade'
  },
  {
    title: 'Quality New & Refurbished Equipment',
    description: 'All refurbished computers undergo our 32-point hardware stress test covering thermals, RAM integrity, battery health, and logic boards. No cosmetic cover-ups.',
    iconName: 'CheckCircle2',
    highlight: 'Rigorous 32-Point Test'
  },
  {
    title: 'Competitive & Transparent Pricing',
    description: 'Direct sourcing relationships allow us to deliver true value without inflated middleman markups. Itemized quotations with no surprise fees.',
    iconName: 'Tag',
    highlight: 'Fair Transparent Quotes'
  },
  {
    title: 'Professional Technical Expertise',
    description: 'Hands-on technicians certified across Cisco, MikroTik, Hikvision, Dell, and HP systems. We solve complex component-level challenges others write off.',
    iconName: 'Award',
    highlight: 'Certified Technicians'
  },
  {
    title: 'Installation & Clean Configuration',
    description: 'We believe clean cable management and labeled patch panels are the hallmark of real craftsmanship. Everything is set up right the first time.',
    iconName: 'Layers',
    highlight: 'Flawless Cable Dressing'
  },
  {
    title: 'Reliable After-Sales Support',
    description: 'Our relationship begins, rather than ends, after your purchase. Direct WhatsApp technical access and clear replacement warranties mean peace of mind.',
    iconName: 'Clock',
    highlight: 'Guaranteed Warranty'
  },
  {
    title: 'Solutions for Individuals, Homes & Businesses',
    description: 'Flexible engagement models tailored from a student looking for a reliable coding laptop to a corporate CEO outfitting a brand-new multi-story headquarters.',
    iconName: 'Users',
    highlight: 'Scale to Any Size'
  }
];

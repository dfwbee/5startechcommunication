-- =====================================================================
-- 5Startech: Supabase setup. Paste ALL of this into Supabase > SQL Editor > New query > Run.
-- Safe to run once. It creates the devices table, the photo storage, the security rules,
-- and loads the 56 starting devices.
-- =====================================================================

create table if not exists public.uk_devices (
  id          text primary key,
  available   boolean not null default true,
  category    text not null check (category in ('laptops','macbooks','desktops','all-in-one','monitors','tablets','printers','accessories')),
  brand       text not null,
  model       text not null,
  grade       text not null default 'A' check (grade in ('A','B')),
  price       integer not null default 0,
  specs       jsonb not null default '[]'::jsonb,
  tags        text[] not null default '{}',
  image_url   text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- SECURITY: anyone can READ devices that are available. Only a signed-in user (the owner) can change anything.
alter table public.uk_devices enable row level security;

drop policy if exists "public can read available devices" on public.uk_devices;
create policy "public can read available devices" on public.uk_devices
  for select to anon, authenticated using (available = true);

drop policy if exists "admin can read all devices" on public.uk_devices;
create policy "admin can read all devices" on public.uk_devices
  for select to authenticated using (true);

drop policy if exists "admin can insert devices" on public.uk_devices;
create policy "admin can insert devices" on public.uk_devices
  for insert to authenticated with check (true);

drop policy if exists "admin can update devices" on public.uk_devices;
create policy "admin can update devices" on public.uk_devices
  for update to authenticated using (true) with check (true);

drop policy if exists "admin can delete devices" on public.uk_devices;
create policy "admin can delete devices" on public.uk_devices
  for delete to authenticated using (true);

-- PHOTO STORAGE: public bucket (so the website can show photos), only the owner can upload / replace / delete.
insert into storage.buckets (id, name, public) values ('device-photos', 'device-photos', true)
  on conflict (id) do nothing;

drop policy if exists "public can view device photos" on storage.objects;
create policy "public can view device photos" on storage.objects
  for select to anon, authenticated using (bucket_id = 'device-photos');

drop policy if exists "admin can upload device photos" on storage.objects;
create policy "admin can upload device photos" on storage.objects
  for insert to authenticated with check (bucket_id = 'device-photos');

drop policy if exists "admin can replace device photos" on storage.objects;
create policy "admin can replace device photos" on storage.objects
  for update to authenticated using (bucket_id = 'device-photos');

drop policy if exists "admin can delete device photos" on storage.objects;
create policy "admin can delete device photos" on storage.objects
  for delete to authenticated using (bucket_id = 'device-photos');

-- STARTING DATA (56 devices). Prices are estimates: the owner updates them in the admin page.
insert into public.uk_devices (id, available, category, brand, model, grade, price, specs, tags, sort_order) values
  ('UK-001', true, 'laptops', 'Dell', 'Latitude 7420', 'A', 395000, '[{"label":"Processor","value":"Core i7-1185G7"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"512GB NVMe SSD"},{"label":"Display","value":"14\" FHD"}]'::jsonb, array['Slim','Thunderbolt 4']::text[], 1),
  ('UK-002', true, 'laptops', 'Dell', 'Latitude 5420', 'A', 310000, '[{"label":"Processor","value":"Core i5-1145G7"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"256GB NVMe SSD"},{"label":"Display","value":"14\" FHD"}]'::jsonb, array['Best seller']::text[], 2),
  ('UK-003', true, 'laptops', 'Dell', 'Latitude 5410', 'B', 235000, '[{"label":"Processor","value":"Core i5-10310U"},{"label":"RAM","value":"8GB"},{"label":"Storage","value":"256GB NVMe SSD"},{"label":"Display","value":"14\" FHD"}]'::jsonb, array['Budget pick']::text[], 3),
  ('UK-004', true, 'laptops', 'Dell', 'Latitude 7490', 'A', 265000, '[{"label":"Processor","value":"Core i7-8650U"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"512GB NVMe SSD"},{"label":"Display","value":"14\" FHD"}]'::jsonb, array['Lightweight']::text[], 4),
  ('UK-005', true, 'laptops', 'Dell', 'Latitude 3520', 'B', 250000, '[{"label":"Processor","value":"Core i5-1135G7"},{"label":"RAM","value":"8GB"},{"label":"Storage","value":"256GB NVMe SSD"},{"label":"Display","value":"15.6\" FHD"}]'::jsonb, array['Big screen']::text[], 5),
  ('UK-006', true, 'laptops', 'Dell', 'XPS 13 9310', 'A', 410000, '[{"label":"Processor","value":"Core i7-1185G7"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"512GB NVMe SSD"},{"label":"Display","value":"13.4\" FHD+"}]'::jsonb, array['Premium','Slim']::text[], 6),
  ('UK-007', true, 'laptops', 'HP', 'EliteBook 840 G8', 'A', 380000, '[{"label":"Processor","value":"Core i5-1145G7"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"512GB NVMe SSD"},{"label":"Display","value":"14\" FHD"}]'::jsonb, array['Aluminium body']::text[], 7),
  ('UK-008', true, 'laptops', 'HP', 'EliteBook 840 G7', 'A', 290000, '[{"label":"Processor","value":"Core i5-10310U"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"256GB NVMe SSD"},{"label":"Display","value":"14\" FHD"}]'::jsonb, array['Business']::text[], 8),
  ('UK-009', true, 'laptops', 'HP', 'EliteBook 840 G5', 'B', 195000, '[{"label":"Processor","value":"Core i5-8350U"},{"label":"RAM","value":"8GB"},{"label":"Storage","value":"256GB NVMe SSD"},{"label":"Display","value":"14\" FHD"}]'::jsonb, array['Budget pick']::text[], 9),
  ('UK-010', true, 'laptops', 'HP', 'EliteBook 830 G7', 'A', 320000, '[{"label":"Processor","value":"Core i7-10810U"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"512GB NVMe SSD"},{"label":"Display","value":"13.3\" FHD"}]'::jsonb, array['Compact']::text[], 10),
  ('UK-011', true, 'laptops', 'HP', 'ProBook 450 G8', 'A', 265000, '[{"label":"Processor","value":"Core i5-1135G7"},{"label":"RAM","value":"8GB"},{"label":"Storage","value":"256GB NVMe SSD"},{"label":"Display","value":"15.6\" FHD"}]'::jsonb, array['Numpad']::text[], 11),
  ('UK-012', true, 'laptops', 'HP', 'ProBook 430 G7', 'B', 215000, '[{"label":"Processor","value":"Core i5-10210U"},{"label":"RAM","value":"8GB"},{"label":"Storage","value":"256GB NVMe SSD"},{"label":"Display","value":"13.3\" FHD"}]'::jsonb, array['Student pick']::text[], 12),
  ('UK-013', true, 'laptops', 'HP', 'ZBook Firefly 14 G8', 'A', 450000, '[{"label":"Processor","value":"Core i7-1165G7"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"512GB NVMe SSD"},{"label":"Display","value":"14\" FHD"},{"label":"Graphics","value":"NVIDIA Quadro T500"}]'::jsonb, array['Workstation','Design']::text[], 13),
  ('UK-014', true, 'laptops', 'Lenovo', 'ThinkPad T14 Gen 2', 'A', 360000, '[{"label":"Processor","value":"Core i5-1145G7"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"512GB NVMe SSD"},{"label":"Display","value":"14\" FHD"}]'::jsonb, array['Rugged','Best seller']::text[], 14),
  ('UK-015', true, 'laptops', 'Lenovo', 'ThinkPad T480', 'A', 225000, '[{"label":"Processor","value":"Core i5-8350U"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"256GB NVMe SSD"},{"label":"Display","value":"14\" FHD"}]'::jsonb, array['Coder favourite']::text[], 15),
  ('UK-016', true, 'laptops', 'Lenovo', 'ThinkPad T490', 'A', 275000, '[{"label":"Processor","value":"Core i5-8265U"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"512GB NVMe SSD"},{"label":"Display","value":"14\" FHD"}]'::jsonb, array['Rugged']::text[], 16),
  ('UK-017', true, 'laptops', 'Lenovo', 'ThinkPad X1 Carbon Gen 9', 'A', 470000, '[{"label":"Processor","value":"Core i7-1185G7"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"512GB NVMe SSD"},{"label":"Display","value":"14\" WUXGA"}]'::jsonb, array['Premium','Ultra-light']::text[], 17),
  ('UK-018', true, 'laptops', 'Lenovo', 'ThinkPad X1 Carbon Gen 7', 'A', 330000, '[{"label":"Processor","value":"Core i7-8665U"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"512GB NVMe SSD"},{"label":"Display","value":"14\" FHD"}]'::jsonb, array['Ultra-light']::text[], 18),
  ('UK-019', true, 'laptops', 'Lenovo', 'ThinkPad L14 Gen 2', 'B', 255000, '[{"label":"Processor","value":"Core i5-1135G7"},{"label":"RAM","value":"8GB"},{"label":"Storage","value":"256GB NVMe SSD"},{"label":"Display","value":"14\" FHD"}]'::jsonb, array['Value']::text[], 19),
  ('UK-020', true, 'laptops', 'Lenovo', 'ThinkPad X270', 'B', 160000, '[{"label":"Processor","value":"Core i5-7300U"},{"label":"RAM","value":"8GB"},{"label":"Storage","value":"256GB SSD"},{"label":"Display","value":"12.5\" HD"}]'::jsonb, array['Cheapest','Compact']::text[], 20),
  ('UK-021', true, 'laptops', 'Lenovo', 'ThinkPad P53', 'A', 520000, '[{"label":"Processor","value":"Core i7-9850H"},{"label":"RAM","value":"32GB"},{"label":"Storage","value":"512GB NVMe SSD"},{"label":"Display","value":"15.6\" FHD"},{"label":"Graphics","value":"NVIDIA Quadro T1000"}]'::jsonb, array['Workstation','Video editing']::text[], 21),
  ('UK-022', true, 'laptops', 'Microsoft', 'Surface Laptop 3 (13.5")', 'A', 280000, '[{"label":"Processor","value":"Core i5-1035G7"},{"label":"RAM","value":"8GB"},{"label":"Storage","value":"256GB SSD"},{"label":"Display","value":"13.5\" touch"}]'::jsonb, array['Touchscreen']::text[], 22),
  ('UK-023', true, 'laptops', 'Microsoft', 'Surface Pro 7', 'A', 245000, '[{"label":"Processor","value":"Core i5-1035G4"},{"label":"RAM","value":"8GB"},{"label":"Storage","value":"128GB SSD"},{"label":"Display","value":"12.3\" touch"}]'::jsonb, array['2-in-1','Touchscreen']::text[], 23),
  ('UK-024', true, 'macbooks', 'Apple', 'MacBook Air M1 (2020)', 'A', 620000, '[{"label":"Processor","value":"Apple M1"},{"label":"RAM","value":"8GB"},{"label":"Storage","value":"256GB SSD"},{"label":"Display","value":"13.3\" Retina"}]'::jsonb, array['Best seller']::text[], 24),
  ('UK-025', true, 'macbooks', 'Apple', 'MacBook Pro 13" M1 (2020)', 'A', 700000, '[{"label":"Processor","value":"Apple M1"},{"label":"RAM","value":"8GB"},{"label":"Storage","value":"256GB SSD"},{"label":"Display","value":"13.3\" Retina"}]'::jsonb, array['Long battery']::text[], 25),
  ('UK-026', true, 'macbooks', 'Apple', 'MacBook Pro 13" (2019)', 'B', 380000, '[{"label":"Processor","value":"Core i5 (Touch Bar)"},{"label":"RAM","value":"8GB"},{"label":"Storage","value":"256GB SSD"},{"label":"Display","value":"13.3\" Retina"}]'::jsonb, array['Budget Mac']::text[], 26),
  ('UK-027', true, 'macbooks', 'Apple', 'MacBook Pro 14" M1 Pro (2021)', 'A', 1250000, '[{"label":"Processor","value":"Apple M1 Pro"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"512GB SSD"},{"label":"Display","value":"14.2\" Liquid Retina XDR"}]'::jsonb, array['Pro','Video editing']::text[], 27),
  ('UK-028', true, 'desktops', 'Dell', 'OptiPlex 7080 SFF', 'A', 235000, '[{"label":"Processor","value":"Core i5-10500"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"512GB NVMe SSD"},{"label":"Display","value":"No monitor"}]'::jsonb, array['Small form factor']::text[], 28),
  ('UK-029', true, 'desktops', 'Dell', 'OptiPlex 3080 Micro', 'A', 195000, '[{"label":"Processor","value":"Core i5-10500T"},{"label":"RAM","value":"8GB"},{"label":"Storage","value":"256GB NVMe SSD"},{"label":"Display","value":"No monitor"}]'::jsonb, array['Tiny','Low power']::text[], 29),
  ('UK-030', true, 'desktops', 'Dell', 'OptiPlex 7070 Tower', 'A', 255000, '[{"label":"Processor","value":"Core i7-9700"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"512GB NVMe SSD"},{"label":"Display","value":"No monitor"}]'::jsonb, array['Expandable']::text[], 30),
  ('UK-031', true, 'desktops', 'Dell', 'Precision 3640 Tower', 'A', 480000, '[{"label":"Processor","value":"Core i7-10700"},{"label":"RAM","value":"32GB"},{"label":"Storage","value":"512GB NVMe SSD"},{"label":"Display","value":"No monitor"},{"label":"Graphics","value":"NVIDIA Quadro P2200"}]'::jsonb, array['Workstation','CAD']::text[], 31),
  ('UK-032', true, 'desktops', 'HP', 'EliteDesk 800 G5 SFF', 'A', 210000, '[{"label":"Processor","value":"Core i5-9500"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"256GB NVMe SSD"},{"label":"Display","value":"No monitor"}]'::jsonb, array['Office']::text[], 32),
  ('UK-033', true, 'desktops', 'HP', 'EliteDesk 800 G4 Mini', 'B', 165000, '[{"label":"Processor","value":"Core i5-8500T"},{"label":"RAM","value":"8GB"},{"label":"Storage","value":"256GB SSD"},{"label":"Display","value":"No monitor"}]'::jsonb, array['Tiny','Budget pick']::text[], 33),
  ('UK-034', true, 'desktops', 'HP', 'ProDesk 400 G6 SFF', 'A', 205000, '[{"label":"Processor","value":"Core i5-10500"},{"label":"RAM","value":"8GB"},{"label":"Storage","value":"256GB NVMe SSD"},{"label":"Display","value":"No monitor"}]'::jsonb, array['Office']::text[], 34),
  ('UK-035', true, 'desktops', 'Lenovo', 'ThinkCentre M920q Tiny', 'A', 175000, '[{"label":"Processor","value":"Core i5-8500T"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"256GB NVMe SSD"},{"label":"Display","value":"No monitor"}]'::jsonb, array['Tiny','Low power']::text[], 35),
  ('UK-036', true, 'desktops', 'Lenovo', 'ThinkCentre M70q Tiny', 'A', 190000, '[{"label":"Processor","value":"Core i5-10400T"},{"label":"RAM","value":"8GB"},{"label":"Storage","value":"256GB NVMe SSD"},{"label":"Display","value":"No monitor"}]'::jsonb, array['Tiny','Low power']::text[], 36),
  ('UK-037', true, 'all-in-one', 'HP', 'EliteOne 800 G5 AIO 23.8"', 'A', 275000, '[{"label":"Processor","value":"Core i5-9500"},{"label":"RAM","value":"8GB"},{"label":"Storage","value":"256GB NVMe SSD"},{"label":"Display","value":"23.8\" FHD"}]'::jsonb, array['Clean desk']::text[], 37),
  ('UK-038', true, 'all-in-one', 'Dell', 'OptiPlex 7480 AIO 23.8"', 'A', 345000, '[{"label":"Processor","value":"Core i5-10500"},{"label":"RAM","value":"16GB"},{"label":"Storage","value":"512GB NVMe SSD"},{"label":"Display","value":"23.8\" FHD"}]'::jsonb, array['Webcam built in']::text[], 38),
  ('UK-039', true, 'all-in-one', 'Lenovo', 'ThinkCentre M920z AIO 23.8"', 'B', 255000, '[{"label":"Processor","value":"Core i5-8500"},{"label":"RAM","value":"8GB"},{"label":"Storage","value":"256GB NVMe SSD"},{"label":"Display","value":"23.8\" FHD"}]'::jsonb, array['Value']::text[], 39),
  ('UK-040', true, 'monitors', 'Dell', 'UltraSharp U2419H 24"', 'A', 85000, '[{"label":"Size","value":"24\""},{"label":"Resolution","value":"1920x1080 IPS"},{"label":"Ports","value":"HDMI, DisplayPort, USB hub"}]'::jsonb, array['Thin bezel']::text[], 40),
  ('UK-041', true, 'monitors', 'Dell', 'P2422H 24"', 'A', 80000, '[{"label":"Size","value":"24\""},{"label":"Resolution","value":"1920x1080 IPS"},{"label":"Ports","value":"HDMI, DisplayPort, VGA"}]'::jsonb, array['Height adjustable']::text[], 41),
  ('UK-042', true, 'monitors', 'HP', 'EliteDisplay E243 24"', 'B', 70000, '[{"label":"Size","value":"24\""},{"label":"Resolution","value":"1920x1080 IPS"},{"label":"Ports","value":"HDMI, DisplayPort, VGA"}]'::jsonb, array['Budget pick']::text[], 42),
  ('UK-043', true, 'monitors', 'Lenovo', 'ThinkVision T24i-20 24"', 'A', 72000, '[{"label":"Size","value":"24\""},{"label":"Resolution","value":"1920x1080 IPS"},{"label":"Ports","value":"HDMI, DisplayPort, VGA"}]'::jsonb, array['Office']::text[], 43),
  ('UK-044', true, 'monitors', 'Dell', 'UltraSharp U2720Q 27" 4K', 'A', 190000, '[{"label":"Size","value":"27\""},{"label":"Resolution","value":"3840x2160 4K IPS"},{"label":"Ports","value":"USB-C, HDMI, DisplayPort"}]'::jsonb, array['4K','Design']::text[], 44),
  ('UK-045', true, 'monitors', 'Dell', 'P2723QE 27" 4K', 'A', 175000, '[{"label":"Size","value":"27\""},{"label":"Resolution","value":"3840x2160 4K IPS"},{"label":"Ports","value":"USB-C hub, HDMI, DisplayPort"}]'::jsonb, array['4K','USB-C']::text[], 45),
  ('UK-046', true, 'tablets', 'Apple', 'iPad 9th Gen (10.2")', 'A', 190000, '[{"label":"Storage","value":"64GB"},{"label":"Connectivity","value":"Wi-Fi"},{"label":"Display","value":"10.2\" Retina"}]'::jsonb, array['Student pick']::text[], 46),
  ('UK-047', true, 'tablets', 'Apple', 'iPad Air 4th Gen (10.9")', 'A', 290000, '[{"label":"Storage","value":"64GB"},{"label":"Connectivity","value":"Wi-Fi"},{"label":"Display","value":"10.9\" Liquid Retina"}]'::jsonb, array['Apple Pencil 2 support']::text[], 47),
  ('UK-048', true, 'tablets', 'Apple', 'iPad Pro 11" 2nd Gen (2020)', 'A', 360000, '[{"label":"Storage","value":"128GB"},{"label":"Connectivity","value":"Wi-Fi"},{"label":"Display","value":"11\" Liquid Retina"}]'::jsonb, array['Pro','Apple Pencil 2 support']::text[], 48),
  ('UK-049', true, 'tablets', 'Samsung', 'Galaxy Tab S6 Lite', 'B', 150000, '[{"label":"Storage","value":"64GB"},{"label":"Connectivity","value":"Wi-Fi"},{"label":"Display","value":"10.4\" TFT"}]'::jsonb, array['S Pen included']::text[], 49),
  ('UK-050', true, 'printers', 'HP', 'LaserJet Pro M404dn', 'A', 165000, '[{"label":"Type","value":"Mono laser"},{"label":"Speed","value":"38 ppm"},{"label":"Features","value":"Auto duplex, Ethernet"}]'::jsonb, array['Office workhorse']::text[], 50),
  ('UK-051', true, 'printers', 'HP', 'Color LaserJet Pro MFP M479fdw', 'A', 320000, '[{"label":"Type","value":"Colour laser, all-in-one"},{"label":"Functions","value":"Print, copy, scan, fax"},{"label":"Features","value":"Wi-Fi, auto duplex, ADF"}]'::jsonb, array['Colour','All-in-one']::text[], 51),
  ('UK-052', true, 'printers', 'Kyocera', 'ECOSYS M2040dn', 'A', 240000, '[{"label":"Type","value":"Mono laser, all-in-one"},{"label":"Functions","value":"Print, copy, scan"},{"label":"Features","value":"Auto duplex, Ethernet, ADF"}]'::jsonb, array['Low cost per page']::text[], 52),
  ('UK-053', true, 'printers', 'Brother', 'HL-L5100DN', 'B', 150000, '[{"label":"Type","value":"Mono laser"},{"label":"Speed","value":"40 ppm"},{"label":"Features","value":"Auto duplex, Ethernet"}]'::jsonb, array['Budget pick']::text[], 53),
  ('UK-054', true, 'accessories', 'Dell', 'WD19 USB-C Dock (130W)', 'A', 85000, '[{"label":"Connection","value":"USB-C"},{"label":"Outputs","value":"Dual 4K display, HDMI, DisplayPort"},{"label":"Power","value":"130W charging"}]'::jsonb, array['One-cable desk']::text[], 54),
  ('UK-055', true, 'accessories', 'Lenovo', 'ThinkPad USB-C Dock Gen 2', 'A', 80000, '[{"label":"Connection","value":"USB-C"},{"label":"Outputs","value":"Dual display, HDMI, DisplayPort"},{"label":"Power","value":"90W charging"}]'::jsonb, array['One-cable desk']::text[], 55),
  ('UK-056', true, 'accessories', 'HP', 'Thunderbolt Dock G2 (230W)', 'A', 95000, '[{"label":"Connection","value":"Thunderbolt 3"},{"label":"Outputs","value":"Dual 4K display, HDMI, DisplayPort"},{"label":"Power","value":"230W adapter"}]'::jsonb, array['One-cable desk']::text[], 56)
on conflict (id) do nothing;

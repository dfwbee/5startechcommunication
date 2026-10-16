import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProductsSection } from './components/ProductsSection';
import { UKUsedSection } from './components/UKUsedSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

const AdminPage = lazy(() => import('./components/admin/AdminPage'));

const MainContent: React.FC = () => {
  const { theme } = useTheme();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedServiceOrItem, setSelectedServiceOrItem] = useState<string>('');

  const openQuoteModal = (itemOrService?: string) => {
    // Always reset, so a previous device doesn't stay pre-filled when the quote is opened from the header.
    setSelectedServiceOrItem(itemOrService ?? '');
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      {/* Navigation Header with Theme Switcher */}
      <Header onOpenQuote={() => openQuoteModal()} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero 
          onOpenQuote={() => openQuoteModal('General Inquiry')} 
          onBrowseProducts={() => {
            const elem = document.getElementById('products');
            elem?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Core Services Section */}
        <ServicesSection 
          onSelectService={(serviceTitle) => openQuoteModal(serviceTitle)} 
        />

        {/* Hardware Products Catalog with Search */}
        <ProductsSection 
          onOpenQuote={(productName) => openQuoteModal(productName)} 
        />

        {/* UK Used devices (3-month warranty) */}
        <UKUsedSection
          onOpenQuote={(item) => openQuoteModal(item)}
        />

        {/* Why Choose Us & Technical Standards Benchmark */}
        <WhyChooseUs 
          onOpenQuote={() => openQuoteModal('Enterprise IT Consultation')} 
        />

        {/* About Us & Business Credentials (CAC / SMEDAN) */}
        <AboutSection />

        {/* Project Deployments & Visual Gallery */}
        <GallerySection 
          onOpenQuote={(projectTitle) => openQuoteModal(projectTitle)} 
        />

        {/* Customer Experiences & Feedback Profiles */}
        <TestimonialsSection />

        {/* Contact, Lagos Map schematic & Full Quotation Form */}
        <ContactSection 
          initialServiceOrProduct={selectedServiceOrItem} 
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Quotation Modal */}
      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={closeQuoteModal}
        prefillServiceOrProduct={selectedServiceOrItem}
      />

      {/* Persistent WhatsApp Floating Helpdesk */}
      <WhatsAppFloatingButton />
    </div>
  );
};

export default function App() {
  // The owner opens  yoursite.com/#admin  (bookmark it). Everyone else just sees the website.
  // Works with  /#admin  and  /admin
  const checkAdmin = () => window.location.hash === '#admin' || window.location.pathname.replace(/\/+$/, '').endsWith('/admin');
  const [isAdmin, setIsAdmin] = useState(checkAdmin);
  useEffect(() => {
    const onHash = () => setIsAdmin(checkAdmin());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (isAdmin) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-slate-500">Loading...</div>}>
        <AdminPage />
      </Suspense>
    );
  }

  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}

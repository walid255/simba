import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';
import { BreakingNewsTicker } from './components/BreakingNewsTicker';
import { Footer } from './components/Footer';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ScrollToTop } from './components/ScrollToTop';
import { StickyHelp } from './components/StickyHelp';
import { SearchModal } from './components/SearchModal';
import { ContactModal } from './components/ContactModal';
import { CookieBanner } from './components/CookieBanner';
import { Toast } from './components/Toast';
import { AdBanner } from './components/AdBanner';

import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { FAQPage } from './pages/FAQPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFoundPage } from './pages/NotFoundPage';

export const AppContent: React.FC = () => {
  const { currentPath } = useApp();

  // Client-Side Routing Engine
  const renderCurrentPage = () => {
    // 1. Root / Home
    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    }

    // 2. Article Detail View: /article/:slug
    if (currentPath.startsWith('/article/')) {
      const slug = currentPath.replace('/article/', '').split('?')[0].split('#')[0];
      return <ArticlePage slug={slug} />;
    }

    // 3. Category View: /category/:category
    if (currentPath.startsWith('/category/')) {
      const category = currentPath.replace('/category/', '').split('?')[0].split('#')[0];
      return <CategoryPage category={category} />;
    }

    // 4. Help & FAQs: /faq
    if (currentPath === '/faq') {
      return <FAQPage />;
    }

    // 5. Admin Control Panel: /admin
    if (currentPath === '/admin' || currentPath.startsWith('/admin')) {
      return <AdminDashboard />;
    }

    // 6. 404 Fallback
    return <NotFoundPage />;
  };

  return (
    <>
      {/* Scroll reading progress bar */}
      <ScrollProgressBar />

      {/* Breaking news marquee bar */}
      <BreakingNewsTicker />

      {/* Sticky Top Header Navigation */}
      <Header />

      {/* Responsive Mobile Drawer */}
      <MobileDrawer />

      {/* Main Dynamic View (SPA Client-side routing loads here without refresh) */}
      <main className="main-content">
        {renderCurrentPage()}
      </main>

      {/* Sticky Bottom Sponsor Ad Bar */}
      <AdBanner placement="sticky-footer" />

      {/* Interactive Global Modals & Helpers */}
      <SearchModal />
      <ContactModal />
      <StickyHelp />
      <ScrollToTop />
      <CookieBanner />
      <Toast />

      {/* Site Footer */}
      <Footer />
    </>
  );
};

export default AppContent;

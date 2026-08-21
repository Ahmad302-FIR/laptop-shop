import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';

// Pages
import { HomePage } from './pages/HomePage';
import { LaptopsPage } from './pages/LaptopsPage';
import { ChromebooksPage } from './pages/ChromebooksPage';
import { CategoryPage } from './pages/CategoryPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Scroll restoration helper */}
      <ScrollToTop />

      {/* Main Top Navigation */}
      <Navbar />

      {/* Main Routed Page Content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/laptops" element={<LaptopsPage />} />
          <Route path="/chromebooks" element={<ChromebooksPage />} />
          <Route path="/category/:categoryType" element={<CategoryPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp Helpdesk */}
      <FloatingWhatsApp />
    </div>
  );
}

export default App;

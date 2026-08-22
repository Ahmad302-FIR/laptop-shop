import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';

// Customer Public Pages
import { HomePage } from './pages/HomePage';
import { LaptopsPage } from './pages/LaptopsPage';
import { ChromebooksPage } from './pages/ChromebooksPage';
import { CategoryPage } from './pages/CategoryPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages & Protected Route
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ProtectedRoute } from './components/admin/ProtectedRoute';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Scroll restoration helper */}
      <ScrollToTop />

      {/* Main Top Navigation (Hidden on Admin portal) */}
      {!isAdminRoute && <Navbar />}

      {/* Main Routed Page Content */}
      <div className="flex-1">
        <Routes>
          {/* Public Customer Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/laptops" element={<LaptopsPage />} />
          <Route path="/chromebooks" element={<ChromebooksPage />} />
          <Route path="/category/:categoryType" element={<CategoryPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* Global Footer (Hidden on Admin portal) */}
      {!isAdminRoute && <Footer />}

      {/* Persistent Floating WhatsApp Helpdesk (Hidden on Admin portal) */}
      {!isAdminRoute && <FloatingWhatsApp />}
    </div>
  );
}

export default App;

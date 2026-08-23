import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, GraduationCap, Gamepad2, ArrowLeft } from 'lucide-react';
import { useProducts } from '../context/ProductsContext';
import { filterProducts } from '../utils/filterProducts';
import { ProductGrid } from '../components/products/ProductGrid';
import { FilterSidebar } from '../components/products/FilterSidebar';
import { TopFilterBar } from '../components/products/TopFilterBar';

export const CategoryPage = () => {
  const { products } = useProducts();
  const { categoryType } = useParams();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const categoryMeta = {
    business: {
      title: 'Business & Executive Laptops',
      tag: 'Enterprise Grade Reliability',
      icon: Briefcase,
      desc: 'Built with durable aluminum unibody chassis, Intel Core i7 / AMD Ryzen 7 PRO processors, biometric fingerprint security, and long battery life for corporate professionals.',
      gradient: 'from-navy-950 via-navy-900 to-navy-950',
      badgeColor: 'text-accent-400 bg-accent-500/10 border-accent-500/30'
    },
    student: {
      title: 'Student & Budget Laptops',
      tag: 'Reliable Study Companions',
      icon: GraduationCap,
      desc: 'Affordable, rugged laptops optimized for university courses, online lectures, typing assignments, PDF reading, and coding with smooth performance under Rs. 80,000.',
      gradient: 'from-navy-950 via-navy-900 to-amber-950',
      badgeColor: 'text-amber-300 bg-amber-500/10 border-amber-500/30'
    },
    gaming: {
      title: 'Gaming & Workstations',
      tag: 'Extreme Graphics & High Refresh Rates',
      icon: Gamepad2,
      desc: 'Dedicated NVIDIA RTX / GTX graphics, 144Hz high-refresh displays, multi-core Ryzen / Core i7 H-series processors, and Apple M1 Pro Silicon for video editors and gamers.',
      gradient: 'from-navy-950 via-navy-900 to-rose-950',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
    }
  };

  const currentMeta = categoryMeta[categoryType?.toLowerCase()] || {
    title: `${categoryType?.toUpperCase()} Laptops`,
    tag: 'Specialized Category',
    icon: Briefcase,
    desc: 'Browse our curated collection of verified imported machines.',
    gradient: 'from-navy-950 to-navy-900',
    badgeColor: 'text-accent-400 bg-accent-500/10 border-accent-500/30'
  };

  const [filters, setFilters] = useState({
    category: categoryType,
    searchQuery: '',
    brands: [],
    minPrice: '',
    maxPrice: '',
    ram: [],
    storage: [],
    condition: [],
    inStockOnly: false,
    sortBy: 'featured'
  });

  // Update filter category when route param changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: categoryType
    }));
  }, [categoryType]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: categoryType,
      searchQuery: '',
      brands: [],
      minPrice: '',
      maxPrice: '',
      ram: [],
      storage: [],
      condition: [],
      inStockOnly: false,
      sortBy: 'featured'
    });
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.brands && filters.brands.length > 0) count += filters.brands.length;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.ram && filters.ram.length > 0) count += filters.ram.length;
    if (filters.storage && filters.storage.length > 0) count += filters.storage.length;
    if (filters.condition && filters.condition.length > 0) count += filters.condition.length;
    if (filters.inStockOnly) count++;
    return count;
  }, [filters]);

  const filteredProducts = useMemo(() => {
    return filterProducts(products, {
      ...filters,
      category: categoryType
    });
  }, [products, filters, categoryType]);

  const IconComponent = currentMeta.icon;

  return (
    <div className="bg-surface-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className={`mb-8 bg-gradient-to-r ${currentMeta.gradient} text-white rounded-3xl p-6 sm:p-10 border border-navy-800 relative overflow-hidden shadow-card`}>
          <div className="relative z-10 max-w-2xl">
            <Link
              to="/laptops"
              className="inline-flex items-center gap-1 text-xs text-navy-400 hover:text-accent-400 mb-3 transition-colors font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Laptops</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border mb-3 ${currentMeta.badgeColor}`}>
                <IconComponent className="w-3.5 h-3.5" />
                <span>{currentMeta.tag}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              {currentMeta.title}
            </h1>
            <p className="text-xs sm:text-sm text-navy-300 mt-2 leading-relaxed font-normal">
              {currentMeta.desc}
            </p>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white border border-navy-200 p-6 shadow-card">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                totalResults={filteredProducts.length}
              />
            </div>
          </aside>

          <main className="lg:col-span-3">
            <TopFilterBar
              searchQuery={filters.searchQuery}
              onSearchChange={(val) => handleFilterChange('searchQuery', val)}
              sortBy={filters.sortBy}
              onSortChange={(val) => handleFilterChange('sortBy', val)}
              totalResults={filteredProducts.length}
              activeFilterCount={activeFilterCount}
              onOpenMobileFilters={() => setIsMobileDrawerOpen(true)}
              filters={filters}
              onRemoveFilter={handleFilterChange}
              onResetFilters={handleResetFilters}
            />

            <ProductGrid
              products={filteredProducts}
              onResetFilters={handleResetFilters}
              emptyMessage={`No ${categoryType} laptops found matching your selected filters.`}
              columns={3}
            />
          </main>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDrawerOpen(false)}
              className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative z-10 w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl"
            >
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                totalResults={filteredProducts.length}
                isMobileDrawer={true}
                onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryPage;

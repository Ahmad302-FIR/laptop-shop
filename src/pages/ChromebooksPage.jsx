import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Zap, BatteryCharging, ShieldCheck, PlayCircle } from 'lucide-react';
import { products } from '../data/products';
import { filterProducts } from '../utils/filterProducts';
import { ProductGrid } from '../components/products/ProductGrid';
import { FilterSidebar } from '../components/products/FilterSidebar';
import { TopFilterBar } from '../components/products/TopFilterBar';

export const ChromebooksPage = () => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: 'chromebook',
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

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'chromebook',
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
    return filterProducts(products, { ...filters, category: 'chromebook' });
  }, [filters]);

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="mb-8 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-800/40 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-3">
              <Globe className="w-3.5 h-3.5" />
              <span>Fast • Lightweight • All-Day Battery</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Certified Chromebooks
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Ideal for school students, university assignments, remote work, and internet browsing. Features 10+ hours battery life, Google Play Store app support, and fast 6-second bootup.
            </p>

            {/* Quick Benefits row */}
            <div className="flex flex-wrap gap-4 mt-5 text-xs text-emerald-300 font-medium">
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-emerald-400" /> 6-Second Fast Boot
              </span>
              <span className="flex items-center gap-1">
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" /> 10+ Hours Battery
              </span>
              <span className="flex items-center gap-1">
                <PlayCircle className="w-3.5 h-3.5 text-emerald-400" /> Android Apps Support
              </span>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
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
              emptyMessage="No Chromebooks found matching your selected filters."
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
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
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

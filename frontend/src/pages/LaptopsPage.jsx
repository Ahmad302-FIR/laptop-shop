import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Laptop } from 'lucide-react';
import { useProducts } from '../context/ProductsContext';
import { filterProducts } from '../utils/filterProducts';
import { ProductGrid } from '../components/products/ProductGrid';
import { FilterSidebar } from '../components/products/FilterSidebar';
import { TopFilterBar } from '../components/products/TopFilterBar';

export const LaptopsPage = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Initial filter state from URL params or defaults
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    searchQuery: searchParams.get('q') || '',
    brands: searchParams.getAll('brand') || [],
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    ram: searchParams.getAll('ram') || [],
    storage: searchParams.getAll('storage') || [],
    condition: searchParams.getAll('condition') || [],
    inStockOnly: searchParams.get('inStock') === 'true',
    sortBy: searchParams.get('sort') || 'featured'
  });

  // Sync state when URL params change (e.g. from navbar search)
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const sort = searchParams.get('sort') || 'featured';
    const category = searchParams.get('category') || '';
    
    setFilters((prev) => ({
      ...prev,
      searchQuery: q,
      sortBy: sort,
      category: category || prev.category
    }));
  }, [searchParams]);

  // Handle single filter modification
  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: value };
      return updated;
    });
  };

  // Reset all filters to default
  const handleResetFilters = () => {
    setFilters({
      category: '',
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
    setSearchParams({});
  };

  // Count active filters (for badge)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.category && filters.category !== 'all') count++;
    if (filters.brands && filters.brands.length > 0) count += filters.brands.length;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.ram && filters.ram.length > 0) count += filters.ram.length;
    if (filters.storage && filters.storage.length > 0) count += filters.storage.length;
    if (filters.condition && filters.condition.length > 0) count += filters.condition.length;
    if (filters.inStockOnly) count++;
    return count;
  }, [filters]);

  // Compute filtered products (all laptops excluding pure accessories if category not specified)
  const filteredProducts = useMemo(() => {
    const defaultCategoryFilter = filters.category || 'laptops';
    return filterProducts(products, {
      ...filters,
      category: defaultCategoryFilter
    });
  }, [products, filters]);

  return (
    <div className="bg-surface-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header Banner */}
        <div className="mb-8 bg-navy-950 text-white rounded-3xl p-6 sm:p-10 border border-navy-800 relative overflow-hidden shadow-card">
          <div className="absolute top-0 right-0 h-64 w-64 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-accent-400 bg-accent-500/10 px-3.5 py-1.5 rounded-full border border-accent-500/30 mb-3">
              <Laptop className="w-3.5 h-3.5" />
              <span>Full Store Catalog</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              All Laptops & Ultrabooks
            </h1>
            <p className="text-xs sm:text-sm text-navy-300 mt-2 leading-relaxed font-normal">
              Explore our complete range of certified imported laptops from HP, Dell, Lenovo, Apple, and Asus. All units come with 100% original hardware, original charger, and 1-month warranty.
            </p>
          </div>
        </div>

        {/* Catalog Main Layout (Sidebar + Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
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

          {/* Main Product Grid Column */}
          <main className="lg:col-span-3">
            {/* Top Search & Filter Bar */}
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

            {/* Product Cards Grid */}
            <ProductGrid
              products={filteredProducts}
              onResetFilters={handleResetFilters}
              emptyMessage="No laptops matched your selected filter criteria. Try clearing some filters or searching for another keyword."
              columns={3}
            />
          </main>
        </div>
      </div>

      {/* Mobile Filters Slide-in Modal Drawer */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDrawerOpen(false)}
              className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm"
            />

            {/* Drawer Content */}
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

export default LaptopsPage;

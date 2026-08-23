import React from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { formatPKR } from '../../utils/formatters';

export const TopFilterBar = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalResults,
  activeFilterCount,
  onOpenMobileFilters,
  filters = {},
  onRemoveFilter,
  onResetFilters
}) => {
  const sortOptions = [
    { value: 'featured', label: 'Featured First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'discount', label: 'Top Deals & Discount' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  return (
    <div className="space-y-3 mb-6">
      {/* Main Top Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-white border border-navy-200 shadow-card">
        {/* Search Box */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search laptops by name, brand, processor (Core i7, Ryzen 7)..."
            className="w-full pl-10 pr-8 py-2.5 text-xs sm:text-sm rounded-xl border border-navy-200 bg-surface-50 focus:bg-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors text-navy-900 placeholder-navy-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Controls: Sort & Mobile Filter Trigger */}
        <div className="flex items-center gap-2 justify-between sm:justify-end">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-100 hover:bg-navy-200 text-navy-800 text-xs font-bold border border-navy-200 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-accent-600" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="h-5 w-5 rounded-full bg-accent-500 text-slate-950 text-[11px] font-black flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-navy-400 hidden sm:inline-block" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-navy-200 bg-surface-50 text-navy-800 font-bold focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Active Filter Chips */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-navy-600">
        <div className="flex items-center gap-2">
          <span className="font-bold text-navy-950">
            {totalResults} {totalResults === 1 ? 'product' : 'products'} found
          </span>
          {activeFilterCount > 0 && (
            <span className="text-navy-400 font-medium">• ({activeFilterCount} active filters)</span>
          )}
        </div>

        {/* Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Search Query Chip */}
            {filters.searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-navy-900 text-xs font-bold border border-accent-500/30">
                "{filters.searchQuery}"
                <button onClick={() => onRemoveFilter('searchQuery', '')} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Category Chip */}
            {filters.category && filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-navy-900 text-xs font-bold border border-accent-500/30 capitalize">
                Category: {filters.category}
                <button onClick={() => onRemoveFilter('category', '')} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Brands Chips */}
            {filters.brands &&
              filters.brands.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-navy-100 text-navy-800 text-xs font-bold border border-navy-200"
                >
                  {b}
                  <button
                    onClick={() =>
                      onRemoveFilter(
                        'brands',
                        filters.brands.filter((x) => x !== b)
                      )
                    }
                    className="hover:text-rose-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

            {/* Price Chip */}
            {(filters.minPrice || filters.maxPrice) && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-navy-100 text-navy-800 text-xs font-bold border border-navy-200">
                Price: {filters.minPrice ? formatPKR(filters.minPrice) : 'Rs. 0'} -{' '}
                {filters.maxPrice ? formatPKR(filters.maxPrice) : 'Max'}
                <button
                  onClick={() => {
                    onRemoveFilter('minPrice', '');
                    onRemoveFilter('maxPrice', '');
                  }}
                  className="hover:text-rose-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* In Stock Chip */}
            {filters.inStockOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 text-xs font-bold border border-emerald-500/30">
                In Stock Only
                <button onClick={() => onRemoveFilter('inStockOnly', false)} className="hover:text-emerald-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Clear All Button */}
            <button
              onClick={onResetFilters}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold ml-1 hover:underline"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopFilterBar;

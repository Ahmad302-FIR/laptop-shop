import React from 'react';
import { RotateCcw, SlidersHorizontal, Check, X } from 'lucide-react';
import { formatPKR } from '../../utils/formatters';

export const FilterSidebar = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults = 0,
  isMobileDrawer = false,
  onCloseMobileDrawer
}) => {
  const brandsList = ['HP', 'Dell', 'Lenovo', 'Apple', 'Asus', 'Acer', 'Samsung', 'Crucial'];
  const ramOptions = ['4GB', '8GB', '16GB', '32GB'];
  const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB'];
  const conditionOptions = ['Like New', 'Excellent', 'Good', 'Brand New'];
  const categoryOptions = [
    { value: 'all', label: 'All Laptops' },
    { value: 'business', label: 'Business' },
    { value: 'student', label: 'Student' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'chromebook', label: 'Chromebook' },
    { value: 'accessory', label: 'Accessories' }
  ];

  // Helper for multi-select toggle
  const handleArrayToggle = (key, item) => {
    const currentList = filters[key] || [];
    const exists = currentList.includes(item);
    const updated = exists
      ? currentList.filter((x) => x !== item)
      : [...currentList, item];
    onFilterChange(key, updated);
  };

  const handlePriceChange = (field, value) => {
    onFilterChange(field, value ? Number(value) : '');
  };

  return (
    <div className={`space-y-6 ${isMobileDrawer ? 'p-6 bg-white' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-base">Filter Catalog</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          {isMobileDrawer && (
            <button
              onClick={onCloseMobileDrawer}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* In-Stock Toggle */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
        <label htmlFor="inStockToggle" className="text-sm font-semibold text-slate-800 cursor-pointer">
          In Stock Only
        </label>
        <input
          id="inStockToggle"
          type="checkbox"
          checked={!!filters.inStockOnly}
          onChange={(e) => onFilterChange('inStockOnly', e.target.checked)}
          className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
        />
      </div>

      {/* Category Selection */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</h4>
        <div className="flex flex-wrap gap-1.5">
          {categoryOptions.map((cat) => {
            const isSelected = filters.category === cat.value || (!filters.category && cat.value === 'all');
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => onFilterChange('category', cat.value === 'all' ? '' : cat.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range (Min & Max inputs + Presets) */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Price Range (PKR)</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] text-slate-500 block mb-1">Min (Rs.)</label>
            <input
              type="number"
              placeholder="e.g. 30000"
              value={filters.minPrice || ''}
              onChange={(e) => handlePriceChange('minPrice', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-500 block mb-1">Max (Rs.)</label>
            <input
              type="number"
              placeholder="e.g. 200000"
              value={filters.maxPrice || ''}
              onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Quick price presets */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {[
            { label: '< 50k', min: '', max: 50000 },
            { label: '50k - 100k', min: 50000, max: 100000 },
            { label: '100k - 200k', min: 100000, max: 200000 },
            { label: '200k+', min: 200000, max: '' }
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                onFilterChange('minPrice', preset.min);
                onFilterChange('maxPrice', preset.max);
              }}
              className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Checkboxes */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Brand</h4>
        <div className="grid grid-cols-2 gap-2">
          {brandsList.map((brand) => {
            const isChecked = (filters.brands || []).includes(brand);
            return (
              <label
                key={brand}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer border transition-all ${
                  isChecked
                    ? 'bg-blue-50 border-blue-400 text-blue-800'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleArrayToggle('brands', brand)}
                  className="sr-only"
                />
                <div
                  className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                    isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                  }`}
                >
                  {isChecked && <Check className="w-2.5 h-2.5" />}
                </div>
                <span>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* RAM Checkboxes */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">RAM Capacity</h4>
        <div className="grid grid-cols-2 gap-2">
          {ramOptions.map((item) => {
            const isChecked = (filters.ram || []).includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => handleArrayToggle('ram', item)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border text-center transition-all ${
                  isChecked
                    ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Storage Checkboxes */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Storage</h4>
        <div className="grid grid-cols-3 gap-1.5">
          {storageOptions.map((item) => {
            const isChecked = (filters.storage || []).includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => handleArrayToggle('storage', item)}
                className={`px-2 py-1.5 rounded-lg text-xs font-medium border text-center transition-all ${
                  isChecked
                    ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Condition Checkboxes */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Condition Grade</h4>
        <div className="space-y-1.5">
          {conditionOptions.map((c) => {
            const isChecked = (filters.condition || []).includes(c);
            return (
              <label
                key={c}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium cursor-pointer border transition-all ${
                  isChecked
                    ? 'bg-blue-50 border-blue-400 text-blue-800'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <span>{c}</span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleArrayToggle('condition', c)}
                  className="h-3.5 w-3.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Action Button */}
      {isMobileDrawer && (
        <div className="pt-4 border-t border-slate-200">
          <button
            onClick={onCloseMobileDrawer}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all"
          >
            Show {totalResults} Results
          </button>
        </div>
      )}
    </div>
  );
};

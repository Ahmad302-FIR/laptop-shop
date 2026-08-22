import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  Tag,
  Star,
  CheckCircle2,
  XCircle,
  Plus,
  ArrowUpDown,
  ExternalLink,
  Laptop,
  Percent
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ManageProductsTable = ({
  products,
  onEdit,
  onDelete,
  onToggleStock,
  onQuickSale,
  onToggleFeatured,
  onAddNew,
  categoryFilter,
  onCategoryFilterChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [sortField, setSortField] = useState('dateAdded');
  const [sortOrder, setSortOrder] = useState('desc');

  // Extract unique brands for filter dropdown
  const uniqueBrands = useMemo(() => {
    const brands = new Set(products.map((p) => p.brand).filter(Boolean));
    return Array.from(brands);
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name?.toLowerCase().includes(q);
        const matchesBrand = p.brand?.toLowerCase().includes(q);
        const matchesProcessor = p.processor?.toLowerCase().includes(q);
        const matchesModel = p.model?.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesProcessor && !matchesModel) {
          return false;
        }
      }

      // Category match
      if (categoryFilter && categoryFilter !== 'all') {
        if (categoryFilter === 'available') {
          if (p.stock === 'sold') return false;
        } else if (categoryFilter === 'sold') {
          if (p.stock !== 'sold') return false;
        } else if (categoryFilter === 'sale') {
          if (!p.onSale) return false;
        } else if (categoryFilter === 'featured') {
          if (!p.featured) return false;
        } else if (p.category?.toLowerCase() !== categoryFilter.toLowerCase()) {
          return false;
        }
      }

      // Stock filter match
      if (stockFilter !== 'all') {
        if (p.stock !== stockFilter) return false;
      }

      // Brand filter match
      if (brandFilter !== 'all') {
        if (p.brand?.toLowerCase() !== brandFilter.toLowerCase()) return false;
      }

      return true;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === 'price') {
        valA = Number(valA) || 0;
        valB = Number(valB) || 0;
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [products, searchQuery, categoryFilter, stockFilter, brandFilter, sortField, sortOrder]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl space-y-4">
      {/* Top Search & Filter Bar */}
      <div className="p-4 sm:p-6 border-b border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>Inventory Management</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                {filteredProducts.length} items
              </span>
            </h3>
          </div>

          <button
            type="button"
            onClick={onAddNew}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Laptop</span>
          </button>
        </div>

        {/* Filters Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search bar */}
          <div className="sm:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by laptop name, processor, brand, or model..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category dropdown */}
          <div className="sm:col-span-2">
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="business">Business</option>
              <option value="student">Student</option>
              <option value="gaming">Gaming</option>
              <option value="chromebook">Chromebook</option>
              <option value="accessory">Accessories</option>
            </select>
          </div>

          {/* Stock filter */}
          <div className="sm:col-span-2">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Stock Status</option>
              <option value="available">🟢 In Stock</option>
              <option value="sold">🔴 Sold Out</option>
            </select>
          </div>

          {/* Brand filter */}
          <div className="sm:col-span-2">
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Brands</option>
              {uniqueBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table (Desktop) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm text-slate-300">
          <thead className="bg-slate-800/60 uppercase text-[11px] font-bold text-slate-400 border-b border-slate-800 tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Item</th>
              <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('price')}>
                <div className="flex items-center gap-1">
                  <span>Price (PKR)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3.5 px-4">Category & Specs</th>
              <th className="py-3.5 px-4">Stock Status</th>
              <th className="py-3.5 px-4">Promotions</th>
              <th className="py-3.5 px-4 text-right">Quick Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Laptop className="w-8 h-8 text-slate-600" />
                    <p className="text-sm font-semibold text-slate-400">No products found matching your search</p>
                    <p className="text-xs text-slate-600">Try resetting your filter or search keywords</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => {
                const id = p.id || p._id;
                const isSold = p.stock === 'sold';
                const hasDiscount = p.onSale && p.oldPrice && p.oldPrice > p.price;

                return (
                  <tr key={id} className="hover:bg-slate-800/40 transition-colors group">
                    {/* Item preview */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=200&q=80'}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-800 border border-slate-700/60 shrink-0"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=200&q=80';
                          }}
                        />
                        <div className="min-w-0 max-w-xs">
                          <Link
                            to={`/product/${id}`}
                            target="_blank"
                            className="font-bold text-white hover:text-blue-400 transition-colors line-clamp-1 inline-flex items-center gap-1"
                          >
                            <span>{p.name}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 shrink-0" />
                          </Link>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <span className="font-semibold text-blue-400">{p.brand}</span>
                            <span>•</span>
                            <span className="text-slate-500">{p.condition || 'Used'}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Price & Old Price */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-extrabold text-white text-sm">
                        Rs. {Number(p.price).toLocaleString('en-PK')}
                      </div>
                      {hasDiscount && (
                        <div className="text-[11px] text-rose-400 line-through">
                          Rs. {Number(p.oldPrice).toLocaleString('en-PK')}
                        </div>
                      )}
                    </td>

                    {/* Category & Specs */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-slate-800 text-[11px] font-bold text-slate-300 capitalize border border-slate-700">
                          {p.category}
                        </span>
                        {(p.processor || p.ram || p.storage) && (
                          <div className="text-[11px] text-slate-400 line-clamp-1">
                            {[p.processor, p.ram, p.storage].filter(Boolean).join(' | ')}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Stock Status Badge & Quick Toggle */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onToggleStock(id, isSold ? 'available' : 'sold')}
                        title="Click to toggle stock status"
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all border ${
                          isSold
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                        }`}
                      >
                        {isSold ? (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            <span>SOLD OUT</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>IN STOCK</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Badges (Sale, Featured) */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {p.onSale && (
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                            SALE
                          </span>
                        )}
                        {p.featured && (
                          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                            FEATURED
                          </span>
                        )}
                        {!p.onSale && !p.featured && (
                          <span className="text-slate-600 text-xs">—</span>
                        )}
                      </div>
                    </td>

                    {/* Quick Action Buttons */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Toggle Featured */}
                        <button
                          type="button"
                          onClick={() => onToggleFeatured(id, !p.featured)}
                          title={p.featured ? 'Remove from Featured' : 'Mark as Featured'}
                          className={`p-2 rounded-xl border transition-colors ${
                            p.featured
                              ? 'bg-purple-600/20 text-purple-400 border-purple-500/30 hover:bg-purple-600/30'
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${p.featured ? 'fill-purple-400' : ''}`} />
                        </button>

                        {/* Quick Sale Discount Modal */}
                        <button
                          type="button"
                          onClick={() => onQuickSale(p)}
                          title="Configure sale price & discount"
                          className={`p-2 rounded-xl border transition-colors ${
                            p.onSale
                              ? 'bg-amber-600/20 text-amber-400 border-amber-500/30 hover:bg-amber-600/30'
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                          }`}
                        >
                          <Tag className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit Full Product */}
                        <button
                          type="button"
                          onClick={() => onEdit(p)}
                          title="Edit product details"
                          className="p-2 rounded-xl bg-slate-800 hover:bg-blue-600/20 text-slate-300 hover:text-blue-400 border border-slate-700 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Product */}
                        <button
                          type="button"
                          onClick={() => onDelete(p)}
                          title="Delete product"
                          className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600/20 text-slate-300 hover:text-rose-400 border border-slate-700 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProductsTable;

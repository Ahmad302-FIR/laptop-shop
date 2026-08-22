import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { HardDrive, Zap, ShieldCheck, Wrench } from 'lucide-react';
import { useProducts } from '../context/ProductsContext';
import { filterProducts } from '../utils/filterProducts';
import { ProductGrid } from '../components/products/ProductGrid';
import { TopFilterBar } from '../components/products/TopFilterBar';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';

export const AccessoriesPage = () => {
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const accessories = useMemo(() => {
    return filterProducts(products, {
      category: 'accessory',
      searchQuery,
      sortBy
    });
  }, [products, searchQuery, sortBy]);

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="mb-8 bg-gradient-to-r from-slate-950 via-cyan-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 mb-3">
              <HardDrive className="w-3.5 h-3.5" />
              <span>100% Genuine Parts & Upgrades</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Original Accessories & Upgrades
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              We stock 100% OEM original laptop chargers (Type-C & Barrel pin), Samsung & Kingston NVMe SSDs, high-speed DDR4/DDR5 RAM, and protective laptop sleeves.
            </p>
          </div>
        </div>

        {/* Free Installation Service Callout */}
        <div className="mb-8 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                Free Hardware Upgrade & Windows Installation at Our Shops
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Bring your laptop to our Peshawar, Sargodha, or Lakki Marwat branches for instant SSD/RAM installation with 0 service fee.
              </p>
            </div>
          </div>
          <a
            href={getGeneralWhatsAppLink('Assalam o Alaikum, I want to inquire about SSD/RAM upgrade prices for my laptop.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all shrink-0"
          >
            <Zap className="w-4 h-4" />
            <span>Ask for Custom Parts</span>
          </a>
        </div>

        {/* Search & Sort Bar */}
        <TopFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={accessories.length}
          activeFilterCount={searchQuery ? 1 : 0}
          onOpenMobileFilters={() => {}}
          filters={{ searchQuery }}
          onRemoveFilter={() => setSearchQuery('')}
          onResetFilters={() => {
            setSearchQuery('');
            setSortBy('featured');
          }}
        />

        {/* Grid */}
        <ProductGrid
          products={accessories}
          onResetFilters={() => setSearchQuery('')}
          emptyMessage="No accessories matched your search query."
          columns={4}
        />
      </div>
    </div>
  );
};

import React from 'react';
import { ProductCard } from './ProductCard';
import { SearchX, RotateCcw } from 'lucide-react';

export const ProductGrid = ({
  products = [],
  onResetFilters,
  emptyMessage = "No laptops match your selected filters.",
  columns = 3
}) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl bg-white border border-navy-200 shadow-card my-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-accent-600 border border-accent-500/20 mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-navy-950 mb-1">No Products Found</h3>
        <p className="text-sm text-navy-500 max-w-md mb-6">{emptyMessage}</p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-slate-950 font-black text-sm shadow-md transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  };

  return (
    <div className={`grid ${gridCols[columns] || gridCols[3]} gap-5 sm:gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id || product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;

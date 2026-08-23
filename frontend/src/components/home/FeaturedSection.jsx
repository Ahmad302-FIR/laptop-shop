import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '../products/ProductCard';

export const FeaturedSection = ({
  title,
  subtitle,
  badge,
  badgeColor = 'text-accent-500 bg-accent-500/10 border-accent-500/30',
  viewAllLink = '/laptops',
  viewAllText = 'View All',
  products = [],
  bgClass = 'bg-white',
  limit = 4
}) => {
  const displayProducts = products.slice(0, limit);

  if (displayProducts.length === 0) return null;

  return (
    <section className={`py-16 sm:py-20 border-b border-navy-200/80 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            {badge && (
              <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border mb-2.5 ${badgeColor}`}>
                {badge}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-navy-600 mt-1 max-w-xl">
                {subtitle}
              </p>
            )}
          </div>

          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-accent-600 hover:text-accent-700 hover:underline group shrink-0"
            >
              <span>{viewAllText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;

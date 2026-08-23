import React, { useMemo } from 'react';
import { Hero } from '../components/home/Hero';
import { CategoryCards } from '../components/home/CategoryCards';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { BranchStrip } from '../components/home/BranchStrip';
import { useProducts } from '../context/ProductsContext';

export const HomePage = () => {
  const { products } = useProducts();

  // 1. Featured Laptops
  const featuredLaptops = useMemo(() => {
    return products.filter((p) => p.featured && p.category !== 'accessory');
  }, [products]);

  // 2. Latest Arrivals (sorted by dateAdded newest first)
  const latestArrivals = useMemo(() => {
    return [...products]
      .filter((p) => p.category !== 'accessory')
      .sort((a, b) => new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0));
  }, [products]);

  // 3. Best Deals (items with discount / oldPrice or onSale)
  const bestDeals = useMemo(() => {
    return products
      .filter((p) => p.onSale || (p.oldPrice && p.oldPrice > p.price))
      .sort((a, b) => {
        const discA = a.oldPrice ? (a.oldPrice - a.price) / a.oldPrice : 0;
        const discB = b.oldPrice ? (b.oldPrice - b.price) / b.oldPrice : 0;
        return discB - discA;
      });
  }, [products]);

  return (
    <div className="flex flex-col min-h-screen bg-surface-50">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Category Cards Explorer */}
      <CategoryCards />

      {/* 3. 🔥 Featured Laptops */}
      <FeaturedSection
        title="Featured Laptops"
        subtitle="Hand-picked premium business ultrabooks and high-performance machines with high specs."
        badge="🔥 Trending Picks"
        badgeColor="text-accent-500 bg-accent-500/10 border-accent-500/30 font-bold"
        viewAllLink="/laptops"
        viewAllText="Explore All Laptops"
        products={featuredLaptops}
        bgClass="bg-white"
        limit={4}
      />

      {/* 4. 🆕 Latest Arrivals */}
      <FeaturedSection
        title="Latest Fresh Arrivals"
        subtitle="Recently imported laptop stock tested and ready for immediate delivery or store pickup."
        badge="🆕 Fresh Import"
        badgeColor="text-navy-900 bg-navy-100 border-navy-300 font-bold"
        viewAllLink="/laptops?sort=newest"
        viewAllText="View All New Arrivals"
        products={latestArrivals}
        bgClass="bg-surface-50"
        limit={4}
      />

      {/* 5. ⭐ Best Deals & Discounts */}
      <FeaturedSection
        title="Best Deals & Special Offers"
        subtitle="Save big on limited-stock certified laptops with genuine original chargers included."
        badge="⭐ Super Value"
        badgeColor="text-amber-700 bg-amber-50 border-amber-200 font-bold"
        viewAllLink="/laptops?sort=discount"
        viewAllText="View All Hot Deals"
        products={bestDeals}
        bgClass="bg-white"
        limit={4}
      />

      {/* 6. Why Choose Us (Trust & Quality Perks) */}
      <WhyChooseUs />

      {/* 7. Physical Branch Strip */}
      <BranchStrip />
    </div>
  );
};

export default HomePage;

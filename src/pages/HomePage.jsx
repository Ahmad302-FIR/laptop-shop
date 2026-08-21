import React, { useMemo } from 'react';
import { Hero } from '../components/home/Hero';
import { CategoryCards } from '../components/home/CategoryCards';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { BranchStrip } from '../components/home/BranchStrip';
import { products } from '../data/products';

export const HomePage = () => {
  // 1. Featured Laptops
  const featuredLaptops = useMemo(() => {
    return products.filter((p) => p.featured && p.category !== 'accessory');
  }, []);

  // 2. Latest Arrivals (sorted by dateAdded newest first)
  const latestArrivals = useMemo(() => {
    return [...products]
      .filter((p) => p.category !== 'accessory')
      .sort((a, b) => new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0));
  }, []);

  // 3. Best Deals (items with discount / oldPrice)
  const bestDeals = useMemo(() => {
    return products
      .filter((p) => p.oldPrice && p.oldPrice > p.price)
      .sort((a, b) => {
        const discA = (a.oldPrice - a.price) / a.oldPrice;
        const discB = (b.oldPrice - b.price) / b.oldPrice;
        return discB - discA;
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Category Cards Explorer */}
      <CategoryCards />

      {/* 3. 🔥 Featured Laptops */}
      <FeaturedSection
        title="Featured Laptops"
        subtitle="Hand-picked premium business ultrabooks and high-performance machines with high specs."
        badge="🔥 Trending Picks"
        badgeColor="text-rose-600 bg-rose-50 border-rose-200"
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
        badgeColor="text-blue-600 bg-blue-50 border-blue-200"
        viewAllLink="/laptops?sort=newest"
        viewAllText="View All New Arrivals"
        products={latestArrivals}
        bgClass="bg-slate-50"
        limit={4}
      />

      {/* 5. ⭐ Best Deals & Discounts */}
      <FeaturedSection
        title="Best Deals & Special Offers"
        subtitle="Save big on limited-stock certified laptops with genuine original chargers included."
        badge="⭐ Super Value"
        badgeColor="text-amber-700 bg-amber-50 border-amber-200"
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

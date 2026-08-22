/**
 * Clean, isolated product filtering & sorting pipeline
 * Designed to easily transition to API query parameters in the future.
 */

export const filterProducts = (productsList, filters = {}) => {
  const {
    category,
    searchQuery = '',
    brands = [],
    minPrice,
    maxPrice,
    ram = [],
    storage = [],
    condition = [],
    inStockOnly = false,
    sortBy = 'featured'
  } = filters;

  let result = [...productsList];

  // 1. Filter by category
  if (category && category !== 'all') {
    if (category === 'laptops') {
      // All laptop categories except pure accessories
      result = result.filter((p) => p.category !== 'accessory');
    } else {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }
  }

  // 2. Filter by search query (name, brand, processor, model, storage, ram)
  if (searchQuery && searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    result = result.filter((p) => {
      return (
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.model?.toLowerCase().includes(q) ||
        p.processor?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.ram?.toLowerCase().includes(q) ||
        p.storage?.toLowerCase().includes(q) ||
        p.generation?.toLowerCase().includes(q)
      );
    });
  }

  // 3. Filter by Brands (multi-select)
  if (brands && brands.length > 0) {
    result = result.filter((p) =>
      brands.some((b) => b.toLowerCase() === p.brand?.toLowerCase())
    );
  }

  // 4. Filter by Price Range
  if (minPrice !== undefined && minPrice !== null && minPrice !== '') {
    result = result.filter((p) => p.price >= Number(minPrice));
  }
  if (maxPrice !== undefined && maxPrice !== null && maxPrice !== '') {
    result = result.filter((p) => p.price <= Number(maxPrice));
  }

  // 5. Filter by RAM
  if (ram && ram.length > 0) {
    result = result.filter((p) =>
      ram.some((r) => p.ram?.toLowerCase().includes(r.toLowerCase()))
    );
  }

  // 6. Filter by Storage
  if (storage && storage.length > 0) {
    result = result.filter((p) =>
      storage.some((s) => p.storage?.toLowerCase().includes(s.toLowerCase()))
    );
  }

  // 7. Filter by Condition
  if (condition && condition.length > 0) {
    result = result.filter((p) =>
      condition.some((c) => p.condition?.toLowerCase().includes(c.toLowerCase()))
    );
  }

  // 8. Filter by in-stock only
  if (inStockOnly) {
    result = result.filter((p) => p.stock === 'available');
  }

  // 9. Sorting logic
  result.sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0);
      case 'discount': {
        const discA = a.oldPrice ? ((a.oldPrice - a.price) / a.oldPrice) : 0;
        const discB = b.oldPrice ? ((b.oldPrice - b.price) / b.oldPrice) : 0;
        return discB - discA;
      }
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'featured':
      default:
        // Featured items first, then newest
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0);
    }
  });

  return result;
};

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient } from '../api/client';
import { products as fallbackProducts } from '../data/products';

const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Fetch all products from API
  const fetchProducts = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.stock) queryParams.append('stock', filters.stock);
      if (filters.featured) queryParams.append('featured', 'true');
      if (filters.onSale) queryParams.append('onSale', 'true');
      if (filters.sort) queryParams.append('sort', filters.sort);

      const qs = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const res = await apiClient.get(`/products${qs}`);

      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setProducts(res.data);
        setIsBackendConnected(true);
      } else if (res.success && Array.isArray(res.data)) {
        setProducts(res.data);
        setIsBackendConnected(true);
      }
    } catch (err) {
      console.warn('Backend API connection notice (using stored products catalog):', err.message);
      setIsBackendConnected(false);
      // Keep existing products or fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Create Product
  const addProduct = async (productData) => {
    try {
      const res = await apiClient.post('/products', productData);
      if (res.success && res.data) {
        setProducts((prev) => [res.data, ...prev]);
        return { success: true, product: res.data };
      }
      return { success: false, message: res.message };
    } catch (err) {
      // Fallback local update if offline
      const mockId = String(Date.now());
      const localProduct = { id: mockId, _id: mockId, ...productData, dateAdded: new Date() };
      setProducts((prev) => [localProduct, ...prev]);
      return {
        success: true,
        product: localProduct,
        notice: 'Saved locally'
      };
    }
  };

  // Update Product
  const updateProduct = async (id, updates) => {
    try {
      const res = await apiClient.put(`/products/${id}`, updates);
      if (res.success && res.data) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id || p._id === id ? res.data : p))
        );
        return { success: true, product: res.data };
      }
      return { success: false, message: res.message };
    } catch (err) {
      // Fallback local update
      setProducts((prev) =>
        prev.map((p) => (p.id === id || p._id === id ? { ...p, ...updates } : p))
      );
      return { success: true, notice: 'Updated locally' };
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      const res = await apiClient.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id && p._id !== id));
      return { success: true, message: res.message || 'Product deleted' };
    } catch (err) {
      setProducts((prev) => prev.filter((p) => p.id !== id && p._id !== id));
      return { success: true, notice: 'Deleted locally' };
    }
  };

  // Toggle Stock Status
  const toggleStock = async (id, newStock) => {
    try {
      const res = await apiClient.patch(`/products/${id}/stock`, { stock: newStock });
      if (res.success && res.data) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id || p._id === id ? res.data : p))
        );
        return { success: true, product: res.data };
      }
    } catch (err) {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === id || p._id === id) {
            const stock = newStock || (p.stock === 'available' ? 'sold' : 'available');
            return { ...p, stock };
          }
          return p;
        })
      );
      return { success: true };
    }
  };

  // Update Price & Sale
  const updatePrice = async (id, price, oldPrice, onSale) => {
    try {
      const res = await apiClient.patch(`/products/${id}/price`, { price, oldPrice, onSale });
      if (res.success && res.data) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id || p._id === id ? res.data : p))
        );
        return { success: true, product: res.data };
      }
    } catch (err) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id || p._id === id
            ? { ...p, price: Number(price), oldPrice: oldPrice ? Number(oldPrice) : null, onSale: Boolean(onSale) }
            : p
        )
      );
      return { success: true };
    }
  };

  // Toggle Sale
  const toggleSale = async (id, onSale, oldPrice) => {
    try {
      const res = await apiClient.patch(`/products/${id}/sale`, { onSale, oldPrice });
      if (res.success && res.data) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id || p._id === id ? res.data : p))
        );
        return { success: true, product: res.data };
      }
    } catch (err) {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === id || p._id === id) {
            const isSale = onSale !== undefined ? onSale : !p.onSale;
            return { ...p, onSale: isSale, oldPrice: oldPrice !== undefined ? oldPrice : p.oldPrice };
          }
          return p;
        })
      );
      return { success: true };
    }
  };

  // Toggle Featured
  const toggleFeatured = async (id, featured) => {
    try {
      const res = await apiClient.patch(`/products/${id}/featured`, { featured });
      if (res.success && res.data) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id || p._id === id ? res.data : p))
        );
        return { success: true, product: res.data };
      }
    } catch (err) {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === id || p._id === id) {
            return { ...p, featured: featured !== undefined ? featured : !p.featured };
          }
          return p;
        })
      );
      return { success: true };
    }
  };

  // Single product getter
  const getProductById = (id) => {
    return products.find((p) => String(p.id) === String(id) || String(p._id) === String(id));
  };

  // Metrics computation for admin
  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.stock !== 'sold').length,
    soldOut: products.filter((p) => p.stock === 'sold').length,
    onSale: products.filter((p) => p.onSale).length,
    featured: products.filter((p) => p.featured).length,
    totalValue: products
      .filter((p) => p.stock !== 'sold')
      .reduce((acc, curr) => acc + (Number(curr.price) || 0), 0)
  };

  const value = {
    products,
    loading,
    error,
    isBackendConnected,
    stats,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    updatePrice,
    toggleSale,
    toggleFeatured,
    getProductById
  };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export default ProductsContext;

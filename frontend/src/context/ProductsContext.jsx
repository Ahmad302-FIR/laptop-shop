import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient } from '../api/client';
import { products as fallbackProducts } from '../data/products';

const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Fetch all products from API (GET /api/products)
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

      if (res && res.success && Array.isArray(res.data)) {
        setProducts(res.data);
        setIsBackendConnected(true);
      }
    } catch (err) {
      console.warn('[Products API Notice]:', err.message);
      setIsBackendConnected(false);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Create Product (POST /api/products)
  const addProduct = async (productData) => {
    try {
      const res = await apiClient.post('/products', productData);
      if (res && res.success && res.data) {
        setProducts((prev) => [res.data, ...prev]);
        return { success: true, product: res.data };
      }
      return {
        success: false,
        message: res?.message || 'Failed to create product in database'
      };
    } catch (err) {
      console.error('[Add Product Error]:', err);
      return {
        success: false,
        message: err.message || 'Failed to save product. Check MongoDB connection and Cloudinary keys.'
      };
    }
  };

  // Update Product (PUT /api/products/:id)
  const updateProduct = async (id, updates) => {
    try {
      const res = await apiClient.put(`/products/${id}`, updates);
      if (res && res.success && res.data) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id || p._id === id ? res.data : p))
        );
        return { success: true, product: res.data };
      }
      return {
        success: false,
        message: res?.message || 'Failed to update product in database'
      };
    } catch (err) {
      console.error('[Update Product Error]:', err);
      return {
        success: false,
        message: err.message || 'Failed to update product in database'
      };
    }
  };

  // Delete Product (DELETE /api/products/:id)
  const deleteProduct = async (id) => {
    try {
      const res = await apiClient.delete(`/products/${id}`);
      if (res && res.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id && p._id !== id));
        return { success: true, message: res.message || 'Product deleted' };
      }
      return {
        success: false,
        message: res?.message || 'Failed to delete product from database'
      };
    } catch (err) {
      console.error('[Delete Product Error]:', err);
      return {
        success: false,
        message: err.message || 'Failed to delete product from database'
      };
    }
  };

  // Toggle Stock Status (PATCH /api/products/:id/stock)
  const toggleStock = async (id, newStock) => {
    try {
      const res = await apiClient.patch(`/products/${id}/stock`, { stock: newStock });
      if (res && res.success && res.data) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id || p._id === id ? res.data : p))
        );
        return { success: true, product: res.data };
      }
      return { success: false, message: res?.message };
    } catch (err) {
      console.error('[Toggle Stock Error]:', err);
      return { success: false, message: err.message };
    }
  };

  // Update Price & Sale (PATCH /api/products/:id/price)
  const updatePrice = async (id, price, oldPrice, onSale) => {
    try {
      const res = await apiClient.patch(`/products/${id}/price`, { price, oldPrice, onSale });
      if (res && res.success && res.data) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id || p._id === id ? res.data : p))
        );
        return { success: true, product: res.data };
      }
      return { success: false, message: res?.message };
    } catch (err) {
      console.error('[Update Price Error]:', err);
      return { success: false, message: err.message };
    }
  };

  // Toggle Sale (PATCH /api/products/:id/sale)
  const toggleSale = async (id, onSale, oldPrice) => {
    try {
      const res = await apiClient.patch(`/products/${id}/sale`, { onSale, oldPrice });
      if (res && res.success && res.data) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id || p._id === id ? res.data : p))
        );
        return { success: true, product: res.data };
      }
      return { success: false, message: res?.message };
    } catch (err) {
      console.error('[Toggle Sale Error]:', err);
      return { success: false, message: err.message };
    }
  };

  // Toggle Featured (PATCH /api/products/:id/featured)
  const toggleFeatured = async (id, featured) => {
    try {
      const res = await apiClient.patch(`/products/${id}/featured`, { featured });
      if (res && res.success && res.data) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id || p._id === id ? res.data : p))
        );
        return { success: true, product: res.data };
      }
      return { success: false, message: res?.message };
    } catch (err) {
      console.error('[Toggle Featured Error]:', err);
      return { success: false, message: err.message };
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

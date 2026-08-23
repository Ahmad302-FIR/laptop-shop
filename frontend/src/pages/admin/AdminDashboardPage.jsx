import React, { useState } from 'react';
import { useProducts } from '../../context/ProductsContext';
import { AdminNavbar } from '../../components/admin/AdminNavbar';
import { StatsOverview } from '../../components/admin/StatsOverview';
import { ManageProductsTable } from '../../components/admin/ManageProductsTable';
import { ProductFormModal } from '../../components/admin/ProductFormModal';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import { QuickSaleModal } from '../../components/admin/QuickSaleModal';
import { Toast } from '../../components/common/Toast';

export const AdminDashboardPage = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    updatePrice,
    toggleFeatured
  } = useProducts();

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [quickSaleProduct, setQuickSaleProduct] = useState(null);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (message) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3500);
  };

  // Handlers
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (payload) => {
    if (editingProduct) {
      const id = editingProduct.id || editingProduct._id;
      const res = await updateProduct(id, payload);
      if (res && res.success) {
        showToast(`✅ Product updated successfully!`);
      } else {
        showToast(`❌ ${res?.message || 'Failed to update product'}`);
        throw new Error(res?.message || 'Failed to update product');
      }
    } else {
      const res = await addProduct(payload);
      if (res && res.success) {
        showToast(`🎉 Product added to live inventory!`);
      } else {
        showToast(`❌ ${res?.message || 'Failed to add product'}`);
        throw new Error(res?.message || 'Failed to add product');
      }
    }
  };

  const handleDeleteConfirm = async (id) => {
    const res = await deleteProduct(id);
    if (res && res.success) {
      showToast('🗑️ Product removed from catalog.');
    } else {
      showToast(`❌ ${res?.message || 'Failed to delete product'}`);
    }
  };

  const handleToggleStock = async (id, newStock) => {
    const res = await toggleStock(id, newStock);
    if (res && res.success) {
      showToast(`🔄 Stock updated to ${newStock === 'sold' ? 'SOLD OUT' : 'IN STOCK'}`);
    } else {
      showToast(`❌ Failed to update stock`);
    }
  };

  const handleToggleFeatured = async (id, featured) => {
    const res = await toggleFeatured(id, featured);
    if (res && res.success) {
      showToast(featured ? '⭐ Added to Featured spotlights' : 'Removed from Featured');
    } else {
      showToast(`❌ Failed to update featured status`);
    }
  };

  const handleSaveQuickSale = async (id, price, oldPrice, onSale) => {
    const res = await updatePrice(id, price, oldPrice, onSale);
    if (res && res.success) {
      showToast(`🏷️ Sale price saved: Rs. ${Number(price).toLocaleString('en-PK')}`);
    } else {
      showToast(`❌ Failed to save sale price`);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-navy-100 flex flex-col">
      {/* Top Admin Navigation */}
      <AdminNavbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Title Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Laptop Inventory Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-navy-400 mt-1">
              Direct image upload (Cloudinary), persistent MongoDB Atlas storage, stock tracking, and pricing management
            </p>
          </div>
        </div>

        {/* Analytics & Stats Overview Bar */}
        <StatsOverview
          currentFilter={categoryFilter}
          onFilterChange={(newFilter) => setCategoryFilter(newFilter)}
        />

        {/* Manage Products Data Table */}
        <ManageProductsTable
          products={products}
          onAddNew={handleOpenAddModal}
          onEdit={handleOpenEditModal}
          onDelete={(p) => setDeletingProduct(p)}
          onToggleStock={handleToggleStock}
          onToggleFeatured={handleToggleFeatured}
          onQuickSale={(p) => setQuickSaleProduct(p)}
          categoryFilter={categoryFilter}
        />
      </main>

      {/* Modals */}
      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        editProduct={editingProduct}
      />

      <DeleteConfirmModal
        isOpen={!!deletingProduct}
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDeleteConfirm}
      />

      <QuickSaleModal
        isOpen={!!quickSaleProduct}
        product={quickSaleProduct}
        onClose={() => setQuickSaleProduct(null)}
        onSave={handleSaveQuickSale}
      />

      {/* Toast notifications */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
};

export default AdminDashboardPage;

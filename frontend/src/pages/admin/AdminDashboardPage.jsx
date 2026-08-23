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

  // Filter state synced with stats cards
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
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
      if (res.success) {
        showToast(`✅ Product updated successfully!`);
      }
    } else {
      const res = await addProduct(payload);
      if (res.success) {
        showToast(`🎉 Product added to live inventory!`);
      }
    }
  };

  const handleDeleteConfirm = async (id) => {
    const res = await deleteProduct(id);
    if (res.success) {
      showToast('🗑️ Product removed from catalog.');
    }
  };

  const handleToggleStock = async (id, newStock) => {
    await toggleStock(id, newStock);
    showToast(`🔄 Stock updated to ${newStock === 'sold' ? 'SOLD OUT' : 'IN STOCK'}`);
  };

  const handleToggleFeatured = async (id, featured) => {
    await toggleFeatured(id, featured);
    showToast(featured ? '⭐ Added to Featured spotlights' : 'Removed from Featured');
  };

  const handleSaveQuickSale = async (id, price, oldPrice, onSale) => {
    await updatePrice(id, price, oldPrice, onSale);
    showToast(`🏷️ Sale price saved: Rs. ${price.toLocaleString('en-PK')}`);
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
              Direct image upload (Cloudinary), real-time inventory sync, stock tracking, and pricing management
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
          onCategoryFilterChange={(cat) => setCategoryFilter(cat)}
        />
      </main>

      {/* Add / Edit Product Modal */}
      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        editProduct={editingProduct}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingProduct)}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDeleteConfirm}
        product={deletingProduct}
      />

      {/* Quick Sale / Discount Modal */}
      <QuickSaleModal
        isOpen={Boolean(quickSaleProduct)}
        onClose={() => setQuickSaleProduct(null)}
        onSave={handleSaveQuickSale}
        product={quickSaleProduct}
      />

      {/* Live Action Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
};

export default AdminDashboardPage;

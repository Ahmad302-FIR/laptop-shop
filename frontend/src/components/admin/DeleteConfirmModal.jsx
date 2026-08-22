import React, { useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, product }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !product) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(product.id || product._id);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-5">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Delete Product</h3>
            <p className="text-xs text-slate-400 mt-1">
              Are you sure you want to permanently remove <strong className="text-white">"{product.name}"</strong>?
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
          <img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=200&q=80'}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover bg-slate-900 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">{product.name}</p>
            <p className="text-[11px] text-slate-400">Rs. {Number(product.price).toLocaleString('en-PK')}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/20 transition-all disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isDeleting ? 'Deleting...' : 'Yes, Delete Product'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;

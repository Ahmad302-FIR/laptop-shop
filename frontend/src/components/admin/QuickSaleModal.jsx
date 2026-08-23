import React, { useState, useEffect } from 'react';
import { Tag, Save, X, Percent } from 'lucide-react';

export const QuickSaleModal = ({ isOpen, onClose, onSave, product }) => {
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [onSale, setOnSale] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setPrice(product.price ? String(product.price) : '');
      setOldPrice(product.oldPrice ? String(product.oldPrice) : product.price ? String(product.price) : '');
      setOnSale(product.onSale !== undefined ? Boolean(product.onSale) : true);
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const currentPriceNum = Number(price) || 0;
  const oldPriceNum = Number(oldPrice) || 0;
  const discountPercent =
    oldPriceNum > currentPriceNum && oldPriceNum > 0
      ? Math.round(((oldPriceNum - currentPriceNum) / oldPriceNum) * 100)
      : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!price || Number(price) <= 0) {
      alert('Please enter a valid price');
      return;
    }

    setIsSaving(true);
    try {
      await onSave(product.id || product._id, Number(price), oldPrice ? Number(oldPrice) : null, onSale);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-navy-900 border border-navy-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-navy-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-accent-500/15 text-accent-400 border border-accent-500/30">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Promotional Sale / Discount</h3>
              <p className="text-xs text-navy-400">Configure sale badge and price reduction</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-navy-400 hover:text-white hover:bg-navy-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-navy-300 bg-navy-950 p-3.5 rounded-xl border border-navy-800">
          <p className="font-bold text-white truncate">{product.name}</p>
          <p className="text-navy-400 mt-0.5">Original listing price: Rs. {Number(product.price).toLocaleString('en-PK')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-navy-200 font-bold mb-1">
              New Selling Price (Discounted PKR) *
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 110000"
              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white placeholder-navy-500 focus:outline-none focus:border-accent-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-navy-200 font-bold mb-1">
              Original / Crossed-out Price (Old PKR)
            </label>
            <input
              type="number"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              placeholder="e.g. 125000"
              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white placeholder-navy-500 focus:outline-none focus:border-accent-500"
            />
          </div>

          {discountPercent > 0 && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <Percent className="w-4 h-4" />
              <span>Calculated Discount: {discountPercent}% OFF for buyers!</span>
            </div>
          )}

          <div className="pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer text-navy-200 font-semibold">
              <input
                type="checkbox"
                checked={onSale}
                onChange={(e) => setOnSale(e.target.checked)}
                className="w-4 h-4 rounded text-accent-500 bg-navy-950 border-navy-700 focus:ring-accent-500 accent-amber-500"
              />
              <span>Enable "ON SALE" badge on storefront</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-navy-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-navy-300 font-bold text-xs border border-navy-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-accent-500 hover:bg-accent-600 text-slate-950 font-black text-xs shadow-lg shadow-accent-500/20 transition-all disabled:opacity-50 active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Apply Sale Price'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickSaleModal;

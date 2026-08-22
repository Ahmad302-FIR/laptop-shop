import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  Save,
  Laptop,
  Check,
  AlertCircle
} from 'lucide-react';

const INITIAL_FORM_STATE = {
  name: '',
  brand: 'HP',
  category: 'business',
  model: '',
  processor: '',
  generation: '',
  ram: '',
  storage: '',
  display: '',
  graphics: '',
  battery: '',
  os: 'Windows 11 Pro',
  condition: 'Like New (10/10)',
  charger: true,
  warranty: '1 Month Replacement Warranty',
  price: '',
  oldPrice: '',
  stock: 'available',
  featured: false,
  onSale: false,
  images: [
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
  ],
  description: '',
  keyFeatures: ['', '', '']
};

export const ProductFormModal = ({ isOpen, onClose, onSubmit, editProduct = null }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  const isEditMode = Boolean(editProduct);

  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name || '',
        brand: editProduct.brand || 'HP',
        category: editProduct.category || 'business',
        model: editProduct.model || '',
        processor: editProduct.processor || '',
        generation: editProduct.generation || '',
        ram: editProduct.ram || '',
        storage: editProduct.storage || '',
        display: editProduct.display || '',
        graphics: editProduct.graphics || '',
        battery: editProduct.battery || '',
        os: editProduct.os || 'Windows 11 Pro',
        condition: editProduct.condition || 'Like New (10/10)',
        charger: editProduct.charger !== undefined ? Boolean(editProduct.charger) : true,
        warranty: editProduct.warranty || '1 Month Replacement Warranty',
        price: editProduct.price !== undefined ? String(editProduct.price) : '',
        oldPrice: editProduct.oldPrice !== undefined && editProduct.oldPrice !== null ? String(editProduct.oldPrice) : '',
        stock: editProduct.stock || 'available',
        featured: Boolean(editProduct.featured),
        onSale: Boolean(editProduct.onSale),
        images: Array.isArray(editProduct.images) && editProduct.images.length > 0 ? [...editProduct.images] : [
          'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
        ],
        description: editProduct.description || '',
        keyFeatures: Array.isArray(editProduct.keyFeatures) && editProduct.keyFeatures.length > 0
          ? [...editProduct.keyFeatures]
          : ['', '']
      });
    } else {
      setFormData(INITIAL_FORM_STATE);
    }
    setErrors({});
  }, [editProduct, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleKeyFeatureChange = (index, value) => {
    const updated = [...formData.keyFeatures];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, keyFeatures: updated }));
  };

  const addKeyFeatureField = () => {
    setFormData((prev) => ({ ...prev, keyFeatures: [...prev.keyFeatures, ''] }));
  };

  const removeKeyFeatureField = (index) => {
    setFormData((prev) => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== index)
    }));
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    if (formData.images.length >= 6) {
      alert('Maximum 6 images allowed per product');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, newImageUrl.trim()]
    }));
    setNewImageUrl('');
  };

  const handleRemoveImage = (index) => {
    if (formData.images.length <= 1) {
      alert('At least 1 product image is required');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product title is required';
    if (!formData.brand.trim()) errs.brand = 'Brand is required';
    if (!formData.price || Number(formData.price) <= 0) errs.price = 'Valid price is required';
    if (formData.images.length === 0) errs.images = 'At least 1 image URL is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
        keyFeatures: formData.keyFeatures.filter((f) => f.trim().length > 0)
      };

      await onSubmit(payload);
      onClose();
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {isEditMode ? 'Edit Laptop / Product' : 'Add New Laptop to Inventory'}
              </h3>
              <p className="text-xs text-slate-400">
                {isEditMode
                  ? `Updating specifications and pricing for "${editProduct?.name}"`
                  : 'Enter complete laptop specifications, images, and pricing details'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Section 1: Basic Info & Pricing */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 border-b border-slate-800 pb-2">
              1. Basic Product Overview & Pricing
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-8">
                <label className="block text-slate-300 font-bold mb-1">
                  Product Name / Title *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. HP EliteBook 840 G8 Core i7 11th Gen"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                    errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
              </div>

              <div className="sm:col-span-4">
                <label className="block text-slate-300 font-bold mb-1">Brand *</label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="HP">HP</option>
                  <option value="Dell">Dell</option>
                  <option value="Lenovo">Lenovo</option>
                  <option value="Apple">Apple</option>
                  <option value="Asus">Asus</option>
                  <option value="Acer">Acer</option>
                  <option value="Microsoft">Microsoft</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-slate-300 font-bold mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="business">Business Laptops</option>
                  <option value="student">Student / Budget</option>
                  <option value="gaming">Gaming & Workstation</option>
                  <option value="chromebook">Chromebooks</option>
                  <option value="accessory">Accessories & SSDs</option>
                </select>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-slate-300 font-bold mb-1">Price (PKR) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 118000"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                    errors.price ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                />
                {errors.price && <p className="text-[11px] text-rose-400 mt-1">{errors.price}</p>}
              </div>

              <div className="sm:col-span-4">
                <label className="block text-slate-300 font-bold mb-1">
                  Old Price (PKR) <span className="text-slate-500 font-normal">(Optional for Sale)</span>
                </label>
                <input
                  type="number"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  placeholder="e.g. 130000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Badges & Stock Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Stock Availability</label>
                <select
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white focus:outline-none focus:border-blue-500 font-semibold"
                >
                  <option value="available">🟢 In Stock (Available)</option>
                  <option value="sold">🔴 Sold Out</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-semibold">
                  <input
                    type="checkbox"
                    name="onSale"
                    checked={formData.onSale}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500"
                  />
                  <span>🏷️ On Sale (Show Discount)</span>
                </label>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-semibold">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500"
                  />
                  <span>⭐ Featured on Homepage</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 2: Technical Specifications */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 border-b border-slate-800 pb-2">
              2. Technical Specifications
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Processor</label>
                <input
                  type="text"
                  name="processor"
                  value={formData.processor}
                  onChange={handleChange}
                  placeholder="e.g. Intel Core i7-1165G7"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Generation / Series</label>
                <input
                  type="text"
                  name="generation"
                  value={formData.generation}
                  onChange={handleChange}
                  placeholder="e.g. 11th Gen / Ryzen 5000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">RAM</label>
                <input
                  type="text"
                  name="ram"
                  value={formData.ram}
                  onChange={handleChange}
                  placeholder="e.g. 16GB DDR4 (Upgradable)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Storage / SSD</label>
                <input
                  type="text"
                  name="storage"
                  value={formData.storage}
                  onChange={handleChange}
                  placeholder="e.g. 512GB NVMe PCIe M.2 SSD"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Display Screen</label>
                <input
                  type="text"
                  name="display"
                  value={formData.display}
                  onChange={handleChange}
                  placeholder='e.g. 14.0" FHD (1920x1080) IPS Anti-Glare'
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Graphics / GPU</label>
                <input
                  type="text"
                  name="graphics"
                  value={formData.graphics}
                  onChange={handleChange}
                  placeholder="e.g. Intel Iris Xe / NVIDIA RTX 3050"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Battery Backup</label>
                <input
                  type="text"
                  name="battery"
                  value={formData.battery}
                  onChange={handleChange}
                  placeholder="e.g. Up to 7-8 Hours (Health 90%+)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Operating System</label>
                <input
                  type="text"
                  name="os"
                  value={formData.os}
                  onChange={handleChange}
                  placeholder="e.g. Windows 11 Pro Licensed"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Physical Condition</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Like New (10/10)">Like New (10/10)</option>
                  <option value="Excellent (9.5/10)">Excellent (9.5/10)</option>
                  <option value="Good (8.5/10)">Good (8.5/10)</option>
                  <option value="Brand New Box Packed">Brand New Box Packed</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Warranty Details</label>
                <input
                  type="text"
                  name="warranty"
                  value={formData.warranty}
                  onChange={handleChange}
                  placeholder="e.g. 1 Month Replacement Warranty"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-semibold">
                  <input
                    type="checkbox"
                    name="charger"
                    checked={formData.charger}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500"
                  />
                  <span>Original Fast Charger Included</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Product Photos (Multiple Image URLs with Previews) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4" /> 3. Product Gallery Images ({formData.images.length}/6)
              </h4>
              <span className="text-[11px] text-slate-400">Add up to 6 high resolution image URLs</span>
            </div>

            {/* Existing images list & live thumbnail previews */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {formData.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-2xl overflow-hidden border border-slate-700 aspect-square bg-slate-800"
                >
                  <img
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      title="Remove image"
                      className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-slate-900/80 text-[10px] font-bold text-white">
                    #{idx + 1}
                  </span>
                </div>
              ))}
            </div>

            {/* Add Image Input Bar */}
            {formData.images.length < 6 && (
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Paste direct image URL (https://...)"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Image</span>
                </button>
              </div>
            )}
          </div>

          {/* Section 4: Detailed Description & Key Highlights */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 border-b border-slate-800 pb-2">
              4. Product Description & Bullet Points
            </h4>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Detailed Product Overview
              </label>
              <textarea
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe condition, build material, keyboard backlight, battery endurance, and port selection..."
                className="w-full p-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-slate-300 font-bold">
                Key Selling Highlights (Bullet Points)
              </label>
              {formData.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleKeyFeatureChange(idx, e.target.value)}
                    placeholder={`e.g. Backlit keyboard with fingerprint reader`}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs"
                  />
                  {formData.keyFeatures.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeKeyFeatureField(idx)}
                      className="p-2 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addKeyFeatureField}
                className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold mt-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Another Highlight Point</span>
              </button>
            </div>
          </div>

          {/* Modal Footer Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs sm:text-sm border border-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Saving Product...</span>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEditMode ? 'Save Changes' : 'Publish Product'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;

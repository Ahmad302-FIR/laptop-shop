import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  Save,
  Laptop,
  UploadCloud,
  Check,
  AlertCircle,
  Loader2,
  FileImage
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
  description: '',
  keyFeatures: ['', '', '']
};

export const ProductFormModal = ({ isOpen, onClose, onSubmit, editProduct = null }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [existingImages, setExistingImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const [fileNotice, setFileNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);
  const isEditMode = Boolean(editProduct);

  // Clean up object URLs on unmount or reset
  const cleanupObjectUrls = (files) => {
    files.forEach((f) => {
      if (f.preview && f.preview.startsWith('blob:')) {
        URL.revokeObjectURL(f.preview);
      }
    });
  };

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
        description: editProduct.description || '',
        keyFeatures: Array.isArray(editProduct.keyFeatures) && editProduct.keyFeatures.length > 0
          ? [...editProduct.keyFeatures]
          : ['', '']
      });
      setExistingImages(Array.isArray(editProduct.images) ? [...editProduct.images] : []);
    } else {
      setFormData(INITIAL_FORM_STATE);
      setExistingImages([]);
    }

    cleanupObjectUrls(selectedFiles);
    setSelectedFiles([]);
    setErrors({});
    setFileNotice('');
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

  // Helper to format file size in KB/MB
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Process incoming files from input change or drag-and-drop
  const handleFiles = (incomingFiles) => {
    setFileNotice('');
    const rawFiles = Array.from(incomingFiles);

    if (rawFiles.length === 0) return;

    // Filter valid image types
    const validImageFiles = rawFiles.filter((file) => file.type.startsWith('image/'));

    if (validImageFiles.length < rawFiles.length) {
      setFileNotice('Some selected files were ignored because they are not valid images.');
    }

    const currentTotal = existingImages.length + selectedFiles.length;
    const remainingSlots = 6 - currentTotal;

    if (remainingSlots <= 0) {
      setFileNotice('Maximum 6 images allowed per product. Remove some images first.');
      return;
    }

    const filesToAdd = validImageFiles.slice(0, remainingSlots);
    if (validImageFiles.length > remainingSlots) {
      setFileNotice(`Only ${remainingSlots} more image(s) could be added (max 6 total).`);
    }

    const newEntries = filesToAdd.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      name: file.name,
      size: formatFileSize(file.size),
      preview: URL.createObjectURL(file)
    }));

    setSelectedFiles((prev) => [...prev, ...newEntries]);
    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: '' }));
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
    // Reset input so re-selecting same file triggers change
    e.target.value = '';
  };

  // Drag & Drop event handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Remove existing uploaded image (URL from Cloudinary)
  const handleRemoveExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove newly selected local file
  const handleRemoveSelectedFile = (index) => {
    setSelectedFiles((prev) => {
      const target = prev[index];
      if (target && target.preview) {
        URL.revokeObjectURL(target.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product title is required';
    if (!formData.brand.trim()) errs.brand = 'Brand is required';
    if (!formData.price || Number(formData.price) <= 0) errs.price = 'Valid price is required';

    const totalImages = existingImages.length + selectedFiles.length;
    if (totalImages === 0) {
      errs.images = 'At least 1 product image must be uploaded';
    }
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
      // Build FormData for multipart upload
      const formPayload = new FormData();

      formPayload.append('name', formData.name.trim());
      formPayload.append('brand', formData.brand.trim());
      formPayload.append('category', formData.category.toLowerCase());
      formPayload.append('model', formData.model.trim());
      formPayload.append('processor', formData.processor.trim());
      formPayload.append('generation', formData.generation.trim());
      formPayload.append('ram', formData.ram.trim());
      formPayload.append('storage', formData.storage.trim());
      formPayload.append('display', formData.display.trim());
      formPayload.append('graphics', formData.graphics.trim());
      formPayload.append('battery', formData.battery.trim());
      formPayload.append('os', formData.os.trim());
      formPayload.append('condition', formData.condition.trim());
      formPayload.append('charger', String(formData.charger));
      formPayload.append('warranty', formData.warranty.trim());
      formPayload.append('price', String(Number(formData.price)));
      if (formData.oldPrice) {
        formPayload.append('oldPrice', String(Number(formData.oldPrice)));
      }
      formPayload.append('stock', formData.stock);
      formPayload.append('featured', String(formData.featured));
      formPayload.append('onSale', String(formData.onSale));
      formPayload.append('description', formData.description.trim());

      // Cleaned keyFeatures array sent as JSON
      const cleanFeatures = formData.keyFeatures.filter((f) => f && f.trim().length > 0);
      formPayload.append('keyFeatures', JSON.stringify(cleanFeatures));

      // Send retained existing Cloudinary images
      formPayload.append('existingImages', JSON.stringify(existingImages));

      // Append each newly selected image File object
      selectedFiles.forEach((entry) => {
        formPayload.append('images', entry.file);
      });

      await onSubmit(formPayload);
      cleanupObjectUrls(selectedFiles);
      onClose();
    } catch (error) {
      console.error('Submission error:', error);
      setFileNotice(error.message || 'Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalImageCount = existingImages.length + selectedFiles.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-navy-900 border border-navy-800 rounded-3xl w-full max-w-4xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-navy-800 flex items-center justify-between bg-navy-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent-500/15 text-accent-400 border border-accent-500/30">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {isEditMode ? 'Edit Laptop / Product' : 'Add New Laptop to Inventory'}
              </h3>
              <p className="text-xs text-navy-400">
                {isEditMode
                  ? `Updating specifications, images, and pricing for "${editProduct?.name}"`
                  : 'Upload direct photos from your device, fill specifications, and set pricing'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 rounded-xl text-navy-400 hover:text-white hover:bg-navy-800 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Section 1: Basic Info & Pricing */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent-400 border-b border-navy-800 pb-2">
              1. Basic Product Overview & Pricing
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-8">
                <label className="block text-navy-200 font-bold mb-1">
                  Product Name / Title *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. HP EliteBook 840 G8 Core i7 11th Gen"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-navy-950/80 border text-white placeholder-navy-500 focus:outline-none focus:ring-1 ${
                    errors.name
                      ? 'border-status-danger focus:ring-status-danger'
                      : 'border-navy-700 focus:border-accent-500 focus:ring-accent-500'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
              </div>

              <div className="sm:col-span-4">
                <label className="block text-navy-200 font-bold mb-1">Brand *</label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950/80 border border-navy-700 text-white focus:outline-none focus:border-accent-500"
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
                <label className="block text-navy-200 font-bold mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950/80 border border-navy-700 text-white focus:outline-none focus:border-accent-500"
                >
                  <option value="business">Business Laptops</option>
                  <option value="student">Student / Budget</option>
                  <option value="gaming">Gaming & Workstation</option>
                  <option value="chromebook">Chromebooks</option>
                  <option value="accessory">Accessories & SSDs</option>
                </select>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-navy-200 font-bold mb-1">Price (PKR) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 118000"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-navy-950/80 border text-white placeholder-navy-500 focus:outline-none focus:ring-1 ${
                    errors.price
                      ? 'border-status-danger focus:ring-status-danger'
                      : 'border-navy-700 focus:border-accent-500 focus:ring-accent-500'
                  }`}
                />
                {errors.price && <p className="text-[11px] text-rose-400 mt-1">{errors.price}</p>}
              </div>

              <div className="sm:col-span-4">
                <label className="block text-navy-200 font-bold mb-1">
                  Old Price (PKR) <span className="text-navy-400 font-normal">(Optional for Sale)</span>
                </label>
                <input
                  type="number"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  placeholder="e.g. 130000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950/80 border border-navy-700 text-white placeholder-navy-500 focus:outline-none focus:border-accent-500"
                />
              </div>
            </div>

            {/* Badges & Stock Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-navy-200 font-bold mb-1">Stock Availability</label>
                <select
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950/80 border border-navy-700 text-white focus:outline-none focus:border-accent-500 font-semibold"
                >
                  <option value="available">🟢 In Stock (Available)</option>
                  <option value="sold">🔴 Sold Out</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <label className="flex items-center gap-2 cursor-pointer text-navy-200 font-semibold">
                  <input
                    type="checkbox"
                    name="onSale"
                    checked={formData.onSale}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-accent-500 bg-navy-950 border-navy-700 focus:ring-accent-500 accent-amber-500"
                  />
                  <span>🏷️ On Sale (Show Discount)</span>
                </label>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <label className="flex items-center gap-2 cursor-pointer text-navy-200 font-semibold">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-accent-500 bg-navy-950 border-navy-700 focus:ring-accent-500 accent-amber-500"
                  />
                  <span>⭐ Featured on Homepage</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 2: Technical Specifications */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent-400 border-b border-navy-800 pb-2">
              2. Technical Specifications
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-navy-200 font-bold mb-1">Processor</label>
                <input
                  type="text"
                  name="processor"
                  value={formData.processor}
                  onChange={handleChange}
                  placeholder="e.g. Intel Core i7-1165G7"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950/80 border border-navy-700 text-white placeholder-navy-500 focus:outline-none focus:border-accent-500"
                />
              </div>

              <div>
                <label className="block text-navy-200 font-bold mb-1">Generation / Series</label>
                <input
                  type="text"
                  name="generation"
                  value={formData.generation}
                  onChange={handleChange}
                  placeholder="e.g. 11th Gen / Ryzen 5000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950/80 border border-navy-700 text-white placeholder-navy-500 focus:outline-none focus:border-accent-500"
                />
              </div>

              <div>
                <label className="block text-navy-200 font-bold mb-1">RAM</label>
                <input
                  type="text"
                  name="ram"
                  value={formData.ram}
                  onChange={handleChange}
                  placeholder="e.g. 16GB DDR4 (Upgradable)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950/80 border border-navy-700 text-white placeholder-navy-500 focus:outline-none focus:border-accent-500"
                />
              </div>

              <div>
                <label className="block text-navy-200 font-bold mb-1">Storage / SSD</label>
                <input
                  type="text"
                  name="storage"
                  value={formData.storage}
                  onChange={handleChange}
                  placeholder="e.g. 512GB NVMe PCIe M.2 SSD"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950/80 border border-navy-700 text-white placeholder-navy-500 focus:outline-none focus:border-accent-500"
                />
              </div>

              <div>
                <label className="block text-navy-200 font-bold mb-1">Display Screen</label>
                <input
                  type="text"
                  name="display"
                  value={formData.display}
                  onChange={handleChange}
                  placeholder='e.g. 14.0" FHD (1920x1080) IPS Anti-Glare'
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950/80 border border-navy-700 text-white placeholder-navy-500 focus:outline-none focus:border-accent-500"
                />
              </div>

              <div>
                <label className="block text-navy-200 font-bold mb-1">Graphics / GPU</label>
                <input
                  type="text"
                  name="graphics"
                  value={formData.graphics}
                  onChange={handleChange}
                  placeholder="e.g. Intel Iris Xe / NVIDIA RTX 3050"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950/80 border border-navy-700 text-white placeholder-navy-500 focus:outline-none focus:border-accent-500"
                />
              </div>

              <div>
                <label className="block text-navy-200 font-bold mb-1">Battery Backup</label>
                <input
                  type="text"
                  name="battery"
                  value={formData.battery}
                  onChange={handleChange}
                  placeholder="e.g. Up to 7-8 Hours (Health 90%+)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950/80 border border-navy-700 text-white placeholder-navy-500 focus:outline-none focus:border-accent-500"
                />
              </div>

              <div>
                <label className="block text-navy-200 font-bold mb-1">Operating System</label>
                <input
                  type="text"
                  name="os"
                  value={formData.os}
                  onChange={handleChange}
                  placeholder="e.g. Windows 11 Pro Licensed"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950/80 border border-navy-700 text-white placeholder-navy-500 focus:outline-none focus:border-accent-500"
                />
              </div>

              <div>
                <label className="block text-navy-200 font-bold mb-1">Physical Condition</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950/80 border border-navy-700 text-white focus:outline-none focus:border-accent-500"
                >
                  <option value="Like New (10/10)">Like New (10/10)</option>
                  <option value="Excellent (9.5/10)">Excellent (9.5/10)</option>
                  <option value="Good (8.5/10)">Good (8.5/10)</option>
                  <option value="Brand New Box Packed">Brand New Box Packed</option>
                </select>
              </div>

              <div>
                <label className="block text-navy-200 font-bold mb-1">Warranty Details</label>
                <input
                  type="text"
                  name="warranty"
                  value={formData.warranty}
                  onChange={handleChange}
                  placeholder="e.g. 1 Month Replacement Warranty"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950/80 border border-navy-700 text-white placeholder-navy-500 focus:outline-none focus:border-accent-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <label className="flex items-center gap-2 cursor-pointer text-navy-200 font-semibold">
                  <input
                    type="checkbox"
                    name="charger"
                    checked={formData.charger}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-accent-500 bg-navy-950 border-navy-700 focus:ring-accent-500 accent-amber-500"
                  />
                  <span>Original Fast Charger Included</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Direct Image File Upload (Drag & Drop + Mobile Camera/Gallery) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-navy-800 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent-400 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4" /> 3. Product Gallery Photos ({totalImageCount}/6)
              </h4>
              <span className="text-[11px] text-navy-400">Direct file upload • Max 6 images (10MB each)</span>
            </div>

            {/* Hidden File Input for Native File Browser & Mobile Camera */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileInputChange}
              className="hidden"
            />

            {/* Drag and Drop Zone */}
            {totalImageCount < 6 && (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
                  isDragging
                    ? 'border-accent-400 bg-accent-500/10 scale-[1.01]'
                    : 'border-navy-700 hover:border-accent-500/60 bg-navy-950/60 hover:bg-navy-950'
                }`}
              >
                <div className="p-3.5 rounded-2xl bg-navy-800 text-accent-400 border border-navy-700 shadow-inner">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">
                    <span className="text-accent-400 underline underline-offset-2">Click to browse</span> or drag and drop laptop photos
                  </p>
                  <p className="text-xs text-navy-400">
                    Supports JPG, PNG, WEBP, AVIF from laptop gallery or phone camera
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-800 border border-navy-700 text-[11px] text-navy-300">
                  <FileImage className="w-3.5 h-3.5 text-accent-400" />
                  <span>{6 - totalImageCount} slot(s) available</span>
                </div>
              </div>
            )}

            {/* Validation Notice Banner */}
            {(errors.images || fileNotice) && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>{errors.images || fileNotice}</span>
              </div>
            )}

            {/* Gallery Previews (Existing Cloudinary + Newly Selected Local Files) */}
            {totalImageCount > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-navy-300 flex items-center justify-between">
                  <span>Photo Previews:</span>
                  <span className="text-[11px] text-navy-400">First photo will be the main thumbnail</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {/* 1. Existing Uploaded Images */}
                  {existingImages.map((imgUrl, idx) => (
                    <div
                      key={`existing-${idx}`}
                      className="relative group rounded-2xl overflow-hidden border border-navy-700 aspect-square bg-navy-950 shadow-md"
                    >
                      <img
                        src={imgUrl}
                        alt={`Existing ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-navy-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingImage(idx)}
                          title="Remove image"
                          className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-500 transition-colors shadow-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-navy-900/90 text-[9px] font-bold text-navy-300 border border-navy-700">
                        Uploaded #{idx + 1}
                      </span>
                    </div>
                  ))}

                  {/* 2. Newly Selected Local Image Files */}
                  {selectedFiles.map((item, idx) => (
                    <div
                      key={item.id}
                      className="relative group rounded-2xl overflow-hidden border-2 border-accent-500/60 aspect-square bg-navy-950 shadow-md"
                    >
                      <img
                        src={item.preview}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-navy-950/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 gap-1.5">
                        <span className="text-[10px] text-white font-medium text-center truncate max-w-full px-1">
                          {item.name}
                        </span>
                        <span className="text-[9px] text-accent-300 font-bold">{item.size}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSelectedFile(idx)}
                          title="Remove selected file"
                          className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-500 transition-colors shadow-lg mt-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-accent-500 text-[9px] font-extrabold text-slate-950 shadow-sm">
                        New
                      </span>
                      <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-navy-900/90 text-[9px] font-bold text-white">
                        #{existingImages.length + idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Detailed Description & Key Highlights */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent-400 border-b border-navy-800 pb-2">
              4. Product Description & Bullet Points
            </h4>

            <div>
              <label className="block text-navy-200 font-bold mb-1">
                Detailed Product Overview
              </label>
              <textarea
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe condition, build material, keyboard backlight, battery endurance, and port selection..."
                className="w-full p-3 rounded-xl bg-navy-950/80 border border-navy-700 text-white placeholder-navy-500 focus:outline-none focus:border-accent-500 text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-navy-200 font-bold">
                Key Selling Highlights (Bullet Points)
              </label>
              {formData.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleKeyFeatureChange(idx, e.target.value)}
                    placeholder={`e.g. Backlit keyboard with fingerprint reader`}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-navy-950/80 border border-navy-700 text-white placeholder-navy-500 focus:outline-none focus:border-accent-500 text-xs"
                  />
                  {formData.keyFeatures.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeKeyFeatureField(idx)}
                      className="p-2 text-navy-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addKeyFeatureField}
                className="inline-flex items-center gap-1 text-xs text-accent-400 hover:text-accent-300 font-semibold mt-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Another Highlight Point</span>
              </button>
            </div>
          </div>

          {/* Modal Footer Buttons */}
          <div className="pt-4 border-t border-navy-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-navy-300 font-bold text-xs sm:text-sm border border-navy-700 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-accent-500/20 transition-all disabled:opacity-50 active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Uploading Images & Saving...</span>
                </>
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

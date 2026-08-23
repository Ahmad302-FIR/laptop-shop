import { Product } from '../models/Product.js';
import { isDBConnected } from '../config/db.js';
import { getMemoryProducts, setMemoryProducts } from '../utils/memoryStore.js';
import { deleteCloudinaryImage } from '../config/cloudinary.js';

/**
 * Get all products (Public)
 * GET /api/products
 */
export const getProducts = async (req, res) => {
  try {
    const { category, search, brand, stock, featured, onSale, sort } = req.query;

    if (isDBConnected()) {
      const query = {};

      // Filter by category
      if (category && category !== 'all') {
        if (category === 'laptops') {
          query.category = { $ne: 'accessory' };
        } else {
          query.category = category.toLowerCase();
        }
      }

      // Filter by stock
      if (stock) {
        query.stock = stock;
      }

      // Filter by featured
      if (featured === 'true') {
        query.featured = true;
      }

      // Filter by onSale
      if (onSale === 'true') {
        query.onSale = true;
      }

      // Filter by brand
      if (brand) {
        query.brand = new RegExp(brand, 'i');
      }

      // Search query filter (name, brand, processor, model)
      if (search && search.trim() !== '') {
        const searchRegex = new RegExp(search.trim(), 'i');
        query.$or = [
          { name: searchRegex },
          { brand: searchRegex },
          { model: searchRegex },
          { processor: searchRegex },
          { description: searchRegex }
        ];
      }

      // Sorting
      let sortOption = { dateAdded: -1 };
      if (sort === 'price-asc') sortOption = { price: 1 };
      else if (sort === 'price-desc') sortOption = { price: -1 };
      else if (sort === 'newest') sortOption = { dateAdded: -1 };
      else if (sort === 'rating') sortOption = { rating: -1 };
      else if (sort === 'featured') sortOption = { featured: -1, dateAdded: -1 };

      const products = await Product.find(query).sort(sortOption);

      return res.status(200).json({
        success: true,
        count: products.length,
        data: products
      });
    } else {
      // In-Memory store fallback
      let list = getMemoryProducts();
      if (category && category !== 'all') {
        if (category === 'laptops') {
          list = list.filter((p) => p.category !== 'accessory');
        } else {
          list = list.filter((p) => p.category?.toLowerCase() === category.toLowerCase());
        }
      }
      if (search) {
        const q = search.toLowerCase();
        list = list.filter((p) =>
          p.name?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.processor?.toLowerCase().includes(q)
        );
      }
      return res.status(200).json({
        success: true,
        count: list.length,
        data: list
      });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

/**
 * Get single product by ID (Public)
 * GET /api/products/:id
 */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDBConnected()) {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${id} not found`
        });
      }
      return res.status(200).json({
        success: true,
        data: product
      });
    } else {
      const memoryProducts = getMemoryProducts();
      const product = memoryProducts.find((p) => String(p.id) === String(id) || String(p._id) === String(id));
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${id} not found`
        });
      }
      return res.status(200).json({
        success: true,
        data: product
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching product details',
      error: error.message
    });
  }
};

/**
 * Create new product (Admin Only)
 * POST /api/products
 */
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      model,
      processor,
      generation,
      ram,
      storage,
      display,
      graphics,
      battery,
      os,
      condition,
      charger,
      warranty,
      price,
      oldPrice,
      stock,
      featured,
      onSale,
      images,
      description,
      keyFeatures
    } = req.body;

    // Validation
    if (!name || !brand || price === undefined || price === null) {
      return res.status(400).json({
        success: false,
        message: 'Name, brand, and price are required fields'
      });
    }

    if (Number(price) < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price cannot be negative'
      });
    }

    const newProductData = {
      name: name.trim(),
      brand: brand.trim(),
      category: category ? category.toLowerCase() : 'business',
      model: model ? model.trim() : '',
      processor: processor ? processor.trim() : '',
      generation: generation ? generation.trim() : '',
      ram: ram ? ram.trim() : '',
      storage: storage ? storage.trim() : '',
      display: display ? display.trim() : '',
      graphics: graphics ? graphics.trim() : '',
      battery: battery ? battery.trim() : '',
      os: os ? os.trim() : 'Windows 11 Pro',
      condition: condition ? condition.trim() : 'Like New (10/10)',
      charger: charger !== undefined ? Boolean(charger) : true,
      warranty: warranty ? warranty.trim() : '1 Month Replacement Warranty',
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : null,
      stock: stock === 'sold' ? 'sold' : 'available',
      featured: Boolean(featured),
      onSale: Boolean(onSale) || (oldPrice && Number(oldPrice) > Number(price)),
      images: Array.isArray(images) && images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'
      ],
      description: description ? description.trim() : '',
      keyFeatures: Array.isArray(keyFeatures) ? keyFeatures : [],
      dateAdded: new Date()
    };

    if (isDBConnected()) {
      const product = await Product.create(newProductData);
      return res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product
      });
    } else {
      const memoryProducts = getMemoryProducts();
      const mockId = String(Date.now());
      const product = { id: mockId, _id: mockId, ...newProductData };
      memoryProducts.unshift(product);
      setMemoryProducts(memoryProducts);
      return res.status(201).json({
        success: true,
        message: 'Product created successfully (Dev Store)',
        data: product
      });
    }
  } catch (error) {
    console.error('Create product error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
};

/**
 * Update product (Admin Only)
 * PUT /api/products/:id
 */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.price !== undefined && Number(updates.price) < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price cannot be negative'
      });
    }

    if (updates.oldPrice && updates.price && Number(updates.oldPrice) > Number(updates.price)) {
      updates.onSale = true;
    }

    if (isDBConnected()) {
      // Find existing product to detect removed images
      const existingProduct = await Product.findById(id);
      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${id} not found`
        });
      }

      // If new images list is provided, delete any removed Cloudinary images
      if (Array.isArray(updates.images) && Array.isArray(existingProduct.images)) {
        const removedImages = existingProduct.images.filter(
          (oldUrl) => !updates.images.includes(oldUrl)
        );
        for (const removedUrl of removedImages) {
          deleteCloudinaryImage(removedUrl).catch((err) =>
            console.warn('Cloudinary delete on edit notice:', err.message)
          );
        }
      }

      const product = await Product.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true
      });

      return res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: product
      });
    } else {
      const memoryProducts = getMemoryProducts();
      const index = memoryProducts.findIndex((p) => String(p.id) === String(id) || String(p._id) === String(id));
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${id} not found`
        });
      }

      // Cleanup removed images in fallback store
      const existingProduct = memoryProducts[index];
      if (Array.isArray(updates.images) && Array.isArray(existingProduct.images)) {
        const removedImages = existingProduct.images.filter(
          (oldUrl) => !updates.images.includes(oldUrl)
        );
        for (const removedUrl of removedImages) {
          deleteCloudinaryImage(removedUrl).catch(() => {});
        }
      }

      memoryProducts[index] = { ...memoryProducts[index], ...updates };
      setMemoryProducts(memoryProducts);
      return res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: memoryProducts[index]
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
};

/**
 * Delete product (Admin Only)
 * DELETE /api/products/:id
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDBConnected()) {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${id} not found`
        });
      }

      // Delete all product images from Cloudinary
      if (Array.isArray(product.images)) {
        for (const imgUrl of product.images) {
          deleteCloudinaryImage(imgUrl).catch((err) =>
            console.warn('Cloudinary delete on remove notice:', err.message)
          );
        }
      }

      await Product.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: `Product "${product.name}" deleted successfully`,
        data: { id }
      });
    } else {
      let memoryProducts = getMemoryProducts();
      const product = memoryProducts.find((p) => String(p.id) === String(id) || String(p._id) === String(id));
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${id} not found`
        });
      }

      // Delete all product images from Cloudinary
      if (Array.isArray(product.images)) {
        for (const imgUrl of product.images) {
          deleteCloudinaryImage(imgUrl).catch(() => {});
        }
      }

      memoryProducts = memoryProducts.filter((p) => String(p.id) !== String(id) && String(p._id) !== String(id));
      setMemoryProducts(memoryProducts);
      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        data: { id }
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
};

/**
 * Toggle stock status (Admin Only)
 * PATCH /api/products/:id/stock
 */
export const toggleStockStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body; // 'available' | 'sold' or toggle if not provided

    if (isDBConnected()) {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      product.stock = stock ? stock : product.stock === 'available' ? 'sold' : 'available';
      await product.save();

      return res.status(200).json({
        success: true,
        message: `Stock status set to ${product.stock}`,
        data: product
      });
    } else {
      const memoryProducts = getMemoryProducts();
      const product = memoryProducts.find((p) => String(p.id) === String(id) || String(p._id) === String(id));
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      product.stock = stock ? stock : product.stock === 'available' ? 'sold' : 'available';
      setMemoryProducts(memoryProducts);
      return res.status(200).json({
        success: true,
        message: `Stock status set to ${product.stock}`,
        data: product
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to toggle stock status',
      error: error.message
    });
  }
};

/**
 * Update price & sale status (Admin Only)
 * PATCH /api/products/:id/price
 */
export const updateProductPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, oldPrice, onSale } = req.body;

    if (price === undefined || Number(price) < 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid price is required'
      });
    }

    const updates = {
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : null,
      onSale: onSale !== undefined ? Boolean(onSale) : Boolean(oldPrice && Number(oldPrice) > Number(price))
    };

    if (isDBConnected()) {
      const product = await Product.findByIdAndUpdate(id, updates, { new: true });
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      return res.status(200).json({ success: true, message: 'Price updated', data: product });
    } else {
      const memoryProducts = getMemoryProducts();
      const product = memoryProducts.find((p) => String(p.id) === String(id) || String(p._id) === String(id));
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      Object.assign(product, updates);
      setMemoryProducts(memoryProducts);
      return res.status(200).json({ success: true, message: 'Price updated', data: product });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update price', error: error.message });
  }
};

/**
 * Toggle Sale Flag (Admin Only)
 * PATCH /api/products/:id/sale
 */
export const toggleSaleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { onSale, oldPrice } = req.body;

    if (isDBConnected()) {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      product.onSale = onSale !== undefined ? Boolean(onSale) : !product.onSale;
      if (oldPrice !== undefined) product.oldPrice = oldPrice ? Number(oldPrice) : null;
      await product.save();
      return res.status(200).json({ success: true, message: 'Sale status updated', data: product });
    } else {
      const memoryProducts = getMemoryProducts();
      const product = memoryProducts.find((p) => String(p.id) === String(id) || String(p._id) === String(id));
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      product.onSale = onSale !== undefined ? Boolean(onSale) : !product.onSale;
      if (oldPrice !== undefined) product.oldPrice = oldPrice ? Number(oldPrice) : null;
      setMemoryProducts(memoryProducts);
      return res.status(200).json({ success: true, message: 'Sale status updated', data: product });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to toggle sale', error: error.message });
  }
};

/**
 * Toggle Featured Flag (Admin Only)
 * PATCH /api/products/:id/featured
 */
export const toggleFeaturedStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { featured } = req.body;

    if (isDBConnected()) {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      product.featured = featured !== undefined ? Boolean(featured) : !product.featured;
      await product.save();
      return res.status(200).json({ success: true, message: 'Featured status updated', data: product });
    } else {
      const memoryProducts = getMemoryProducts();
      const product = memoryProducts.find((p) => String(p.id) === String(id) || String(p._id) === String(id));
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      product.featured = featured !== undefined ? Boolean(featured) : !product.featured;
      setMemoryProducts(memoryProducts);
      return res.status(200).json({ success: true, message: 'Featured status updated', data: product });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to toggle featured', error: error.message });
  }
};

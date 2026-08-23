import { Product } from '../models/Product.js';
import { connectDB, isDBConnected } from '../config/db.js';
import { deleteCloudinaryImage } from '../config/cloudinary.js';
import { initialProducts } from '../utils/initialProducts.js';

/**
 * Helper to ensure MongoDB connection is ready before running queries
 */
const ensureDatabase = async () => {
  if (!isDBConnected()) {
    const connected = await connectDB();
    if (!connected) {
      const err = new Error(
        'MongoDB connection unavailable. Please add MONGODB_URI to your Vercel Project Settings (Environment Variables) and allow 0.0.0.0/0 in MongoDB Atlas.'
      );
      err.status = 503;
      throw err;
    }
  }
};

/**
 * Get all products (Public)
 * GET /api/products
 */
export const getProducts = async (req, res) => {
  try {
    const { category, search, brand, stock, featured, onSale, sort } = req.query;

    const isConnected = isDBConnected() ? true : await connectDB();

    if (isConnected) {
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

      // Search query filter
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
    }

    // Fallback if MongoDB is not yet configured: provide initial default catalog with notice
    let list = [...initialProducts];
    if (category && category !== 'all') {
      if (category === 'laptops') {
        list = list.filter((p) => p.category !== 'accessory');
      } else {
        list = list.filter((p) => p.category?.toLowerCase() === category.toLowerCase());
      }
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.processor?.toLowerCase().includes(q)
      );
    }

    return res.status(200).json({
      success: true,
      count: list.length,
      data: list,
      warning:
        'MongoDB is not configured in Vercel environment variables. Showing default product catalog.'
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch products',
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
    const isConnected = isDBConnected() ? true : await connectDB();

    if (isConnected) {
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
    }

    const fallback = initialProducts.find(
      (p) => String(p.id) === String(id) || String(p._id) === String(id)
    );
    if (fallback) {
      return res.status(200).json({
        success: true,
        data: fallback
      });
    }

    return res.status(404).json({
      success: false,
      message: `Product with ID ${id} not found`
    });
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
    await ensureDatabase();

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

    if (!name || !brand || price === undefined || price === null || price === '') {
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
      images:
        Array.isArray(images) && images.length > 0
          ? images
          : [
              'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'
            ],
      description: description ? description.trim() : '',
      keyFeatures: Array.isArray(keyFeatures) ? keyFeatures : [],
      dateAdded: new Date()
    };

    // Save directly to MongoDB via Product.create
    const product = await Product.create(newProductData);
    console.log(`[MongoDB] Created new product: "${product.name}" (ID: ${product._id})`);

    return res.status(201).json({
      success: true,
      message: 'Product created successfully and saved to MongoDB Atlas',
      data: product
    });
  } catch (error) {
    console.error('[Create Product Error]:', error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Failed to create product in database',
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
    await ensureDatabase();
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

    // Find existing product to detect removed images
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found in database`
      });
    }

    // If new images list is provided, delete any removed Cloudinary images
    if (Array.isArray(updates.images) && Array.isArray(existingProduct.images)) {
      const removedImages = existingProduct.images.filter(
        (oldUrl) => !updates.images.includes(oldUrl)
      );
      for (const removedUrl of removedImages) {
        deleteCloudinaryImage(removedUrl).catch((err) =>
          console.warn('[Cloudinary] Delete on edit notice:', err.message)
        );
      }
    }

    const product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    console.log(`[MongoDB] Updated product: "${product.name}" (ID: ${product._id})`);

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully in MongoDB',
      data: product
    });
  } catch (error) {
    console.error('[Update Product Error]:', error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Failed to update product in database',
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
    await ensureDatabase();
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found in database`
      });
    }

    // Delete all product images from Cloudinary
    if (Array.isArray(product.images)) {
      for (const imgUrl of product.images) {
        deleteCloudinaryImage(imgUrl).catch((err) =>
          console.warn('[Cloudinary] Delete on remove notice:', err.message)
        );
      }
    }

    await Product.findByIdAndDelete(id);
    console.log(`[MongoDB] Deleted product: "${product.name}" (ID: ${id})`);

    return res.status(200).json({
      success: true,
      message: `Product "${product.name}" deleted successfully from MongoDB`,
      data: { id }
    });
  } catch (error) {
    console.error('[Delete Product Error]:', error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Failed to delete product from database',
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
    await ensureDatabase();
    const { id } = req.params;
    const { stock } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found in database' });
    }

    product.stock = stock ? stock : product.stock === 'available' ? 'sold' : 'available';
    await product.save();

    return res.status(200).json({
      success: true,
      message: `Stock status set to ${product.stock}`,
      data: product
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Failed to toggle stock status',
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
    await ensureDatabase();
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

    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found in database' });

    return res.status(200).json({ success: true, message: 'Price updated in database', data: product });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Failed to update price',
      error: error.message
    });
  }
};

/**
 * Toggle Sale Flag (Admin Only)
 * PATCH /api/products/:id/sale
 */
export const toggleSaleStatus = async (req, res) => {
  try {
    await ensureDatabase();
    const { id } = req.params;
    const { onSale, oldPrice } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found in database' });

    product.onSale = onSale !== undefined ? Boolean(onSale) : !product.onSale;
    if (oldPrice !== undefined) product.oldPrice = oldPrice ? Number(oldPrice) : null;
    await product.save();

    return res.status(200).json({ success: true, message: 'Sale status updated in database', data: product });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Failed to toggle sale',
      error: error.message
    });
  }
};

/**
 * Toggle Featured Flag (Admin Only)
 * PATCH /api/products/:id/featured
 */
export const toggleFeaturedStatus = async (req, res) => {
  try {
    await ensureDatabase();
    const { id } = req.params;
    const { featured } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found in database' });

    product.featured = featured !== undefined ? Boolean(featured) : !product.featured;
    await product.save();

    return res.status(200).json({ success: true, message: 'Featured status updated in database', data: product });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Failed to toggle featured',
      error: error.message
    });
  }
};

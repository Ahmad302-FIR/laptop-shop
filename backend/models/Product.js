import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['business', 'student', 'gaming', 'chromebook', 'accessory', 'laptop'],
      default: 'business'
    },
    model: {
      type: String,
      trim: true,
      default: ''
    },
    processor: {
      type: String,
      trim: true,
      default: ''
    },
    generation: {
      type: String,
      trim: true,
      default: ''
    },
    ram: {
      type: String,
      trim: true,
      default: ''
    },
    storage: {
      type: String,
      trim: true,
      default: ''
    },
    display: {
      type: String,
      trim: true,
      default: ''
    },
    graphics: {
      type: String,
      trim: true,
      default: ''
    },
    battery: {
      type: String,
      trim: true,
      default: ''
    },
    os: {
      type: String,
      trim: true,
      default: 'Windows 11 Pro'
    },
    condition: {
      type: String,
      trim: true,
      default: 'Like New (10/10)'
    },
    charger: {
      type: Boolean,
      default: true
    },
    warranty: {
      type: String,
      trim: true,
      default: '1 Month Replacement Warranty'
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price must be greater than or equal to 0']
    },
    oldPrice: {
      type: Number,
      default: null
    },
    stock: {
      type: String,
      enum: ['available', 'sold'],
      default: 'available'
    },
    featured: {
      type: Boolean,
      default: false
    },
    onSale: {
      type: Boolean,
      default: false
    },
    dateAdded: {
      type: Date,
      default: Date.now
    },
    images: {
      type: [String],
      default: []
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    keyFeatures: {
      type: [String],
      default: []
    },
    rating: {
      type: Number,
      default: 4.9,
      min: 1,
      max: 5
    },
    reviewsCount: {
      type: Number,
      default: 12
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Indexing for fast search and filtering
productSchema.index({ name: 'text', brand: 'text', processor: 'text', model: 'text' });
productSchema.index({ category: 1, stock: 1, price: 1 });

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

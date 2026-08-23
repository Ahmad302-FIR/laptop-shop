import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight,
  ShieldCheck,
  Phone,
  Share2,
  MapPin,
  ArrowLeft,
  Truck,
  Cpu,
  Layers,
  HardDrive,
  Monitor
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useProducts } from '../context/ProductsContext';
import { branches, shopContact } from '../data/branches';
import { formatPKR, calculateDiscount } from '../utils/formatters';
import { getWhatsAppLink, getGeneralWhatsAppLink } from '../utils/whatsapp';
import { Badge } from '../components/common/Badge';
import { ImageGallery } from '../components/products/ImageGallery';
import { SpecsTable } from '../components/products/SpecsTable';
import { ProductCard } from '../components/products/ProductCard';
import { Toast } from '../components/common/Toast';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('peshawar');

  // Find product by id
  const product = useMemo(() => {
    return products.find((p) => String(p.id) === String(id) || String(p._id) === String(id));
  }, [products, id]);

  // Find related products (same category or brand, excluding current)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => (String(p.id) !== String(id) && String(p._id) !== String(id)) && (p.category === product.category || p.brand === product.brand))
      .slice(0, 4);
  }, [products, product, id]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-surface-50 px-4 text-center">
        <h2 className="text-2xl font-black text-navy-950 mb-2">Product Not Found</h2>
        <p className="text-sm text-navy-500 max-w-md mb-6">
          The laptop model you are looking for might be out of stock or removed.
        </p>
        <Link
          to="/laptops"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-slate-950 text-sm font-black shadow-md transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Available Laptops</span>
        </Link>
      </div>
    );
  }

  const {
    name,
    brand,
    model,
    category,
    processor,
    ram,
    storage,
    display,
    condition,
    price,
    oldPrice,
    stock = 'available',
    images = [],
    description
  } = product;

  const isSoldOut = stock === 'sold';
  const discount = calculateDiscount(price, oldPrice);

  // Active target branch for inquiry
  const targetBranchObj = branches.find((b) => b.id === selectedBranch) || branches[0];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setToastMessage('Product link copied to clipboard!');
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  return (
    <div className="bg-surface-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-navy-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-accent-600 transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-navy-400" />
          <Link to="/laptops" className="hover:text-accent-600 transition-colors font-medium">Laptops</Link>
          <ChevronRight className="w-3.5 h-3.5 text-navy-400" />
          <Link to={`/category/${category}`} className="hover:text-accent-600 transition-colors capitalize font-medium">
            {category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-navy-400" />
          <span className="text-navy-950 font-bold truncate max-w-xs">{name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7">
            <ImageGallery images={images} productName={name} />

            {/* Quick in-store availability notice */}
            <div className="mt-6 p-4 rounded-2xl bg-white border border-navy-200 shadow-card">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-navy-500">
                  Select Branch for Inquiry:
                </span>
                <span className="text-xs text-accent-600 font-bold">
                  Physical stock available
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {branches.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBranch(b.id)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      selectedBranch === b.id
                        ? 'bg-amber-500/10 border-accent-500 ring-1 ring-accent-500/30'
                        : 'bg-surface-50 border-navy-200 hover:bg-navy-50'
                    }`}
                  >
                    <p className="text-xs font-bold text-navy-900 truncate">{b.name.replace(' Branch', '')}</p>
                    <p className="text-[10px] text-navy-500 truncate">{b.displayWhatsapp}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Actions Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-white border border-navy-200 p-6 sm:p-8 shadow-card space-y-6">
              {/* Badges & Share Row */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="condition" size="md">
                    {condition || 'Like New'}
                  </Badge>
                  {isSoldOut ? (
                    <Badge variant="danger" size="md" dot>
                      Sold Out
                    </Badge>
                  ) : (
                    <Badge variant="success" size="md" dot>
                      Available in Stock
                    </Badge>
                  )}
                  {discount > 0 && (
                    <Badge variant="discount" size="md">
                      {discount}% OFF
                    </Badge>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  title="Share product link"
                  className="p-2 rounded-xl text-navy-400 hover:text-navy-900 hover:bg-navy-100 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Brand */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent-600">
                  {brand} Certified
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight mt-1 leading-snug">
                  {name}
                </h1>
                <p className="text-xs text-navy-400 mt-1">Model / SKU: {model || name}</p>
              </div>

              {/* Price Row */}
              <div className="p-4 rounded-2xl bg-surface-50 border border-navy-200 flex items-baseline justify-between gap-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
                    {formatPKR(price)}
                  </div>
                  {oldPrice && oldPrice > price && (
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm line-through text-navy-400">{formatPKR(oldPrice)}</span>
                      <span className="text-xs font-bold text-rose-600">
                        Save {formatPKR(oldPrice - price)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right text-xs text-navy-500 font-medium">
                  <div>Net Cash / COD</div>
                  <div className="text-[11px] text-emerald-600 font-bold">Free Charger Included</div>
                </div>
              </div>

              {/* Highlight Specs Summary */}
              {category !== 'accessory' && (
                <div className="grid grid-cols-2 gap-3 text-xs text-navy-700">
                  {processor && (
                    <div className="p-3 rounded-xl bg-surface-50 border border-navy-100 flex items-start gap-2.5">
                      <Cpu className="w-4 h-4 text-accent-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] text-navy-400 uppercase font-bold">Processor</div>
                        <div className="font-bold text-navy-900">{processor}</div>
                      </div>
                    </div>
                  )}
                  {ram && (
                    <div className="p-3 rounded-xl bg-surface-50 border border-navy-100 flex items-start gap-2.5">
                      <Layers className="w-4 h-4 text-accent-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] text-navy-400 uppercase font-bold">Memory</div>
                        <div className="font-bold text-navy-900">{ram}</div>
                      </div>
                    </div>
                  )}
                  {storage && (
                    <div className="p-3 rounded-xl bg-surface-50 border border-navy-100 flex items-start gap-2.5">
                      <HardDrive className="w-4 h-4 text-accent-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] text-navy-400 uppercase font-bold">Storage</div>
                        <div className="font-bold text-navy-900">{storage}</div>
                      </div>
                    </div>
                  )}
                  {display && (
                    <div className="p-3 rounded-xl bg-surface-50 border border-navy-100 flex items-start gap-2.5">
                      <Monitor className="w-4 h-4 text-accent-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] text-navy-400 uppercase font-bold">Display</div>
                        <div className="font-bold text-navy-900 truncate">{display.split(' ')[0]}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Description brief */}
              {description && (
                <p className="text-xs sm:text-sm text-navy-600 leading-relaxed">
                  {description}
                </p>
              )}

              {/* Action Buttons: WhatsApp & Call */}
              <div className="space-y-3 pt-2">
                {isSoldOut ? (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-center">
                    <p className="text-xs font-bold text-rose-700">This laptop is currently sold out.</p>
                    <a
                      href={getGeneralWhatsAppLink(
                        `Assalam o Alaikum, I noticed ${name} is sold out. Do you have a similar alternative in stock?`,
                        targetBranchObj.whatsapp
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent-600 hover:underline font-bold mt-1 inline-block"
                    >
                      Inquire on WhatsApp for similar alternatives &rarr;
                    </a>
                  </div>
                ) : (
                  <a
                    href={getWhatsAppLink(name, targetBranchObj.whatsapp, { price, condition })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1ebe57] text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all hover:scale-[1.02] active:scale-95 text-center"
                  >
                    <FaWhatsapp className="text-2xl" />
                    <span>Order / Ask on WhatsApp</span>
                  </a>
                )}

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${targetBranchObj.phone}`}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition-all text-center"
                  >
                    <Phone className="w-4 h-4 text-accent-400" />
                    <span>Call Store</span>
                  </a>

                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-navy-100 hover:bg-navy-200 text-navy-900 text-xs font-bold transition-all text-center"
                  >
                    <MapPin className="w-4 h-4 text-accent-600" />
                    <span>Store Directions</span>
                  </Link>
                </div>
              </div>

              {/* Trust badges footer */}
              <div className="pt-4 border-t border-navy-100 space-y-2 text-xs text-navy-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>1 Month Checking Warranty</strong> on all hardware components.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-accent-500 shrink-0" />
                  <span><strong>Nationwide Cash on Delivery</strong> via Leopards & TCS Air Cargo.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs & Specs Sheet Section */}
        <div className="mt-12">
          <SpecsTable product={product} />
        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-navy-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent-600">
                  Recommended For You
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight mt-1">
                  Similar Laptops in Stock
                </h3>
              </div>
              <Link
                to="/laptops"
                className="text-xs sm:text-sm font-bold text-accent-600 hover:underline"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id || item._id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toast feedback */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
};

export default ProductDetailPage;

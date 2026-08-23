import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, Layers, Eye, Star } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { formatPKR, calculateDiscount } from '../../utils/formatters';
import { getWhatsAppLink } from '../../utils/whatsapp';
import { Badge } from '../common/Badge';

export const ProductCard = ({ product }) => {
  const id = product.id || product._id;
  const {
    name,
    brand,
    processor,
    generation,
    ram,
    storage,
    display,
    condition,
    stock = 'available',
    price,
    oldPrice,
    onSale,
    images = [],
    rating = 4.8,
    reviewsCount = 12,
    category
  } = product;

  const isSoldOut = stock === 'sold';
  const hasDiscount = Boolean(onSale) || (oldPrice && Number(oldPrice) > Number(price));
  const discount = hasDiscount ? calculateDiscount(price, oldPrice) : 0;
  const primaryImage = images[0] || 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80';
  const hoverImage = images[1] || primaryImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3 }}
      className={`group relative flex flex-col rounded-2xl bg-white border border-navy-200/80 shadow-card hover:shadow-card-hover hover:border-accent-500/40 transition-all duration-300 overflow-hidden ${
        isSoldOut ? 'opacity-85' : ''
      }`}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-100/60">
        <Link to={`/product/${id}`} className="block h-full w-full">
          {/* Main & Secondary Image with transition */}
          <img
            src={primaryImage}
            alt={name}
            loading="lazy"
            className={`h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105 ${
              images[1] ? 'group-hover:opacity-0' : ''
            }`}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80';
            }}
          />
          {images[1] && (
            <img
              src={hoverImage}
              alt={`${name} secondary preview`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
            />
          )}
        </Link>

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
          <div className="flex flex-col gap-1.5 items-start">
            {/* Condition Badge */}
            {condition && (
              <Badge variant="condition" size="sm" className="bg-white/95 backdrop-blur-sm shadow-sm text-navy-900 font-bold border-navy-200">
                {condition}
              </Badge>
            )}

            {/* Discount / Sale Badge */}
            {hasDiscount && discount > 0 && (
              <Badge variant="discount" size="sm" className="shadow-sm animate-pulse-subtle bg-accent-500 text-slate-950 font-black">
                {discount}% OFF
              </Badge>
            )}
          </div>

          {/* Stock Badge */}
          <div>
            {isSoldOut ? (
              <Badge variant="danger" size="sm" dot className="bg-rose-950/90 text-rose-300 font-bold border-rose-800 shadow-md">
                SOLD OUT
              </Badge>
            ) : (
              <Badge variant="success" size="sm" dot className="bg-emerald-950/90 text-emerald-300 font-semibold backdrop-blur-sm border-emerald-700/60 shadow-sm">
                In Stock
              </Badge>
            )}
          </div>
        </div>

        {/* Sold Out Full Overlay if out of stock */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
            <span className="px-4 py-2 rounded-xl bg-rose-600/95 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg border border-rose-400/40">
              Sold Out
            </span>
          </div>
        )}

        {/* Quick View Floating Pill on Hover */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Link
            to={`/product/${id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-navy-900/95 text-white text-xs font-bold backdrop-blur-md shadow-lg hover:bg-accent-500 hover:text-slate-950 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Full Specs</span>
          </Link>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Brand & Category line */}
        <div className="flex items-center justify-between text-xs text-navy-500 mb-1.5">
          <span className="font-bold uppercase tracking-wider text-accent-600">
            {brand || category}
          </span>
          <div className="flex items-center gap-1 text-amber-500 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{rating}</span>
            <span className="text-navy-400 text-[11px]">({reviewsCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <Link to={`/product/${id}`} className="block group/title">
          <h3 className="text-sm sm:text-base font-bold text-navy-900 group-hover/title:text-accent-600 transition-colors line-clamp-2 leading-snug">
            {name}
          </h3>
        </Link>

        {/* Key Specs Pills */}
        {category !== 'accessory' ? (
          <div className="mt-3 grid grid-cols-2 gap-1.5 py-2 border-y border-navy-100 text-[11px] text-navy-600 font-medium">
            {processor && (
              <div className="flex items-center gap-1.5 truncate" title={`${processor} ${generation || ''}`}>
                <Cpu className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                <span className="truncate">{processor}</span>
              </div>
            )}
            {ram && (
              <div className="flex items-center gap-1.5 truncate" title={ram}>
                <Layers className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                <span className="truncate">{ram}</span>
              </div>
            )}
            {storage && (
              <div className="flex items-center gap-1.5 truncate" title={storage}>
                <HardDrive className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                <span className="truncate">{storage}</span>
              </div>
            )}
            {display && (
              <div className="flex items-center gap-1.5 truncate text-[11px]" title={display}>
                <span className="text-accent-500 font-bold shrink-0">🖥</span>
                <span className="truncate">{display.split(' ')[0]}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-3 py-2 border-y border-navy-100 text-xs text-navy-500 line-clamp-2">
            {product.description}
          </div>
        )}

        {/* Price & Savings (with Strikethrough on Old Price) */}
        <div className="mt-4 flex items-baseline justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black text-navy-950 tracking-tight">
              {formatPKR(price)}
            </span>
            {hasDiscount && oldPrice && oldPrice > price && (
              <div className="flex items-center gap-1.5 text-xs text-navy-400">
                <span className="line-through">{formatPKR(oldPrice)}</span>
                <span className="text-rose-600 font-bold text-[11px]">Save {formatPKR(oldPrice - price)}</span>
              </div>
            )}
          </div>
          <span className="text-[10px] text-navy-400 font-medium">With Charger & Warranty</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-2 grid grid-cols-2 gap-2">
          <Link
            to={`/product/${id}`}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-navy-100 hover:bg-navy-200 text-navy-800 text-xs font-bold transition-all text-center"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </Link>

          {isSoldOut ? (
            <button
              disabled
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-navy-100 text-navy-400 text-xs font-bold cursor-not-allowed text-center"
            >
              <span>Sold Out</span>
            </button>
          ) : (
            <a
              href={getWhatsAppLink(name, undefined, { price, condition })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm hover:shadow transition-all text-center"
            >
              <FaWhatsapp className="text-sm" />
              <span>WhatsApp</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

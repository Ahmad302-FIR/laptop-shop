import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const ImageGallery = ({ images = [], productName = 'Laptop' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Fallback if no images provided
  const imageList = images && images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80'
  ];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % imageList.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Viewer */}
      <div className="relative aspect-[4/3] w-full rounded-2xl bg-navy-950 border border-navy-800 overflow-hidden shadow-card group">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedIndex}
            src={imageList[selectedIndex]}
            alt={`${productName} - View ${selectedIndex + 1}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="h-full w-full object-cover object-center cursor-zoom-in"
            onClick={() => setIsZoomOpen(true)}
          />
        </AnimatePresence>

        {/* Zoom Hint Trigger */}
        <button
          type="button"
          onClick={() => setIsZoomOpen(true)}
          className="absolute top-4 right-4 p-2.5 rounded-xl bg-navy-950/85 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-navy-900 border border-navy-800"
          aria-label="Zoom image"
        >
          <ZoomIn className="w-4 h-4 text-accent-400" />
        </button>

        {/* Next / Previous arrows overlay */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-navy-950/80 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-navy-900 border border-navy-800 transition-all hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 text-accent-400" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-navy-950/80 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-navy-900 border border-navy-800 transition-all hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-accent-400" />
            </button>
          </>
        )}

        {/* Counter Badge */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-navy-950/90 text-white text-[11px] font-bold backdrop-blur-sm border border-navy-800">
          {selectedIndex + 1} / {imageList.length}
        </div>
      </div>

      {/* Thumbnail Selector Strip */}
      {imageList.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                selectedIndex === idx
                  ? 'border-accent-500 shadow-md ring-2 ring-accent-500/30'
                  : 'border-navy-200 opacity-70 hover:opacity-100 hover:border-navy-400'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="h-full w-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Zoom Modal (Lightbox) */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 backdrop-blur-md p-4"
          >
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
              aria-label="Close zoom modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Main Image */}
            <div className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center">
              <motion.img
                key={selectedIndex}
                src={imageList[selectedIndex]}
                alt={productName}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />

              {/* Lightbox arrows */}
              {imageList.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-7 h-7 text-accent-400" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-7 h-7 text-accent-400" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom thumbnail strip in lightbox */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 max-w-full overflow-x-auto px-4 py-2 bg-navy-900/90 rounded-2xl border border-navy-700">
              {imageList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`h-12 w-12 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    selectedIndex === idx ? 'border-accent-400 scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;

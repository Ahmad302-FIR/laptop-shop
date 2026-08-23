import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { shopContact } from '../../data/branches';
import { getGeneralWhatsAppLink } from '../../utils/whatsapp';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-tech-pattern text-white py-16 sm:py-24 border-b border-navy-800">
      {/* Decorative ambient glow orbs */}
      <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-navy-800/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-500/10 border border-accent-400/30 text-accent-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Importers • 100% Tested A+ Stock</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none text-white">
                Professional <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-400 via-accent-400 to-amber-200 bg-clip-text text-transparent">
                  Laptop Store
                </span>
              </h1>
              <p className="text-base sm:text-xl font-medium text-navy-200">
                Quality Laptops • Chromebooks • Accessories
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-navy-400 max-w-xl leading-relaxed">
              Find premium business ultrabooks, student machines, high-refresh gaming rigs, and genuine accessories. Rigorously tested with 30-day checking warranty and physical store presence.
            </p>

            {/* Store Address & WhatsApp Preview */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1 text-xs text-navy-300">
              <div className="flex items-center gap-2 bg-navy-900/90 px-3.5 py-2.5 rounded-xl border border-navy-800 shadow-sm">
                <MapPin className="w-4 h-4 text-accent-400 shrink-0" />
                <span><strong className="text-white">Peshawar:</strong> Deans Trade Center, Saddar</span>
              </div>
              <div className="flex items-center gap-2 bg-navy-900/90 px-3.5 py-2.5 rounded-xl border border-navy-800 shadow-sm">
                <FaWhatsapp className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong className="text-white">WhatsApp:</strong> {shopContact.displayWhatsapp}</span>
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
              <Link
                to="/laptops"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-accent-500/25 transition-all hover:scale-105 active:scale-95 text-center group"
              >
                <span>View All Laptops</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={getGeneralWhatsAppLink(
                  'Assalam o Alaikum, I would like to inquire about the latest laptop arrivals and prices.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe57] text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 text-center"
              >
                <FaWhatsapp className="text-xl" />
                <span>Contact on WhatsApp</span>
              </a>
            </div>

            {/* Trust checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-navy-800/80 text-xs text-navy-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1 Month Checking Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Free Original Charger</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>3 Physical Branches</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Graphic / Card Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Glass Frame */}
            <div className="relative rounded-3xl bg-navy-900/80 border border-navy-700/70 p-5 shadow-2xl backdrop-blur-xl">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-inner border border-navy-700">
                <img
                  src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80"
                  alt="Premium Ultrabook Collection"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-transparent flex flex-col justify-end p-4">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-accent-400">
                    Featured Stock
                  </span>
                  <p className="text-sm font-bold text-white">Dell XPS & HP EliteBook Series</p>
                </div>
              </div>

              {/* Floating Stat Pills */}
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800">
                  <div className="text-lg font-black text-accent-400">500+</div>
                  <div className="text-[10px] text-navy-400 font-medium">Laptops In Stock</div>
                </div>
                <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800">
                  <div className="text-lg font-black text-emerald-400">100%</div>
                  <div className="text-[10px] text-navy-400 font-medium">Original Hardware</div>
                </div>
                <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800">
                  <div className="text-lg font-black text-amber-300">3</div>
                  <div className="text-[10px] text-navy-400 font-medium">Store Branches</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

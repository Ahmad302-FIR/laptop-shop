import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import { branches } from '../../data/branches';
import { getGeneralWhatsAppLink } from '../../utils/whatsapp';

export const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-navy-200 overflow-hidden text-navy-900"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm text-xl">
                      <FaWhatsapp />
                    </div>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-emerald-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight">Yasin Wahab Laptop Helpdesk</h3>
                    <p className="text-xs text-emerald-100">Typically replies in 5 minutes</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 hover:bg-white/20 transition-colors text-white/80 hover:text-white"
                  aria-label="Close WhatsApp menu"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
            </div>

            {/* Content / Branch Selector */}
            <div className="p-4 bg-surface-50 space-y-3">
              <p className="text-xs text-navy-600 font-medium">
                Choose a branch to chat directly with our sales team:
              </p>

              <div className="space-y-2">
                {branches.map((branch) => (
                  <a
                    key={branch.id}
                    href={getGeneralWhatsAppLink(
                      `Assalam o Alaikum, I am contacting ${branch.name}. I want to inquire about available laptop stock and pricing.`,
                      branch.whatsapp
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-navy-200 hover:border-emerald-500 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors text-sm shrink-0 mt-0.5">
                        <FaWhatsapp />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-navy-950">{branch.name}</span>
                          {branch.isMain && (
                            <span className="text-[10px] bg-accent-500 text-slate-950 font-black px-1.5 py-0.2 rounded">
                              Main
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-navy-500 flex items-center gap-1 mt-0.5">
                          <FaMapMarkerAlt className="text-[9px] text-accent-500" /> {branch.displayWhatsapp}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-0.5 transition-transform">
                      Chat &rarr;
                    </span>
                  </a>
                ))}
              </div>

              <div className="pt-2 text-center text-[11px] text-navy-500 border-t border-navy-200">
                💬 Need custom specs or bulk order? Message our main desk directly.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp Chat Support"
        className="flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#1ebe57] text-slate-950 px-4 py-3.5 shadow-xl hover:shadow-2xl transition-all relative group font-extrabold"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
        </span>
        <FaWhatsapp className="text-2xl" />
        <span className="font-black text-sm hidden sm:inline-block">Chat on WhatsApp</span>
      </motion.button>
    </div>
  );
};

export default FloatingWhatsApp;

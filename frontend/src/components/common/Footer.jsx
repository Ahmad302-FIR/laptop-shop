import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Phone, Mail, MapPin, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { branches, shopContact } from '../../data/branches';
import { getGeneralWhatsAppLink } from '../../utils/whatsapp';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Benefits Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-slate-800/80">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="p-3 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Tested & Verified</h4>
              <p className="text-xs text-slate-400 mt-0.5">25-Point hardware & battery diagnostic checks</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="p-3 rounded-xl bg-emerald-600/10 text-emerald-400 border border-emerald-500/20">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Checking Warranty</h4>
              <p className="text-xs text-slate-400 mt-0.5">1 Month replacement + service warranty on all units</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="p-3 rounded-xl bg-amber-600/10 text-amber-400 border border-amber-500/20">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">3 Physical Branches</h4>
              <p className="text-xs text-slate-400 mt-0.5">Peshawar (Main), Sargodha, and Lakki Marwat</p>
            </div>
          </div>
        </div>

        {/* Main 5-Column Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand Profile & Contact */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Laptop className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white">
                  Yasin Wahab <span className="text-blue-400 font-semibold text-sm">Laptops</span>
                </span>
                <span className="text-xs text-slate-400 font-medium">Direct Importers & Retailers</span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Your trusted destination in Pakistan for authentic imported laptops, high-performance gaming rigs, durable Chromebooks, and original computer accessories. We guarantee transparent grading, competitive prices, and reliable post-sale support.
            </p>

            {/* Email contact link */}
            <div className="pt-1">
              <a
                href={`mailto:${shopContact.supportEmail}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>{shopContact.supportEmail}</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={shopContact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
                className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500/40 transition-colors"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href={shopContact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:border-pink-500/40 transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href={shopContact.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Account"
                className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
              >
                <FaTiktok className="w-4 h-4" />
              </a>
              <a
                href={shopContact.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel"
                className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-500/40 transition-colors"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
              <a
                href={getGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Sales"
                className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/laptops" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  All Laptops
                </Link>
              </li>
              <li>
                <Link to="/chromebooks" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  Chromebooks
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  Accessories & SSDs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  About Us & Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  Store Locations & Maps
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/category/business" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  Business Laptops
                </Link>
              </li>
              <li>
                <Link to="/category/student" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  Student Laptops
                </Link>
              </li>
              <li>
                <Link to="/category/gaming" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  Gaming & Workstations
                </Link>
              </li>
              <li>
                <Link to="/chromebooks" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  Touchscreen Chromebooks
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  Original Fast Chargers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Branches & Quick Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Branch Network</h4>
            <div className="space-y-3 text-xs text-slate-400">
              {branches.map((b) => (
                <div key={b.id} className="border-l-2 border-blue-500/50 pl-3">
                  <p className="font-semibold text-slate-200">{b.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{b.address}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <a
                      href={getGeneralWhatsAppLink(`Assalam o Alaikum, inquiring for ${b.name}`, b.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-medium text-xs"
                    >
                      <FaWhatsapp className="text-xs" /> {b.displayWhatsapp}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Yasin Wahab Laptop Store. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${shopContact.supportEmail}`} className="hover:text-blue-400 transition-colors">
              {shopContact.supportEmail}
            </a>
            <Link to="/about" className="hover:text-slate-300 transition-colors">Quality Guarantee</Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Branch Locations</Link>
            <a href={getGeneralWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
              WhatsApp Sales
            </a>
            <Link to="/admin/login" className="text-slate-600 hover:text-slate-400 text-[11px] transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

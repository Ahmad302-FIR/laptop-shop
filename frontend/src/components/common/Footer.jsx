import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Mail, ShieldCheck, Clock, MapPin, ArrowRight } from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { branches, shopContact } from '../../data/branches';
import { getGeneralWhatsAppLink } from '../../utils/whatsapp';

export const Footer = () => {
  return (
    <footer className="bg-navy-950 text-navy-300 border-t border-navy-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Benefits Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-navy-800/80">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-navy-900/60 border border-navy-800">
            <div className="p-3 rounded-xl bg-accent-500/10 text-accent-400 border border-accent-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Tested & Verified</h4>
              <p className="text-xs text-navy-400 mt-0.5">25-Point hardware & battery diagnostic checks</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-navy-900/60 border border-navy-800">
            <div className="p-3 rounded-xl bg-emerald-600/10 text-emerald-400 border border-emerald-500/20">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Checking Warranty</h4>
              <p className="text-xs text-navy-400 mt-0.5">1 Month replacement + service warranty on all units</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-navy-900/60 border border-navy-800">
            <div className="p-3 rounded-xl bg-amber-600/10 text-amber-400 border border-amber-500/20">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">3 Physical Branches</h4>
              <p className="text-xs text-navy-400 mt-0.5">Peshawar (Main), Sargodha, and Lakki Marwat</p>
            </div>
          </div>
        </div>

        {/* Main 5-Column Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800">
          {/* Col 1 & 2: Brand Profile & Contact */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-accent-600 to-amber-400 flex items-center justify-center text-navy-950 font-bold shadow-lg shadow-accent-500/20">
                <Laptop className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white">
                  Yasin Wahab <span className="text-accent-400 font-semibold text-sm">Laptops</span>
                </span>
                <span className="text-xs text-navy-400 font-medium">Direct Importers & Retailers</span>
              </div>
            </Link>

            <p className="text-sm text-navy-400 leading-relaxed pr-4">
              Your trusted destination in Pakistan for authentic imported laptops, high-performance gaming rigs, durable Chromebooks, and original computer accessories. We guarantee transparent grading, competitive prices, and reliable post-sale support.
            </p>

            {/* Email contact link */}
            <div className="pt-1">
              <a
                href={`mailto:${shopContact.supportEmail}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-navy-300 hover:text-accent-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-accent-400" />
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
                className="h-10 w-10 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-center text-navy-400 hover:text-accent-400 hover:border-accent-500/40 transition-colors"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href={shopContact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="h-10 w-10 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-center text-navy-400 hover:text-pink-500 hover:border-pink-500/40 transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href={shopContact.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Account"
                className="h-10 w-10 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-center text-navy-400 hover:text-white hover:border-navy-600 transition-colors"
              >
                <FaTiktok className="w-4 h-4" />
              </a>
              <a
                href={shopContact.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel"
                className="h-10 w-10 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-center text-navy-400 hover:text-rose-500 hover:border-rose-500/40 transition-colors"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
              <a
                href={getGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Sales"
                className="h-10 w-10 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-center text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors"
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
                <Link to="/" className="text-navy-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-navy-600 group-hover:text-accent-400 group-hover:translate-x-0.5 transition-all" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/laptops" className="text-navy-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-navy-600 group-hover:text-accent-400 group-hover:translate-x-0.5 transition-all" />
                  All Laptops
                </Link>
              </li>
              <li>
                <Link to="/chromebooks" className="text-navy-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-navy-600 group-hover:text-accent-400 group-hover:translate-x-0.5 transition-all" />
                  Chromebooks
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="text-navy-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-navy-600 group-hover:text-accent-400 group-hover:translate-x-0.5 transition-all" />
                  Accessories & SSDs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-navy-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-navy-600 group-hover:text-accent-400 group-hover:translate-x-0.5 transition-all" />
                  About Us & Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-navy-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-navy-600 group-hover:text-accent-400 group-hover:translate-x-0.5 transition-all" />
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
                <Link to="/category/business" className="text-navy-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-navy-600 group-hover:text-accent-400 group-hover:translate-x-0.5 transition-all" />
                  Business Laptops
                </Link>
              </li>
              <li>
                <Link to="/category/student" className="text-navy-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-navy-600 group-hover:text-accent-400 group-hover:translate-x-0.5 transition-all" />
                  Student Laptops
                </Link>
              </li>
              <li>
                <Link to="/category/gaming" className="text-navy-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-navy-600 group-hover:text-accent-400 group-hover:translate-x-0.5 transition-all" />
                  Gaming & Workstations
                </Link>
              </li>
              <li>
                <Link to="/chromebooks" className="text-navy-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-navy-600 group-hover:text-accent-400 group-hover:translate-x-0.5 transition-all" />
                  Touchscreen Chromebooks
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="text-navy-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-navy-600 group-hover:text-accent-400 group-hover:translate-x-0.5 transition-all" />
                  Original Fast Chargers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Branches & Quick Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Branch Network</h4>
            <div className="space-y-3 text-xs text-navy-400">
              {branches.map((b) => (
                <div key={b.id} className="border-l-2 border-accent-500/50 pl-3">
                  <p className="font-semibold text-white">{b.name}</p>
                  <p className="text-[11px] text-navy-400 truncate">{b.address}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <a
                      href={getGeneralWhatsAppLink(`Assalam o Alaikum, inquiring for ${b.name}`, b.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-semibold text-xs"
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-navy-500">
          <p>© 2026 Yasin Wahab Laptop Store. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${shopContact.supportEmail}`} className="hover:text-accent-400 transition-colors">
              {shopContact.supportEmail}
            </a>
            <Link to="/about" className="hover:text-navy-300 transition-colors">Quality Guarantee</Link>
            <Link to="/contact" className="hover:text-navy-300 transition-colors">Branch Locations</Link>
            <a href={getGeneralWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
              WhatsApp Sales
            </a>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1 text-navy-400 hover:text-accent-400 text-xs font-semibold transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-accent-400" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

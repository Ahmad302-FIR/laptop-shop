import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Laptop,
  Search,
  Menu,
  X,
  ChevronDown,
  Phone,
  Briefcase,
  GraduationCap,
  Gamepad2,
  HardDrive,
  Globe,
  MapPin,
  Mail
} from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { shopContact } from '../../data/branches';
import { getGeneralWhatsAppLink } from '../../utils/whatsapp';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCategoryDropdownOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/laptops?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const categoryItems = [
    {
      title: 'Business Laptops',
      path: '/category/business',
      desc: 'EliteBooks, Latitudes, ThinkPads & vPro',
      icon: Briefcase,
      color: 'text-blue-400'
    },
    {
      title: 'Student Laptops',
      path: '/category/student',
      desc: 'Affordable, long battery, 2-in-1 touch models',
      icon: GraduationCap,
      color: 'text-amber-400'
    },
    {
      title: 'Gaming & Workstations',
      path: '/category/gaming',
      desc: 'RTX graphics, 144Hz displays, Apple M1/M2',
      icon: Gamepad2,
      color: 'text-purple-400'
    },
    {
      title: 'Chromebooks',
      path: '/chromebooks',
      desc: 'Fast boot, Google Play Store, rugged bodies',
      icon: Globe,
      color: 'text-emerald-400'
    },
    {
      title: 'Accessories & Parts',
      path: '/accessories',
      desc: 'Original chargers, NVMe SSDs, DDR4 RAM',
      icon: HardDrive,
      color: 'text-cyan-400'
    }
  ];

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              100% Tested & Verified Imported Laptops
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-blue-400" /> Peshawar • Sargodha • Lakki Marwat
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs ml-auto">
            {/* Social Icons in Navbar */}
            <div className="flex items-center gap-2.5 pr-2 border-r border-slate-800">
              <a
                href={shopContact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <FaFacebook className="text-sm" />
              </a>
              <a
                href={shopContact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="text-slate-400 hover:text-pink-400 transition-colors"
              >
                <FaInstagram className="text-sm" />
              </a>
              <a
                href={shopContact.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Account"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <FaTiktok className="text-xs" />
              </a>
              <a
                href={shopContact.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel"
                className="text-slate-400 hover:text-rose-500 transition-colors"
              >
                <FaYoutube className="text-sm" />
              </a>
            </div>

            <a
              href={`mailto:${shopContact.supportEmail}`}
              className="hidden lg:flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-blue-400" />
              <span>{shopContact.supportEmail}</span>
            </a>
            <span className="hidden lg:inline text-slate-700">|</span>

            <a
              href={`tel:${shopContact.primaryPhone}`}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-blue-400" />
              <span className="hidden sm:inline">Call:</span> {shopContact.displayWhatsapp || shopContact.primaryPhone}
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={getGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <FaWhatsapp className="text-sm" />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-md shadow-xl border-b border-slate-800'
            : 'bg-slate-900 border-b border-slate-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <Laptop className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                  Yasin Wahab
                  <span className="text-[10px] bg-blue-600 text-white uppercase font-bold tracking-wider px-1.5 py-0.5 rounded">
                    Laptops
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                  Retail & Wholesale Store
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive ? 'text-blue-400 bg-slate-800' : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/laptops"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive ? 'text-blue-400 bg-slate-800' : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                All Laptops
              </NavLink>

              <NavLink
                to="/chromebooks"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive ? 'text-blue-400 bg-slate-800' : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                Chromebooks
              </NavLink>

              {/* Categories Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1 transition-colors ${
                    location.pathname.startsWith('/category') || isCategoryDropdownOpen
                      ? 'text-blue-400 bg-slate-800'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                  }`}
                  aria-expanded={isCategoryDropdownOpen}
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isCategoryDropdownOpen ? 'rotate-180 text-blue-400' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isCategoryDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                      className="absolute left-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 divide-y divide-slate-800"
                    >
                      <div className="space-y-1 pb-1">
                        {categoryItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setIsCategoryDropdownOpen(false)}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800 transition-colors group"
                            >
                              <div className={`p-2 rounded-lg bg-slate-800 group-hover:bg-slate-700 ${item.color} shrink-0 mt-0.5`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-xs text-slate-400 line-clamp-1">
                                  {item.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      <div className="pt-2 px-2">
                        <Link
                          to="/laptops"
                          onClick={() => setIsCategoryDropdownOpen(false)}
                          className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center justify-between py-1"
                        >
                          <span>Browse full catalog with filters</span>
                          <span>&rarr;</span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive ? 'text-blue-400 bg-slate-800' : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                Accessories
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive ? 'text-blue-400 bg-slate-800' : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                About Us
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive ? 'text-blue-400 bg-slate-800' : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                Contact
              </NavLink>
            </nav>

            {/* Right Action Icons (Search, WhatsApp CTA, Hamburger) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Toggle Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Search laptops"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Header WhatsApp CTA Button */}
              <a
                href={getGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-md shadow-emerald-900/30 transition-all hover:scale-105 active:scale-95"
              >
                <FaWhatsapp className="text-lg" />
                <span>WhatsApp Us</span>
              </a>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Search Bar Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-slate-800 bg-slate-950 px-4 py-3"
            >
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by brand (HP, Dell, Lenovo), model (EliteBook, XPS), processor (Core i7)..."
                    className="w-full pl-12 pr-28 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="absolute right-2 flex items-center gap-1">
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                    >
                      Search
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="p-1.5 text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </form>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                  <span>Popular:</span>
                  {['HP EliteBook', 'ThinkPad T14', 'Dell XPS', 'Chromebook', 'RTX 3050'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        navigate(`/laptops?q=${encodeURIComponent(tag)}`);
                        setIsSearchOpen(false);
                      }}
                      className="hover:text-blue-400 underline underline-offset-2 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Slide-in Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="space-y-1">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-xl text-base font-semibold ${
                      isActive ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-slate-800'
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/laptops"
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-xl text-base font-semibold ${
                      isActive ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-slate-800'
                    }`
                  }
                >
                  All Laptops
                </NavLink>

                <NavLink
                  to="/chromebooks"
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-xl text-base font-semibold ${
                      isActive ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-slate-800'
                    }`
                  }
                >
                  Chromebooks
                </NavLink>

                {/* Categories Accordion */}
                <div className="pt-2 pb-2">
                  <div className="px-4 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Categories
                  </div>
                  <div className="grid grid-cols-1 gap-1 mt-1 pl-2">
                    {categoryItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                              isActive ? 'text-blue-400 bg-slate-800 font-semibold' : 'text-slate-300 hover:bg-slate-800/70'
                            }`
                          }
                        >
                          <Icon className={`w-4 h-4 ${item.color}`} />
                          <span>{item.title}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>

                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-xl text-base font-semibold ${
                      isActive ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-slate-800'
                    }`
                  }
                >
                  Accessories & Parts
                </NavLink>

                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-xl text-base font-semibold ${
                      isActive ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-slate-800'
                    }`
                  }
                >
                  About Us
                </NavLink>

                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-xl text-base font-semibold ${
                      isActive ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-slate-800'
                    }`
                  }
                >
                  Contact & Branches
                </NavLink>
              </div>

              {/* Mobile WhatsApp Direct CTA */}
              <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
                <a
                  href={getGeneralWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-colors"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>Chat on WhatsApp ({shopContact.displayWhatsapp || shopContact.primaryPhone})</span>
                </a>
                <a
                  href={`tel:${shopContact.primaryPhone}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>Call Direct: {shopContact.displayWhatsapp || shopContact.primaryPhone}</span>
                </a>

                <a
                  href={`mailto:${shopContact.supportEmail}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>Email: {shopContact.supportEmail}</span>
                </a>

                {/* Mobile Social Links Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  <a
                    href={shopContact.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook Profile"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-blue-400 text-xs font-semibold"
                  >
                    <FaFacebook />
                    <span>Facebook</span>
                  </a>
                  <a
                    href={shopContact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Profile"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-pink-400 text-xs font-semibold"
                  >
                    <FaInstagram />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={shopContact.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok Account"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                  >
                    <FaTiktok />
                    <span>TikTok</span>
                  </a>
                  <a
                    href={shopContact.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube Channel"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-rose-500 text-xs font-semibold"
                  >
                    <FaYoutube />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

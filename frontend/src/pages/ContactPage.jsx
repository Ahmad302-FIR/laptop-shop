import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  User,
  ExternalLink
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { branches, shopContact } from '../data/branches';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';
import { Toast } from '../components/common/Toast';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    targetBranch: 'peshawar',
    category: 'business',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [selectedMapBranch] = useState(branches[0]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your full name';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone/WhatsApp number';
    } else if (formData.phone.trim().length < 10) {
      newErrors.phone = 'Please enter a valid phone number (at least 10 digits)';
    }
    if (!formData.message.trim()) newErrors.message = 'Please enter your inquiry message';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage('Inquiry sent successfully! Our sales manager will contact you on WhatsApp shortly.');
      setIsToastVisible(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        targetBranch: 'peshawar',
        category: 'business',
        message: ''
      });
      setTimeout(() => setIsToastVisible(false), 4000);
    }, 800);
  };

  return (
    <div className="bg-surface-50 min-h-screen py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-600 bg-amber-500/10 px-3 py-1 rounded-full border border-accent-500/30">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-navy-950 tracking-tight mt-3">
            Contact & Branch Locations
          </h1>
          <p className="text-sm sm:text-base text-navy-600 mt-2">
            Have questions about laptop specifications, custom SSD upgrades, or branch visits? We are here to help!
          </p>
        </div>

        {/* Contact Quick Info Cards (Phone, WhatsApp, Email, Maps) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href={getGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white border border-navy-200 shadow-card hover:border-emerald-500 hover:shadow-md transition-all group flex items-start gap-3.5"
          >
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
              <FaWhatsapp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-navy-400">WhatsApp Sales</p>
              <p className="text-sm font-bold text-navy-900 mt-0.5">{shopContact.displayWhatsapp}</p>
              <span className="text-xs text-emerald-600 font-bold group-hover:underline">Chat Now &rarr;</span>
            </div>
          </a>

          <a
            href={`tel:${shopContact.primaryPhone}`}
            className="p-5 rounded-2xl bg-white border border-navy-200 shadow-card hover:border-accent-500 hover:shadow-md transition-all group flex items-start gap-3.5"
          >
            <div className="p-3 rounded-xl bg-amber-500/10 text-accent-600 group-hover:bg-accent-500 group-hover:text-slate-950 transition-colors shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-navy-400">Call Direct</p>
              <p className="text-sm font-bold text-navy-900 mt-0.5">{shopContact.primaryPhone}</p>
              <span className="text-xs text-accent-600 font-bold group-hover:underline">Call Store &rarr;</span>
            </div>
          </a>

          <a
            href={`mailto:${shopContact.supportEmail}`}
            className="p-5 rounded-2xl bg-white border border-navy-200 shadow-card hover:border-navy-500 hover:shadow-md transition-all group flex items-start gap-3.5"
          >
            <div className="p-3 rounded-xl bg-navy-100 text-navy-700 group-hover:bg-navy-900 group-hover:text-white transition-colors shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-navy-400">Email Us</p>
              <p className="text-sm font-bold text-navy-900 mt-0.5 truncate">{shopContact.supportEmail}</p>
              <span className="text-xs text-navy-700 font-bold group-hover:underline">Send Email &rarr;</span>
            </div>
          </a>

          <a
            href={shopContact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white border border-navy-200 shadow-card hover:border-amber-500 hover:shadow-md transition-all group flex items-start gap-3.5"
          >
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-navy-400">Google Maps</p>
              <p className="text-sm font-bold text-navy-900 mt-0.5">Deans Trade Center</p>
              <span className="text-xs text-amber-600 font-bold group-hover:underline">Open Map &rarr;</span>
            </div>
          </a>
        </div>

        {/* 3 Physical Branches Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((branch) => {
            return (
              <div
                key={branch.id}
                className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  branch.isMain
                    ? 'bg-white border-accent-500/40 shadow-lg ring-2 ring-accent-500/20'
                    : 'bg-white border-navy-200 shadow-card hover:shadow-card-hover'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-accent-600 uppercase tracking-wider">
                      {branch.tag}
                    </span>
                    {branch.isMain && (
                      <span className="text-[10px] bg-accent-500 text-slate-950 font-black px-2.5 py-0.5 rounded-full">
                        Main Branch
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-navy-950">{branch.name}</h3>
                    <p className="text-xs text-navy-500 font-medium mt-0.5">Manager: {branch.manager}</p>
                  </div>

                  <div className="space-y-2.5 text-xs text-navy-600 pt-2 border-t border-navy-100">
                    <p className="flex items-start gap-2.5 leading-relaxed">
                      <MapPin className="w-4 h-4 text-accent-500 shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-accent-500 shrink-0" />
                      <a href={`tel:${branch.phone}`} className="hover:text-accent-600 font-bold">
                        {branch.phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-navy-400 shrink-0" />
                      <a href={`mailto:${branch.email}`} className="hover:text-accent-600 font-medium">
                        {branch.email}
                      </a>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-navy-400 shrink-0" />
                      <span>{branch.hours}</span>
                    </p>
                  </div>

                  {/* Branch highlights */}
                  <div className="pt-2">
                    <p className="text-[11px] font-bold text-navy-400 uppercase tracking-wider mb-1.5">
                      Branch Facilities:
                    </p>
                    <div className="space-y-1">
                      {branch.facilities.slice(0, 3).map((fac, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-navy-700">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span>{fac}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-navy-100 flex items-center gap-2">
                  <a
                    href={getGeneralWhatsAppLink(
                      `Assalam o Alaikum, I am contacting ${branch.name} regarding laptop inquiries.`,
                      branch.whatsapp
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all text-center"
                  >
                    <FaWhatsapp className="text-sm" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={branch.mapUrl || shopContact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-navy-100 hover:bg-navy-200 text-navy-800 text-xs font-bold border border-navy-200 transition-all flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Maps</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Form & Interactive Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Inquiry Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-10 border border-navy-200 shadow-card">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-600">
                Direct Inquiry
              </span>
              <h2 className="text-2xl font-bold text-navy-950 tracking-tight mt-1">
                Send Us an Online Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-navy-600 mt-1">
                Fill this quick form and our sales manager will reply with model options, pictures, and price quotes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Muhammad Usman"
                      className={`w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border focus:outline-none focus:ring-1 ${
                        errors.name
                          ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                          : 'border-navy-300 focus:border-accent-500 focus:ring-accent-500'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 0318 9299154"
                      className={`w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border focus:outline-none focus:ring-1 ${
                        errors.phone
                          ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                          : 'border-navy-300 focus:border-accent-500 focus:ring-accent-500'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. usman@example.com"
                      className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-navy-300 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                    Nearest Branch
                  </label>
                  <select
                    name="targetBranch"
                    value={formData.targetBranch}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-navy-300 bg-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 cursor-pointer text-navy-900 font-medium"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                  Interested Category / Model
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-navy-300 bg-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 cursor-pointer text-navy-900 font-medium"
                >
                  <option value="business">Business Laptops (HP EliteBook, Dell Latitude, ThinkPad)</option>
                  <option value="student">Student / Budget Laptops (Under Rs. 80,000)</option>
                  <option value="gaming">Gaming & Workstations (RTX Graphics / Apple M1)</option>
                  <option value="chromebook">Chromebooks (Fast Boot / Google Play)</option>
                  <option value="accessory">Accessories / RAM & SSD Upgrades</option>
                  <option value="wholesale">Wholesale & Bulk Orders</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                  Your Message / Required Specs *
                </label>
                <div className="relative">
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what specs you need (e.g. Core i7 11th Gen, 16GB RAM, SSD, budget around 100k)..."
                    className={`w-full p-3 text-xs sm:text-sm rounded-xl border focus:outline-none focus:ring-1 ${
                      errors.message
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-navy-300 focus:border-accent-500 focus:ring-accent-500'
                    }`}
                  />
                </div>
                {errors.message && <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-accent-500 hover:bg-accent-600 text-slate-950 font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-95"
              >
                {isSubmitting ? (
                  <span>Sending inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Embedded Interactive Map & Location Overview */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-navy-200 shadow-card space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent-600">
                  Google Maps Location
                </span>
                <h3 className="text-xl font-bold text-navy-950 mt-1">
                  Find {selectedMapBranch.name}
                </h3>
                <p className="text-xs text-navy-500 mt-0.5">{selectedMapBranch.address}</p>
              </div>

              {/* View on Google Maps Link Button */}
              <a
                href={shopContact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-sm transition-all shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View on Google Maps</span>
              </a>
            </div>

            {/* Embedded Google Map iframe */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-navy-200 shadow-inner bg-surface-50">
              <iframe
                title={`Map of ${selectedMapBranch.name}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedMapBranch.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Quick action bar */}
            <div className="p-4 rounded-2xl bg-surface-50 border border-navy-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <div className="text-xs font-bold text-navy-950">Need driving directions or store help?</div>
                <div className="text-xs text-navy-500">Contact {selectedMapBranch.manager} at {selectedMapBranch.displayWhatsapp}</div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={shopContact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-accent-400" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={getGeneralWhatsAppLink(
                    `Assalam o Alaikum, I am visiting ${selectedMapBranch.name} today. Please send live location pin.`,
                    selectedMapBranch.whatsapp
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <FaWhatsapp className="text-base" />
                  <span>WhatsApp Pin</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
};

export default ContactPage;

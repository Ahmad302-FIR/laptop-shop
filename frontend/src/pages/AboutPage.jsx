import React from 'react';
import { Link } from 'react-router-dom';
import {
  Laptop,
  ShieldCheck,
  MapPin,
  Clock,
  Award,
  Users,
  ArrowRight
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { branches } from '../data/branches';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';

export const AboutPage = () => {
  const values = [
    {
      icon: ShieldCheck,
      title: 'Genuine Grading & Transparency',
      desc: 'We never mask scratch marks or sell repaired motherboards. Every laptop is honestly graded as Like New (10/10), Excellent (9.5/10), or Good (8.5/10).'
    },
    {
      icon: Award,
      title: 'Strict 25-Point Diagnostic Protocol',
      desc: 'From dead pixel screen checks to thermal stress tests and battery health verification, our qualified technicians ensure 100% stable performance.'
    },
    {
      icon: Clock,
      title: 'Real 30-Day Checking Warranty',
      desc: 'We provide a hassle-free 1-month replacement warranty on technical defects and 6 months free technical servicing.'
    },
    {
      icon: Users,
      title: '15,000+ Satisfied Customers',
      desc: 'Over a decade of serving students, software engineers, university professors, and corporate businesses throughout Pakistan.'
    }
  ];

  return (
    <div className="bg-surface-50 min-h-screen py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Banner */}
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-14 border border-navy-800 relative overflow-hidden shadow-card">
          <div className="absolute top-0 right-0 h-96 w-96 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-400 bg-accent-500/10 px-3.5 py-1.5 rounded-full border border-accent-500/30">
              <Laptop className="w-3.5 h-3.5" />
              <span>About Yasin Wahab Laptop Store</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Pakistan's Trusted Destination for Quality Imported Laptops
            </h1>
            <p className="text-sm sm:text-base text-navy-300 leading-relaxed font-normal">
              Founded on the pillars of honesty, uncompromised quality, and transparent pricing, Yasin Wahab Laptop Store brings certified business laptops, high-performance creator workstations, Chromebooks, and original computer parts to customers across Pakistan.
            </p>
          </div>
        </div>

        {/* Our Story & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-600 bg-amber-500/10 px-3 py-1 rounded-full border border-accent-500/30">
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
              From a Single Peshawar Outlet to 3 Thriving Regional Branches
            </h2>
            <p className="text-sm text-navy-600 leading-relaxed">
              What started as a specialized tech shop in Deans Trade Center, Saddar Peshawar, has grown into a renowned brand with branches in <strong>Peshawar</strong>, <strong>Sargodha</strong>, and <strong>Lakki Marwat</strong>.
            </p>
            <p className="text-sm text-navy-600 leading-relaxed">
              We directly import our laptop inventory in Grade A+ condition from enterprise fleet liquidations in the US, UK, and Japan. This ensures you get high-end business laptops like HP EliteBooks, Dell Latitudes, and Lenovo ThinkPads at up to 70% less than new retail prices.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/laptops"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <span>Browse Our Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={getGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <FaWhatsapp className="text-base" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-navy-200 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80"
                alt="Yasin Wahab Laptop Store Setup"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="font-bold text-base">Direct Importers & Technical Experts</p>
                  <p className="text-xs text-navy-300">Peshawar • Sargodha • Lakki Marwat</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Value Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-600 bg-amber-500/10 px-3 py-1 rounded-full border border-accent-500/30">
              The Yasin Wahab Guarantee
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight mt-2.5">
              Why Thousands of Buyers Trust Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-white border border-navy-200 shadow-card flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-amber-500/10 text-accent-600 border border-accent-500/20 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-950 text-base mb-1.5">{v.title}</h3>
                    <p className="text-xs sm:text-sm text-navy-600 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Physical Branch Network */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-navy-200 shadow-card space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-600 bg-amber-500/10 px-3 py-1 rounded-full border border-accent-500/30">
              Retail Presence
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight mt-2.5">
              Our 3 Store Locations
            </h2>
            <p className="text-xs sm:text-sm text-navy-500 mt-1">
              Visit our showrooms to inspect our stock, verify hardware with diagnostic tools, and pick up your laptop in person.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {branches.map((b) => (
              <div
                key={b.id}
                className="p-6 rounded-2xl bg-surface-50 border border-navy-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-accent-600 uppercase">{b.tag}</span>
                    {b.isMain && (
                      <span className="text-[10px] bg-accent-500 text-slate-950 font-black px-2.5 py-0.5 rounded-full">
                        Main Headquarter
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-navy-950 text-base">{b.name}</h3>
                  <p className="text-xs text-navy-600 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-accent-500 shrink-0 mt-0.5" />
                    <span>{b.address}</span>
                  </p>
                  <p className="text-xs text-navy-600 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-navy-400 shrink-0" />
                    <span>{b.hours}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-navy-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-navy-700">Manager: {b.manager}</span>
                  <a
                    href={getGeneralWhatsAppLink(`Assalam o Alaikum, inquiring for ${b.name}`, b.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    <FaWhatsapp className="text-sm" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

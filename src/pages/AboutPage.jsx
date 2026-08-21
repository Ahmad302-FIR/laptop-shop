import React from 'react';
import { Link } from 'react-router-dom';
import {
  Laptop,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Award,
  Users,
  Building,
  ArrowRight,
  Headphones
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { branches, shopContact } from '../data/branches';
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
    <div className="bg-slate-50 min-h-screen py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-96 w-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              <Laptop className="w-3.5 h-3.5" />
              <span>About Yasin Wahab Laptop Store</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Pakistan's Trusted Destination for Quality Imported Laptops
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Founded on the pillars of honesty, uncompromised quality, and transparent pricing, Yasin Wahab Laptop Store brings certified business laptops, high-performance creator workstations, Chromebooks, and original computer parts to customers across Pakistan.
            </p>
          </div>
        </div>

        {/* Our Story & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              From a Single Peshawar Outlet to 3 Thriving Regional Branches
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              What started as a specialized tech shop in Deans Trade Center, Saddar Peshawar, has grown into a renowned brand with branches in <strong>Peshawar</strong>, <strong>Sargodha</strong>, and <strong>Lakki Marwat</strong>.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We directly import our laptop inventory in Grade A+ condition from enterprise fleet liquidations in the US, UK, and Japan. This ensures you get high-end business laptops like HP EliteBooks, Dell Latitudes, and Lenovo ThinkPads at up to 70% less than new retail prices.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/laptops"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>Browse Our Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={getGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <FaWhatsapp className="text-base" />
                <span>Chat with Owner</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80"
                alt="Yasin Wahab Laptop Store Setup"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="font-bold text-base">Direct Importers & Technical Experts</p>
                  <p className="text-xs text-slate-300">Peshawar • Sargodha • Lakki Marwat</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Value Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              The Yasin Wahab Guarantee
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2.5">
              Why Thousands of Buyers Trust Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1.5">{v.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Physical Branch Network */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Retail Presence
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2.5">
              Our 3 Store Locations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Visit our showrooms to inspect our stock, verify hardware with diagnostic tools, and pick up your laptop in person.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {branches.map((b) => (
              <div
                key={b.id}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 uppercase">{b.tag}</span>
                    {b.isMain && (
                      <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">
                        Main Headquarter
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{b.name}</h3>
                  <p className="text-xs text-slate-600 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>{b.address}</span>
                  </p>
                  <p className="text-xs text-slate-600 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{b.hours}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Manager: {b.manager}</span>
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

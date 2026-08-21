import React from 'react';
import { ShieldCheck, Clock, Award, Headphones, Truck, Cpu } from 'lucide-react';

export const WhyChooseUs = () => {
  const perks = [
    {
      icon: ShieldCheck,
      title: '25-Point Diagnostic Checked',
      desc: 'Every motherboard, screen pixel, SSD health, and battery cycle is stress-tested prior to selling.',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: Clock,
      title: '1 Month Checking Warranty',
      desc: 'Full 30 days replacement warranty to ensure peace of mind and complete satisfaction.',
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      icon: Award,
      title: 'Original Chargers Included',
      desc: 'No duplicate/generic third-party bricks. We supply 100% OEM original fast chargers.',
      color: 'text-amber-600 bg-amber-50'
    },
    {
      icon: Cpu,
      title: 'Instant Hardware Upgrades',
      desc: 'Need 16GB/32GB RAM or 1TB NVMe SSD? Our technician upgrades it in 10 minutes.',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      icon: Truck,
      title: 'Safe Nationwide Delivery',
      desc: 'Air-cushioned shockproof courier packing with Cash on Delivery across Pakistan.',
      color: 'text-teal-600 bg-teal-50'
    },
    {
      icon: Headphones,
      title: 'Lifetime Technical Support',
      desc: 'Friendly WhatsApp & in-store guidance for driver installation, OS setup, and troubleshooting.',
      color: 'text-rose-600 bg-rose-50'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Why Yasin Wahab
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-3">
            Why Buy From Us?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            We operate with transparency, authentic grading, and unmatched customer care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 transition-all duration-300 flex items-start gap-4"
              >
                <div className={`p-3 rounded-xl ${perk.color} shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base mb-1.5">{perk.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{perk.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

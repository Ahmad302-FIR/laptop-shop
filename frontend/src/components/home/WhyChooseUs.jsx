import React from 'react';
import { ShieldCheck, Clock, Award, Headphones, Truck, Cpu } from 'lucide-react';

export const WhyChooseUs = () => {
  const perks = [
    {
      icon: ShieldCheck,
      title: '25-Point Diagnostic Checked',
      desc: 'Every motherboard, screen pixel, SSD health, and battery cycle is stress-tested prior to selling.',
      color: 'text-accent-400 bg-navy-800 border border-navy-700'
    },
    {
      icon: Clock,
      title: '1 Month Checking Warranty',
      desc: 'Full 30 days replacement warranty to ensure peace of mind and complete satisfaction.',
      color: 'text-emerald-400 bg-navy-800 border border-navy-700'
    },
    {
      icon: Award,
      title: 'Original Chargers Included',
      desc: 'No duplicate/generic third-party bricks. We supply 100% OEM original fast chargers.',
      color: 'text-amber-400 bg-navy-800 border border-navy-700'
    },
    {
      icon: Cpu,
      title: 'Instant Hardware Upgrades',
      desc: 'Need 16GB/32GB RAM or 1TB NVMe SSD? Our technician upgrades it in 10 minutes.',
      color: 'text-sky-400 bg-navy-800 border border-navy-700'
    },
    {
      icon: Truck,
      title: 'Safe Nationwide Delivery',
      desc: 'Air-cushioned shockproof courier packing with Cash on Delivery across Pakistan.',
      color: 'text-teal-400 bg-navy-800 border border-navy-700'
    },
    {
      icon: Headphones,
      title: 'Lifetime Technical Support',
      desc: 'Friendly WhatsApp & in-store guidance for driver installation, OS setup, and troubleshooting.',
      color: 'text-rose-400 bg-navy-800 border border-navy-700'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-navy-900 text-white border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-400 bg-accent-500/10 px-3 py-1 rounded-full border border-accent-500/30">
            Why Yasin Wahab
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-3">
            Why Buy From Us?
          </h2>
          <p className="text-sm sm:text-base text-navy-400 mt-2">
            We operate with transparency, authentic grading, and unmatched customer care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-navy-950/80 border border-navy-800 hover:border-navy-700 transition-all duration-300 flex items-start gap-4 shadow-sm"
              >
                <div className={`p-3 rounded-xl ${perk.color} shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base mb-1.5">{perk.title}</h3>
                  <p className="text-xs sm:text-sm text-navy-400 leading-relaxed">{perk.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

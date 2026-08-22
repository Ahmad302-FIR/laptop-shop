import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Laptop,
  Globe,
  Briefcase,
  GraduationCap,
  Gamepad2,
  HardDrive,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../../data/products';

export const CategoryCards = () => {
  const iconMap = {
    Laptop: Laptop,
    Globe: Globe,
    Briefcase: Briefcase,
    GraduationCap: GraduationCap,
    Gamepad2: Gamepad2,
    HardDrive: HardDrive
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Browse by Department
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
            Choose Your Laptop Category
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Tailored configurations for office professionals, students, creators, and hardcore gamers.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Laptop;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
              >
                <Link
                  to={cat.slug}
                  className="group relative flex flex-col justify-between h-full p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-card hover:shadow-card-hover hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle top background accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cat.gradient}`} />

                  <div>
                    {/* Icon & Count Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                        {cat.count}+ Models
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {cat.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Explore Link Indicator */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                    <span>View Models</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { branches } from '../../data/branches';
import { getGeneralWhatsAppLink } from '../../utils/whatsapp';

export const BranchStrip = () => {
  return (
    <section className="py-16 bg-white border-b border-navy-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent-500 bg-accent-500/10 px-3 py-1 rounded-full border border-accent-500/30">
              Store Locations
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight mt-2.5">
              Visit Our Branches In Person
            </h2>
            <p className="text-xs sm:text-sm text-navy-600 mt-1">
              Experience the laptops before purchasing, get hands-on advice, and collect with testing warranty.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-accent-600 hover:text-accent-700 hover:underline group shrink-0"
          >
            <span>All Branch Details & Maps</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className={`flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 ${
                branch.isMain
                  ? 'bg-amber-500/5 border-accent-500/30 shadow-md ring-1 ring-accent-500/20'
                  : 'bg-white border-navy-200 shadow-card hover:shadow-card-hover'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-accent-600 uppercase tracking-wider">
                    {branch.tag}
                  </span>
                  {branch.isMain && (
                    <span className="text-[10px] bg-accent-500 text-slate-950 font-black px-2.5 py-0.5 rounded-full shadow-sm">
                      Main Hub
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-navy-900">{branch.name}</h3>

                <p className="text-xs text-navy-600 flex items-start gap-2 leading-relaxed">
                  <MapPin className="w-4 h-4 text-accent-500 shrink-0 mt-0.5" />
                  <span>{branch.address}</span>
                </p>

                <p className="text-xs text-navy-600 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-navy-400 shrink-0" />
                  <span>{branch.hours}</span>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-navy-100 flex items-center justify-between gap-2">
                <a
                  href={`tel:${branch.phone}`}
                  className="text-xs font-bold text-navy-800 hover:text-accent-600 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-accent-500" />
                  <span>{branch.displayWhatsapp}</span>
                </a>

                <a
                  href={getGeneralWhatsAppLink(
                    `Assalam o Alaikum, I want to inquire from ${branch.name}.`,
                    branch.whatsapp
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <FaWhatsapp className="text-sm" />
                  <span>Chat</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BranchStrip;

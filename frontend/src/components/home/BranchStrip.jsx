import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { branches } from '../../data/branches';
import { getGeneralWhatsAppLink } from '../../utils/whatsapp';

export const BranchStrip = () => {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Store Locations
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2.5">
              Visit Our Branches In Person
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Experience the laptops before purchasing, get hands-on advice, and collect with testing warranty.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline group shrink-0"
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
                  ? 'bg-blue-50/40 border-blue-200 shadow-md ring-1 ring-blue-500/20'
                  : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {branch.tag}
                  </span>
                  {branch.isMain && (
                    <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">
                      Main Hub
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900">{branch.name}</h3>

                <p className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{branch.address}</span>
                </p>

                <p className="text-xs text-slate-600 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{branch.hours}</span>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={`tel:${branch.phone}`}
                  className="text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-500" />
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

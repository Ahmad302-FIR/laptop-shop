import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Home, Search } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-surface-50 px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative flex justify-center">
          <div className="h-24 w-24 rounded-3xl bg-navy-950 text-accent-400 flex items-center justify-center shadow-card border border-navy-800">
            <Laptop className="w-12 h-12 stroke-[2.2]" />
          </div>
          <span className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-rose-600 text-white font-black text-xs shadow-md">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-navy-950 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-navy-600">
            The laptop page or URL you're looking for might have been moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-slate-950 text-xs sm:text-sm font-black shadow-md transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            to="/laptops"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy-100 hover:bg-navy-200 text-navy-900 text-xs sm:text-sm font-bold transition-all active:scale-95 border border-navy-200"
          >
            <Search className="w-4 h-4 text-accent-600" />
            <span>Browse All Laptops</span>
          </Link>
        </div>

        <div className="pt-6 border-t border-navy-200 text-xs text-navy-400">
          <p>Looking for a specific model? Chat directly with us on WhatsApp.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

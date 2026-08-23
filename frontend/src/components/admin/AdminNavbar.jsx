import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Laptop, ExternalLink, LogOut, RefreshCw, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductsContext';

export const AdminNavbar = () => {
  const { admin, logout } = useAuth();
  const { fetchProducts, loading, isBackendConnected } = useProducts();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-navy-950/95 backdrop-blur-md border-b border-navy-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Admin Badge */}
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-accent-600 to-amber-400 flex items-center justify-center text-navy-950 font-bold shadow-md">
                <Laptop className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                  Yasin Wahab <span className="text-accent-400 font-semibold text-xs">Store</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-400 flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5" /> Admin Control Center
                </span>
              </div>
            </Link>

            {/* Backend connection indicator pill */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-900 border border-navy-800 text-[11px] text-navy-300">
              <span className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-emerald-500 animate-pulse' : 'bg-accent-400'}`} />
              <span>{isBackendConnected ? 'MongoDB API Live' : 'Active Catalog'}</span>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Refresh Data */}
            <button
              type="button"
              onClick={() => fetchProducts()}
              disabled={loading}
              title="Refresh inventory data"
              className="p-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-navy-300 hover:text-white border border-navy-800 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-accent-400' : ''}`} />
            </button>

            {/* View Live Store */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-navy-200 text-xs font-bold border border-navy-800 hover:border-navy-700 transition-colors"
            >
              <span>View Store</span>
              <ExternalLink className="w-3.5 h-3.5 text-navy-400" />
            </Link>

            {/* Admin User Badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-navy-800">
              <div className="h-8 w-8 rounded-full bg-accent-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-inner">
                {admin?.username?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-white leading-tight">
                  {admin?.username || 'Admin'}
                </span>
                <span className="text-[10px] text-navy-400">Super Administrator</span>
              </div>
            </div>

            {/* Logout CTA */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/15 hover:bg-rose-600 text-rose-400 hover:text-white text-xs font-bold border border-rose-500/30 hover:border-rose-600 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;

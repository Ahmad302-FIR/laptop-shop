import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Laptop, ExternalLink, LogOut, RefreshCw, Shield, Database } from 'lucide-react';
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
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Admin Badge */}
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Laptop className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                  Yasin Wahab <span className="text-blue-400 font-semibold text-xs">Store</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5" /> Admin Control Center
                </span>
              </div>
            </Link>

            {/* Backend connection indicator pill */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
              <span className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-emerald-500 animate-pulse' : 'bg-blue-400'}`} />
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
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-400' : ''}`} />
            </button>

            {/* View Live Store */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <span>View Store</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            {/* Admin User Badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                {admin?.username?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-white leading-tight">
                  {admin?.username || 'Admin'}
                </span>
                <span className="text-[10px] text-slate-400">Super Administrator</span>
              </div>
            </div>

            {/* Logout CTA */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/10 hover:bg-rose-600 text-rose-400 hover:text-white text-xs font-bold border border-rose-500/20 hover:border-rose-600 transition-all"
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

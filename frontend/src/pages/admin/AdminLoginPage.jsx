import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Laptop, Lock, User, Eye, EyeOff, AlertCircle, ArrowLeft, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage('Please enter your admin username');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your admin password');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(username, password);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setErrorMessage(res.message || 'Invalid username or password');
      }
    } catch (err) {
      setErrorMessage('Unable to log in. Please verify your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow aesthetics */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center justify-center gap-2.5 group">
            <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Laptop className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black tracking-tight text-white block">
                Yasin Wahab <span className="text-blue-400 font-semibold text-lg">Laptops</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">Direct Importers & Retailers</span>
            </div>
          </Link>

          <div className="pt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Admin Authentication Portal</span>
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white tracking-tight">
              Sign in to Admin Dashboard
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Manage inventory, update laptop prices, toggle stock, and publish promotions
            </p>
          </div>
        </div>

        {/* Login Box */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-slate-900/90 backdrop-blur-md py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-800 space-y-6">
            {/* Error Message Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username field */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Admin Username
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. admin"
                    autoComplete="username"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 active:scale-98"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <span>Access Admin Dashboard &rarr;</span>
                )}
              </button>
            </form>

            <div className="pt-2 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Storefront</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;

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
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow aesthetics */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-navy-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center justify-center gap-2.5 group">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-accent-600 to-amber-400 flex items-center justify-center text-navy-950 font-bold shadow-xl shadow-accent-500/20 group-hover:scale-105 transition-transform">
              <Laptop className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black tracking-tight text-white block">
                Yasin Wahab <span className="text-accent-400 font-semibold text-lg">Laptops</span>
              </span>
              <span className="text-xs text-navy-400 font-medium">Direct Importers & Retailers</span>
            </div>
          </Link>

          <div className="pt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-900 border border-navy-800 text-xs font-bold text-navy-300">
              <Shield className="w-3.5 h-3.5 text-accent-400" />
              <span>Admin Authentication Portal</span>
            </span>
            <h2 className="mt-2 text-2xl font-black text-white tracking-tight">
              Sign in to Admin Dashboard
            </h2>
            <p className="mt-1 text-xs text-navy-400">
              Manage inventory, upload laptop pictures, update prices, and publish promotions
            </p>
          </div>
        </div>

        {/* Login Box */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-navy-900/90 backdrop-blur-md py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-navy-800 space-y-6">
            {/* Error Message Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username field */}
              <div>
                <label className="block text-xs font-bold text-navy-300 uppercase tracking-wider mb-1.5">
                  Admin Username
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-500" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. admin"
                    autoComplete="username"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white placeholder-navy-500 text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label className="block text-xs font-bold text-navy-300 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white placeholder-navy-500 text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-accent-500 hover:bg-accent-600 text-slate-950 font-black text-sm shadow-lg shadow-accent-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 active:scale-98"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
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
                className="inline-flex items-center gap-1.5 text-xs text-navy-400 hover:text-accent-400 transition-colors font-medium"
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

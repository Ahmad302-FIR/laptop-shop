import React from 'react';

/**
 * Reusable Badge component for conditions, stock status, discounts, warranties, etc.
 */
export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  dot = false
}) => {
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs font-medium px-2.5 py-1',
    lg: 'text-sm font-semibold px-3 py-1.5'
  };

  const variantStyles = {
    default: 'bg-slate-800 text-slate-200 border border-slate-700',
    primary: 'bg-blue-600 text-white shadow-sm',
    accent: 'bg-sky-500/10 text-sky-400 border border-sky-500/30',
    success: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 dark:text-emerald-400',
    warning: 'bg-amber-500/10 text-amber-600 border border-amber-500/30 dark:text-amber-400',
    danger: 'bg-rose-500/10 text-rose-600 border border-rose-500/30 dark:text-rose-400',
    discount: 'bg-rose-600 text-white font-bold tracking-wide shadow-sm',
    condition: 'bg-slate-100 text-slate-800 border border-slate-200 font-semibold',
    outline: 'bg-transparent text-slate-600 border border-slate-300'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full transition-colors ${
        sizeStyles[size] || sizeStyles.md
      } ${variantStyles[variant] || variantStyles.default} ${className}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            variant === 'success'
              ? 'bg-emerald-500 animate-pulse'
              : variant === 'danger'
              ? 'bg-rose-500'
              : 'bg-blue-500'
          }`}
        />
      )}
      {children}
    </span>
  );
};

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
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs font-semibold px-2.5 py-1',
    lg: 'text-sm font-bold px-3 py-1.5'
  };

  const variantStyles = {
    default: 'bg-navy-900 text-navy-200 border border-navy-700',
    primary: 'bg-accent-500 text-slate-950 font-bold shadow-sm',
    accent: 'bg-accent-500/15 text-accent-400 border border-accent-500/30 font-semibold',
    success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold',
    warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold',
    danger: 'bg-rose-500/15 text-rose-400 border border-rose-500/30 font-semibold',
    discount: 'bg-accent-500 text-slate-950 font-black tracking-wide shadow-sm',
    condition: 'bg-navy-100 text-navy-800 border border-navy-200 font-semibold',
    outline: 'bg-transparent text-navy-700 border border-navy-300 font-medium'
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
              : 'bg-accent-500'
          }`}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;

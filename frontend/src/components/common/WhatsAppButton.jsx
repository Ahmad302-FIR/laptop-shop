import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppLink, getGeneralWhatsAppLink } from '../../utils/whatsapp';
import { shopContact } from '../../data/branches';

/**
 * Reusable WhatsApp CTA Button
 */
export const WhatsAppButton = ({
  productName,
  price,
  condition,
  number = shopContact.primaryWhatsapp,
  customText,
  variant = 'primary', // 'primary' | 'outline' | 'compact' | 'minimal' | 'hero'
  size = 'md',
  className = '',
  label = 'WhatsApp Now',
  iconOnly = false
}) => {
  let linkUrl = '';
  if (customText) {
    linkUrl = getGeneralWhatsAppLink(customText, number);
  } else if (productName) {
    linkUrl = getWhatsAppLink(productName, number, { price, condition });
  } else {
    linkUrl = getGeneralWhatsAppLink(
      'Assalam o Alaikum, I would like to inquire about available laptops.',
      number
    );
  }

  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base font-semibold gap-2.5",
    icon: "p-2.5 rounded-full"
  };

  const variantStyles = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md focus:ring-emerald-500",
    emeraldGrad: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md hover:shadow-lg focus:ring-emerald-500",
    outline: "border border-emerald-500 text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500 bg-white",
    dark: "bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-700 hover:border-emerald-500/50",
    hero: "bg-[#25D366] hover:bg-[#1ebe57] text-slate-950 font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 focus:ring-emerald-400"
  };

  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Contact on WhatsApp about ${productName || 'laptop inquiries'}`}
      className={`${baseStyles} ${sizeStyles[iconOnly ? 'icon' : size]} ${variantStyles[variant] || variantStyles.primary} ${className}`}
    >
      <FaWhatsapp className={size === 'lg' ? 'text-xl' : 'text-lg text-current shrink-0'} />
      {!iconOnly && <span>{label}</span>}
    </a>
  );
};

import React from 'react';
import { Package, CheckCircle2, XCircle, Tag, Star, DollarSign, ArrowUpRight } from 'lucide-react';
import { useProducts } from '../../context/ProductsContext';

export const StatsOverview = ({ onFilterChange, currentFilter }) => {
  const { stats } = useProducts();

  const cards = [
    {
      id: 'all',
      title: 'Total Catalog',
      value: stats.total,
      subtitle: 'All items listed',
      icon: Package,
      color: 'blue',
      bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400'
    },
    {
      id: 'available',
      title: 'In Stock',
      value: stats.inStock,
      subtitle: 'Ready for shipment',
      icon: CheckCircle2,
      color: 'emerald',
      bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
    },
    {
      id: 'sold',
      title: 'Sold Out',
      value: stats.soldOut,
      subtitle: 'Needs restocking',
      icon: XCircle,
      color: 'rose',
      bg: 'bg-rose-500/10 border-rose-500/20 text-rose-400'
    },
    {
      id: 'sale',
      title: 'On Sale',
      value: stats.onSale,
      subtitle: 'Active promotional deals',
      icon: Tag,
      color: 'amber',
      bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400'
    },
    {
      id: 'featured',
      title: 'Featured',
      value: stats.featured,
      subtitle: 'Homepage spotlights',
      icon: Star,
      color: 'purple',
      bg: 'bg-purple-500/10 border-purple-500/20 text-purple-400'
    },
    {
      id: 'value',
      title: 'Active Stock Value',
      value: `Rs. ${(stats.totalValue / 100000).toFixed(1)} Lakh`,
      subtitle: `Rs. ${stats.totalValue.toLocaleString('en-PK')}`,
      icon: DollarSign,
      color: 'indigo',
      bg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
      nonClickable: true
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = currentFilter === card.id;

        return (
          <button
            key={card.id}
            type="button"
            disabled={card.nonClickable}
            onClick={() => onFilterChange && !card.nonClickable && onFilterChange(card.id)}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
              isSelected
                ? 'bg-slate-800 border-blue-500 ring-2 ring-blue-500/30 shadow-lg'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 shadow-sm'
            } ${card.nonClickable ? 'cursor-default' : 'cursor-pointer active:scale-98'}`}
          >
            <div className="flex items-center justify-between w-full mb-3">
              <div className={`p-2 rounded-xl border ${card.bg}`}>
                <Icon className="w-4 h-4" />
              </div>
              {!card.nonClickable && (
                <ArrowUpRight className={`w-3.5 h-3.5 text-slate-500 ${isSelected ? 'text-blue-400' : ''}`} />
              )}
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {card.value}
              </div>
              <div className="text-xs font-bold text-slate-300 mt-0.5">{card.title}</div>
              <div className="text-[10px] text-slate-500 mt-0.5 truncate">{card.subtitle}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default StatsOverview;

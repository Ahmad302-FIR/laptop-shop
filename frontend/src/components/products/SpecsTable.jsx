import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  HardDrive,
  Monitor,
  Battery,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Truck,
  Sparkles,
  Info
} from 'lucide-react';

export const SpecsTable = ({ product }) => {
  const [activeTab, setActiveTab] = useState('specs');

  const {
    processor,
    generation,
    ram,
    storage,
    display,
    graphics,
    battery,
    os,
    condition,
    charger,
    warranty,
    brand,
    model,
    category,
    keyFeatures = []
  } = product;

  const specRows = [
    { label: 'Brand', value: brand, icon: Info },
    { label: 'Model', value: model || product.name, icon: Sparkles },
    { label: 'Processor', value: `${processor || 'N/A'} ${generation ? `(${generation})` : ''}`, icon: Cpu },
    { label: 'Installed RAM', value: ram || 'N/A', icon: Layers },
    { label: 'Storage (SSD/HDD)', value: storage || 'N/A', icon: HardDrive },
    { label: 'Display Screen', value: display || 'N/A', icon: Monitor },
    { label: 'Graphics Adapter', value: graphics || 'N/A', icon: Zap },
    { label: 'Battery Backup', value: battery || 'N/A', icon: Battery },
    { label: 'Operating System', value: os || 'Windows 11 Licensed', icon: Sparkles },
    { label: 'Physical Condition', value: condition || 'Excellent', icon: CheckCircle2 },
    { label: 'Original Charger', value: charger ? 'Yes (Original Charger Included)' : 'Optional', icon: Zap },
    { label: 'Warranty Coverage', value: warranty || '1 Month Replacement Warranty', icon: ShieldCheck }
  ];

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50">
        <button
          type="button"
          onClick={() => setActiveTab('specs')}
          className={`flex-1 py-3.5 px-4 text-center text-xs sm:text-sm font-bold transition-all border-b-2 ${
            activeTab === 'specs'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Technical Specifications
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('testing')}
          className={`flex-1 py-3.5 px-4 text-center text-xs sm:text-sm font-bold transition-all border-b-2 ${
            activeTab === 'testing'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          25-Point Quality Check
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('delivery')}
          className={`flex-1 py-3.5 px-4 text-center text-xs sm:text-sm font-bold transition-all border-b-2 ${
            activeTab === 'delivery'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Warranty & Delivery
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'specs' && (
          <div className="space-y-6">
            {/* Key Features List */}
            {keyFeatures.length > 0 && (
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2.5">
                  Highlights & Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-blue-950">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specs Table Grid */}
            <div className="divide-y divide-slate-100">
              {specRows.map((row, idx) => {
                const Icon = row.icon;
                return (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-3 py-3 px-2 gap-1 sm:gap-4 hover:bg-slate-50/80 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <Icon className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>{row.label}</span>
                    </div>
                    <div className="sm:col-span-2 text-xs sm:text-sm font-medium text-slate-800">
                      {row.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'testing' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-1">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Certified 25-Point Hardware Diagnostics</span>
              </div>
              <p className="text-xs text-emerald-700">
                Every imported laptop at Yasin Wahab is rigorously inspected and stress-tested before dispatch.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 pt-2">
              {[
                'Screen: 0 Dead Pixels & Uniform Brightness',
                'Keyboard: Every Key Verified via KeyTest Pro',
                'Touchpad & Gesture Tracking Calibrated',
                'Battery Health Checked in BIOS / HWMonitor',
                'All USB, Type-C, HDMI & Audio Ports Working',
                'SSD Health Verified 100% via Hard Disk Sentinel',
                'RAM Stress Tested for 0 Errors (MemTest86)',
                'Clean Motherboard (No rework or heating trace)',
                'Webcam & Dual Microphones Tested on Zoom/Teams',
                'Thermals & Fan Speed Tested under Full Prime95 Load'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Checking Warranty Policy</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We provide a <strong>1 Month (30 Days) replacement warranty</strong> for any technical issues, plus 6 months free software support. You can test the machine thoroughly at your home or office.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Nationwide Safe Delivery</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fast 24-48 hours delivery across Pakistan via TCS / Leopards Courier in heavy shock-proof inflatable air bags. Cash on delivery available.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-blue-900">
              <strong>Branch Pickup Available:</strong> You can also visit our branches in Peshawar (Deans Trade Center), Sargodha (Trust Plaza), or Lakki Marwat (Main Bazar) to test and collect your laptop directly.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { X, Smartphone, Download, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Get ParkBnB India</h2>
              <p className="text-xs text-slate-400">Available for Android 8.0+</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Google Play Store Card */}
          <div className="p-4 bg-slate-800/60 border border-slate-700/60 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-700/50">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M4.5 2.5L14.2 12.2L4.5 21.9C4.2 21.6 4 21.1 4 20.5V3.9C4 3.3 4.2 2.8 4.5 2.5Z" fill="#2196F3"/>
                  <path d="M17.5 8.9L14.2 12.2L4.5 2.5C4.8 2.2 5.3 2 5.8 2.3L17.5 8.9Z" fill="#4CAF50"/>
                  <path d="M17.5 15.5L5.8 22.1C5.3 22.4 4.8 22.2 4.5 21.9L14.2 12.2L17.5 15.5Z" fill="#F44336"/>
                  <path d="M21.5 11.2L17.5 8.9L14.2 12.2L17.5 15.5L21.5 13.2C22.2 12.8 22.2 11.6 21.5 11.2Z" fill="#FFEB3B"/>
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Google Play Review
                </span>
                <p className="font-semibold text-white text-sm mt-0.5">Google Play Store</p>
                <p className="text-xs text-slate-400">Under official Play Store review</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 bg-slate-700/60 text-slate-300 rounded-xl border border-slate-600/50">
              Coming Soon
            </span>
          </div>

          {/* Direct APK Release Card */}
          <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  Direct Release APK (v1.0.0)
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">85 MB</span>
            </div>
            <p className="text-xs text-slate-300">
              Download the standalone signed release APK immediately to test all live parking bay booking, host hub, and MoRTH RC features.
            </p>
            <a
              href="https://github.com/ParkBnB-corp/parkbnb-frontend-mobile/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-all shadow-lg shadow-emerald-900/30"
            >
              <Download className="w-4 h-4" />
              Download Live APK from GitHub Releases
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Security Guarantee */}
          <div className="flex items-center gap-2.5 text-xs text-slate-400 justify-center">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Target SDK 34 • SHA-256 Verified • 100% Virus-Free</span>
          </div>
        </div>
      </div>
    </div>
  );
};

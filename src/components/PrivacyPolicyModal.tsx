import React from 'react';
import { X, Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Privacy Policy</h2>
              <p className="text-xs text-slate-400">ParkBnB India • Last updated: November 2026</p>
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
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-sm text-slate-300 leading-relaxed">
          <div className="p-4 bg-emerald-950/30 border border-emerald-500/20 rounded-xl flex items-start gap-3">
            <Lock className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            <p className="text-xs text-emerald-200/90">
              Your privacy is paramount. ParkBnB India is committed to protecting your personal data and complying with Google Play Store Developer Policies and applicable Indian privacy laws.
            </p>
          </div>

          <section className="space-y-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              1. Introduction
            </h3>
            <p>
              Welcome to <strong>ParkBnB India</strong> ("we", "our", or "us"). ParkBnB India is a sole proprietorship based in Mohali, Punjab, India. This Privacy Policy describes how we collect, store, protect, and handle your information when you use our mobile application (ParkBnB) and related services.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              2. Information We Collect
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong>Account & Profile Information:</strong> Full name, mobile phone number, email address, and profile picture (when provided via Google Sign-In or manual entry).
              </li>
              <li>
                <strong>Precise & Approximate Location:</strong> With your explicit permission, we collect GPS coordinates to discover nearby parking spots, calculate walking distance, and provide turn-by-turn navigation to reserved bays. Location is processed in real time and is never sold.
              </li>
              <li>
                <strong>Vehicle Data:</strong> Registration plate numbers and vehicle profiles entered by you to manage your virtual garage and identify your vehicle at reserved parking spots.
              </li>
              <li>
                <strong>Transaction Data:</strong> Parking booking records, bay reservations, gate pass QR tokens, and PhonePe payment transaction references (we do not store raw credit card numbers or UPI PINs).
              </li>
              <li>
                <strong>Host Information:</strong> Parking bay photographs, address, clearance height, and payout wallet identifiers if you register as a host.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              3. Purpose of Processing
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                <p className="font-medium text-white text-xs mb-1">Spot Discovery & Navigation</p>
                <p className="text-xs text-slate-400">Matching drivers with nearby vacant driveways, stilt, and covered parking bays.</p>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                <p className="font-medium text-white text-xs mb-1">Gate Pass Generation</p>
                <p className="text-xs text-slate-400">Issuing secure QR codes for contactless security check-in at residential societies.</p>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                <p className="font-medium text-white text-xs mb-1">Virtual Garage Organization</p>
                <p className="text-xs text-slate-400">Managing user vehicle profiles for streamlined bay allocation and security gate clearance.</p>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                <p className="font-medium text-white text-xs mb-1">Host Payouts</p>
                <p className="text-xs text-slate-400">Facilitating automated wallet credits and earnings settlement for parking space owners.</p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              4. Data Sharing & Security
            </h3>
            <p>
              We do <strong>not</strong> sell, rent, or trade your personal data. Data is shared exclusively with necessary infrastructure partners:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300 text-xs">
              <li><strong>PhonePe & Banking Partners:</strong> For processing digital UPI/card payments.</li>
              <li><strong>Google Maps Platform:</strong> For map rendering and geographic routing.</li>
              <li><strong>Google AdMob:</strong> For non-personalized sponsored banner and interstitial alerts in free tiers.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              5. Your Rights & Data Deletion
            </h3>
            <p>
              Under Indian law, you have the right to access, rectify, or request permanent deletion of your profile, vehicle garage, and transaction history. To request complete data erasure, email our Data Protection Officer at <a href="mailto:privacy@parkbnb.in" className="text-emerald-400 hover:underline">privacy@parkbnb.in</a> or use the in-app account deletion flow.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              6. Grievance Officer & Contact
            </h3>
            <p className="text-xs text-slate-400">
              <strong>Grievance Officer:</strong> Manak Wadhwa<br />
              <strong>Entity:</strong> ParkBnB India (Sole Proprietorship)<br />
              <strong>Email:</strong> support@parkbnb.in / privacy@parkbnb.in<br />
              <strong>Registered Office:</strong> JLPL Galaxy Heights, Mohali, Punjab 140308, India.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-900/30"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
};

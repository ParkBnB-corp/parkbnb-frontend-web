import React from 'react';
import { X, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
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
              <FileText className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Terms & Conditions</h2>
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
          <section className="space-y-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              1. Acceptance of Terms
            </h3>
            <p>
              By accessing or using the ParkBnB mobile app, website, or associated services provided by <strong>ParkBnB India</strong>, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must discontinue using our services immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              2. User & Driver Responsibilities
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong>Authorized Vehicles Only:</strong> You may only park vehicles with a valid Indian Registration Certificate (RC), active motor third-party insurance, and valid Pollution Under Control (PUC) certificate.
              </li>
              <li>
                <strong>Spot Booking Duration:</strong> Drivers must strictly vacate the reserved bay on or before the booked departure time. Overstaying past reserved hours without an active session extension in the app may incur overstay charges and security reporting.
              </li>
              <li>
                <strong>Residential Conduct:</strong> When parking in gated residential societies or private driveways, drivers must adhere to society speed limits (max 10 km/h) and follow instructions given by security personnel upon showing the ParkBnB Gate Pass QR.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              3. Host Obligations & Payouts
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong>Accurate Spot Information:</strong> Hosts must accurately represent the dimensions, clearance height, accessibility, and gating of their parking spaces.
              </li>
              <li>
                <strong>Guaranteed Availability:</strong> Once a driver makes a confirmed booking on ParkBnB, the host must ensure the bay is vacant, accessible, and free of obstruction for the entire reserved duration.
              </li>
              <li>
                <strong>Earnings Settlement:</strong> Payouts for completed parking sessions are automatically credited to the host's verified wallet after deduction of ParkBnB platform facilitation charges (10%).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              4. Cancellations & Refunds
            </h3>
            <p>
              Drivers may cancel reservations prior to the booking start time. Cancellations made 15 minutes before the start time are eligible for a 100% refund credited back to their ParkBnB wallet or original UPI payment method. Cancellations requested after the reservation time has commenced are non-refundable.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              5. Limitation of Liability
            </h3>
            <p className="text-xs text-slate-400">
              ParkBnB India acts strictly as a technology marketplace connecting parking spot owners with drivers. ParkBnB India is not liable for vehicle theft, damage, natural wear and tear, or disputes between hosts and drivers occurring on private premises. Drivers are required to maintain active comprehensive motor vehicle insurance under Indian motor laws.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              6. Governing Law & Dispute Resolution
            </h3>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka, India.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-900/30"
          >
            I Agree & Close
          </button>
        </div>
      </div>
    </div>
  );
};

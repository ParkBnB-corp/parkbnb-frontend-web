import React from 'react';
import {
  Car,
  Trash2,
  ShieldAlert,
  Clock,
  Mail,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lock,
  FileText,
  ShieldCheck,
  Send,
} from 'lucide-react';

interface Props {
  onBackToHome?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const DeleteAccountPage: React.FC<Props> = ({
  onBackToHome,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const mailtoUrl =
    'mailto:support@parkbnb.space?subject=' +
    encodeURIComponent('Account Deletion Request - ParkBnB India') +
    '&body=' +
    encodeURIComponent(
      'Hello ParkBnB Support Team,\n\n' +
        'I am requesting the permanent closure and deletion of my ParkBnB India account and associated data.\n\n' +
        'Registered Email Address: \n' +
        'Registered Mobile Number (if applicable): \n' +
        'Registered Vehicle Plate(s) (optional): \n' +
        'Reason for Deletion (optional): \n\n' +
        'I understand that:\n' +
        '1. My login access will be immediately retracted upon processing.\n' +
        '2. All my user data, vehicle records, and history will be permanently deleted within 90 days of this request.\n' +
        '3. ParkBnB Support will reply to confirm my request within 24 hours.\n\n' +
        'Thank you.'
    );

  const handleHomeClick = (e: React.MouseEvent) => {
    if (onBackToHome) {
      e.preventDefault();
      onBackToHome();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="/"
            onClick={handleHomeClick}
            className="flex items-center gap-3 text-white hover:opacity-90 transition-opacity"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-extrabold shadow-sm">
              <Car className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="font-bold text-base text-white tracking-tight">ParkBnB India</span>
              <p className="text-[10px] text-slate-400 font-medium">Account & Data Governance</p>
            </div>
          </a>

          <a
            href="/"
            onClick={handleHomeClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors border border-slate-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </a>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Hero Section */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
            <Trash2 className="w-3.5 h-3.5" />
            <span>Account Deletion & Data Erasure Policy</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Delete Your ParkBnB Account & Associated Data
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            ParkBnB India respects your privacy and complies with Google Play Store User Data Policies.
            You have the absolute right to request the complete deletion of your account, vehicle garage,
            and personal records.
          </p>
        </div>

        {/* 3 Core Policy Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. Immediate Login Retraction */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Login Retracted Immediately</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upon submitting your closure request, your login sessions, active authentication tokens,
              and mobile app credentials will be <strong>immediately retracted and deactivated</strong>.
            </p>
          </div>

          {/* 2. 90 Days Deletion */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Data Deleted in 90 Days</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              All personal identifiers, vehicle garage data, and documents will be permanently purged from
              our production databases within <strong>90 days of the request</strong> for closure.
            </p>
          </div>

          {/* 3. Reply in 24 Hours */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Reply in 24 Hours</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Email your closure request to <strong className="text-slate-200">support@parkbnb.space</strong>.
              Our dedicated support team will review and reply with confirmation within <strong>24 hours</strong>.
            </p>
          </div>
        </div>

        {/* How to Request Closure - Step-by-Step Card */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">How to Request Account Closure</h2>
              <p className="text-xs text-slate-400">Step-by-step instructions to delete your account</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <p className="font-semibold text-white">Send an email to support@parkbnb.space</p>
                <p className="text-slate-400 text-xs mt-1">
                  Send an email from your registered email address with the subject line:{' '}
                  <code className="text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/50">
                    Account Deletion Request - [Your Registered Email or Phone]
                  </code>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <p className="font-semibold text-white">Immediate Login Revocation & 24h Response</p>
                <p className="text-slate-400 text-xs mt-1">
                  Our support team will reply within <strong>24 hours</strong>. Upon verification, your
                  mobile app session is retracted and all active login tokens are immediately revoked.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <p className="font-semibold text-white">Permanent Purge within 90 Days</p>
                <p className="text-slate-400 text-xs mt-1">
                  All personal data, garage vehicle documents, and spot listings are queued for final deletion
                  and permanently removed from our primary data stores within <strong>90 days</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Email CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <a
              href={mailtoUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm transition-colors shadow-lg shadow-red-900/30"
            >
              <Trash2 className="w-4 h-4" />
              <span>Email support@parkbnb.space to Delete Account</span>
            </a>

            <span className="text-xs text-slate-500 text-center sm:text-left">
              Direct email link pre-filled with required closure details • We reply within 24 hours
            </span>
          </div>
        </section>

        {/* Data Erasure & Retention Breakdown */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white">Data Scope & Retention Details</h2>
            <p className="text-xs text-slate-400">
              Clear breakdown of data removed versus data temporarily retained for statutory compliance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* What is Deleted */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Permanently Deleted (within 90 days)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Full name, email address, phone number, and profile details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Vehicle Garage data (plate numbers, vehicle specifications, FASTag linkages)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Host listings, photos, clearance bay details, and custom pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Saved parking locations, search queries, and gate pass QR history</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Device push notification tokens and authentication session tokens</span>
                </li>
              </ul>
            </div>

            {/* What is Retained Temporarily */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Retained up to 90 Days (Statutory Laws)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Under applicable Indian laws and financial regulations, certain records must be retained
                during the 90-day closure window:
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>Financial invoices & UPI transaction ledger entries (tax & audit compliance)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>Resolved dispute logs & chargeback records to prevent fraudulent re-registration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>After the 90-day window, financial records are anonymized and archived per legal requirements.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Legal & Entity Notice */}
        <section className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 space-y-2">
          <p className="font-semibold text-slate-200">Entity & Legal Information</p>
          <p>
            <strong>Entity:</strong> ParkBnB India (Sole Proprietorship)<br />
            <strong>Registered Office:</strong> JLPL Galaxy Heights, Mohali, Punjab 140308, India.<br />
            <strong>Jurisdiction:</strong> Punjab, India.<br />
            <strong>Official Support:</strong>{' '}
            <a href="mailto:support@parkbnb.space" className="text-emerald-400 hover:underline">
              support@parkbnb.space
            </a>{' '}
            (We reply within 24 hours).
          </p>
          <p className="text-slate-500 pt-2">
            This account deletion policy is maintained in accordance with Google Play Developer Policy on
            Account Deletion Requirements and applicable data protection regulations in India.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 bg-slate-950 text-slate-500 text-xs border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-semibold">ParkBnB India</span>
            <span>•</span>
            <span>© 2026 All rights reserved</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="/" onClick={handleHomeClick} className="hover:text-slate-300 transition-colors">
              Home
            </a>
            {onOpenPrivacy && (
              <button onClick={onOpenPrivacy} className="hover:text-slate-300 transition-colors">
                Privacy Policy
              </button>
            )}
            {onOpenTerms && (
              <button onClick={onOpenTerms} className="hover:text-slate-300 transition-colors">
                Terms of Service
              </button>
            )}
            <a href="mailto:support@parkbnb.space" className="text-emerald-400 hover:underline">
              support@parkbnb.space
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

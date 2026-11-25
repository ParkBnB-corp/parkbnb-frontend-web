import React, { useState } from 'react';
import { ShieldCheck, Phone, KeyRound, Sparkles, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { adminApi } from '../services/adminApi';

interface Props {
  onLoginSuccess: (user: any) => void;
}

export const AdminLogin: React.FC<Props> = ({ onLoginSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoCodeHint, setDemoCodeHint] = useState<string | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await adminApi.requestOtp(phoneNumber);
      setDemoCodeHint(res.otp);
      setOtp(res.otp); // Pre-fill for instant frictionless login
      setStep('OTP');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await adminApi.verifyOtp(phoneNumber, otp);
      localStorage.setItem('parkbnb_admin_token', res.accessToken);
      if (res.refreshToken) {
        localStorage.setItem('parkbnb_admin_refresh_token', res.refreshToken);
      }
      localStorage.setItem('parkbnb_admin_user', JSON.stringify(res.user));
      onLoginSuccess(res.user);
    } catch (err: any) {
      setError(err.message || 'Verification failed. Admin privileges required.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/20">
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[2px] mb-4 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            ParkBnB <span className="text-emerald-400 font-mono text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">SUPER ADMIN</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time User Controls, Ad Revenue & System Telemetry
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {step === 'PHONE' ? (
          <form onSubmit={handleSendOtp} className="space-y-5 relative z-10">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Super Admin Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-mono text-sm">
                  +91
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="9876543210"
                  required
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-14 pr-4 py-3 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Quick Demo Pre-fill */}
            <div className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-between">
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-emerald-400">Pre-seeded Admin:</span> Manak Wadhwa
              </div>
              <button
                type="button"
                onClick={() => setPhoneNumber('9876543210')}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-2"
              >
                Use Super Admin
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Send Security OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-5 relative z-10">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                4-Digit Security OTP
              </label>
              <div className="relative">
                <KeyRound className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="1234"
                  autoFocus
                  required
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-12 pr-4 py-3 text-white text-center text-xl font-mono tracking-widest placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                />
              </div>
            </div>

            {demoCodeHint && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Backend OTP: <strong className="font-mono text-emerald-400">{demoCodeHint}</strong> (auto-filled for instant verification)</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Authorize & Access Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => { setStep('PHONE'); setError(null); }}
              className="w-full text-center text-xs text-slate-400 hover:text-slate-200 py-1"
            >
              Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

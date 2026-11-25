import React, { useState } from 'react';
import { DollarSign, Eye, ExternalLink, HelpCircle, CheckCircle2, ShieldCheck, PlayCircle, Layers, ArrowUpRight } from 'lucide-react';
import { AdminAnalytics } from '../types';

interface Props {
  analytics: AdminAnalytics | null;
}

export const AdAnalyticsView: React.FC<Props> = ({ analytics }) => {
  const [testingTrigger, setTestingTrigger] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const simulateAdImpression = async (action: string, adUnitType: string) => {
    setTestingTrigger(true);
    try {
      const res = await fetch('http://localhost:8080/api/v1/admin/ads/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ triggerAction: action, adUnitType }),
      });
      const data = await res.json();
      setTestResult(`Ad tracked! ID: ${data.eventId} (+₹${data.estimatedRevenue})`);
      setTimeout(() => setTestResult(null), 4000);
    } catch (e: any) {
      setTestResult(`Error: ${e.message}`);
    } finally {
      setTestingTrigger(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Monetization Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <DollarSign className="w-4 h-4" /> Google AdMob Monetization Architecture
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">App Monetization & Ad Revenue Engine</h2>
          <p className="text-xs text-slate-400 mt-1">
            Covering vendor API costs (Vahan 4.0, FASTag, Parivahan) via targeted interstitials and rewarded video ads.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => simulateAdImpression('RC_SEARCH', 'INTERSTITIAL')}
            disabled={testingTrigger}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Simulate RC Ad Call</span>
          </button>
        </div>
      </div>

      {testResult && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-mono">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{testResult}</span>
        </div>
      )}

      {/* Answer to User's Ad Account Question */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/20 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white">Do You Need to Create a Google Ads / AdMob Account?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Answer:</strong> <strong>Yes, for production payouts; but NO for development right now!</strong>
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              <li>
                <strong className="text-slate-200">Right Now (Testing Phase):</strong> We configured the mobile app with <strong className="text-blue-400">Google's Official Sample/Test Ad IDs</strong>. This ensures real ads render cleanly in emulator and on physical phones without any risk of account suspension or policy violation.
              </li>
              <li>
                <strong className="text-slate-200">When Ready for Production:</strong> Create an account at{' '}
                <a
                  href="https://admob.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 underline inline-flex items-center gap-0.5"
                >
                  admob.google.com <ExternalLink className="w-3 h-3 inline" />
                </a>
                , generate your App ID and 3 Ad Unit IDs (Banner, Interstitial, Rewarded), and paste them into <code className="text-blue-300 font-mono">adService.ts</code>.
              </li>
              <li>
                <strong className="text-slate-200">Cost Coverage:</strong> In India, interstitial ads yield approx ₹80 to ₹250 CPM (~₹0.10 to ₹0.25 per view). With users verifying vehicles and checking RC details, 1,000 checks easily yield ₹150–₹250, comfortably covering the ₹0 serverless bill and vendor API calls!
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Ad Units Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Interstitial */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              INTERSTITIAL
            </span>
            <span className="text-xs font-mono text-slate-400">Est. ₹0.10 / view</span>
          </div>
          <h4 className="text-sm font-bold text-white">RC Search & External Lookups</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Displayed immediately before fetching vehicle details from Parivahan/Vahan 4.0 or FASTag balance checks. Includes an anti-spam cooldown of 45 seconds.
          </p>
          <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
            Trigger: <code className="text-emerald-400 font-mono">RC_SEARCH</code>
          </div>
        </div>

        {/* Rewarded */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-teal-400 uppercase bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-full">
              REWARDED VIDEO
            </span>
            <span className="text-xs font-mono text-slate-400">Est. ₹0.25 / view</span>
          </div>
          <h4 className="text-sm font-bold text-white">Add Vehicle & Garage Slots</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Optionally unlocks free vehicle slots or extra parking referral credits when user watches an engaging 15-30 second video ad.
          </p>
          <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
            Trigger: <code className="text-teal-400 font-mono">ADD_VEHICLE</code>
          </div>
        </div>

        {/* Hourly Sync Engine */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
              SYNC ENGINE
            </span>
            <span className="text-xs font-mono text-slate-400">Interval: 1 Hour</span>
          </div>
          <h4 className="text-sm font-bold text-white">Dynamic User Ad-Free Toggle</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            The mobile app checks <code className="text-purple-300 font-mono">ads_enabled</code> on every hourly JWT refresh. When you disable ads for a VIP user in this admin panel, their app goes ad-free seamlessly.
          </p>
          <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
            Database Column: <code className="text-purple-400 font-mono">users.ads_enabled</code>
          </div>
        </div>
      </div>
    </div>
  );
};

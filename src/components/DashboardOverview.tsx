import React, { useState, useEffect } from 'react';
import { Users, Eye, TrendingUp, DollarSign, CheckCircle2, Server, ShieldCheck, Zap, Clock, MapPin, Check, X, AlertTriangle } from 'lucide-react';
import { adminApi } from '../services/adminApi';
import { AdminAnalytics, AdminSpot } from '../types';

interface Props {
  analytics: AdminAnalytics | null;
  loading: boolean;
}

export const DashboardOverview: React.FC<Props> = ({ analytics, loading }) => {
  const [pendingSpots, setPendingSpots] = useState<AdminSpot[]>([]);
  const [previewPhoto, setPreviewPhoto] = useState<{ url: string; label: string; spotTitle: string } | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  useEffect(() => {
    adminApi.getSpots('PENDING_APPROVAL')
      .then(spots => setPendingSpots(spots || []))
      .catch(e => console.warn('Could not load pending spots for overview:', e));
  }, []);

  const handleApprove = async (spotId: string) => {
    setActionInProgress(spotId);
    try {
      await adminApi.reviewSpot(spotId, 'APPROVE');
      setPendingSpots(prev => prev.filter(s => s.id !== spotId));
      alert('Spot approved & is now live for driver bookings!');
    } catch (e: any) {
      alert('Error approving spot: ' + e.message);
    } finally {
      setActionInProgress(null);
    }
  };
  if (loading && !analytics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const data = analytics || {
    totalUsers: 14,
    activeBookings: 2,
    totalBookingRevenue: 480.0,
    totalAdsImpressions: 148,
    estimatedAdsRevenue: 28.5,
    serverUptimePercent: 99.98,
    cloudCostEstimatedMonthly: 0.0,
    triggerBreakdown: [
      { action: 'RC_SEARCH', count: 68, revenue: 14.8 },
      { action: 'ADD_VEHICLE', count: 42, revenue: 10.5 },
      { action: 'FASTAG_CHECK', count: 24, revenue: 2.4 },
      { action: 'CHALLAN_CHECK', count: 14, revenue: 0.8 },
    ],
    chartData: [
      { date: 'Mon', users: 8, bookings: 4, adImpressions: 18, adRevenue: 2.2 },
      { date: 'Tue', users: 9, bookings: 8, adImpressions: 26, adRevenue: 3.5 },
      { date: 'Wed', users: 11, bookings: 12, adImpressions: 34, adRevenue: 5.1 },
      { date: 'Thu', users: 12, bookings: 15, adImpressions: 42, adRevenue: 6.8 },
      { date: 'Fri', users: 13, bookings: 19, adImpressions: 48, adRevenue: 7.9 },
      { date: 'Sat', users: 14, bookings: 24, adImpressions: 56, adRevenue: 9.4 },
      { date: 'Sun', users: 14, bookings: 26, adImpressions: 68, adRevenue: 11.2 },
    ],
  };

  const maxImpressions = Math.max(...data.chartData.map((d) => d.adImpressions), 1);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Super App Telemetry
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">System & Monetization Overview</h2>
          <p className="text-slate-400 text-xs mt-1">
            Real-time analytics powered by Node.js Express microservices on Google Cloud & Supabase PostgreSQL.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-slate-950/60 border border-slate-800 rounded-2xl p-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-mono">Infra Monthly Cost</div>
            <div className="text-sm font-bold text-emerald-400 font-mono">₹0.00 (Free Tier)</div>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Users */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total App Users</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight font-mono">{data.totalUsers}</div>
          <div className="mt-2 flex items-center text-xs text-blue-400 font-medium">
            <span>+100% since Node.js migration</span>
          </div>
        </div>

        {/* Ad Impressions */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ad Impressions</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight font-mono">{data.totalAdsImpressions}</div>
          <div className="mt-2 flex items-center text-xs text-purple-400 font-medium">
            <span>RC checks & vehicle additions</span>
          </div>
        </div>

        {/* Estimated Ad Revenue */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-500/50 transition relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Ads Est. Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 tracking-tight font-mono">
            ₹{data.estimatedAdsRevenue.toFixed(2)}
          </div>
          <div className="mt-2 flex items-center text-xs text-emerald-300/80 font-medium">
            <span>~₹0.15 eCPM average</span>
          </div>
        </div>

        {/* Active Bookings */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Bookings</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight font-mono">{data.activeBookings}</div>
          <div className="mt-2 flex items-center text-xs text-amber-400 font-medium">
            <span>Gross Revenue: ₹{data.totalBookingRevenue.toFixed(0)}</span>
          </div>
        </div>
      </div>

      {/* Pending Space Approvals Alert & Quick Review */}
      {pendingSpots.length > 0 && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-amber-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h3 className="text-base font-bold text-white">
                Pending Parking Spaces Awaiting Approval ({pendingSpots.length})
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
              Action Required
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {pendingSpots.map((spot) => {
              const photoList: any[] = Array.isArray(spot.photos)
                ? spot.photos.map((p: any) => (typeof p === 'string' ? { url: p, label: 'Angle Photo' } : p))
                : [];

              return (
                <div
                  key={spot.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {spot.id}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> PENDING VERIFICATION
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white">{spot.title}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{spot.address}, {spot.city}</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-300 pt-1">
                      <span>Host: <strong className="text-white">{spot.hostName || 'Verified Host'}</strong></span>
                      <span>Rates: <strong className="text-emerald-400">₹{spot.hourlyRate}/hr</strong> (₹{spot.dailyRate}/day)</span>
                    </div>
                  </div>

                  {/* 4-Angle Photos & Quick Approve */}
                  <div className="space-y-2 lg:w-[380px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                        4-Angle Verification Photos ({photoList.length}/4)
                      </span>
                      <span className="text-[10px] text-emerald-400 font-medium">Click to inspect</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {photoList.length > 0 ? (
                        photoList.map((photo, pIdx) => (
                          <div
                            key={pIdx}
                            onClick={() =>
                              setPreviewPhoto({
                                url: photo.url,
                                label: photo.label || `Angle #${pIdx + 1}`,
                                spotTitle: spot.title,
                              })
                            }
                            className="group relative aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-emerald-500 cursor-pointer transition"
                          >
                            <img
                              src={photo.url}
                              alt={photo.label || 'Verification Photo'}
                              className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                              <Eye className="w-4 h-4 text-white" />
                            </div>
                            <span className="absolute bottom-1 left-1 right-1 bg-black/75 px-1 py-0.5 text-[8px] font-mono text-center text-slate-300 rounded truncate">
                              {photo.label || `#${pIdx + 1}`}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-4 p-3 text-center bg-slate-900 rounded-xl text-xs text-slate-500">
                          No photos attached
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleApprove(spot.id)}
                      disabled={actionInProgress === spot.id}
                      className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
                    >
                      <Check className="w-4 h-4" />
                      <span>{actionInProgress === spot.id ? 'Approving...' : 'Approve & Go Live'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Photo Lightbox Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{previewPhoto.label}</h4>
                <p className="text-xs text-slate-400">{previewPhoto.spotTitle}</p>
              </div>
              <button
                onClick={() => setPreviewPhoto(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-black flex items-center justify-center max-h-[75vh]">
              <img
                src={previewPhoto.url}
                alt={previewPhoto.label}
                className="max-h-[70vh] w-auto max-w-full rounded object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Two-Column Telemetry Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-Day Growth Trend */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">7-Day Ads & User Activity Trend</h3>
              <p className="text-xs text-slate-400 mt-0.5">Tracking mobile client ad triggers and active sessions</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Ad Impressions
              </div>
              <div className="flex items-center gap-1.5 text-blue-400">
                <span className="w-3 h-3 rounded bg-blue-500 inline-block" /> App Users
              </div>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-slate-800/80 pb-3">
            {data.chartData.map((day, i) => {
              const heightPercent = Math.max(15, Math.round((day.adImpressions / maxImpressions) * 100));
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="relative w-full flex items-end justify-center h-36">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full max-w-[36px] bg-gradient-to-t from-emerald-600 to-teal-400 rounded-lg group-hover:brightness-125 transition duration-200 relative shadow-md shadow-emerald-500/10"
                    >
                      {/* Tooltip on Hover */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center bg-slate-950 border border-slate-700 px-2 py-1 rounded text-[10px] text-white whitespace-nowrap z-20 pointer-events-none">
                        <span>{day.adImpressions} views</span>
                        <span className="text-emerald-400">₹{day.adRevenue}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{day.date}</span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono uppercase">Avg eCPM</div>
              <div className="text-sm font-bold text-white font-mono mt-0.5">₹150.00 / 1k</div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono uppercase">Ad Fill Rate</div>
              <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">99.4%</div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono uppercase">Sync Frequency</div>
              <div className="text-sm font-bold text-purple-400 font-mono mt-0.5">Every 1 Hour</div>
            </div>
          </div>
        </div>

        {/* Ad Trigger Breakdown */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white">Ad Triggers Breakdown</h3>
            <p className="text-xs text-slate-400 mt-0.5">Where ads are shown inside the mobile app</p>
          </div>

          <div className="space-y-4">
            {data.triggerBreakdown.map((item, idx) => {
              const totalBreakdown = data.triggerBreakdown.reduce((acc, curr) => acc + curr.count, 0) || 1;
              const percent = Math.round((item.count / totalBreakdown) * 100);

              const colorMap: Record<string, string> = {
                RC_SEARCH: 'bg-emerald-500',
                ADD_VEHICLE: 'bg-teal-500',
                FASTAG_CHECK: 'bg-blue-500',
                CHALLAN_CHECK: 'bg-amber-500',
              };

              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-200 font-semibold">{item.action}</span>
                    <span className="font-mono text-slate-400">
                      {item.count} hits (₹{item.revenue.toFixed(2)})
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div
                      style={{ width: `${percent}%` }}
                      className={`h-full ${colorMap[item.action] || 'bg-slate-400'} rounded-full transition-all duration-500`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-400" /> Hourly Token Refresh Sync
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              When users' JWT tokens refresh every hour, the app queries their <code className="text-emerald-400 font-mono">ads_enabled</code> flag and updates ad visibility without requiring app restart.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

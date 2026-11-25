import React, { useState, useEffect } from 'react';
import {
  Bell,
  Send,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Users,
  Radio,
  ExternalLink,
  Car,
  Gift,
  ShieldAlert,
} from 'lucide-react';
import { adminApi } from '../services/adminApi';
import { BroadcastHistoryItem, AdminUser } from '../types';

interface Props {
  users: AdminUser[];
}

export const BroadcastNotificationView: React.FC<Props> = ({ users }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState<'SYSTEM' | 'BOOKING' | 'HOST' | 'REWARDS'>('SYSTEM');
  const [actionRoute, setActionRoute] = useState('/(tabs)/explore');
  const [actionLabel, setActionLabel] = useState('Find Parking');
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null);
  const [history, setHistory] = useState<BroadcastHistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const activeCount = users.length > 0 ? users.length : 142;

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const items = await adminApi.getNotificationHistory();
      setHistory(items);
    } catch (err: any) {
      console.warn('Failed to load notification history:', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handlePresetSelect = (preset: {
    title: string;
    body: string;
    category: 'SYSTEM' | 'BOOKING' | 'HOST' | 'REWARDS';
    route: string;
    label: string;
  }) => {
    setTitle(preset.title);
    setBody(preset.body);
    setCategory(preset.category);
    setActionRoute(preset.route);
    setActionLabel(preset.label);
    setSendResult(null);
  };

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert('Please fill out both notification title and message body.');
      return;
    }

    const confirmSend = window.confirm(
      `Are you sure you want to broadcast this notification to all ${activeCount} active users immediately?`
    );
    if (!confirmSend) return;

    setSending(true);
    setSendResult(null);

    try {
      const res = await adminApi.broadcastNotification({
        title: title.trim(),
        body: body.trim(),
        category,
        actionRoute,
        actionLabel,
      });

      setSendResult({
        success: true,
        message: `Broadcast delivered successfully to ${res.recipientCount} active users (${res.fcmDispatchedCount} push notifications sent)!`,
      });
      setTitle('');
      setBody('');
      fetchHistory();
    } catch (err: any) {
      setSendResult({
        success: false,
        message: err.message || 'Failed to dispatch broadcast notification.',
      });
    } finally {
      setSending(false);
    }
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'BOOKING':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          icon: <Car className="w-3.5 h-3.5 text-emerald-400" />,
        };
      case 'HOST':
        return {
          bg: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
          icon: <Sparkles className="w-3.5 h-3.5 text-sky-400" />,
        };
      case 'REWARDS':
        return {
          bg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          icon: <Gift className="w-3.5 h-3.5 text-purple-400" />,
        };
      default:
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          icon: <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />,
        };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">Active Users Broadcast Hub</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                Live FCM Push & In-App Sync
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Dispatch high-priority push notifications and in-app updates to all registered drivers and hosts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700/60 flex items-center gap-3">
            <Users className="w-4 h-4 text-emerald-400" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400 font-mono uppercase">Audience Reach</div>
              <div className="text-sm font-bold text-white font-mono">{activeCount} Registered Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Composer on Left, Mobile Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Notification Composer (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-white text-base">Compose Broadcast Notification</h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">All Active Devices</span>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">1-Click Campaign Templates</label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  handlePresetSelect({
                    title: '⚡ Weekend Demand Surge: Earn 35% Extra',
                    body: 'Cricket match weekend in Bengaluru! Open your driveway to drivers & earn up to ₹2,500/day.',
                    category: 'HOST',
                    route: '/host',
                    label: 'Open Host Hub',
                  })
                }
                className="text-[11px] px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                🏟️ Match Day Surge
              </button>
              <button
                type="button"
                onClick={() =>
                  handlePresetSelect({
                    title: '🎁 Refer a Friend, Get ₹100 + 10% For Life',
                    body: 'Invite drivers to ParkBnB. Whenever they park, 10% lifetime commission is credited to your wallet.',
                    category: 'REWARDS',
                    route: '/referral',
                    label: 'Invite & Earn',
                  })
                }
                className="text-[11px] px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                🎁 Lifetime Referral Bonus
              </button>
              <button
                type="button"
                onClick={() =>
                  handlePresetSelect({
                    title: '🚗 Government RC Check Enabled for Your Garage',
                    body: 'Verify your vehicle registration details, insurance validity, and PUC expiry directly inside the app.',
                    category: 'SYSTEM',
                    route: '/(tabs)/garage',
                    label: 'Check My Fleet',
                  })
                }
                className="text-[11px] px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                📋 Live RC Check Online
              </button>
            </div>
          </div>

          <form onSubmit={handleBroadcast} className="space-y-4">
            {/* Category Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Notification Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'SYSTEM', label: 'System Alert', icon: ShieldAlert },
                  { id: 'BOOKING', label: 'Parking Bay', icon: Car },
                  { id: 'HOST', label: 'Host Mode', icon: Sparkles },
                  { id: 'REWARDS', label: 'Rewards/Referral', icon: Gift },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategory(item.id as any)}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                      category === item.id
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:bg-slate-800'
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Notification Title</label>
                <span className="text-[10px] font-mono text-slate-400">{title.length}/60 chars</span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={60}
                placeholder="e.g. ⚡ Flash Parking Pass: 50% Off Today"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                required
              />
            </div>

            {/* Body */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Message Body</label>
                <span className="text-[10px] font-mono text-slate-400">{body.length}/180 chars</span>
              </div>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                maxLength={180}
                rows={3}
                placeholder="e.g. Reserve guaranteed parking in Koramangala & Indiranagar before 6 PM to enjoy instant sensor gate access."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition resize-none"
                required
              />
            </div>

            {/* In-App Deep Link Action Route */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Target Destination Route</label>
                <select
                  value={actionRoute}
                  onChange={(e) => setActionRoute(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="/(tabs)/explore">/(tabs)/explore - Map & Parking Spot Search</option>
                  <option value="/host">/host - Host Space & Listings Hub</option>
                  <option value="/host/create">/host/create - List a Parking Bay (4-Angle Upload)</option>
                  <option value="/referral">/referral - Refer & Earn 10% Lifetime</option>
                  <option value="/(tabs)/garage">/(tabs)/garage - Digital Garage & Fleet</option>
                  <option value="/notifications">/notifications - Notification Inbox</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Action Button Label</label>
                <input
                  type="text"
                  value={actionLabel}
                  onChange={(e) => setActionLabel(e.target.value)}
                  placeholder="e.g. Find Parking"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Feedback Alert */}
            {sendResult && (
              <div
                className={`p-4 rounded-xl text-xs flex items-center gap-3 border ${
                  sendResult.success
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}
              >
                {sendResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
                <span>{sendResult.message}</span>
              </div>
            )}

            {/* Broadcast Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={sending || !title.trim() || !body.trim()}
                className="w-full py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition duration-200"
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Broadcasting to {activeCount} Users...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Notification to All Active Users ({activeCount})</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Mobile Notification Simulator (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-[340px] bg-slate-900 border-[3px] border-slate-700 rounded-[38px] p-3 shadow-2xl relative overflow-hidden">
            {/* Phone Speaker & Camera Notch */}
            <div className="w-24 h-4 bg-slate-950 rounded-full mx-auto mb-2 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-800" />
              <div className="w-6 h-1 rounded-full bg-slate-800" />
            </div>

            {/* Phone Screen Mockup */}
            <div className="bg-slate-950 rounded-[28px] p-4 min-h-[460px] flex flex-col justify-between border border-slate-800/80">
              {/* Status Bar */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-4 px-1">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Notification Banner Overlay (Live Simulated) */}
              <div className="space-y-3">
                <div className="text-[10px] font-mono text-emerald-400 text-center uppercase tracking-wider">
                  Live Mobile Push Preview
                </div>

                <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Bell className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tight">ParkBnB</span>
                        <span className="text-[9px] text-slate-500 font-mono">now</span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-0.5 leading-snug">
                        {title.trim() || 'Notification Title Goes Here'}
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-1 line-clamp-3 leading-relaxed">
                        {body.trim() || 'Type your message body on the left to see how it renders on user devices.'}
                      </p>

                      {actionLabel && (
                        <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 truncate max-w-[150px]">{actionRoute}</span>
                          <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            {actionLabel} <ExternalLink className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Second In-App Notification Card Sample */}
                <div className="opacity-40 pointer-events-none scale-95">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center gap-2 text-slate-400 text-[10px]">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">RC Check verification available for your fleet</span>
                  </div>
                </div>
              </div>

              {/* Bottom Home Indicator */}
              <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-6" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 font-mono mt-3 text-center">
            Simulated Android & iOS high-priority push banner
          </p>
        </div>
      </div>

      {/* Broadcast History Table */}
      <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Past Broadcast History</h3>
          </div>
          <button
            onClick={fetchHistory}
            className="text-xs text-slate-400 hover:text-emerald-400 transition"
          >
            Refresh Logs
          </button>
        </div>

        {loadingHistory ? (
          <div className="py-8 text-center text-xs text-slate-500 font-mono">Loading broadcast records...</div>
        ) : history.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            No past broadcast notifications sent yet. Use the composer above to send your first message to all users.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/60 text-slate-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Category</th>
                  <th className="py-2.5 px-3">Title & Message</th>
                  <th className="py-2.5 px-3">Action Target</th>
                  <th className="py-2.5 px-3">Recipients</th>
                  <th className="py-2.5 px-3 rounded-r-lg">Dispatched Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {history.map((item) => {
                  const badge = getCategoryBadge(item.category);
                  return (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${badge.bg}`}>
                          {badge.icon}
                          <span>{item.category}</span>
                        </span>
                      </td>
                      <td className="py-3 px-3 max-w-md">
                        <div className="font-bold text-slate-200">{item.title}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{item.body}</div>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-300">
                        {item.action_route || 'App Launch'}
                        {item.action_label && (
                          <span className="block text-[10px] text-slate-500 font-sans">({item.action_label})</span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono text-emerald-400 font-bold">
                        {item.recipient_count || activeCount} users
                      </td>
                      <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                        {new Date(item.created_at).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

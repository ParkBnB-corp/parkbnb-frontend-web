import React, { useState } from 'react';
import { Search, Shield, User, ToggleLeft, ToggleRight, Check, X, Smartphone, Filter, AlertTriangle, Sparkles } from 'lucide-react';
import { AdminUser } from '../types';
import { adminApi } from '../services/adminApi';

interface Props {
  users: AdminUser[];
  onRefresh: () => void;
}

export const UserManagementTable: React.FC<Props> = ({ users, onRefresh }) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'ADMIN' | 'USER'>('ALL');
  const [adsFilter, setAdsFilter] = useState<'ALL' | 'ENABLED' | 'DISABLED'>('ALL');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleAds = async (user: AdminUser) => {
    const nextState = !user.adsEnabled;
    setUpdatingId(user.id);
    try {
      await adminApi.toggleAds(user.id, nextState);
      showToast(`Ads ${nextState ? 'ENABLED' : 'DISABLED'} for ${user.name}`);
      onRefresh();
    } catch (err: any) {
      alert(`Error toggling ads: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleRole = async (user: AdminUser) => {
    const nextRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN';
    if (!confirm(`Are you sure you want to change ${user.name}'s role to ${nextRole}?`)) {
      return;
    }
    setUpdatingId(user.id);
    try {
      await adminApi.updateRole(user.id, nextRole);
      showToast(`Role changed to ${nextRole} for ${user.name}`);
      onRefresh();
    } catch (err: any) {
      alert(`Error updating role: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleFeature = async (user: AdminUser, featureKey: keyof typeof user.features) => {
    const currentVal = user.features?.[featureKey] ?? true;
    const nextVal = !currentVal;
    setUpdatingId(user.id);
    try {
      await adminApi.updateFeatures(user.id, { [featureKey]: nextVal });
      showToast(`Feature ${featureKey} set to ${nextVal ? 'ON' : 'OFF'} for ${user.name}`);
      onRefresh();
    } catch (err: any) {
      alert(`Error updating feature: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtering
  const filteredUsers = users.filter((u) => {
    const query = search.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(query) ||
      u.phoneNumber.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.id.toLowerCase().includes(query);

    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesAds =
      adsFilter === 'ALL' ||
      (adsFilter === 'ENABLED' && u.adsEnabled) ||
      (adsFilter === 'DISABLED' && !u.adsEnabled);

    return matchesSearch && matchesRole && matchesAds;
  });

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/50 shadow-2xl rounded-2xl p-4 flex items-center gap-3 text-emerald-300 text-sm animate-bounce">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Super User & Ads Administration</h2>
          <p className="text-xs text-slate-400 mt-1">
            Toggle Google AdMob display per user (synced on hourly token refresh) and control feature flags.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user, phone or email..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 font-mono"
          >
            <option value="ALL">All Roles ({users.length})</option>
            <option value="ADMIN">Super Admins ({users.filter((u) => u.role === 'ADMIN').length})</option>
            <option value="USER">Drivers / Users ({users.filter((u) => u.role === 'USER').length})</option>
          </select>

          {/* Ads Filter */}
          <select
            value={adsFilter}
            onChange={(e) => setAdsFilter(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 font-mono"
          >
            <option value="ALL">All Ads Status</option>
            <option value="ENABLED">Ads Enabled</option>
            <option value="DISABLED">Ads Disabled (Ad-Free)</option>
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider font-mono">
                <th className="py-4 px-6">User & Contact</th>
                <th className="py-4 px-4">Role</th>
                <th className="py-4 px-4">Google Ads Status</th>
                <th className="py-4 px-4">Feature Wall Toggles</th>
                <th className="py-4 px-4">Platform</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No users matching criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isUpdating = updatingId === u.id;
                  const isSuperAdmin = u.role === 'ADMIN';

                  return (
                    <tr key={u.id} className="hover:bg-slate-800/30 transition">
                      {/* User & Contact */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200 font-mono shrink-0">
                            {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div className="font-semibold text-white flex items-center gap-1.5">
                              <span>{u.name}</span>
                              {isSuperAdmin && (
                                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-bold">
                                  SUPER ADMIN
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                              {u.phoneNumber} {u.email && `• ${u.email}`}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-4 px-4 font-mono">
                        {isSuperAdmin ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            <Shield className="w-3 h-3" /> ADMIN
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                            <User className="w-3 h-3" /> USER
                          </span>
                        )}
                      </td>

                      {/* Google Ads Status Toggle */}
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleAds(u)}
                          disabled={isUpdating}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition ${
                            u.adsEnabled
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                              : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/50'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              u.adsEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                            }`}
                          />
                          <span className="font-mono text-[11px] font-semibold">
                            {u.adsEnabled ? 'Ads Active' : 'Ad-Free'}
                          </span>
                        </button>
                      </td>

                      {/* Feature Wall Toggles */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {[
                            { key: 'garageEnabled', label: 'Garage' },
                            { key: 'parkbnbEnabled', label: 'ParkBnB' },
                            { key: 'challanEnabled', label: 'Challan' },
                            { key: 'fastagEnabled', label: 'FASTag' },
                            { key: 'walletEnabled', label: 'Wallet' },
                          ].map((feat) => {
                            const isEnabled = (u.features as any)?.[feat.key] ?? true;
                            return (
                              <button
                                key={feat.key}
                                onClick={() => handleToggleFeature(u, feat.key as any)}
                                disabled={isUpdating}
                                className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border transition ${
                                  isEnabled
                                    ? 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20'
                                    : 'bg-slate-800/40 border-slate-700 text-slate-500 hover:text-slate-300'
                                }`}
                              >
                                {feat.label} {isEnabled ? '✓' : '✕'}
                              </button>
                            );
                          })}
                        </div>
                      </td>

                      {/* Platform */}
                      <td className="py-4 px-4 font-mono text-[11px] text-slate-400">
                        <span className="inline-flex items-center gap-1">
                          <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                          {u.platform || 'ANDROID'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleToggleRole(u)}
                          disabled={isUpdating}
                          className="text-[11px] text-slate-400 hover:text-emerald-400 underline underline-offset-2 font-medium transition"
                        >
                          {isSuperAdmin ? 'Revoke Admin' : 'Make Admin'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

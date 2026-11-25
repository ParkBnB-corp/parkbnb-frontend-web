import React from 'react';
import { ShieldCheck, LogOut, RefreshCw, BarChart3, Users, DollarSign, Layers, Bell, CheckSquare } from 'lucide-react';

interface Props {
  activeTab: 'overview' | 'users' | 'ads' | 'notifications' | 'approvals';
  setActiveTab: (tab: 'overview' | 'users' | 'ads' | 'notifications' | 'approvals') => void;
  adminUser: any;
  onLogout: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  adminUser,
  onLogout,
  onRefresh,
  isRefreshing,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Brand */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1.5px] shadow-sm">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight">ParkBnB</span>
                <span className="text-[10px] ml-2 font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                  Admin Console
                </span>
              </div>
            </div>

            {/* Navigation Tabs (Scrollable on mobile) */}
            <nav className="flex items-center space-x-1 pl-2 sm:pl-4 border-l border-slate-800 overflow-x-auto no-scrollbar py-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'overview'
                    ? 'bg-slate-800 text-emerald-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Overview & Telemetry</span>
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'users'
                    ? 'bg-slate-800 text-emerald-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>User & Ad Controls</span>
              </button>

              <button
                onClick={() => setActiveTab('ads')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'ads'
                    ? 'bg-slate-800 text-emerald-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Monetization & Ads</span>
              </button>

              <button
                onClick={() => setActiveTab('approvals')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'approvals'
                    ? 'bg-slate-800 text-emerald-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <CheckSquare className="w-4 h-4 text-amber-400" />
                <span>Listings & Approvals</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'notifications'
                    ? 'bg-slate-800 text-emerald-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Broadcast Notifications</span>
              </button>
            </nav>
          </div>

          {/* Right User & Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
            </button>

            <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-400 font-mono">
                {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="text-left text-xs">
                <div className="font-semibold text-slate-200 truncate max-w-[130px]">{adminUser?.name || 'Super Admin'}</div>
                <div className="text-[10px] text-emerald-400 font-mono">SUPER ADMIN</div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition border border-transparent hover:border-red-500/20"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

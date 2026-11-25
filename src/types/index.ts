export interface FeatureFlags {
  garageEnabled: boolean;
  parkbnbEnabled: boolean;
  challanEnabled: boolean;
  fastagEnabled: boolean;
  walletEnabled: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  role: 'ADMIN' | 'USER';
  adsEnabled: boolean;
  createdAt: string;
  platform: string;
  features: FeatureFlags;
}

export interface AdTriggerBreakdown {
  action: string;
  count: number;
  revenue: number;
}

export interface ChartDayData {
  date: string;
  users: number;
  bookings: number;
  adImpressions: number;
  adRevenue: number;
}

export interface AdminAnalytics {
  totalUsers: number;
  activeBookings: number;
  totalBookingRevenue: number;
  totalAdsImpressions: number;
  estimatedAdsRevenue: number;
  serverUptimePercent: number;
  cloudCostEstimatedMonthly: number;
  triggerBreakdown: AdTriggerBreakdown[];
  chartData: ChartDayData[];
}

export interface AdminAuthSession {
  token: string;
  user: {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    role: string;
  };
}

export interface BroadcastNotificationPayload {
  title: string;
  body: string;
  category: 'SYSTEM' | 'BOOKING' | 'HOST' | 'REWARDS';
  actionRoute?: string;
  actionLabel?: string;
}

export interface BroadcastHistoryItem {
  id: string;
  title: string;
  body: string;
  category: string;
  action_route?: string;
  action_label?: string;
  created_at: string;
  recipient_count: number;
}

export interface AdminSpotPhoto {
  key?: string;
  label?: string;
  url: string;
}

export interface AdminSpot {
  id: string;
  title: string;
  description: string;
  type: string;
  address: string;
  landmark?: string;
  city: string;
  hourlyRate: number;
  dailyRate: number;
  status: 'PENDING_APPROVAL' | 'ACTIVE' | 'REJECTED' | 'MODIFICATION_REQUESTED' | 'PAUSED';
  gated: boolean;
  evCharging: boolean;
  cctvGuarded: boolean;
  clearanceHeight: string;
  accessMethod: string;
  hostUserId?: string;
  hostName?: string;
  photos: AdminSpotPhoto[] | any;
  rejectionReason?: string;
  modificationNotes?: string;
  blockedDates?: string[];
  createdAt: string;
}

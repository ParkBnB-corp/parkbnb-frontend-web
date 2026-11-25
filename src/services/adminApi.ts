import { AdminAnalytics, AdminUser, FeatureFlags, BroadcastNotificationPayload, BroadcastHistoryItem, AdminSpot } from '../types';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8080') + '/api/v1';

let isRefreshing = false;
let refreshSubscribers: ((newToken: string | null) => void)[] = [];

async function refreshAdminToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('parkbnb_admin_refresh_token');
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    if (data.accessToken) {
      localStorage.setItem('parkbnb_admin_token', data.accessToken);
      if (data.refreshToken) {
        localStorage.setItem('parkbnb_admin_refresh_token', data.refreshToken);
      }
      return data.accessToken;
    }
  } catch (err) {
    console.warn('[AdminApi] Refresh failed:', err);
  }
  return null;
}

async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = localStorage.getItem('parkbnb_admin_token');
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    // Attempt token refresh
    if (!isRefreshing) {
      isRefreshing = true;
      const newToken = await refreshAdminToken();
      isRefreshing = false;
      refreshSubscribers.forEach((cb) => cb(newToken));
      refreshSubscribers = [];

      if (newToken) {
        headers.set('Authorization', `Bearer ${newToken}`);
        return fetch(url, { ...options, headers });
      }
    } else {
      const waitToken = await new Promise<string | null>((resolve) => {
        refreshSubscribers.push(resolve);
      });
      if (waitToken) {
        headers.set('Authorization', `Bearer ${waitToken}`);
        return fetch(url, { ...options, headers });
      }
    }

    // Refresh completely failed -> clean logout
    localStorage.removeItem('parkbnb_admin_token');
    localStorage.removeItem('parkbnb_admin_refresh_token');
    localStorage.removeItem('parkbnb_admin_user');
    window.location.reload();
    throw new Error('Unauthorized - Admin session expired');
  }

  return res;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(errorData.message || 'API request failed');
  }
  return res.json();
}

export const adminApi = {
  // Authentication
  async requestOtp(phoneNumber: string): Promise<{ otp: string; message: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, clientName: 'ParkBnB Web Admin' }),
    });
    return handleResponse(res);
  },

  async verifyOtp(phoneNumber: string, otp: string): Promise<{
    accessToken: string;
    refreshToken: string;
    user: { id: string; name: string; phoneNumber: string; email: string; role: string };
  }> {
    const res = await fetch(`${API_BASE}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, otp }),
    });
    const data = await handleResponse<any>(res);
    if (data.user?.role !== 'ADMIN') {
      throw new Error('Access denied: You do not have Super Admin permissions.');
    }
    return data;
  },

  // Analytics
  async getAnalytics(): Promise<AdminAnalytics> {
    const res = await authFetch(`${API_BASE}/admin/analytics`);
    return handleResponse<AdminAnalytics>(res);
  },

  // Users
  async getUsers(): Promise<AdminUser[]> {
    const res = await authFetch(`${API_BASE}/admin/users`);
    return handleResponse<AdminUser[]>(res);
  },

  // Toggle Ads
  async toggleAds(userId: string, adsEnabled: boolean): Promise<any> {
    const res = await authFetch(`${API_BASE}/admin/users/${userId}/ads`, {
      method: 'PUT',
      body: JSON.stringify({ adsEnabled }),
    });
    return handleResponse(res);
  },

  // Toggle Feature Flags
  async updateFeatures(userId: string, features: Partial<FeatureFlags>): Promise<any> {
    const res = await authFetch(`${API_BASE}/admin/users/${userId}/features`, {
      method: 'PUT',
      body: JSON.stringify(features),
    });
    return handleResponse(res);
  },

  // Update Role
  async updateRole(userId: string, role: 'ADMIN' | 'USER'): Promise<any> {
    const res = await authFetch(`${API_BASE}/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
    return handleResponse(res);
  },

  // Broadcast Notification to all Active Users
  async broadcastNotification(payload: BroadcastNotificationPayload): Promise<{
    success: boolean;
    message: string;
    notificationId: string;
    recipientCount: number;
    fcmDispatchedCount: number;
  }> {
    const res = await authFetch(`${API_BASE}/admin/notifications/broadcast`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  // Fetch Broadcast History
  async getNotificationHistory(): Promise<BroadcastHistoryItem[]> {
    const res = await authFetch(`${API_BASE}/admin/notifications/history`);
    return handleResponse<BroadcastHistoryItem[]>(res);
  },

  // Parking Spot Listings & Approvals
  async getSpots(status?: string): Promise<AdminSpot[]> {
    const query = status && status !== 'ALL' ? `?status=${status}` : '';
    const res = await authFetch(`${API_BASE}/admin/spots${query}`);
    return handleResponse<AdminSpot[]>(res);
  },

  async reviewSpot(
    spotId: string,
    action: 'APPROVE' | 'REJECT' | 'REQUEST_MODIFICATION',
    payload?: { rejectionReason?: string; modificationNotes?: string }
  ): Promise<{ success: boolean; spot: AdminSpot }> {
    const res = await authFetch(`${API_BASE}/admin/spots/${spotId}/review`, {
      method: 'PATCH',
      body: JSON.stringify({ action, ...(payload || {}) }),
    });
    return handleResponse(res);
  },
};

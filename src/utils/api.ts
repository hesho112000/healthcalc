const API_BASE = '/api';

interface FetchOptions extends RequestInit {
  token?: string;
}

class ApiClient {
  private getToken(): string | null {
    return localStorage.getItem('healthcalc-token');
  }

  private async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { token, ...fetchOptions } = options;
    const authToken = token || this.getToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers as Record<string, string> || {}),
    };

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || `Request failed with status ${res.status}`);
    }

    return data as T;
  }

  async register(name: string, email: string, password: string) {
    return this.request<{ token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  async login(email: string, password: string) {
    return this.request<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getProfile() {
    return this.request<{ user: User }>('/auth/me');
  }

  async updateProfile(name: string) {
    return this.request<{ user: User }>('/auth/me', {
      method: 'PUT',
      body: JSON.stringify({ name }),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request<{ message: string }>('/auth/me/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  async saveHealthData(module: string, inputs: any, results: any, notes?: string) {
    return this.request<{ id: number; message: string }>('/health', {
      method: 'POST',
      body: JSON.stringify({ module, inputs, results, notes }),
    });
  }

  async getHealthHistory(module?: string, limit = 50, offset = 0) {
    const params = new URLSearchParams({ limit: String(limit), offset: String(offset) });
    if (module) params.append('module', module);
    return this.request<{ data: HealthRecord[]; total: number }>(`/health?${params}`);
  }

  async getHealthRecord(id: number) {
    return this.request<HealthRecord>(`/health/${id}`);
  }

  async deleteHealthRecord(id: number) {
    return this.request<{ message: string }>(`/health/${id}`, { method: 'DELETE' });
  }

  async getStats() {
    return this.request<StatsResponse>('/health/stats/summary');
  }

  async subscribe() {
    return this.request<{ user: User; message: string }>('/auth/subscribe', { method: 'POST' });
  }

  async unsubscribe() {
    return this.request<{ user: User; message: string }>('/auth/unsubscribe', { method: 'POST' });
  }
}

interface User {
  id: number;
  name: string;
  email: string;
  subscription_status: 'free' | 'premium';
  subscription_end_date?: string | null;
  created_at?: string;
}

interface HealthRecord {
  id: number;
  user_id: number;
  date: string;
  module: string;
  inputs: any;
  results: any;
  notes: string;
}

interface StatsResponse {
  totalRecords: number;
  byModule: { module: string; count: number; first_entry: string; last_entry: string }[];
  recentEntries: { id: number; date: string; module: string }[];
}

export type { User, HealthRecord, StatsResponse };
export const api = new ApiClient();

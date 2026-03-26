import { create } from "zustand";

interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  vehicle?: {
    model: string;
    batteryCapacity: number;
    year: number;
  };
  preferences: {
    minCleanEnergy: number;
    preferredSpeeds: string[];
    notificationsEnabled: boolean;
  };
  subscription: {
    tier: "free" | "premium";
    expiresAt?: Date;
  };
  stats: {
    totalCO2Saved: number;
    totalSessions: number;
    totalKWh: number;
  };
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  logout: () => set({ user: null, error: null }),
}));

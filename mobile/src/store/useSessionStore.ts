import { create } from "zustand";

interface ChargingSession {
  id: string;
  stationId: string;
  portId: string;
  startTime: Date;
  endTime?: Date;
  energyDelivered: number; // kWh
  currentPower: number; // kW
  cost: number;
  co2Saved: number; // kg
  status: "active" | "completed" | "cancelled";
}

interface SessionState {
  activeSession: ChargingSession | null;
  startSession: (stationId: string, portId: string) => void;
  updateSession: (updates: Partial<ChargingSession>) => void;
  endSession: () => void;
  resetSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  activeSession: null,
  startSession: (stationId, portId) => set({
    activeSession: {
      id: Math.random().toString(36).substr(2, 9),
      stationId,
      portId,
      startTime: new Date(),
      energyDelivered: 0,
      currentPower: 50,
      cost: 0,
      co2Saved: 0,
      status: "active",
    }
  }),
  updateSession: (updates) => set((state) => ({
    activeSession: state.activeSession ? { ...state.activeSession, ...updates } : null
  })),
  endSession: () => set((state) => ({
    activeSession: state.activeSession ? { ...state.activeSession, status: "completed", endTime: new Date() } : null
  })),
  resetSession: () => set({ activeSession: null }),
}));

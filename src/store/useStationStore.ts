import { create } from "zustand";
import type { Reservation, QueueEntry } from "../services/booking";

export interface ChargingStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  cleanEnergyPercentage: number;
  energySources: string[];
  operator: string;
  pricing: {
    perKWh: number;
    idleFeePerMinute: number;
    sessionFee: number;
  };
  ports: {
    id: string;
    type: string;
    power: string;
    status: "available" | "occupied" | "offline";
  }[];
  amenities: string[];
  rating: number;
  totalReviews: number;
  images: string[];
  waitTime: number;
}

interface StationState {
  stations: ChargingStation[];
  selectedStation: ChargingStation | null;
  activeReservation: Reservation | null;
  queueEntry: QueueEntry | null;
  filters: {
    cleanEnergyOnly: boolean;
    minSpeed: number;
    maxPrice: number;
  };
  setStations: (stations: ChargingStation[]) => void;
  setSelectedStation: (station: ChargingStation | null) => void;
  setActiveReservation: (reservation: Reservation | null) => void;
  setQueueEntry: (queueEntry: QueueEntry | null) => void;
  setFilters: (filters: Partial<StationState["filters"]>) => void;
}

export const useStationStore = create<StationState>((set) => ({
  stations: [],
  selectedStation: null,
  activeReservation: null,
  queueEntry: null,
  filters: {
    cleanEnergyOnly: false,
    minSpeed: 0,
    maxPrice: 100,
  },
  setStations: (stations) => set({ stations }),
  setSelectedStation: (selectedStation) => set({ selectedStation }),
  setActiveReservation: (activeReservation) => set({ activeReservation }),
  setQueueEntry: (queueEntry) => set({ queueEntry }),
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
}));

export const getAvailablePorts = (station: ChargingStation) => {
  return station.ports.filter(p => p.status === 'available').length;
};

// Mock Data
export const MOCK_STATIONS: ChargingStation[] = [
  {
    id: "1",
    name: "EcoCharge Hub - Melbourne CBD",
    address: "123 Solar Way, Melbourne VIC",
    latitude: -37.8136,
    longitude: 144.9631,
    cleanEnergyPercentage: 98,
    energySources: ["Solar", "Wind"],
    operator: "EcoCharge Network",
    pricing: { perKWh: 0.25, idleFeePerMinute: 0.1, sessionFee: 1.0 },
    ports: [
      { id: "p1", type: "CCS", power: "150kW", status: "available" },
      { id: "p2", type: "CHAdeMO", power: "50kW", status: "occupied" },
    ],
    amenities: ["Cafe", "WiFi", "Restroom"],
    rating: 4.8,
    totalReviews: 124,
    images: ["https://images.unsplash.com/photo-1620241031336-d87780f2bead?q=80&w=2070&auto=format&fit=crop"],
    waitTime: 0,
  },
  {
    id: "2",
    name: "GreenGrid Southbank",
    address: "456 Windy Blvd, Southbank VIC",
    latitude: -37.8226,
    longitude: 144.9621,
    cleanEnergyPercentage: 85,
    energySources: ["Wind", "Hydro"],
    operator: "GreenGrid Inc",
    pricing: { perKWh: 0.30, idleFeePerMinute: 0.15, sessionFee: 1.5 },
    ports: [
      { id: "p3", type: "CCS", power: "350kW", status: "available" },
      { id: "p4", type: "CCS", power: "350kW", status: "available" },
    ],
    amenities: ["Park", "Shopping"],
    rating: 4.5,
    totalReviews: 89,
    images: ["https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop"],
    waitTime: 5,
  },
];

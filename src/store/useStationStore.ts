import { create } from "zustand";

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
  filters: {
    cleanEnergyOnly: boolean;
    minSpeed: number;
    maxPrice: number;
  };
  setStations: (stations: ChargingStation[]) => void;
  setSelectedStation: (station: ChargingStation | null) => void;
  setFilters: (filters: Partial<StationState["filters"]>) => void;
}

export const useStationStore = create<StationState>((set) => ({
  stations: [],
  selectedStation: null,
  filters: {
    cleanEnergyOnly: false,
    minSpeed: 0,
    maxPrice: 100,
  },
  setStations: (stations) => set({ stations }),
  setSelectedStation: (selectedStation) => set({ selectedStation }),
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
}));

// Mock Data
export const MOCK_STATIONS: ChargingStation[] = [
  {
    id: "1",
    name: "EcoCharge Hub - Downtown",
    address: "123 Solar Way, Metro City",
    latitude: 37.78825,
    longitude: -122.4324,
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
    images: ["https://example.com/station1.jpg"],
    waitTime: 0,
  },
  {
    id: "2",
    name: "GreenGrid Station",
    address: "456 Windy Blvd, Metro City",
    latitude: 37.79825,
    longitude: -122.4424,
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
    images: ["https://example.com/station2.jpg"],
    waitTime: 5,
  },
  {
    id: "3",
    name: "City Charging Point",
    address: "789 Main St, Metro City",
    latitude: 37.77825,
    longitude: -122.4224,
    cleanEnergyPercentage: 45,
    energySources: ["Grid Mix"],
    operator: "City Charge",
    pricing: { perKWh: 0.20, idleFeePerMinute: 0.05, sessionFee: 0.5 },
    ports: [{ id: "p5", type: "J1772", power: "7kW", status: "available" }],
    amenities: ["Restroom"],
    rating: 3.9,
    totalReviews: 45,
    images: ["https://example.com/station3.jpg"],
    waitTime: 15,
  },
];

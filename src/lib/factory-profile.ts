export interface ShiftTiming {
  name: string;
  start: string;
  end: string;
}

export interface DayOperation {
  day: string;
  hours: number;
}

export interface MachineProfile {
  id: string;
  name: string;
  type: string;
  manufacturer?: string;
  model?: string;
  ratedPower: number;
  operatingHours: number;
  idleHours: number;
  setupHours: number;
  productionHours: number;
  dayWiseHours?: DayOperation[];
}

export interface AuxiliaryEquipmentItem {
  id: string;
  type: string;
  name: string;
  ratedPower: number;
  units: number;
  operatingHours: number;
  purpose: string;
}

export interface CoolantSystemItem {
  id: string;
  name: string;
  pumpPower: number;
  avgOperatingHours: number;
  numPumps: number;
  shared: boolean;
  connectedMachines: string[];
}

export interface FuelRecord {
  id: string;
  type: string;
  quantity: number;
  unit: string;
  period: string;
  purpose: string;
  sourceDocument?: string;
}

export interface FactoryProfileData {
  userName: string;
  userEmail: string;
  userPhone: string;
  companyName: string;
  companyAddress: string;

  country: string;
  state: string;
  city: string;
  region: string;
  factoryAddress: string;
  reportingPeriod: string;
  workingDays: number;
  workingHoursPerDay: number;
  numShifts: number;
  shiftTimings: ShiftTiming[];

  numCncMachines: number;
  machines: MachineProfile[];

  hasAuxiliary: boolean;
  auxiliaryItems: AuxiliaryEquipmentItem[];

  coolantSystems: CoolantSystemItem[];

  hasFuel: boolean;
  fuelRecords: FuelRecord[];

  setupCompleted: boolean;
  lastUpdated: string;
}

const PROFILE_STORAGE_KEY = "remargin_factory_profile_data";

export const defaultFactoryProfile: FactoryProfileData = {
  userName: "Arun Kumar",
  userEmail: "arun@precisionworks.in",
  userPhone: "9876543210",
  companyName: "ABC Precision Components",
  companyAddress: "124 Industrial Estate, Peelamedu, Coimbatore",
  country: "India",
  state: "Tamil Nadu",
  city: "Coimbatore",
  region: "South Industrial Zone",
  factoryAddress: "124 Industrial Estate, Peelamedu, Coimbatore",
  reportingPeriod: "August 2026",
  workingDays: 26,
  workingHoursPerDay: 16,
  numShifts: 2,
  shiftTimings: [
    { name: "Shift 1", start: "08:00 AM", end: "04:00 PM" },
    { name: "Shift 2", start: "04:00 PM", end: "12:00 AM" },
  ],
  numCncMachines: 3,
  machines: [
    {
      id: "CNC-01",
      name: "CNC-01",
      type: "CNC Turning",
      manufacturer: "XYZ",
      model: "ABC-200",
      ratedPower: 15,
      operatingHours: 6,
      idleHours: 2,
      setupHours: 1,
      productionHours: 5,
    },
    {
      id: "CNC-02",
      name: "CNC-02",
      type: "CNC Milling",
      manufacturer: "BFW",
      model: "Chakra VMC",
      ratedPower: 20,
      operatingHours: 7,
      idleHours: 1.5,
      setupHours: 1,
      productionHours: 6,
    },
    {
      id: "CNC-03",
      name: "CNC-03",
      type: "CNC Machining Center",
      manufacturer: "Micromatic",
      model: "GCU 260",
      ratedPower: 25,
      operatingHours: 5,
      idleHours: 2,
      setupHours: 1,
      productionHours: 4,
    },
  ],
  hasAuxiliary: true,
  auxiliaryItems: [
    {
      id: "aux_1",
      type: "Air compressor",
      name: "Air Compressor 01",
      ratedPower: 7.5,
      units: 1,
      operatingHours: 10,
      purpose: "Compressed air for CNC machines",
    },
  ],
  coolantSystems: [
    {
      id: "cool_1",
      name: "Central Coolant Pump Array",
      pumpPower: 0.75,
      avgOperatingHours: 10,
      numPumps: 12,
      shared: true,
      connectedMachines: ["CNC-01", "CNC-02", "CNC-03"],
    },
  ],
  hasFuel: true,
  fuelRecords: [
    {
      id: "fuel_1",
      type: "Diesel",
      quantity: 450,
      unit: "Litres",
      period: "September 2026",
      purpose: "Generator",
      sourceDocument: "Diesel invoice",
    },
  ],
  setupCompleted: true,
  lastUpdated: new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }),
};

export function getFactoryProfile(): FactoryProfileData {
  if (typeof window === "undefined") return defaultFactoryProfile;
  try {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return defaultFactoryProfile;
    return JSON.parse(raw) as FactoryProfileData;
  } catch {
    return defaultFactoryProfile;
  }
}

export function saveFactoryProfile(profile: FactoryProfileData): FactoryProfileData {
  const updated = {
    ...profile,
    setupCompleted: true,
    lastUpdated: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("remargin-factory-profile-updated"));
  }
  return updated;
}

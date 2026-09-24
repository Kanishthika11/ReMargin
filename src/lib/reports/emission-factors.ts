export interface EmissionFactor {
  category: string;
  name: string;
  factor: number;
  unit: string;
  source: string;
  version: string;
  year: number;
}

export const EMISSION_FACTORS: Record<string, EmissionFactor> = {
  electricity_grid_in: {
    category: "Scope 2 Electricity",
    name: "Indian National Grid Baseline Emission Factor",
    factor: 0.716, // kgCO2e / kWh
    unit: "kgCO2e/kWh",
    source: "Central Electricity Authority (CEA) CO2 Baseline Database",
    version: "v19.0",
    year: 2024,
  },
  diesel: {
    category: "Scope 1 Fuel",
    name: "Diesel / High Speed Diesel (HSD)",
    factor: 2.68, // kgCO2e / Litre
    unit: "kgCO2e/Litre",
    source: "IPCC Guidelines for National Greenhouse Gas Inventories",
    version: "2006 Refined 2024",
    year: 2024,
  },
  lpg: {
    category: "Scope 1 Fuel",
    name: "Liquefied Petroleum Gas (LPG)",
    factor: 2.98, // kgCO2e / kg
    unit: "kgCO2e/kg",
    source: "IPCC Guidelines & India GHG Platform",
    version: "v2024.1",
    year: 2024,
  },
  natural_gas: {
    category: "Scope 1 Fuel",
    name: "Natural Gas (Piped)",
    factor: 2.02, // kgCO2e / m³
    unit: "kgCO2e/m³",
    source: "DEFRA / IPCC Conversion Factors",
    version: "2024.2",
    year: 2024,
  },
};

export function getFuelEmissionFactor(fuelType: string): EmissionFactor {
  const normalized = fuelType.toLowerCase();
  if (normalized.includes("diesel")) return EMISSION_FACTORS.diesel;
  if (normalized.includes("lpg")) return EMISSION_FACTORS.lpg;
  if (normalized.includes("gas")) return EMISSION_FACTORS.natural_gas;
  return {
    category: "Scope 1 Fuel",
    name: `${fuelType} Emission Factor`,
    factor: 2.5,
    unit: "kgCO2e/unit",
    source: "IPCC Standard Factors",
    version: "2024",
    year: 2024,
  };
}

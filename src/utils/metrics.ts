/**
 * Calculate CO2 savings based on energy consumed.
 * @param energyKWh Energy in kilowatt-hours
 * @param cleanEnergyPercentage Percentage of clean energy (0-100)
 * @returns CO2 saved in kg
 */
export const calculateCO2Saved = (energyKWh: number, cleanEnergyPercentage: number): number => {
  // Average grid emission factor: 0.45 kg CO2 per kWh
  // Clean energy saving: 100% clean energy saves 0.45 kg per kWh
  const baseFactor = 0.45;
  const savingFactor = (cleanEnergyPercentage / 100) * baseFactor;
  return energyKWh * savingFactor;
};

/**
 * Convert CO2 saved to equivalent trees planted.
 * @param co2SavedKg CO2 saved in kilograms
 * @returns Number of trees (approx)
 */
export const co2ToTrees = (co2SavedKg: number): number => {
  // One mature tree absorbs ~20kg of CO2 per year
  return Math.round(co2SavedKg / 20);
};

/**
 * Format currency value.
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

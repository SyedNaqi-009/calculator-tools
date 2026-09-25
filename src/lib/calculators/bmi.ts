export type BMICategory = "Underweight" | "Normal" | "Overweight" | "Obese";

export interface BMIResult {
  bmi: number;
  category: BMICategory;
  color: string;
  badgeClass: string;
  healthyWeightMinKg: number;
  healthyWeightMaxKg: number;
  healthyWeightMinLbs: number;
  healthyWeightMaxLbs: number;
  healthyWeightRange: {
    min: number;
    max: number;
  };
}

export function lbsToKg(lbs: number): number {
  return lbs * 0.45359237;
}

export function kgToLbs(kg: number): number {
  return kg / 0.45359237;
}

export function ftInToCm(feet: number, inches: number): number {
  return (feet * 12 + inches) * 2.54;
}

export function cmToFtIn(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}

export function calculateBMI(weightKg: number, heightCm: number): BMIResult {
  const safeWeight = Math.max(1, isNaN(weightKg) ? 0 : weightKg);
  const safeHeightCm = Math.max(30, isNaN(heightCm) ? 0 : heightCm);
  const heightM = safeHeightCm / 100;

  const bmi = safeWeight / (heightM * heightM);

  let category: BMICategory = "Normal";
  let color = "#10B981";
  let badgeClass = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";

  if (bmi < 18.5) {
    category = "Underweight";
    color = "#3B82F6";
    badgeClass = "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
  } else if (bmi < 25) {
    category = "Normal";
    color = "#10B981";
    badgeClass = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  } else if (bmi < 30) {
    category = "Overweight";
    color = "#F59E0B";
    badgeClass = "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
  } else {
    category = "Obese";
    color = "#EF4444";
    badgeClass = "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
  }

  const healthyWeightMinKg = 18.5 * (heightM * heightM);
  const healthyWeightMaxKg = 24.9 * (heightM * heightM);

  return {
    bmi: Number(bmi.toFixed(1)),
    category,
    color,
    badgeClass,
    healthyWeightMinKg: Number(healthyWeightMinKg.toFixed(1)),
    healthyWeightMaxKg: Number(healthyWeightMaxKg.toFixed(1)),
    healthyWeightMinLbs: Number(kgToLbs(healthyWeightMinKg).toFixed(1)),
    healthyWeightMaxLbs: Number(kgToLbs(healthyWeightMaxKg).toFixed(1)),
    healthyWeightRange: {
      min: Number(healthyWeightMinKg.toFixed(1)),
      max: Number(healthyWeightMaxKg.toFixed(1)),
    },
  };
}

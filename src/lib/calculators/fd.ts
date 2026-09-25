export type FDCompoundingFrequency = "monthly" | "quarterly" | "half-yearly" | "yearly";

export interface FDFrequencyComparison {
  frequency: FDCompoundingFrequency;
  label: string;
  maturityAmount: number;
  totalInterest: number;
}

export interface FDGrowthPoint {
  year: number;
  balance: number;
}

export interface FDResult {
  principal: number;
  maturityAmount: number;
  totalInterest: number;
  effectiveRate: number;
  comparisons: FDFrequencyComparison[];
  growthData: FDGrowthPoint[];
}

const FREQUENCY_MAP: Record<FDCompoundingFrequency, { n: number; label: string }> = {
  monthly: { n: 12, label: "Monthly Compounding" },
  quarterly: { n: 4, label: "Quarterly Compounding" },
  "half-yearly": { n: 2, label: "Half-Yearly Compounding" },
  yearly: { n: 1, label: "Yearly Compounding" },
};

export function calculateFD(
  principal: number,
  annualRate: number,
  years: number,
  months = 0,
  frequency: FDCompoundingFrequency = "quarterly"
): FDResult {
  const safeP = Math.max(0, isNaN(principal) ? 0 : principal);
  const safeRate = Math.max(0, isNaN(annualRate) ? 0 : annualRate);
  const safeYears = Math.max(0, isNaN(years) ? 0 : years);
  const safeMonths = Math.max(0, isNaN(months) ? 0 : months);
  const totalTenureYears = Math.max(0.0833, safeYears + safeMonths / 12);

  const r = safeRate / 100;
  const n = FREQUENCY_MAP[frequency]?.n || 4;

  const maturityAmount = safeP * Math.pow(1 + r / n, n * totalTenureYears);
  const totalInterest = Math.max(0, maturityAmount - safeP);

  // Comparisons for all 4 compounding frequencies
  const allFreqs: FDCompoundingFrequency[] = ["monthly", "quarterly", "half-yearly", "yearly"];
  const comparisons: FDFrequencyComparison[] = allFreqs.map((freq) => {
    const fN = FREQUENCY_MAP[freq].n;
    const mat = safeP * Math.pow(1 + r / fN, fN * totalTenureYears);
    return {
      frequency: freq,
      label: FREQUENCY_MAP[freq].label,
      maturityAmount: Math.round(mat),
      totalInterest: Math.round(Math.max(0, mat - safeP)),
    };
  });

  // Growth curve
  const growthData: FDGrowthPoint[] = [];
  const maxYear = Math.ceil(totalTenureYears);
  for (let yr = 0; yr <= maxYear; yr++) {
    const currentTenure = Math.min(yr, totalTenureYears);
    const bal = safeP * Math.pow(1 + r / n, n * currentTenure);
    growthData.push({
      year: yr,
      balance: Math.round(bal),
    });
  }

  const effectiveRate = totalTenureYears > 0 ? (Math.pow(1 + r / n, n) - 1) * 100 : safeRate;

  return {
    principal: safeP,
    maturityAmount: Math.round(maturityAmount),
    totalInterest: Math.round(totalInterest),
    effectiveRate: Number(effectiveRate.toFixed(2)),
    comparisons,
    growthData,
  };
}

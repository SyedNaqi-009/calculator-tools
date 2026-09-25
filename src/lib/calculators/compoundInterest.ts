export type CompoundFrequency = "daily" | "monthly" | "quarterly" | "semi-annually" | "annually";

export interface CompoundGrowthPoint {
  year: number;
  withoutContributions: number;
  withContributions: number;
  totalDeposited: number;
}

export interface CompoundInterestResult {
  finalAmount: number;
  totalInterest: number;
  totalDeposits: number;
  effectiveAnnualRate: number;
  growthData: CompoundGrowthPoint[];
}

const FREQ_N: Record<CompoundFrequency, number> = {
  daily: 365,
  monthly: 12,
  quarterly: 4,
  "semi-annually": 2,
  annually: 1,
};

export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  frequency: CompoundFrequency = "annually",
  monthlyContribution = 0
): CompoundInterestResult {
  const safeP = Math.max(0, isNaN(principal) ? 0 : principal);
  const safeRate = Math.max(0, isNaN(annualRate) ? 0 : annualRate);
  const safeYears = Math.max(1, isNaN(years) ? 1 : Math.round(years));
  const safePMT = Math.max(0, isNaN(monthlyContribution) ? 0 : monthlyContribution);

  const r = safeRate / 100;
  const n = FREQ_N[frequency] || 1;

  const growthData: CompoundGrowthPoint[] = [];

  // Month-by-month simulation for exact contribution & compounding dynamics
  let balWithPmt = safeP;
  let balWithoutPmt = safeP;
  let totalDeposited = safeP;

  growthData.push({
    year: 0,
    withoutContributions: Math.round(balWithoutPmt),
    withContributions: Math.round(balWithPmt),
    totalDeposited: Math.round(totalDeposited),
  });

  const totalMonths = safeYears * 12;
  const effectiveMonthlyRate = Math.pow(1 + r / n, n / 12) - 1;

  for (let m = 1; m <= totalMonths; m++) {
    balWithoutPmt *= 1 + effectiveMonthlyRate;
    balWithPmt = (balWithPmt + safePMT) * (1 + effectiveMonthlyRate);
    totalDeposited += safePMT;

    if (m % 12 === 0) {
      const yr = m / 12;
      growthData.push({
        year: yr,
        withoutContributions: Math.round(balWithoutPmt),
        withContributions: Math.round(balWithPmt),
        totalDeposited: Math.round(totalDeposited),
      });
    }
  }

  const finalAmount = safePMT > 0 ? balWithPmt : balWithoutPmt;
  const totalInterest = Math.max(0, finalAmount - totalDeposited);
  const effectiveAnnualRate = (Math.pow(1 + r / n, n) - 1) * 100;

  return {
    finalAmount: Math.round(finalAmount),
    totalInterest: Math.round(totalInterest),
    totalDeposits: Math.round(totalDeposited),
    effectiveAnnualRate: Number(effectiveAnnualRate.toFixed(2)),
    growthData,
  };
}

import { AmortizationRow } from "@/types/calculator";

export interface EMIResult {
  monthlyEMI: number;
  emi: number;
  totalInterest: number;
  totalPayment: number;
  principal: number;
  tenureMonths: number;
  annualRate: number;
  schedule: AmortizationRow[];
}

export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): EMIResult {
  const safeP = Math.max(0, isNaN(principal) ? 0 : principal);
  const safeRate = Math.max(0, isNaN(annualRate) ? 0 : annualRate);
  const safeN = Math.max(1, isNaN(tenureMonths) ? 1 : Math.round(tenureMonths));

  if (safeP === 0) {
    return {
      monthlyEMI: 0,
      emi: 0,
      totalInterest: 0,
      totalPayment: 0,
      principal: 0,
      tenureMonths: safeN,
      annualRate: safeRate,
      schedule: [],
    };
  }

  const monthlyRate = safeRate / (12 * 100);
  let emi = 0;

  if (monthlyRate === 0) {
    emi = safeP / safeN;
  } else {
    const factor = Math.pow(1 + monthlyRate, safeN);
    emi = (safeP * monthlyRate * factor) / (factor - 1);
  }

  const totalPayment = emi * safeN;
  const totalInterest = Math.max(0, totalPayment - safeP);

  // Amortization schedule
  const schedule: AmortizationRow[] = [];
  let currentBalance = safeP;

  for (let m = 1; m <= safeN; m++) {
    const interestPart = currentBalance * monthlyRate;
    let principalPart = emi - interestPart;

    if (m === safeN || principalPart > currentBalance) {
      principalPart = currentBalance;
      currentBalance = 0;
    } else {
      currentBalance -= principalPart;
    }

    schedule.push({
      month: m,
      year: Math.ceil(m / 12),
      emi,
      principal: principalPart,
      interest: interestPart,
      balance: Math.max(0, currentBalance),
    });
  }

  return {
    monthlyEMI: emi,
    emi,
    totalInterest,
    totalPayment,
    principal: safeP,
    tenureMonths: safeN,
    annualRate: safeRate,
    schedule,
  };
}

export interface SIPYearlyBreakdown {
  year: number;
  invested: number;
  returns: number;
  totalValue: number;
}

export interface SIPResult {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
  yearlyData: SIPYearlyBreakdown[];
}

export function calculateSIP(
  monthlyInvestment: number,
  annualReturnRate: number,
  tenureYears: number
): SIPResult {
  const safeM = Math.max(0, isNaN(monthlyInvestment) ? 0 : monthlyInvestment);
  const safeRate = Math.max(0, isNaN(annualReturnRate) ? 0 : annualReturnRate);
  const safeYears = Math.max(1, isNaN(tenureYears) ? 1 : Math.round(tenureYears));

  const monthlyRate = safeRate / (12 * 100);
  const totalMonths = safeYears * 12;

  let totalValue = 0;
  if (monthlyRate === 0) {
    totalValue = safeM * totalMonths;
  } else {
    totalValue =
      safeM * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
  }

  const investedAmount = safeM * totalMonths;
  const estimatedReturns = Math.max(0, totalValue - investedAmount);

  const yearlyData: SIPYearlyBreakdown[] = [];
  for (let yr = 1; yr <= safeYears; yr++) {
    const months = yr * 12;
    const invested = safeM * months;
    let value = 0;
    if (monthlyRate === 0) {
      value = invested;
    } else {
      value =
        safeM * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    }
    const returns = Math.max(0, value - invested);
    yearlyData.push({
      year: yr,
      invested: Math.round(invested),
      returns: Math.round(returns),
      totalValue: Math.round(value),
    });
  }

  return {
    investedAmount: Math.round(investedAmount),
    estimatedReturns: Math.round(estimatedReturns),
    totalValue: Math.round(totalValue),
    yearlyData,
  };
}

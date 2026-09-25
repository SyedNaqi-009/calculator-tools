export interface SimpleInterestResult {
  principal: number;
  interest: number;
  totalAmount: number;
  rate: number;
  years: number;
}

export function calculateSimpleInterest(
  principal: number,
  annualRate: number,
  years: number
): SimpleInterestResult {
  const safeP = Math.max(0, isNaN(principal) ? 0 : principal);
  const safeRate = Math.max(0, isNaN(annualRate) ? 0 : annualRate);
  const safeYears = Math.max(0, isNaN(years) ? 0 : years);

  const interest = (safeP * safeRate * safeYears) / 100;
  const totalAmount = safeP + interest;

  return {
    principal: safeP,
    interest: Number(interest.toFixed(2)),
    totalAmount: Number(totalAmount.toFixed(2)),
    rate: safeRate,
    years: safeYears,
  };
}

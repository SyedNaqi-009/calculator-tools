export interface PercentageChangeResult {
  difference: number;
  percentageChange: number;
  type: "increase" | "decrease" | "no-change";
}

export function calculatePercentageOf(percentage: number, total: number): number {
  if (isNaN(percentage) || isNaN(total)) return 0;
  return (percentage / 100) * total;
}

export function calculateWhatPercentage(part: number, whole: number): number {
  if (isNaN(part) || isNaN(whole) || whole === 0) return 0;
  return (part / whole) * 100;
}

export function calculatePercentageChange(oldValue: number, newValue: number): PercentageChangeResult {
  if (isNaN(oldValue) || isNaN(newValue) || oldValue === 0) {
    return { difference: 0, percentageChange: 0, type: "no-change" };
  }

  const difference = newValue - oldValue;
  const percentageChange = (difference / Math.abs(oldValue)) * 100;
  let type: "increase" | "decrease" | "no-change" = "no-change";

  if (percentageChange > 0) type = "increase";
  else if (percentageChange < 0) type = "decrease";

  return {
    difference,
    percentageChange: Math.abs(percentageChange),
    type,
  };
}

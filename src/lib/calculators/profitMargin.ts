export interface ProfitMarginResult {
  cost: number;
  revenue: number;
  profit: number;
  marginPercent: number;
  markupPercent: number;
}

export function calculateFromCostAndRevenue(cost: number, revenue: number): ProfitMarginResult {
  const safeCost = Math.max(0, isNaN(cost) ? 0 : cost);
  const safeRevenue = Math.max(0, isNaN(revenue) ? 0 : revenue);

  const profit = safeRevenue - safeCost;
  const marginPercent = safeRevenue > 0 ? (profit / safeRevenue) * 100 : 0;
  const markupPercent = safeCost > 0 ? (profit / safeCost) * 100 : 0;

  return {
    cost: safeCost,
    revenue: safeRevenue,
    profit: Number(profit.toFixed(2)),
    marginPercent: Number(marginPercent.toFixed(2)),
    markupPercent: Number(markupPercent.toFixed(2)),
  };
}

export function calculateFromCostAndMarkup(cost: number, markupPercent: number): ProfitMarginResult {
  const safeCost = Math.max(0, isNaN(cost) ? 0 : cost);
  const safeMarkup = Math.max(0, isNaN(markupPercent) ? 0 : markupPercent);

  const profit = safeCost * (safeMarkup / 100);
  const revenue = safeCost + profit;
  const marginPercent = revenue > 0 ? (profit / revenue) * 100 : 0;

  return {
    cost: safeCost,
    revenue: Number(revenue.toFixed(2)),
    profit: Number(profit.toFixed(2)),
    marginPercent: Number(marginPercent.toFixed(2)),
    markupPercent: safeMarkup,
  };
}

export function calculateGrossMargin(revenue: number, cogs: number): ProfitMarginResult {
  return calculateFromCostAndRevenue(cogs, revenue);
}

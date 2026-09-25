export interface DiscountResult {
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  totalSavings: number;
  effectiveDiscountPercent: number;
  hasStackedDiscount: boolean;
}

export function calculateDiscount(
  originalPrice: number,
  discountValue: number,
  discountType: "percentage" | "amount" = "percentage",
  additionalDiscountPercent = 0
): DiscountResult {
  const safePrice = Math.max(0, isNaN(originalPrice) ? 0 : originalPrice);
  const safeDiscount = Math.max(0, isNaN(discountValue) ? 0 : discountValue);
  const safeAdditional = Math.max(0, isNaN(additionalDiscountPercent) ? 0 : additionalDiscountPercent);

  let firstDiscountAmount = 0;
  if (discountType === "percentage") {
    firstDiscountAmount = (safePrice * Math.min(100, safeDiscount)) / 100;
  } else {
    firstDiscountAmount = Math.min(safePrice, safeDiscount);
  }

  const priceAfterFirst = safePrice - firstDiscountAmount;
  let secondDiscountAmount = 0;

  if (safeAdditional > 0 && priceAfterFirst > 0) {
    secondDiscountAmount = (priceAfterFirst * Math.min(100, safeAdditional)) / 100;
  }

  const finalPrice = Math.max(0, priceAfterFirst - secondDiscountAmount);
  const totalSavings = safePrice - finalPrice;
  const effectiveDiscountPercent = safePrice > 0 ? (totalSavings / safePrice) * 100 : 0;

  return {
    originalPrice: safePrice,
    discountAmount: Number(firstDiscountAmount.toFixed(2)),
    finalPrice: Number(finalPrice.toFixed(2)),
    totalSavings: Number(totalSavings.toFixed(2)),
    effectiveDiscountPercent: Number(effectiveDiscountPercent.toFixed(2)),
    hasStackedDiscount: safeAdditional > 0,
  };
}

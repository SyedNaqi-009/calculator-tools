export interface GSTResult {
  originalAmount: number;
  gstRate: number;
  totalGst: number;
  cgst: number;
  sgst: number;
  igst: number;
  finalAmount: number;
  mode: "exclusive" | "inclusive";
}

export function calculateGST(
  amount: number,
  gstRate: number,
  mode: "exclusive" | "inclusive" = "exclusive"
): GSTResult {
  const safeAmount = Math.max(0, isNaN(amount) ? 0 : amount);
  const safeRate = Math.max(0, isNaN(gstRate) ? 0 : gstRate);

  if (mode === "exclusive") {
    const totalGst = (safeAmount * safeRate) / 100;
    const finalAmount = safeAmount + totalGst;
    return {
      originalAmount: safeAmount,
      gstRate: safeRate,
      totalGst,
      cgst: totalGst / 2,
      sgst: totalGst / 2,
      igst: totalGst,
      finalAmount,
      mode,
    };
  } else {
    const originalAmount = safeAmount / (1 + safeRate / 100);
    const totalGst = safeAmount - originalAmount;
    return {
      originalAmount,
      gstRate: safeRate,
      totalGst,
      cgst: totalGst / 2,
      sgst: totalGst / 2,
      igst: totalGst,
      finalAmount: safeAmount,
      mode,
    };
  }
}

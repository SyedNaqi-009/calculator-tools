import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number, maximumFractionDigits = 2): string {
  if (isNaN(value) || !isFinite(value)) return "0";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(value);
}

import { detectUserCurrency } from "./currency";

export function formatCurrency(value: number, currency?: string): string {
  if (isNaN(value) || !isFinite(value)) return "0";
  const targetCurrency = (!currency || currency === "AUTO" || currency === "USER")
    ? (typeof window !== "undefined" ? detectUserCurrency() : "USD")
    : currency;

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: targetCurrency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${targetCurrency} ${formatNumber(value)}`;
  }
}

export function formatPercent(value: number, maximumFractionDigits = 2): string {
  if (isNaN(value) || !isFinite(value)) return "0%";
  return `${formatNumber(value, maximumFractionDigits)}%`;
}

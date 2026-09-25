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

export function formatCurrency(value: number, currency = "USD"): string {
  if (isNaN(value) || !isFinite(value)) return "$0";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `$${formatNumber(value)}`;
  }
}

export function formatPercent(value: number, maximumFractionDigits = 2): string {
  if (isNaN(value) || !isFinite(value)) return "0%";
  return `${formatNumber(value, maximumFractionDigits)}%`;
}

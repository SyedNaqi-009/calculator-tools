"use client";

import { useState, useEffect } from "react";

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  flag: string;
}

export const POPULAR_CURRENCIES: CurrencyInfo[] = [
  { code: "PKR", symbol: "₨", name: "Pakistani Rupee", flag: "🇵🇰" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧" },
  { code: "AED", symbol: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "SAR", symbol: "SAR", name: "Saudi Riyal", flag: "🇸🇦" },
  { code: "CAD", symbol: "CA$", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka", flag: "🇧🇩" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", flag: "🇸🇬" },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit", flag: "🇲🇾" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "QAR", symbol: "QAR", name: "Qatari Riyal", flag: "🇶🇦" },
  { code: "KWD", symbol: "KWD", name: "Kuwaiti Dinar", flag: "🇰🇼" },
  { code: "BHD", symbol: "BHD", name: "Bahraini Dinar", flag: "🇧🇭" },
  { code: "OMR", symbol: "OMR", name: "Omani Rial", flag: "🇴🇲" },
  { code: "TRY", symbol: "₺", name: "Turkish Lira", flag: "🇹🇷" },
  { code: "ZAR", symbol: "R", name: "South African Rand", flag: "🇿🇦" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", flag: "🇧🇷" },
];

const TIMEZONE_TO_CURRENCY: Record<string, string> = {
  // Pakistan
  "Asia/Karachi": "PKR",
  // India
  "Asia/Kolkata": "INR",
  "Asia/Calcutta": "INR",
  // USA & Americas
  "America/New_York": "USD",
  "America/Chicago": "USD",
  "America/Los_Angeles": "USD",
  "America/Denver": "USD",
  "America/Phoenix": "USD",
  "America/Anchorage": "USD",
  "America/Honolulu": "USD",
  "America/Detroit": "USD",
  "America/Indianapolis": "USD",
  // UK
  "Europe/London": "GBP",
  "Europe/Belfast": "GBP",
  // Europe (Eurozone)
  "Europe/Berlin": "EUR",
  "Europe/Paris": "EUR",
  "Europe/Rome": "EUR",
  "Europe/Madrid": "EUR",
  "Europe/Amsterdam": "EUR",
  "Europe/Brussels": "EUR",
  "Europe/Vienna": "EUR",
  "Europe/Dublin": "EUR",
  "Europe/Helsinki": "EUR",
  "Europe/Lisbon": "EUR",
  "Europe/Athens": "EUR",
  // Middle East
  "Asia/Dubai": "AED",
  "Asia/Riyadh": "SAR",
  "Asia/Qatar": "QAR",
  "Asia/Kuwait": "KWD",
  "Asia/Bahrain": "BHD",
  "Asia/Muscat": "OMR",
  // Canada
  "America/Toronto": "CAD",
  "America/Vancouver": "CAD",
  "America/Montreal": "CAD",
  "America/Edmonton": "CAD",
  "America/Winnipeg": "CAD",
  // Australia & Oceania
  "Australia/Sydney": "AUD",
  "Australia/Melbourne": "AUD",
  "Australia/Brisbane": "AUD",
  "Australia/Perth": "AUD",
  "Australia/Adelaide": "AUD",
  // South Asia
  "Asia/Dhaka": "BDT",
  "Asia/Kathmandu": "NPR",
  "Asia/Colombo": "LKR",
  // Southeast & East Asia
  "Asia/Singapore": "SGD",
  "Asia/Kuala_Lumpur": "MYR",
  "Asia/Tokyo": "JPY",
  "Asia/Seoul": "KRW",
  "Asia/Jakarta": "IDR",
  "Asia/Bangkok": "THB",
  "Asia/Manila": "PHP",
  "Asia/Hong_Kong": "HKD",
  // Africa
  "Africa/Lagos": "NGN",
  "Africa/Johannesburg": "ZAR",
  "Africa/Cairo": "EGP",
  // Other
  "America/Sao_Paulo": "BRL",
  "America/Mexico_City": "MXN",
  "Europe/Istanbul": "TRY",
  "Europe/Zurich": "CHF",
};

const LOCALE_TO_CURRENCY: Record<string, string> = {
  pk: "PKR",
  in: "INR",
  us: "USD",
  gb: "GBP",
  uk: "GBP",
  ae: "AED",
  sa: "SAR",
  ca: "CAD",
  au: "AUD",
  bd: "BDT",
  sg: "SGD",
  my: "MYR",
  jp: "JPY",
  de: "EUR",
  fr: "EUR",
  it: "EUR",
  es: "EUR",
  nl: "EUR",
  za: "ZAR",
  br: "BRL",
};

/**
 * Detects the visitor's local currency based on stored preference,
 * system timezone, or browser locale.
 */
export function detectUserCurrency(): string {
  if (typeof window === "undefined") return "USD";

  try {
    // 1. Check if user already picked a preferred currency
    const stored = localStorage.getItem("calchub_currency");
    if (stored && stored.length === 3) {
      return stored.toUpperCase();
    }

    // 2. Check user's timezone (highly accurate without needing IP calls)
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone && TIMEZONE_TO_CURRENCY[timeZone]) {
      const detected = TIMEZONE_TO_CURRENCY[timeZone];
      localStorage.setItem("calchub_currency", detected);
      return detected;
    }

    // 3. Check browser locale (e.g. "en-PK", "ur-PK", "en-IN")
    const languages = navigator.languages || [navigator.language];
    for (const lang of languages) {
      if (!lang) continue;
      const parts = lang.toLowerCase().split("-");
      const countryCode = parts.length > 1 ? parts[1] : parts[0];
      if (LOCALE_TO_CURRENCY[countryCode]) {
        const detected = LOCALE_TO_CURRENCY[countryCode];
        localStorage.setItem("calchub_currency", detected);
        return detected;
      }
    }
  } catch (e) {
    // Fallback safely
  }

  return "USD";
}

/**
 * Get symbol for currency code
 */
export function getCurrencySymbol(code: string): string {
  const found = POPULAR_CURRENCIES.find((c) => c.code.toUpperCase() === code.toUpperCase());
  if (found) return found.symbol;

  try {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
    }).formatToParts(0);
    const symbolPart = formatted.find((p) => p.type === "currency");
    return symbolPart?.value || code;
  } catch {
    return code;
  }
}

/**
 * React hook to read & change the user's currency globally.
 */
export function useUserCurrency() {
  const [currency, setCurrencyState] = useState<string>("USD");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const detected = detectUserCurrency();
    setCurrencyState(detected);
    setIsLoaded(true);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "calchub_currency" && e.newValue) {
        setCurrencyState(e.newValue);
      }
    };

    const handleCustomEvent = (e: CustomEvent<string>) => {
      if (e.detail) {
        setCurrencyState(e.detail);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("calchub_currency_change" as any, handleCustomEvent as any);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("calchub_currency_change" as any, handleCustomEvent as any);
    };
  }, []);

  const setCurrency = (newCurrency: string) => {
    const clean = newCurrency.toUpperCase();
    setCurrencyState(clean);
    if (typeof window !== "undefined") {
      localStorage.setItem("calchub_currency", clean);
      window.dispatchEvent(new CustomEvent("calchub_currency_change", { detail: clean }));
    }
  };

  const symbol = getCurrencySymbol(currency);
  const info = POPULAR_CURRENCIES.find((c) => c.code === currency);

  return {
    currency,
    setCurrency,
    symbol,
    currencyName: info?.name || currency,
    flag: info?.flag || "🌐",
    isLoaded,
  };
}

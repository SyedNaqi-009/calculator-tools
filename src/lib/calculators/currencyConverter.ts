export interface CurrencyInfo {
  code: string;
  name: string;
  flag: string;
  symbol: string;
}

export const SUPPORTED_CURRENCIES: CurrencyInfo[] = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸", symbol: "$" },
  { code: "EUR", name: "Euro", flag: "🇪🇺", symbol: "€" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", symbol: "£" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳", symbol: "₹" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳", symbol: "¥" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰", symbol: "HK$" },
  { code: "NZD", name: "New Zealand Dollar", flag: "🇳🇿", symbol: "NZ$" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦", symbol: "R" },
  { code: "BRL", name: "Brazilian Real", flag: "🇧🇷", symbol: "R$" },
  { code: "MXN", name: "Mexican Peso", flag: "🇲🇽", symbol: "Mex$" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪", symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦", symbol: "﷼" },
  { code: "KRW", name: "South Korean Won", flag: "🇰🇷", symbol: "₩" },
  { code: "THB", name: "Thai Baht", flag: "🇹🇭", symbol: "฿" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "🇲🇾", symbol: "RM" },
  { code: "PHP", name: "Philippine Peso", flag: "🇵🇭", symbol: "₱" },
  { code: "IDR", name: "Indonesian Rupiah", flag: "🇮🇩", symbol: "Rp" },
  { code: "TWD", name: "New Taiwan Dollar", flag: "🇹🇼", symbol: "NT$" },
  { code: "SEK", name: "Swedish Krona", flag: "🇸🇪", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", flag: "🇳🇴", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", flag: "🇩🇰", symbol: "kr" },
  { code: "PLN", name: "Polish Zloty", flag: "🇵🇱", symbol: "zł" },
  { code: "TRY", name: "Turkish Lira", flag: "🇹🇷", symbol: "₺" },
  { code: "RUB", name: "Russian Ruble", flag: "🇷🇺", symbol: "₽" },
  { code: "EGP", name: "Egyptian Pound", flag: "🇪🇬", symbol: "E£" },
];

export const FALLBACK_USD_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  INR: 83.5,
  JPY: 154.2,
  AUD: 1.52,
  CAD: 1.36,
  CHF: 0.91,
  CNY: 7.24,
  SGD: 1.35,
  HKD: 7.81,
  NZD: 1.65,
  ZAR: 18.25,
  BRL: 5.15,
  MXN: 16.9,
  AED: 3.67,
  SAR: 3.75,
  KRW: 1375.0,
  THB: 36.8,
  MYR: 4.72,
  PHP: 57.6,
  IDR: 16100.0,
  TWD: 32.4,
  SEK: 10.75,
  NOK: 10.95,
  DKK: 6.87,
  PLN: 3.96,
  TRY: 32.2,
  RUB: 91.5,
  EGP: 47.8,
};

export interface CurrencyConversionResult {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  inverseRate: number;
  convertedAmount: number;
}

export function convertCurrency(
  amount: number,
  from: string,
  to: string,
  rates: Record<string, number> = FALLBACK_USD_RATES
): CurrencyConversionResult {
  const safeAmount = Math.max(0, isNaN(amount) ? 0 : amount);
  const fromRateToUSD = rates[from] || 1;
  const toRateToUSD = rates[to] || 1;

  // Rate of 1 from in to
  const rate = toRateToUSD / fromRateToUSD;
  const inverseRate = rate !== 0 ? 1 / rate : 0;
  const convertedAmount = safeAmount * rate;

  return {
    amount: safeAmount,
    fromCurrency: from,
    toCurrency: to,
    rate: Number(rate.toFixed(4)),
    inverseRate: Number(inverseRate.toFixed(4)),
    convertedAmount: Number(convertedAmount.toFixed(2)),
  };
}

"use client";

import React from "react";
import { useUserCurrency, POPULAR_CURRENCIES } from "@/lib/currency";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CurrencySelectorProps {
  className?: string;
  compact?: boolean;
}

export function CurrencySelector({ className = "", compact = false }: CurrencySelectorProps) {
  const { currency, setCurrency, isLoaded } = useUserCurrency();

  if (!isLoaded) {
    return <div className="h-8 w-16 bg-muted rounded animate-pulse" />;
  }

  return (
    <Select value={currency} onValueChange={(val) => setCurrency(val)}>
      <SelectTrigger className={`h-8 text-xs font-medium border-border/80 bg-background/80 ${className}`}>
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent align="end" className="max-h-[300px]">
        {POPULAR_CURRENCIES.map((curr) => (
          <SelectItem key={curr.code} value={curr.code} className="text-xs">
            <span className="mr-2">{curr.flag}</span>
            <span className="font-semibold">{curr.code}</span>
            {!compact && <span className="ml-1 text-muted-foreground">({curr.symbol})</span>}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CurrencySelector;

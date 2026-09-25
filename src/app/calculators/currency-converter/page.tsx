"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { convertCurrency, SUPPORTED_CURRENCIES, FALLBACK_USD_RATES } from "@/lib/calculators/currencyConverter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AdBanner, AdSidebar, AdInArticle } from "@/components/ads";
import { NewsletterSignup } from "@/components/shared";
import { PageSEO } from "@/components/seo";
import { ArrowRightLeft, RefreshCw } from "lucide-react";
import { formatNumber, formatCurrency } from "@/lib/utils";

const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";
const CACHE_KEY = "calchub_currency_rates";
const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour

import { detectUserCurrency } from "@/lib/currency";

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_USD_RATES);
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          setRates(data);
          setLastUpdated(timestamp);
          setLoading(false);
          return;
        }
      }
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data && data.rates) {
        setRates(data.rates);
        setLastUpdated(Date.now());
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: data.rates }));
      }
    } catch (error) {
      console.error("Failed to fetch rates, using fallback.", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRates();
    const userCurr = detectUserCurrency();
    if (userCurr) {
      if (userCurr === "USD") {
        setToCurrency("EUR");
      } else {
        setToCurrency(userCurr);
      }
    }
  }, []);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const result = convertCurrency(Number(amount) || 0, fromCurrency, toCurrency, rates);

  const faqs = [
    { question: "How often are the exchange rates updated?", answer: "Our rates are cached and updated every hour from a reliable exchange rate API." },
    { question: "Are these rates the exact ones I will get at a bank?", answer: "No, these are mid-market indicator rates. Banks and exchanges usually apply a margin or fee." },
    { question: "Which currencies are supported?", answer: "We support major global currencies including USD, EUR, GBP, JPY, INR, CAD, AUD, and many more." },
    { question: "What happens if the API fails?", answer: "We fall back to a recently saved set of rates so you can still perform estimations, though they may not be perfectly up-to-date." },
    { question: "Is the tool free to use?", answer: "Yes, our currency converter is 100% free." }
  ];

  return (
    <>
      <PageSEO 
        title="Currency Converter - Live Exchange Rates" 
        description="Convert between global currencies using up-to-date exchange rates."
        url="/calculators/currency-converter"
      />
      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm mb-4 text-muted-foreground">
          <Link href="/" className="hover:underline">Home</Link> &gt; 
          <Link href="/calculators" className="hover:underline ml-1">Calculators</Link> &gt; 
          <span className="ml-1">Currency Converter</span>
        </nav>
        
        <h1 className="text-4xl font-bold mb-2">Currency Converter</h1>
        <p className="text-xl text-muted-foreground mb-8">Real-time exchange rate conversions.</p>
        
        <AdBanner />

        <div className="grid lg:grid-cols-12 gap-8 mt-8">
          <div className="lg:col-span-8">
            <Card className="mb-8">
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <CardTitle>Convert Currency</CardTitle>
                  <CardDescription>Fast and accurate currency conversions.</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={fetchRates} disabled={loading}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh Rates
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-end mb-8">
                  <div className="space-y-2">
                    <Label>Amount & From</Label>
                    <div className="flex gap-2">
                      <Input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full"
                      />
                      <Select value={fromCurrency} onValueChange={setFromCurrency}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SUPPORTED_CURRENCIES.map((c: any) => (
                            <SelectItem key={c.code} value={c.code}>
                              <span className="mr-2">{c.flag}</span> {c.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button variant="outline" size="icon" className="mb-0" onClick={handleSwap}>
                    <ArrowRightLeft className="w-4 h-4" />
                  </Button>

                  <div className="space-y-2">
                    <Label>To Currency</Label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SUPPORTED_CURRENCIES.map((c: any) => (
                          <SelectItem key={c.code} value={c.code}>
                            <span className="mr-2">{c.flag}</span> {c.name} ({c.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {result && (
                  <div className="bg-muted/30 p-6 rounded-xl text-center relative">
                    <p className="text-sm text-muted-foreground mb-2">Converted Amount</p>
                    <div className="text-4xl font-bold break-all text-primary">
                      {formatCurrency(result.convertedAmount, toCurrency)}
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      1 {fromCurrency} = {formatNumber(result.rate, 6)} {toCurrency}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      1 {toCurrency} = {formatNumber(result.inverseRate, 6)} {fromCurrency}
                    </p>
                    <p className="mt-4 text-xs text-muted-foreground">
                      Rates updated: {new Date(lastUpdated).toLocaleString()}
                    </p>
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  * All figures are indicative exchange rates and do not represent guaranteed conversion quotes.
                </p>
              </CardContent>
            </Card>

            <AdInArticle />

            <div className="prose prose-blue dark:prose-invert max-w-none mt-12">
              <h2>Understanding Currency Conversion</h2>
              <p>Currency conversion is vital for international trade, travel, and global finance. The exchange rate is the value of one nation's currency versus the currency of another nation or economic zone.</p>
              
              <h3>Mid-Market Rates</h3>
              <p>The rates provided by this calculator are typically based on the mid-market exchange rate. This is the midpoint between the buy and sell prices of two currencies. Banks and financial institutions often add a markup to this rate when performing actual conversions for customers.</p>
              
              <h3>How to Use</h3>
              <ul>
                <li>Enter the amount you wish to convert.</li>
                <li>Select the base currency (From).</li>
                <li>Select the target currency (To).</li>
                <li>The converted amount and the current exchange rate will be displayed immediately.</li>
              </ul>
              
              <p>Our tool updates the rates regularly to ensure you have an accurate estimation of currency values. Whether you are planning a trip abroad, buying items internationally, or tracking financial markets, this tool is designed for speed and reliability.</p>

              <h2 className="mt-12 mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-6 space-y-8">
              <AdSidebar />
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

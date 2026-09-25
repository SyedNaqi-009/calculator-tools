"use client";

import React, { useState } from "react";
import { calculateSIP } from "@/lib/calculators/sip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CurrencySelector } from "@/components/shared/CurrencySelector";

export default function SIPCalculatorPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [period, setPeriod] = useState(10);

  const result = calculateSIP(monthlyInvestment, expectedReturn, period);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">SIP Calculator</h1>
        <p className="text-muted-foreground">Calculate the future value of your Systematic Investment Plan (SIP).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Investment Details</CardTitle>
              <CurrencySelector className="w-28" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Monthly Investment</Label>
                  <span className="font-medium">{formatCurrency(monthlyInvestment)}</span>
                </div>
                <Slider min={500} max={100000} step={500} value={[monthlyInvestment]} onValueChange={([v]) => setMonthlyInvestment(v)} />
                <Input type="number" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Expected Return Rate (% p.a.)</Label>
                  <span className="font-medium">{expectedReturn}%</span>
                </div>
                <Slider min={1} max={30} step={0.5} value={[expectedReturn]} onValueChange={([v]) => setExpectedReturn(v)} />
                <Input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Time Period (Years)</Label>
                  <span className="font-medium">{period} Years</span>
                </div>
                <Slider min={1} max={40} step={1} value={[period]} onValueChange={([v]) => setPeriod(v)} />
                <Input type="number" value={period} onChange={(e) => setPeriod(Number(e.target.value))} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Invested Amount</p>
                  <p className="text-2xl font-bold">{formatCurrency(result.investedAmount)}</p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Estimated Returns</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(result.estimatedReturns)}</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-xl">
                  <p className="text-sm text-primary font-medium mb-1">Total Value</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(result.totalValue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose max-w-none">
            <h2>Understanding SIP Calculations</h2>
            <p>A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly in mutual funds. This calculator uses the compound interest formula to estimate your future wealth based on expected market returns.</p>
            <h3>How it Works</h3>
            <p>The calculation assumes investments are made at the beginning of each month and compounded monthly. The power of compounding means that returns generated on your investments also earn returns, leading to exponential growth over time.</p>
            <p>By starting early, even small monthly investments can grow into a substantial corpus. This highlights the importance of consistency and time in wealth creation.</p>
            <p>Remember that mutual fund investments are subject to market risks, and the expected return rate is just an estimate. Real returns will fluctuate based on market performance.</p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>What is an SIP?</AccordionTrigger>
                <AccordionContent>SIP stands for Systematic Investment Plan, a method where you invest a fixed amount regularly (usually monthly) in a mutual fund scheme.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>Is the estimated return guaranteed?</AccordionTrigger>
                <AccordionContent>No, mutual fund returns are market-linked and not guaranteed. The calculator only provides an estimate based on the historical or expected rate you input.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>Can I increase my SIP amount later?</AccordionTrigger>
                <AccordionContent>Yes, most platforms offer a "Step-up SIP" feature where you can automatically increase your investment amount periodically, or you can manually start additional SIPs.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>What happens if I miss an SIP payment?</AccordionTrigger>
                <AccordionContent>Usually, missing one payment doesn't incur a penalty from the mutual fund, but your bank might charge a mandate failure fee. The SIP continues next month.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>Is compounding real in SIP?</AccordionTrigger>
                <AccordionContent>Yes, your gains are reinvested back into the fund, purchasing more units, which then generate their own returns, resulting in the compounding effect.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Popular Calculators</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <a href="/calculators/emi-calculator" className="text-primary hover:underline">EMI Calculator</a>
              <a href="/calculators/compound-interest-calculator" className="text-primary hover:underline">Compound Interest Calculator</a>
              <a href="/calculators/fd-calculator" className="text-primary hover:underline">FD Calculator</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { calculateCompoundInterest } from "@/lib/calculators/compoundInterest";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function CompoundInterestCalculatorPage() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);
  const [contribution, setContribution] = useState(0);
  const [frequency, setFrequency] = useState<any>("annually");

  const result = calculateCompoundInterest(principal, rate, years, frequency, contribution);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Compound Interest Calculator</h1>
        <p className="text-muted-foreground">Calculate the magical effect of compounding over time with optional periodic contributions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Initial Principal (₹)</Label>
                <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
              </div>

              <div className="space-y-2">
                <Label>Annual Interest Rate (%)</Label>
                <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
              </div>

              <div className="space-y-2">
                <Label>Time Period (Years)</Label>
                <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
              </div>

              <div className="space-y-2">
                <Label>Compounding Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annually">Annually</SelectItem>
                    <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Monthly Contribution (₹) - Optional</Label>
                <Input type="number" value={contribution} onChange={(e) => setContribution(Number(e.target.value))} />
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
                  <p className="text-sm text-muted-foreground mb-1">Total Principal Invested</p>
                  <p className="text-2xl font-bold">{formatCurrency(result.totalDeposits, "INR")}</p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Total Interest Earned</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(result.totalInterest, "INR")}</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-xl">
                  <p className="text-sm text-primary font-medium mb-1">Future Value</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(result.finalAmount, "INR")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose max-w-none">
            <h2>The Magic of Compound Interest</h2>
            <p>Compound interest is the interest on savings calculated on both the initial principal and the accumulated interest from previous periods. Einstein allegedly called it the eighth wonder of the world.</p>
            <h3>Formula Used</h3>
            <p>The standard formula is <strong>A = P(1 + r/n)^(nt)</strong> where:</p>
            <ul>
              <li><strong>A</strong> is the Future Value</li>
              <li><strong>P</strong> is the Principal Amount</li>
              <li><strong>r</strong> is the annual interest rate (in decimal)</li>
              <li><strong>n</strong> is the number of times interest is compounded per year</li>
              <li><strong>t</strong> is the time in years</li>
            </ul>
            <p>This calculator also includes the option to factor in regular monthly contributions to see how consistent saving habits turbocharge your wealth over time.</p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>What is compound interest?</AccordionTrigger>
                <AccordionContent>Compound interest means earning interest on both your initial principal and the interest that accumulates over time.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>How does compounding frequency affect returns?</AccordionTrigger>
                <AccordionContent>The more frequently interest compounds (e.g., daily vs. annually), the more wealth you build, because interest is added back to the principal sooner.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>What is the Rule of 72?</AccordionTrigger>
                <AccordionContent>The Rule of 72 is a quick mental math trick: divide 72 by the annual interest rate to estimate how many years it will take to double your investment.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>Are regular contributions important?</AccordionTrigger>
                <AccordionContent>Extremely. While a lump sum has time to grow, adding regular monthly deposits continuously feeds the compounding machine.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>Where can I earn compound interest?</AccordionTrigger>
                <AccordionContent>Savings accounts, CDs, bonds, and effectively through mutual funds and stocks (via reinvested dividends and capital gains).</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

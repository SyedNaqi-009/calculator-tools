"use client";

import React, { useState } from "react";
import { calculateFD } from "@/lib/calculators/fd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function FDCalculatorPage() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.5);
  const [years, setYears] = useState(5);
  const [months, setMonths] = useState(0);
  const [frequency, setFrequency] = useState<any>("quarterly");

  const tenureInYears = years + (months / 12);
  const result = calculateFD(principal, rate, tenureInYears, frequency);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Fixed Deposit (FD) Calculator</h1>
        <p className="text-muted-foreground">Estimate your maturity amount and interest earned on Fixed Deposits.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>FD Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Principal Amount (₹)</Label>
                <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
              </div>

              <div className="space-y-2">
                <Label>Interest Rate (% p.a.)</Label>
                <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tenure (Years)</Label>
                  <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Tenure (Months)</Label>
                  <Input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Compounding Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Compounding Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="half-yearly">Half-Yearly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
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
                  <p className="text-sm text-muted-foreground mb-1">Total Investment</p>
                  <p className="text-2xl font-bold">{formatCurrency(result.principal, "INR")}</p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(result.totalInterest, "INR")}</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-xl">
                  <p className="text-sm text-primary font-medium mb-1">Maturity Amount</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(result.maturityAmount, "INR")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose max-w-none">
            <h2>Understanding Fixed Deposits (FDs)</h2>
            <p>A Fixed Deposit is a highly secure investment instrument offered by banks and non-banking financial companies (NBFCs). It offers a higher rate of interest than a regular savings account until the given maturity date.</p>
            <h3>How is FD Interest Calculated?</h3>
            <p>FD interest depends largely on the compounding frequency. Typically, banks in India compound interest on a quarterly basis. Our calculator takes into account the principal, rate, duration, and compounding frequency to accurately project your maturity amount.</p>
            <p>The formula for compound interest on an FD is A = P × (1 + r/n)^(n*t), where A is the maturity amount, P is the principal, r is the annual rate, n is the number of compounding periods per year, and t is the time in years.</p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>What is an FD?</AccordionTrigger>
                <AccordionContent>A Fixed Deposit is a financial instrument where you deposit a lump sum of money for a predetermined time at a fixed rate of interest.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>Is FD interest taxable?</AccordionTrigger>
                <AccordionContent>Yes, interest earned on an FD is fully taxable as per your income tax slab. Banks also deduct TDS if the interest exceeds a certain threshold.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>Can I withdraw my FD early?</AccordionTrigger>
                <AccordionContent>Yes, most banks allow premature withdrawal, but it usually comes with a penalty, typically lowering your interest rate by 0.5% to 1%.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>What is compounding frequency?</AccordionTrigger>
                <AccordionContent>It refers to how often the interest is calculated and added back to your principal. Most banks compound quarterly for FDs.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>Are FD rates different for senior citizens?</AccordionTrigger>
                <AccordionContent>Yes, senior citizens (usually above 60 years) are offered a slightly higher interest rate, typically 0.5% extra over regular FD rates.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

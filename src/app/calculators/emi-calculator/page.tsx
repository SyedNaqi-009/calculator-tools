"use client";

import React, { useState } from "react";
import { calculateEMI } from "@/lib/calculators/emi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { CurrencySelector } from "@/components/shared/CurrencySelector";

export default function EMICalculatorPage() {
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(10);
  const [tenure, setTenure] = useState(120);
  const [tenureType, setTenureType] = useState<"months" | "years">("months");

  const actualTenure = tenureType === "years" ? tenure * 12 : tenure;
  
  const result = calculateEMI(amount, rate, actualTenure);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">EMI Calculator</h1>
        <p className="text-muted-foreground">Calculate your Equated Monthly Installment (EMI) for home, car, or personal loans.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>EMI Details</CardTitle>
              <CurrencySelector className="w-28" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Loan Amount</Label>
                  <span className="font-medium">{formatCurrency(amount)}</span>
                </div>
                <Slider min={10000} max={10000000} step={10000} value={[amount]} onValueChange={([v]) => setAmount(v)} />
                <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Interest Rate (% p.a.)</Label>
                  <span className="font-medium">{rate}%</span>
                </div>
                <Slider min={1} max={30} step={0.1} value={[rate]} onValueChange={([v]) => setRate(v)} />
                <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Loan Tenure</Label>
                  <span className="font-medium">{tenure} {tenureType}</span>
                </div>
                <Tabs value={tenureType} onValueChange={(v) => setTenureType(v as "months" | "years")}>
                  <TabsList>
                    <TabsTrigger value="months">Months</TabsTrigger>
                    <TabsTrigger value="years">Years</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Slider min={1} max={360} step={1} value={[tenure]} onValueChange={([v]) => setTenure(v)} />
                <Input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
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
                  <p className="text-sm text-muted-foreground mb-1">Monthly EMI</p>
                  <p className="text-2xl font-bold">{formatCurrency(result.emi)}</p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                  <p className="text-2xl font-bold">{formatCurrency(result.totalInterest)}</p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Total Payment</p>
                  <p className="text-2xl font-bold">{formatCurrency(result.totalPayment)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose max-w-none">
            <h2>How to Use the EMI Calculator</h2>
            <p>Our EMI calculator helps you understand your monthly commitments towards any loan. Simply enter the principal amount, interest rate, and the tenure of the loan to instantly view your Equated Monthly Installment (EMI).</p>
            <h3>Formula Used</h3>
            <p>EMI = [P × r × (1+r)^n] / [(1+r)^n – 1]</p>
            <ul>
              <li><strong>P</strong> is the principal loan amount</li>
              <li><strong>r</strong> is the monthly interest rate (annual rate / 12 / 100)</li>
              <li><strong>n</strong> is the loan duration in months</li>
            </ul>
            
            <p>Using a calculator ensures that you do not make manual errors when calculating complex compounding interest equations. Planning your finances becomes significantly easier when you know exactly how much you need to set aside each month.</p>
            <p>Consider the total interest payable when taking out a long-term loan. Sometimes a slightly higher EMI over a shorter tenure can save you lakhs of rupees in interest payments.</p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>What is an EMI?</AccordionTrigger>
                <AccordionContent>An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>How does loan tenure affect EMI?</AccordionTrigger>
                <AccordionContent>A longer loan tenure results in a lower EMI but a higher total interest payout. A shorter tenure increases the EMI but reduces the total interest burden.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>Does the EMI change during the loan?</AccordionTrigger>
                <AccordionContent>If you have a fixed-rate loan, the EMI remains constant. For floating-rate loans, the EMI or tenure may change when the interest rate is revised.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>Can I pre-pay my loan?</AccordionTrigger>
                <AccordionContent>Yes, most banks allow prepayments, which can reduce your principal outstanding and lower your future EMIs or shorten your loan tenure.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>Is the calculator exact?</AccordionTrigger>
                <AccordionContent>The calculator provides a highly accurate estimate based on standard compounding formulas. However, actual bank calculations may vary slightly due to fees or specific bank policies.</AccordionContent>
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
              <a href="/calculators/sip-calculator" className="text-primary hover:underline">SIP Calculator</a>
              <a href="/calculators/loan-calculator" className="text-primary hover:underline">Loan Calculator</a>
              <a href="/calculators/fd-calculator" className="text-primary hover:underline">FD Calculator</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

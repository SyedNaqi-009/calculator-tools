"use client";

import React, { useState } from "react";
import { calculateLoan, LoanType } from "@/lib/calculators/loan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoanCalculatorPage() {
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(9);
  const [tenure, setTenure] = useState(10);
  const [tenureType, setTenureType] = useState<"months" | "years">("years");
  const [loanType, setLoanType] = useState<LoanType>("Home Loan");

  const tenureYears = tenureType === "years" ? tenure : tenure / 12;
  const result = calculateLoan(amount, rate, tenureYears, loanType);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Loan Calculator</h1>
        <p className="text-muted-foreground">Calculate EMI, interest, and schedule for Home, Car, Personal, or Education Loans.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Loan Type</Label>
                <Select value={loanType} onValueChange={(v: any) => setLoanType(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Loan Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Home Loan">Home Loan</SelectItem>
                    <SelectItem value="Car Loan">Car Loan</SelectItem>
                    <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                    <SelectItem value="Education Loan">Education Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Loan Amount (₹)</Label>
                  <span className="font-medium">{formatCurrency(amount, "INR")}</span>
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
                  <p className="text-2xl font-bold">{formatCurrency(result.emi, "INR")}</p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                  <p className="text-2xl font-bold text-red-500">{formatCurrency(result.totalInterest, "INR")}</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-xl">
                  <p className="text-sm text-primary font-medium mb-1">Total Payment</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(result.totalPayment, "INR")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose max-w-none">
            <h2>How to Use the Comprehensive Loan Calculator</h2>
            <p>Our Loan Calculator offers specialized features for different loan types including Home, Personal, Car, and Education loans. Different loans come with varying market interest rates, tax benefits, and processing fees. This tool helps you quickly evaluate your borrowing costs.</p>
            <h3>Understanding Your Loan</h3>
            <p>A loan entails borrowing a principal sum from a financial institution and paying it back along with interest over a predetermined period (tenure). Planning ahead ensures that the Monthly EMI is comfortable for your budget.</p>
            <ul>
              <li><strong>Home Loans</strong> typically have lower interest rates and longer tenures up to 30 years.</li>
              <li><strong>Personal Loans</strong> are unsecured, thus carrying higher interest rates and shorter tenures.</li>
              <li><strong>Car Loans</strong> generally range from 3 to 7 years.</li>
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>What factors affect my Loan EMI?</AccordionTrigger>
                <AccordionContent>Your EMI depends on three primary factors: the principal loan amount, the interest rate, and the tenure of the loan.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>How is a Personal Loan different from a Home Loan?</AccordionTrigger>
                <AccordionContent>Personal loans are unsecured (no collateral) and have higher interest rates, whereas home loans are secured against property and usually offer lower interest rates.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>What is an Amortization Schedule?</AccordionTrigger>
                <AccordionContent>An amortization schedule is a table showing each periodic payment of your loan, detailing how much goes towards the principal and how much towards the interest.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>Does my credit score affect the interest rate?</AccordionTrigger>
                <AccordionContent>Yes, lenders use your credit score to determine the risk of lending to you. A higher credit score often unlocks lower interest rates.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>Is it better to have a shorter or longer tenure?</AccordionTrigger>
                <AccordionContent>A shorter tenure means higher EMIs but significantly less total interest paid. A longer tenure makes the EMI manageable but increases the total cost of the loan.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Related Calculators</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <a href="/calculators/emi-calculator" className="text-primary hover:underline">Standard EMI Calculator</a>
              <a href="/calculators/compound-interest-calculator" className="text-primary hover:underline">Compound Interest Calculator</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

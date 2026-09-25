"use client";

import React, { useState } from "react";
import { calculateSimpleInterest } from "@/lib/calculators/simpleInterest";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function SimpleInterestCalculatorPage() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [time, setTime] = useState(3);

  const result = calculateSimpleInterest(principal, rate, time);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Simple Interest Calculator</h1>
        <p className="text-muted-foreground">A fast, easy way to calculate standard non-compounding interest on a principal amount.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Calculation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Principal Amount (₹)</Label>
                <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
              </div>

              <div className="space-y-2">
                <Label>Annual Interest Rate (%)</Label>
                <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
              </div>

              <div className="space-y-2">
                <Label>Time (Years)</Label>
                <Input type="number" value={time} onChange={(e) => setTime(Number(e.target.value))} />
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
                  <p className="text-sm text-muted-foreground mb-1">Principal Amount</p>
                  <p className="text-2xl font-bold">{formatCurrency(result.principal, "INR")}</p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(result.interest, "INR")}</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-xl">
                  <p className="text-sm text-primary font-medium mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(result.totalAmount, "INR")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose max-w-none">
            <h2>Understanding Simple Interest</h2>
            <p>Unlike compound interest, simple interest does not add the earned interest back to the principal. It is calculated only on the original principal amount, which makes the calculation straightforward.</p>
            <h3>Formula Used</h3>
            <p><strong>SI = (P × R × T) / 100</strong></p>
            <ul>
              <li><strong>SI</strong> = Simple Interest</li>
              <li><strong>P</strong> = Principal amount borrowed or invested</li>
              <li><strong>R</strong> = Annual interest rate</li>
              <li><strong>T</strong> = Time in years</li>
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>What is simple interest?</AccordionTrigger>
                <AccordionContent>It is the interest calculated strictly on the initial principal sum, meaning you do not earn interest on your interest.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>When is simple interest used?</AccordionTrigger>
                <AccordionContent>It is typically used for short-term personal loans, automobile loans, and certain types of fixed-yield investments.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>Is simple interest better than compound interest?</AccordionTrigger>
                <AccordionContent>For borrowers, simple interest is better as you pay less overall. For investors, compound interest is better as it grows wealth exponentially.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>Can time be in months?</AccordionTrigger>
                <AccordionContent>Yes, but in the standard formula, months must be converted into years by dividing by 12 (e.g., 6 months = 0.5 years).</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>Does the principal amount change?</AccordionTrigger>
                <AccordionContent>No, in simple interest, the principal on which the interest is calculated remains constant throughout the entire term.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

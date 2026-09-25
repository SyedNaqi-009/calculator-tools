"use client";

import React, { useState } from "react";
import { calculateGST } from "@/lib/calculators/gst";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrencySelector } from "@/components/shared/CurrencySelector";

export default function GSTCalculatorPage() {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(18);
  const [taxMode, setTaxMode] = useState<"exclusive" | "inclusive">("exclusive");

  const result = calculateGST(amount, rate, taxMode);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">GST Calculator</h1>
        <p className="text-muted-foreground">Calculate Goods and Services Tax (GST) including CGST, SGST, and IGST components easily.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>GST Details</CardTitle>
              <CurrencySelector className="w-28" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Calculation Mode</Label>
                <Tabs value={taxMode} onValueChange={(v) => setTaxMode(v as any)}>
                  <TabsList>
                    <TabsTrigger value="exclusive">Add GST (Exclusive)</TabsTrigger>
                    <TabsTrigger value="inclusive">Remove GST (Inclusive)</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label>Amount</Label>
                <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
              </div>

              <div className="space-y-2">
                <Label>GST Rate (%)</Label>
                <Select value={rate.toString()} onValueChange={(v) => setRate(Number(v))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select GST Slab" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0%</SelectItem>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="12">12%</SelectItem>
                    <SelectItem value="18">18%</SelectItem>
                    <SelectItem value="28">28%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GST Calculation Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-xl flex justify-between">
                  <span>Base Amount</span>
                  <span className="font-bold">{formatCurrency(result.originalAmount)}</span>
                </div>
                <div className="p-4 border rounded-xl flex justify-between">
                  <span>Total GST</span>
                  <span className="font-bold text-red-500">{formatCurrency(result.totalGst)}</span>
                </div>
                <div className="p-4 border rounded-xl flex justify-between">
                  <span>CGST (Half)</span>
                  <span className="font-bold">{formatCurrency(result.cgst)}</span>
                </div>
                <div className="p-4 border rounded-xl flex justify-between">
                  <span>SGST (Half)</span>
                  <span className="font-bold">{formatCurrency(result.sgst)}</span>
                </div>
                <div className="p-4 bg-primary/10 rounded-xl flex justify-between col-span-1 md:col-span-2">
                  <span className="font-bold text-primary">Final Billed Amount</span>
                  <span className="text-xl font-bold text-primary">{formatCurrency(result.finalAmount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose max-w-none">
            <h2>About the Goods and Services Tax (GST)</h2>
            <p>GST is an indirect tax used in India on the supply of goods and services. It is a comprehensive, multistage, destination-based tax. GST was introduced to simplify the indirect tax structure by replacing multiple cascaded taxes levied by the central and state governments.</p>
            <h3>GST Slabs in India</h3>
            <p>The primary tax slabs are 5%, 12%, 18%, and 28%. Basic necessities usually fall in the lower brackets, while luxury goods attract the highest 28% bracket.</p>
            <p>CGST and SGST apply to intra-state sales, dividing the tax equally between Central and State governments. IGST applies to inter-state sales, collected entirely by the Central government.</p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>What does GST Inclusive mean?</AccordionTrigger>
                <AccordionContent>GST Inclusive means the tax amount is already included in the total price of the product or service. Our calculator extracts the base price and the tax component.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>What does GST Exclusive mean?</AccordionTrigger>
                <AccordionContent>GST Exclusive means the tax amount needs to be added on top of the base product price to find the final billed amount.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>What are CGST and SGST?</AccordionTrigger>
                <AccordionContent>CGST (Central GST) and SGST (State GST) are the two equal components of the total GST applied to sales within a single state.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>What is IGST?</AccordionTrigger>
                <AccordionContent>IGST (Integrated GST) is applied to inter-state supply of goods and services, and on imports/exports. It is equal to the total GST rate.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>Are all items subject to GST?</AccordionTrigger>
                <AccordionContent>No, certain essentials are exempt from GST (0% rate), and some sectors like alcohol for human consumption and electricity are outside the GST framework.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

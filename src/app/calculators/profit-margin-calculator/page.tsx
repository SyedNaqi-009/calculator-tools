"use client";

import React, { useState } from "react";
import { calculateFromCostAndRevenue, calculateFromCostAndMarkup, calculateGrossMargin } from "@/lib/calculators/profitMargin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function ProfitMarginCalculatorPage() {
  // Tab 1: Cost & Revenue
  const [crCost, setCrCost] = useState(100);
  const [crRevenue, setCrRevenue] = useState(150);

  // Tab 2: Cost & Markup
  const [cmCost, setCmCost] = useState(100);
  const [cmMarkup, setCmMarkup] = useState(50);

  // Tab 3: Revenue & Gross Margin
  const [gmRevenue, setGmRevenue] = useState(150);
  const [gmCogs, setGmCogs] = useState(100);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Profit Margin Calculator</h1>
        <p className="text-muted-foreground">Determine your profit margins, markup, cost, and revenue easily for your retail or eCommerce business.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Calculation Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="cost-revenue">
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="cost-revenue" className="flex-1">Cost & Revenue</TabsTrigger>
                  <TabsTrigger value="cost-markup" className="flex-1">Cost & Markup%</TabsTrigger>
                  <TabsTrigger value="gross-margin" className="flex-1">Gross Margin</TabsTrigger>
                </TabsList>

                <TabsContent value="cost-revenue" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Cost ($)</Label>
                      <Input type="number" value={crCost} onChange={(e) => setCrCost(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Revenue ($)</Label>
                      <Input type="number" value={crRevenue} onChange={(e) => setCrRevenue(Number(e.target.value))} />
                    </div>
                  </div>
                  <ResultDisplay data={calculateFromCostAndRevenue(crCost, crRevenue)} />
                </TabsContent>

                <TabsContent value="cost-markup" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Cost ($)</Label>
                      <Input type="number" value={cmCost} onChange={(e) => setCmCost(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Markup (%)</Label>
                      <Input type="number" value={cmMarkup} onChange={(e) => setCmMarkup(Number(e.target.value))} />
                    </div>
                  </div>
                  <ResultDisplay data={calculateFromCostAndMarkup(cmCost, cmMarkup)} />
                </TabsContent>

                <TabsContent value="gross-margin" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Total Revenue ($)</Label>
                      <Input type="number" value={gmRevenue} onChange={(e) => setGmRevenue(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Cost of Goods Sold (COGS) ($)</Label>
                      <Input type="number" value={gmCogs} onChange={(e) => setGmCogs(Number(e.target.value))} />
                    </div>
                  </div>
                  <ResultDisplay data={calculateGrossMargin(gmRevenue, gmCogs)} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="prose max-w-none">
            <h2>Understanding Profit Margin vs. Markup</h2>
            <p>While often used interchangeably, profit margin and markup represent two different financial metrics.</p>
            <ul>
              <li><strong>Profit Margin:</strong> The percentage of revenue that is actual profit. Formula: (Gross Profit / Revenue) × 100</li>
              <li><strong>Markup:</strong> The percentage added to the cost price to determine the selling price. Formula: (Gross Profit / Cost) × 100</li>
            </ul>
            <p>Properly pricing your products ensures your business remains profitable while covering overheads and accounting for potential discounts.</p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>What is a good profit margin?</AccordionTrigger>
                <AccordionContent>It varies significantly by industry. Generally, a 10% net profit margin is considered average, 20% is good, and 5% is low. However, SaaS businesses often run closer to 80% gross margins while retail runs at 2-5% net.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>Can margin be higher than 100%?</AccordionTrigger>
                <AccordionContent>No, profit margin cannot exceed 100% because profit cannot be greater than revenue. However, markup can easily exceed 100%.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>What is COGS?</AccordionTrigger>
                <AccordionContent>COGS stands for Cost of Goods Sold. It includes direct costs attributable to the production of goods sold, like material and direct labor.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>Why does my margin seem lower than my markup?</AccordionTrigger>
                <AccordionContent>Mathematically, margin is always lower than markup. A 100% markup on a $50 item gives a selling price of $100. The profit is $50, which is 50% of the $100 revenue.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>Does gross profit include operating expenses?</AccordionTrigger>
                <AccordionContent>No, gross profit only deducts COGS from revenue. Operating expenses (like rent and marketing) are deducted later to find the net profit.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultDisplay({ data }: { data: any }) {
  if (!data) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      <div className="p-4 bg-muted rounded-xl text-center">
        <p className="text-sm text-muted-foreground mb-1">Cost</p>
        <p className="text-xl font-bold">{formatCurrency(data.cost || 0, "USD")}</p>
      </div>
      <div className="p-4 bg-muted rounded-xl text-center">
        <p className="text-sm text-muted-foreground mb-1">Revenue</p>
        <p className="text-xl font-bold">{formatCurrency(data.revenue || 0, "USD")}</p>
      </div>
      <div className="p-4 bg-muted rounded-xl text-center">
        <p className="text-sm text-muted-foreground mb-1">Gross Profit</p>
        <p className="text-xl font-bold text-green-600">{formatCurrency(data.profit || data.grossProfit || 0, "USD")}</p>
      </div>
      <div className="p-4 bg-primary/10 rounded-xl text-center">
        <p className="text-sm text-primary font-medium mb-1">Margin</p>
        <p className="text-xl font-bold text-primary">{data.margin || data.grossMarginPercentage}%</p>
      </div>
    </div>
  );
}

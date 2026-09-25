'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateDiscount } from '@/lib/calculators/discount';
import PageSEO from '@/components/seo/PageSEO';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CurrencySelector } from '@/components/shared/CurrencySelector';
import { formatCurrency } from '@/lib/utils';

export default function DiscountCalculator() {
  const [price, setPrice] = useState('100');
  const [discount, setDiscount] = useState('20');
  const [result, setResult] = useState<any>(() => calculateDiscount(100, 20));

  const updateCalculation = (p: string, d: string) => {
    const pNum = parseFloat(p);
    const dNum = parseFloat(d);
    if (!isNaN(pNum) && !isNaN(dNum) && pNum >= 0 && dNum >= 0) {
      setResult(calculateDiscount(pNum, dNum));
    }
  };

  const handlePriceChange = (val: string) => {
    setPrice(val);
    updateCalculation(val, discount);
  };

  const handleDiscountChange = (val: string) => {
    setDiscount(val);
    updateCalculation(price, val);
  };

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <PageSEO title="Discount Calculator | CalcHub" description="Calculate discounts, final price, and total savings." />
      <h1 className="text-3xl font-bold mb-4">Discount Calculator</h1>
      <p className="mb-8 text-gray-600">Find out the final price after applying a discount in your local currency.</p>
      
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Discount Details</CardTitle>
              <CurrencySelector className="w-28" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Original Price</Label>
                <Input type="number" value={price} onChange={e => handlePriceChange(e.target.value)} placeholder="100" />
              </div>
              <div>
                <Label>Discount (%)</Label>
                <Input type="number" value={discount} onChange={e => handleDiscountChange(e.target.value)} placeholder="20" />
              </div>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader><CardTitle>Result</CardTitle></CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-600">Final Price: {formatCurrency(result.finalPrice)}</div>
                <p className="mt-2 text-gray-500 line-through">Original: {formatCurrency(parseFloat(price) || 0)}</p>
                <p className="mt-4 font-medium text-lg">You Save: {formatCurrency(result.savings)} ({discount}%)</p>
              </CardContent>
            </Card>
          )}

          <div className="prose max-w-none">
            <h2>Formula</h2>
            <p>Discount Amount = Original Price × (Discount Percentage / 100)<br/>Final Price = Original Price - Discount Amount</p>
            <h2>FAQ</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>How do you calculate a 20% discount?</AccordionTrigger>
                <AccordionContent>Multiply the original price by 0.20 to get the discount amount. Subtract that from the original price.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>What is a double discount?</AccordionTrigger>
                <AccordionContent>A double discount means applying a second discount on the already discounted price.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>Is a 50% discount half price?</AccordionTrigger>
                <AccordionContent>Yes, 50% off means you are paying exactly half the original price.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>Does tax apply before or after discount?</AccordionTrigger>
                <AccordionContent>Usually, sales tax is applied AFTER the discount has been deducted.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>How to calculate reverse discount?</AccordionTrigger>
                <AccordionContent>To find original price from a 20% discounted final price, divide final price by 0.80.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-4"><Card><CardHeader><CardTitle>Quick Links</CardTitle></CardHeader></Card></div>
      </div>
    </div>
  );
}

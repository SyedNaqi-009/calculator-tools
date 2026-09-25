'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateDiscount } from '@/lib/calculators/discount';
import PageSEO from '@/components/seo/PageSEO';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function DiscountCalculator() {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (price && discount) {
      setResult(calculateDiscount(parseFloat(price), parseFloat(discount)));
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <PageSEO title="Discount Calculator | CalcHub" description="Calculate discounts, final price, and total savings." />
      <h1 className="text-3xl font-bold mb-4">Discount Calculator</h1>
      <p className="mb-8 text-gray-600">Find out the final price after applying a discount.</p>
      
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card>
            <CardHeader><CardTitle>Calculator</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Original Price</Label><Input type="number" value={price} onChange={e => setPrice(e.target.value)} /></div>
              <div><Label>Discount (%)</Label><Input type="number" value={discount} onChange={e => setDiscount(e.target.value)} /></div>
              <Button onClick={handleCalculate} className="w-full">Calculate</Button>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader><CardTitle>Result</CardTitle></CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-600">Final Price: ${result.finalPrice.toFixed(2)}</div>
                <p className="mt-2 text-gray-500 line-through">Original: ${parseFloat(price).toFixed(2)}</p>
                <p className="mt-4 font-medium text-lg">You Save: ${result.savings.toFixed(2)}</p>
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

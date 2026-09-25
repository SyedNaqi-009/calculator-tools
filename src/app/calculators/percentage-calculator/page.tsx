'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculatePercentageOf, calculateWhatPercentage, calculatePercentageChange } from '@/lib/calculators/percentage';
import PageSEO from '@/components/seo/PageSEO';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function PercentageCalculator() {
  const [val1, setVal1] = useState('20');
  const [val2, setVal2] = useState('100');
  const [res1, setRes1] = useState<any>(() => calculatePercentageOf(20, 100));
  
  const [val3, setVal3] = useState('25');
  const [val4, setVal4] = useState('200');
  const [res2, setRes2] = useState<any>(() => calculateWhatPercentage(25, 200));

  const [val5, setVal5] = useState('50');
  const [val6, setVal6] = useState('75');
  const [res3, setRes3] = useState<any>(() => calculatePercentageChange(50, 75));

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <PageSEO title="Percentage Calculator | CalcHub" description="Calculate percentages easily." />
      <h1 className="text-3xl font-bold mb-4">Percentage Calculator</h1>
      <p className="mb-8 text-gray-600">Calculate percentage values, percentage changes, and more.</p>
      
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card>
            <CardHeader><CardTitle>Calculators</CardTitle></CardHeader>
            <CardContent>
              <Tabs defaultValue="of">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="of">% Of</TabsTrigger>
                  <TabsTrigger value="what">What %</TabsTrigger>
                  <TabsTrigger value="change">% Change</TabsTrigger>
                </TabsList>
                
                <TabsContent value="of" className="space-y-4 pt-4">
                  <div className="flex items-center gap-4">
                    <Input placeholder="%" value={val1} onChange={e=>setVal1(e.target.value)} />
                    <span>% of</span>
                    <Input placeholder="Value" value={val2} onChange={e=>setVal2(e.target.value)} />
                  </div>
                  <Button onClick={() => setRes1(calculatePercentageOf(parseFloat(val1), parseFloat(val2)))}>Calculate</Button>
                  {res1 !== null && <div className="text-2xl font-bold mt-4">Result: {res1}</div>}
                </TabsContent>
                
                <TabsContent value="what" className="space-y-4 pt-4">
                  <div className="flex items-center gap-4">
                    <Input placeholder="Value 1" value={val3} onChange={e=>setVal3(e.target.value)} />
                    <span>is what % of</span>
                    <Input placeholder="Value 2" value={val4} onChange={e=>setVal4(e.target.value)} />
                  </div>
                  <Button onClick={() => setRes2(calculateWhatPercentage(parseFloat(val3), parseFloat(val4)))}>Calculate</Button>
                  {res2 !== null && <div className="text-2xl font-bold mt-4">Result: {res2}%</div>}
                </TabsContent>
                
                <TabsContent value="change" className="space-y-4 pt-4">
                  <div className="flex items-center gap-4">
                    <Input placeholder="From" value={val5} onChange={e=>setVal5(e.target.value)} />
                    <span>to</span>
                    <Input placeholder="To" value={val6} onChange={e=>setVal6(e.target.value)} />
                  </div>
                  <Button onClick={() => setRes3(calculatePercentageChange(parseFloat(val5), parseFloat(val6)))}>Calculate</Button>
                  {res3 !== null && (
                    <div className={`text-2xl font-bold mt-4 ${res3.type === 'increase' ? 'text-green-600' : res3.type === 'decrease' ? 'text-red-600' : 'text-muted-foreground'}`}>
                      Result: {res3.percentageChange.toFixed(2)}% ({res3.type})
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="prose max-w-none">
            <h2>How to Use</h2>
            <p>Our percentage calculator provides three main functions: determining the percentage of a number, finding what percentage one number is of another, and calculating the percentage change between two values.</p>
            <h2>FAQ</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>What does percent mean?</AccordionTrigger>
                <AccordionContent>Percent means 'per 100'. So 50% means 50 per 100 or half.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>How to calculate percentage change?</AccordionTrigger>
                <AccordionContent>Subtract the old value from the new value, divide by the old value, and multiply by 100.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>Can percentages be negative?</AccordionTrigger>
                <AccordionContent>A percentage change can be negative, indicating a decrease.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>How to add 20% to a price?</AccordionTrigger>
                <AccordionContent>Multiply the price by 1.20.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>What is 100% increase?</AccordionTrigger>
                <AccordionContent>A 100% increase means the value has doubled.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-4"><Card><CardHeader><CardTitle>Quick Links</CardTitle></CardHeader></Card></div>
      </div>
    </div>
  );
}

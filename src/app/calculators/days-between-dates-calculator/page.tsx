'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateDaysBetween } from '@/lib/calculators/daysBetween';
import PageSEO from '@/components/seo/PageSEO';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function DaysBetweenCalculator() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [includeEnd, setIncludeEnd] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (start && end) {
      setResult(calculateDaysBetween(new Date(start), new Date(end), includeEnd));
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <PageSEO title="Days Between Dates | CalcHub" description="Calculate the exact number of days between two dates." />
      <h1 className="text-3xl font-bold mb-4">Days Between Dates Calculator</h1>
      <p className="mb-8 text-gray-600">Find out exactly how many days are between two dates.</p>
      
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card>
            <CardHeader><CardTitle>Calculator</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Start Date</Label><Input type="date" value={start} onChange={e => setStart(e.target.value)} /></div>
              <div><Label>End Date</Label><Input type="date" value={end} onChange={e => setEnd(e.target.value)} /></div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={includeEnd} onChange={e => setIncludeEnd(e.target.checked)} id="inc" />
                <Label htmlFor="inc">Include end date in calculation</Label>
              </div>
              <Button onClick={handleCalculate} className="w-full">Calculate</Button>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader><CardTitle>Result</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="col-span-2 text-3xl font-bold">{result.days} Days</div>
                <Card><CardContent className="pt-4"><div className="font-semibold">Weeks</div><div>{result.weeks}</div></CardContent></Card>
                <Card><CardContent className="pt-4"><div className="font-semibold">Months</div><div>{result.months}</div></CardContent></Card>
                <Card><CardContent className="pt-4"><div className="font-semibold">Business Days</div><div>{result.businessDays}</div></CardContent></Card>
                <Card><CardContent className="pt-4"><div className="font-semibold">Weekend Days</div><div>{result.weekendDays}</div></CardContent></Card>
              </CardContent>
            </Card>
          )}

          <div className="prose max-w-none">
            <h2>How to Use</h2>
            <p>Simply enter a start and end date to determine the duration between them. The "Include end date" checkbox adds one day to the result.</p>
            <h2>FAQ</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>What are business days?</AccordionTrigger>
                <AccordionContent>Business days are Monday through Friday, excluding weekends.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>Does it account for time zones?</AccordionTrigger>
                <AccordionContent>It generally calculates based on local time boundaries.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>What if I enter dates in reverse order?</AccordionTrigger>
                <AccordionContent>The calculator handles this and will still provide the absolute difference in days.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>Are leap years considered?</AccordionTrigger>
                <AccordionContent>Yes, February 29th is accurately accounted for.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>Can I subtract days from a date?</AccordionTrigger>
                <AccordionContent>We have a separate date modifier calculator for that purpose.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-4"><Card><CardHeader><CardTitle>Quick Links</CardTitle></CardHeader></Card></div>
      </div>
    </div>
  );
}

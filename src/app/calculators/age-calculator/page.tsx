'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateAge } from '@/lib/calculators/age';
import PageSEO from '@/components/seo/PageSEO';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (dob && targetDate) {
      setResult(calculateAge(new Date(dob), new Date(targetDate)));
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <PageSEO title="Age Calculator | CalcHub" description="Calculate your exact age in years, months, and days." />
      <h1 className="text-3xl font-bold mb-4">Age Calculator</h1>
      <p className="mb-8 text-gray-600">Calculate your exact age in years, months, and days.</p>
      
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card>
            <CardHeader><CardTitle>Calculator</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Date of Birth</Label><Input type="date" value={dob} onChange={e => setDob(e.target.value)} /></div>
              <div><Label>Calculate To</Label><Input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} /></div>
              <Button onClick={handleCalculate} className="w-full">Calculate Age</Button>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader><CardTitle>Result</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="col-span-2 text-2xl font-bold">{result.years} Years, {result.months} Months, {result.days} Days</div>
                <Card><CardContent className="pt-4"><div className="font-semibold">Total Days</div><div>{result.totalDays}</div></CardContent></Card>
                <Card><CardContent className="pt-4"><div className="font-semibold">Total Weeks</div><div>{result.totalWeeks}</div></CardContent></Card>
                <Card><CardContent className="pt-4"><div className="font-semibold">Total Months</div><div>{result.totalMonths}</div></CardContent></Card>
                <Card><CardContent className="pt-4"><div className="font-semibold">Zodiac Sign</div><div>{result.zodiacSign}</div></CardContent></Card>
              </CardContent>
            </Card>
          )}

          <div className="prose max-w-none">
            <h2>About Age Calculator</h2>
            <p>Our age calculator calculates your exact age from your date of birth to the current date or a custom date.</p>
            <h2>FAQ</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>Does the calculator include leap years?</AccordionTrigger>
                <AccordionContent>Yes, it automatically accounts for leap years.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>Can I calculate age in the future?</AccordionTrigger>
                <AccordionContent>Yes, just change the "Calculate To" date to a future date.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>How is the Zodiac Sign determined?</AccordionTrigger>
                <AccordionContent>It is determined by the month and day of your birth date.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>What is chronological age?</AccordionTrigger>
                <AccordionContent>Chronological age is the amount of time that has passed from your birth to a given date.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>Are the end dates inclusive?</AccordionTrigger>
                <AccordionContent>Typically it calculates the difference, similar to subtracting two dates.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-4"><Card><CardHeader><CardTitle>Quick Links</CardTitle></CardHeader></Card></div>
      </div>
    </div>
  );
}

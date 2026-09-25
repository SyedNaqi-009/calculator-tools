'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { calculateCGPA } from '@/lib/calculators/cgpa';
import PageSEO from '@/components/seo/PageSEO';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function CGPACalculator() {
  const [semesters, setSemesters] = useState([{ id: '1', name: 'Sem 1', gpa: 8.0, credits: 20 }]);
  const [result, setResult] = useState<any>(null);

  const handleAdd = () => setSemesters([...semesters, { id: String(Date.now()), name: `Sem ${semesters.length + 1}`, gpa: 8.0, credits: 20 }]);
  
  const handleCalculate = () => {
    setResult(calculateCGPA(semesters));
  };

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <PageSEO title="CGPA Calculator | CalcHub" description="Calculate your Cumulative Grade Point Average (CGPA)." />
      <h1 className="text-3xl font-bold mb-4">CGPA Calculator</h1>
      <p className="mb-8 text-gray-600">Calculate your cumulative GPA across multiple semesters.</p>
      
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card>
            <CardHeader><CardTitle>Semesters</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {semesters.map((s, i) => (
                <div key={i} className="flex gap-4">
                  <Input placeholder="Semester" value={s.name} onChange={e => { const n = [...semesters]; n[i].name = e.target.value; setSemesters(n); }} />
                  <Input type="number" placeholder="GPA" value={s.gpa} onChange={e => { const n = [...semesters]; n[i].gpa = parseFloat(e.target.value); setSemesters(n); }} />
                  <Input type="number" placeholder="Credits" value={s.credits} onChange={e => { const n = [...semesters]; n[i].credits = parseFloat(e.target.value); setSemesters(n); }} />
                </div>
              ))}
              <Button variant="outline" onClick={handleAdd}>Add Semester</Button>
              <Button onClick={handleCalculate} className="w-full">Calculate CGPA</Button>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader><CardTitle>Result</CardTitle></CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{result.cgpa.toFixed(2)}</div>
                <p>Percentage: {(result.cgpa * 9.5).toFixed(2)}%</p>
                <p>Total Credits: {result.totalCredits}</p>
              </CardContent>
            </Card>
          )}

          <div className="prose max-w-none">
            <h2>Formula</h2>
            <p>CGPA is calculated by multiplying each semester's GPA by its respective credits, summing these products, and then dividing by the total number of credits across all semesters.</p>
            <h2>FAQ</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>What is CGPA?</AccordionTrigger>
                <AccordionContent>Cumulative Grade Point Average is the average of Grade Points obtained in all semesters.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>How to convert CGPA to percentage?</AccordionTrigger>
                <AccordionContent>Generally, for Indian standard systems, percentage = CGPA × 9.5.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>Is CGPA out of 10?</AccordionTrigger>
                <AccordionContent>In many systems it is out of 10, but it can also be out of 4 depending on your university.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>What is a good CGPA?</AccordionTrigger>
                <AccordionContent>Usually an 8.0 or higher is considered a very good CGPA.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>How do credits affect CGPA?</AccordionTrigger>
                <AccordionContent>A semester with more credits will have a higher weight in the final CGPA calculation.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-4"><Card><CardHeader><CardTitle>Quick Links</CardTitle></CardHeader></Card></div>
      </div>
    </div>
  );
}

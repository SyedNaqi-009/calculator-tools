'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calculateBMI, lbsToKg, ftInToCm } from '@/lib/calculators/bmi';
import { Badge } from '@/components/ui/badge';
import PageSEO from '@/components/seo/PageSEO';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function BMICalculator() {
  const [unit, setUnit] = useState('metric');
  const [weight, setWeight] = useState('70');
  const [heightCm, setHeightCm] = useState('175');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('9');
  const [result, setResult] = useState<any>(() => calculateBMI(70, 175));

  const handleCalculate = () => {
    let w = parseFloat(weight);
    let h = 0;
    if (unit === 'imperial') {
      w = lbsToKg(w);
      h = ftInToCm(parseFloat(heightFt) || 0, parseFloat(heightIn) || 0);
    } else {
      h = parseFloat(heightCm);
    }
    if (w > 0 && h > 0) {
      setResult(calculateBMI(w, h));
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <PageSEO title="BMI Calculator | CalcHub" description="Calculate your Body Mass Index (BMI)." />
      <h1 className="text-3xl font-bold mb-4">BMI Calculator</h1>
      <p className="mb-8 text-gray-600">Calculate your Body Mass Index (BMI) to determine if you are at a healthy weight.</p>
      
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card>
            <CardHeader><CardTitle>Calculator</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Unit System</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                    <SelectItem value="imperial">Imperial (lbs, ft/in)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Weight ({unit === 'metric' ? 'kg' : 'lbs'})</Label>
                <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
              </div>
              {unit === 'metric' ? (
                <div>
                  <Label>Height (cm)</Label>
                  <Input type="number" value={heightCm} onChange={e => setHeightCm(e.target.value)} />
                </div>
              ) : (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label>Height (ft)</Label>
                    <Input type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)} />
                  </div>
                  <div className="flex-1">
                    <Label>Height (in)</Label>
                    <Input type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} />
                  </div>
                </div>
              )}
              <Button onClick={handleCalculate} className="w-full">Calculate BMI</Button>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader><CardTitle>Result</CardTitle></CardHeader>
              <CardContent>
                <div className="text-4xl font-mono font-bold mb-2">{result.bmi.toFixed(1)}</div>
                <Badge className="mb-4">{result.category}</Badge>
                <p>Healthy weight range: {result.healthyWeightRange.min.toFixed(1)} - {result.healthyWeightRange.max.toFixed(1)} kg</p>
                <div className="h-4 w-full bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-full mt-4 relative">
                  <div className="absolute top-0 bottom-0 w-2 bg-black rounded-full -ml-1" style={{ left: `${Math.min(Math.max((result.bmi - 15) / 25 * 100, 0), 100)}%` }}></div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="prose max-w-none">
            <h2>How to Use</h2>
            <p>Enter your weight and height. Choose between metric or imperial units. Click calculate to see your BMI. The Body Mass Index (BMI) calculator provides a general idea of whether you're at a healthy weight.</p>
            <h2>Formula</h2>
            <p>BMI = weight(kg) / height(m)²</p>
            <h2>FAQ</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>What is a good BMI?</AccordionTrigger>
                <AccordionContent>A normal BMI is between 18.5 and 24.9.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>Is BMI accurate for everyone?</AccordionTrigger>
                <AccordionContent>BMI is not perfect, it does not distinguish between muscle and fat mass.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>What if my BMI is over 25?</AccordionTrigger>
                <AccordionContent>A BMI over 25 indicates you may be overweight. Consult a doctor for more details.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>Can I calculate BMI for children?</AccordionTrigger>
                <AccordionContent>For children, BMI percentiles are used instead of standard adult ranges.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>How often should I check my BMI?</AccordionTrigger>
                <AccordionContent>Checking your BMI occasionally is fine, but weight can fluctuate daily.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-4">
           <Card>
             <CardHeader><CardTitle>Quick Links</CardTitle></CardHeader>
             <CardContent><p>Popular Calculators: Calorie, BMR, TDEE</p></CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

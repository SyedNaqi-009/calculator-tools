'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calculateCalories } from '@/lib/calculators/calorie';
import PageSEO from '@/components/seo/PageSEO';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function CalorieCalculator() {
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [activity, setActivity] = useState('sedentary');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
      setResult(calculateCalories(
        parseInt(age) || 30,
        gender as "male" | "female",
        parseFloat(weight) || 70,
        parseFloat(height) || 175,
        activity as any
      ));
  };

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <PageSEO title="Calorie Calculator | CalcHub" description="Calculate your daily calorie needs." />
      <h1 className="text-3xl font-bold mb-4">Calorie Calculator</h1>
      <p className="mb-8 text-gray-600">Calculate your daily maintenance calories and weight loss/gain targets.</p>
      
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card>
            <CardHeader><CardTitle>Calculator</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Age</Label><Input type="number" value={age} onChange={e => setAge(e.target.value)} /></div>
              <div>
                <Label>Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Weight (kg)</Label><Input type="number" value={weight} onChange={e => setWeight(e.target.value)} /></div>
              <div><Label>Height (cm)</Label><Input type="number" value={height} onChange={e => setHeight(e.target.value)} /></div>
              <div>
                <Label>Activity Level</Label>
                <Select value={activity} onValueChange={setActivity}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="light">Light Activity</SelectItem>
                    <SelectItem value="moderate">Moderate Activity</SelectItem>
                    <SelectItem value="active">Very Active</SelectItem>
                    <SelectItem value="extraActive">Extra Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCalculate} className="w-full">Calculate Calories</Button>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader><CardTitle>Result</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <p><strong>BMR:</strong> {Math.round(result.bmr)} kcal</p>
                <p><strong>Maintenance:</strong> {Math.round(result.maintenance)} kcal</p>
                <p><strong>Weight Loss (0.5kg/week):</strong> {Math.round(result.weightLoss)} kcal</p>
                <p><strong>Weight Gain (0.5kg/week):</strong> {Math.round(result.weightGain)} kcal</p>
              </CardContent>
            </Card>
          )}

          <div className="prose max-w-none">
            <h2>Formula</h2>
            <p>This calculator uses the Mifflin-St Jeor equation to find your Basal Metabolic Rate (BMR), and then multiplies it by an activity factor to determine your Total Daily Energy Expenditure (TDEE).</p>
            <h2>FAQ</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>What is BMR?</AccordionTrigger>
                <AccordionContent>Basal Metabolic Rate is the number of calories your body needs to function at rest.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>How many calories to lose weight?</AccordionTrigger>
                <AccordionContent>A general rule is a 500 calorie deficit per day to lose 1 lb per week.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>Is the Mifflin-St Jeor equation accurate?</AccordionTrigger>
                <AccordionContent>It is considered one of the most accurate equations for estimating BMR.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>Should I eat my exercise calories back?</AccordionTrigger>
                <AccordionContent>It depends on your goals, but typically activity is already factored into your TDEE.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>How can I track my calories?</AccordionTrigger>
                <AccordionContent>You can use apps like MyFitnessPal or Cronometer.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-4">
          <Card><CardHeader><CardTitle>Quick Links</CardTitle></CardHeader></Card>
        </div>
      </div>
    </div>
  );
}

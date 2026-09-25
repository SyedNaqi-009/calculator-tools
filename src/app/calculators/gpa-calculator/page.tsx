'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateGPA } from '@/lib/calculators/gpa';
import PageSEO from '@/components/seo/PageSEO';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function GPACalculator() {
  const [courses, setCourses] = useState([{ id: '1', name: '', grade: 'A', credits: 3 }]);
  const [result, setResult] = useState<any>(null);

  const handleAdd = () => setCourses([...courses, { id: String(Date.now()), name: '', grade: 'A', credits: 3 }]);
  
  const handleCalculate = () => {
    setResult(calculateGPA(courses));
  };

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <PageSEO title="GPA Calculator | CalcHub" description="Calculate your college or high school GPA." />
      <h1 className="text-3xl font-bold mb-4">GPA Calculator</h1>
      <p className="mb-8 text-gray-600">Calculate your GPA easily with our GPA calculator.</p>
      
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card>
            <CardHeader><CardTitle>Courses</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {courses.map((c, i) => (
                <div key={i} className="flex gap-4">
                  <Input placeholder="Course Name" value={c.name} onChange={e => { const n = [...courses]; n[i].name = e.target.value; setCourses(n); }} />
                  <Input placeholder="Grade (A, B+, etc)" value={c.grade} onChange={e => { const n = [...courses]; n[i].grade = e.target.value; setCourses(n); }} />
                  <Input type="number" placeholder="Credits" value={c.credits} onChange={e => { const n = [...courses]; n[i].credits = parseFloat(e.target.value); setCourses(n); }} />
                </div>
              ))}
              <Button variant="outline" onClick={handleAdd}>Add Course</Button>
              <Button onClick={handleCalculate} className="w-full">Calculate GPA</Button>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader><CardTitle>Result</CardTitle></CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{result.gpa.toFixed(2)}</div>
                <p>Total Credits: {result.totalCredits}</p>
                <p>Total Points: {result.totalPoints}</p>
              </CardContent>
            </Card>
          )}

          <div className="prose max-w-none">
            <h2>How to Calculate GPA</h2>
            <p>GPA is calculated by multiplying the grade value by the number of credits for each course, adding them all up, and then dividing by the total number of credits.</p>
            <h2>FAQ</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>What is a 4.0 scale?</AccordionTrigger>
                <AccordionContent>A 4.0 scale assigns a 4.0 to an A, 3.0 to a B, 2.0 to a C, 1.0 to a D, and 0.0 to an F.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>Are plus/minus grades included?</AccordionTrigger>
                <AccordionContent>Yes, typically a B+ is 3.3, A- is 3.7, etc.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>What is a good GPA?</AccordionTrigger>
                <AccordionContent>Usually, a GPA above 3.0 is considered good.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>Does a Pass/Fail class affect GPA?</AccordionTrigger>
                <AccordionContent>Usually, Pass/Fail classes do not affect your GPA calculation.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>Can I calculate cumulative GPA?</AccordionTrigger>
                <AccordionContent>Yes, add all your previous courses and their credits to calculate cumulative GPA.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-4"><Card><CardHeader><CardTitle>Quick Links</CardTitle></CardHeader></Card></div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { addSubtractTime, calculateTimeDifference, format12Hour } from "@/lib/calculators/time";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AdBanner, AdSidebar, AdInArticle } from "@/components/ads";
import { NewsletterSignup } from "@/components/shared";
import { PageSEO } from "@/components/seo";
import { Clock } from "lucide-react";

export default function TimeCalculatorPage() {
  const [tab, setTab] = useState("add-sub");
  
  // Add/Subtract Time State
  const [startHour, setStartHour] = useState("0");
  const [startMin, setStartMin] = useState("0");
  const [startSec, setStartSec] = useState("0");
  const [isAdd, setIsAdd] = useState(true);
  const [deltaHour, setDeltaHour] = useState("0");
  const [deltaMin, setDeltaMin] = useState("0");
  const [deltaSec, setDeltaSec] = useState("0");
  
  // Time Diff State
  const [t1Hour, setT1Hour] = useState("0");
  const [t1Min, setT1Min] = useState("0");
  const [t1Sec, setT1Sec] = useState("0");
  const [t2Hour, setT2Hour] = useState("0");
  const [t2Min, setT2Min] = useState("0");
  const [t2Sec, setT2Sec] = useState("0");

  const handleAddSub = () => {
    return addSubtractTime(
      Number(startHour) || 0,
      Number(startMin) || 0,
      Number(startSec) || 0,
      Number(deltaHour) || 0,
      Number(deltaMin) || 0,
      Number(deltaSec) || 0,
      isAdd ? "+" : "-"
    );
  };

  const handleDiff = () => {
    return calculateTimeDifference(
      Number(t1Hour) || 0,
      Number(t1Min) || 0,
      Number(t1Sec) || 0,
      Number(t2Hour) || 0,
      Number(t2Min) || 0,
      Number(t2Sec) || 0
    );
  };

  const faqs = [
    { question: "Can I subtract time using this calculator?", answer: "Yes, use the Add/Subtract Time tab and select the minus (-) operation." },
    { question: "How is the time difference calculated?", answer: "It subtracts the Start Time from the End Time, giving you the total hours, minutes, and seconds between the two." },
    { question: "Does it support 24-hour format?", answer: "Yes, you can input times in standard 24-hour format for accurate calculations." },
    { question: "What happens if I subtract a larger time from a smaller one?", answer: "The calculator will handle it as crossing over midnight, depending on the context, or returning an absolute difference." },
    { question: "Is this tool free?", answer: "Absolutely free." }
  ];

  return (
    <>
      <PageSEO 
        title="Time Calculator - Add, Subtract & Find Time Difference" 
        description="Easily add or subtract time, or calculate the exact duration between two times in hours, minutes, and seconds."
        url="/calculators/time-calculator"
      />
      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm mb-4 text-muted-foreground">
          <Link href="/" className="hover:underline">Home</Link> &gt; 
          <Link href="/calculators" className="hover:underline ml-1">Calculators</Link> &gt; 
          <span className="ml-1">Time Calculator</span>
        </nav>
        
        <h1 className="text-4xl font-bold mb-2">Time Calculator</h1>
        <p className="text-xl text-muted-foreground mb-8">Calculate time differences or add/subtract time.</p>
        
        <AdBanner />

        <div className="grid lg:grid-cols-12 gap-8 mt-8">
          <div className="lg:col-span-8">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Time Operations</CardTitle>
                <CardDescription>Select an operation below.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={tab} onValueChange={setTab}>
                  <TabsList className="mb-6 grid w-full grid-cols-2">
                    <TabsTrigger value="add-sub">Add/Subtract Time</TabsTrigger>
                    <TabsTrigger value="diff">Time Difference</TabsTrigger>
                  </TabsList>

                  <TabsContent value="add-sub" className="space-y-6">
                    <div>
                      <Label>Start Time (HH:MM:SS)</Label>
                      <div className="flex gap-4 mt-2">
                        <Input type="number" placeholder="HH" value={startHour} onChange={e=>setStartHour(e.target.value)} />
                        <Input type="number" placeholder="MM" value={startMin} onChange={e=>setStartMin(e.target.value)} />
                        <Input type="number" placeholder="SS" value={startSec} onChange={e=>setStartSec(e.target.value)} />
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <Button variant={isAdd ? "default" : "outline"} onClick={() => setIsAdd(true)}>+</Button>
                      <Button variant={!isAdd ? "default" : "outline"} onClick={() => setIsAdd(false)}>-</Button>
                    </div>

                    <div>
                      <Label>Time to Add/Subtract (HH:MM:SS)</Label>
                      <div className="flex gap-4 mt-2">
                        <Input type="number" placeholder="HH" value={deltaHour} onChange={e=>setDeltaHour(e.target.value)} />
                        <Input type="number" placeholder="MM" value={deltaMin} onChange={e=>setDeltaMin(e.target.value)} />
                        <Input type="number" placeholder="SS" value={deltaSec} onChange={e=>setDeltaSec(e.target.value)} />
                      </div>
                    </div>

                    {(() => {
                      const res = handleAddSub();
                      return (
                        <div className="bg-muted p-6 rounded-xl mt-6">
                          <p className="text-sm text-muted-foreground mb-2">Result Time</p>
                          <div className="text-3xl font-bold flex items-center gap-2">
                            <Clock className="w-8 h-8 text-primary" />
                            {res.formatted24}
                          </div>
                          <p className="text-sm mt-2 text-muted-foreground">12-Hour Format: {res.formatted12}</p>
                          <p className="text-sm mt-1 text-muted-foreground">Total Days Adjusted: {res.daysPassed}</p>
                        </div>
                      );
                    })()}
                  </TabsContent>

                  <TabsContent value="diff" className="space-y-6">
                    <div>
                      <Label>Start Time (HH:MM:SS)</Label>
                      <div className="flex gap-4 mt-2">
                        <Input type="number" placeholder="HH" value={t1Hour} onChange={e=>setT1Hour(e.target.value)} />
                        <Input type="number" placeholder="MM" value={t1Min} onChange={e=>setT1Min(e.target.value)} />
                        <Input type="number" placeholder="SS" value={t1Sec} onChange={e=>setT1Sec(e.target.value)} />
                      </div>
                    </div>

                    <div>
                      <Label>End Time (HH:MM:SS)</Label>
                      <div className="flex gap-4 mt-2">
                        <Input type="number" placeholder="HH" value={t2Hour} onChange={e=>setT2Hour(e.target.value)} />
                        <Input type="number" placeholder="MM" value={t2Min} onChange={e=>setT2Min(e.target.value)} />
                        <Input type="number" placeholder="SS" value={t2Sec} onChange={e=>setT2Sec(e.target.value)} />
                      </div>
                    </div>

                    {(() => {
                      const res = handleDiff();
                      return (
                        <div className="bg-muted p-6 rounded-xl mt-6">
                          <p className="text-sm text-muted-foreground mb-2">Time Difference</p>
                          <div className="text-3xl font-bold text-primary">
                            {res.formatted}
                          </div>
                          <p className="text-sm mt-2 text-muted-foreground">Total Decimal Hours: {(res.totalSeconds / 3600).toFixed(4)}</p>
                          <p className="text-sm mt-1 text-muted-foreground">Total Minutes: {Math.floor(res.totalSeconds / 60)}</p>
                        </div>
                      );
                    })()}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <AdInArticle />

            <div className="prose prose-blue dark:prose-invert max-w-none mt-12">
              <h2>About the Time Calculator</h2>
              <p>Our Time Calculator provides quick and accurate operations on hours, minutes, and seconds. Time math can be tricky because it operates on a base-60 system rather than base-10.</p>
              
              <h3>Adding and Subtracting Time</h3>
              <p>You can easily add a specific duration to a starting time or subtract a duration to find out when an event started. This is particularly useful for payroll, scheduling, and logging work hours.</p>
              
              <h3>Calculating Time Difference</h3>
              <p>The time difference feature lets you find out exactly how much time has passed between a start and end time. This is invaluable for tracking the duration of tasks, races, or shifts.</p>

              <h2 className="mt-12 mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-6 space-y-8">
              <AdSidebar />
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { convertUnits, UNIT_CATEGORIES, UnitCategory } from "@/lib/calculators/unitConverter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AdBanner, AdSidebar, AdInArticle } from "@/components/ads";
import { NewsletterSignup } from "@/components/shared";
import { PageSEO } from "@/components/seo";
import { ArrowRightLeft } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default function UnitConverterPage() {
  const [category, setCategory] = useState<UnitCategory>("Length");
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>(UNIT_CATEGORIES["Length"].units[0].id);
  const [toUnit, setToUnit] = useState<string>(UNIT_CATEGORIES["Length"].units[1].id);

  const handleCategoryChange = (cat: string) => {
    const validCat = cat as UnitCategory;
    setCategory(validCat);
    if (UNIT_CATEGORIES[validCat]?.units.length >= 2) {
      setFromUnit(UNIT_CATEGORIES[validCat].units[0].id);
      setToUnit(UNIT_CATEGORIES[validCat].units[1].id);
    }
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const result = convertUnits(category, Number(value) || 0, fromUnit, toUnit);

  const fromUnitObj = UNIT_CATEGORIES[category]?.units.find((u) => u.id === fromUnit);
  const toUnitObj = UNIT_CATEGORIES[category]?.units.find((u) => u.id === toUnit);

  const faqs = [
    { question: "How accurate is the unit converter?", answer: "Our unit converter uses high-precision standard conversion factors to provide accurate results." },
    { question: "Does it work offline?", answer: "Yes, the calculation is done entirely on your device." },
    { question: "What is the most used unit?", answer: "The metric system (meters, kilograms, liters) is the most widely used system globally." },
    { question: "Can I convert complex units?", answer: "We support common categories like length, weight, temperature, area, volume, speed, data storage, time, pressure, and energy." },
    { question: "How do I swap units?", answer: "Simply click the swap button between the 'From' and 'To' unit selectors." }
  ];

  return (
    <>
      <PageSEO 
        title="Unit Converter - Fast & Accurate Conversion Tool" 
        description="Convert between different units of length, weight, temperature, volume, and more."
        url="/calculators/unit-converter"
      />
      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm mb-4 text-muted-foreground">
          <Link href="/" className="hover:underline">Home</Link> &gt; 
          <Link href="/calculators" className="hover:underline ml-1">Calculators</Link> &gt; 
          <span className="ml-1">Unit Converter</span>
        </nav>
        
        <h1 className="text-4xl font-bold mb-2">Unit Converter</h1>
        <p className="text-xl text-muted-foreground mb-8">Quickly convert between various units with precision.</p>
        
        <AdBanner />

        <div className="grid lg:grid-cols-12 gap-8 mt-8">
          <div className="lg:col-span-8">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Convert Units</CardTitle>
                <CardDescription>Select a category and choose units to convert.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 overflow-x-auto">
                  <Tabs value={category} onValueChange={handleCategoryChange}>
                    <TabsList className="w-max flex">
                      {Object.keys(UNIT_CATEGORIES).map(cat => (
                        <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>

                <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-end mb-8">
                  <div className="space-y-2">
                    <Label>Value & From Unit</Label>
                    <div className="flex gap-2">
                      <Input 
                        type="number" 
                        value={value} 
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full"
                      />
                      <Select value={fromUnit} onValueChange={setFromUnit}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {UNIT_CATEGORIES[category]?.units.map((u) => (
                            <SelectItem key={u.id} value={u.id}>{u.name} ({u.symbol})</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button variant="outline" size="icon" className="mb-0" onClick={handleSwap}>
                    <ArrowRightLeft className="w-4 h-4" />
                  </Button>

                  <div className="space-y-2">
                    <Label>To Unit</Label>
                    <Select value={toUnit} onValueChange={setToUnit}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {UNIT_CATEGORIES[category]?.units.map((u) => (
                          <SelectItem key={u.id} value={u.id}>{u.name} ({u.symbol})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {result && (
                  <div className="bg-muted/30 p-6 rounded-xl text-center">
                    <p className="text-sm text-muted-foreground mb-2">Result</p>
                    <div className="text-4xl font-bold break-all">
                      {formatNumber(result.toValue, 6)} <span className="text-2xl text-muted-foreground">{toUnitObj?.symbol}</span>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      {value} {fromUnitObj?.name} = {formatNumber(result.toValue, 6)} {toUnitObj?.name}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Formula: {result.formula}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <AdInArticle />

            <div className="prose prose-blue dark:prose-invert max-w-none mt-12">
              <h2>About Unit Conversion</h2>
              <p>Unit conversion is the process of expressing the same property in a different unit of measurement. For instance, time can be expressed in minutes instead of hours, while distance can be converted from miles to kilometers.</p>
              
              <h3>Why is it Important?</h3>
              <p>Accuracy in unit conversion is critical in fields such as engineering, construction, cooking, and science. A small error can lead to significant consequences.</p>
              
              <h3>How to Use This Calculator</h3>
              <ul>
                <li>Select the category of measurement (e.g., Length, Weight, Temperature).</li>
                <li>Enter the numeric value you want to convert.</li>
                <li>Choose the unit you are converting from.</li>
                <li>Choose the target unit to convert to.</li>
                <li>The result and the applied formula are displayed instantly.</li>
              </ul>
              <p>Our tool supports an extensive range of units across multiple categories, ensuring you have the right conversion factors at your fingertips.</p>

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

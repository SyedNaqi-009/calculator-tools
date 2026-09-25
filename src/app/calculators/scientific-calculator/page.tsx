"use client";

import { useState } from "react";
import Link from "next/link";
import { evaluateMathExpression } from "@/lib/calculators/scientific";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AdBanner, AdSidebar, AdInArticle } from "@/components/ads";
import { NewsletterSignup } from "@/components/shared";
import { PageSEO } from "@/components/seo";

export default function ScientificCalculatorPage() {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [angleMode, setAngleMode] = useState<"DEG" | "RAD">("DEG");

  const handlePress = (val: string) => {
    setExpression((prev) => prev + val);
  };

  const handleCalculate = () => {
    try {
      if (!expression) return;
      const res = evaluateMathExpression(expression);
      setResult(res.toString());
    } catch (e) {
      setResult("Error");
    }
  };

  const handleClear = () => {
    setExpression("");
    setResult("");
  };

  const handleDelete = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const toggleAngleMode = () => {
    setAngleMode(prev => prev === "DEG" ? "RAD" : "DEG");
  };

  const faqs = [
    { question: "What functions does this scientific calculator support?", answer: "It supports basic arithmetic, trigonometric functions (sin, cos, tan), logarithms, roots, and exponents." },
    { question: "Can I use my keyboard?", answer: "Yes, you can type basic operations directly on your keyboard." },
    { question: "How do I switch between degrees and radians?", answer: "Click the DEG/RAD toggle button to switch modes for trigonometric calculations." },
    { question: "What does 'Error' mean?", answer: "Error indicates an invalid mathematical expression, such as dividing by zero or an unmatched parenthesis." },
    { question: "Is this calculator free?", answer: "Yes, our online scientific calculator is entirely free to use." }
  ];

  return (
    <>
      <PageSEO 
        title="Scientific Calculator Online" 
        description="Free online scientific calculator with advanced functions for math, science, and engineering."
        url="/calculators/scientific-calculator"
      />
      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm mb-4 text-muted-foreground">
          <Link href="/" className="hover:underline">Home</Link> &gt; 
          <Link href="/calculators" className="hover:underline ml-1">Calculators</Link> &gt; 
          <span className="ml-1">Scientific Calculator</span>
        </nav>
        
        <h1 className="text-4xl font-bold mb-2">Scientific Calculator</h1>
        <p className="text-xl text-muted-foreground mb-8">Perform complex mathematical computations.</p>
        
        <AdBanner />

        <div className="grid lg:grid-cols-12 gap-8 mt-8">
          <div className="lg:col-span-8">
            <Card className="mb-8 max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="bg-muted p-4 rounded-xl mb-4 min-h-[100px] flex flex-col justify-end items-end font-mono">
                  <div className="text-lg text-muted-foreground truncate w-full text-right">{expression || "0"}</div>
                  <div className="text-4xl font-bold text-primary truncate w-full text-right">{result || "="}</div>
                </div>

                <div className="flex gap-2 mb-4">
                  <Button variant="outline" size="sm" onClick={toggleAngleMode} className="w-16">
                    {angleMode}
                  </Button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  <Button variant="secondary" onClick={() => handlePress("sin(")}>sin</Button>
                  <Button variant="secondary" onClick={() => handlePress("cos(")}>cos</Button>
                  <Button variant="secondary" onClick={() => handlePress("tan(")}>tan</Button>
                  <Button variant="outline" onClick={() => handlePress("(")}>(</Button>
                  <Button variant="outline" onClick={() => handlePress(")")}>)</Button>

                  <Button variant="secondary" onClick={() => handlePress("asin(")}>asin</Button>
                  <Button variant="secondary" onClick={() => handlePress("acos(")}>acos</Button>
                  <Button variant="secondary" onClick={() => handlePress("atan(")}>atan</Button>
                  <Button variant="secondary" onClick={() => handlePress("log(")}>log</Button>
                  <Button variant="secondary" onClick={() => handlePress("ln(")}>ln</Button>

                  <Button variant="secondary" onClick={() => handlePress("sqrt(")}>√</Button>
                  <Button variant="secondary" onClick={() => handlePress("^")}>^</Button>
                  <Button variant="secondary" onClick={() => handlePress("pi")}>π</Button>
                  <Button variant="secondary" onClick={() => handlePress("e")}>e</Button>
                  <Button variant="secondary" onClick={() => handlePress("!")}>n!</Button>

                  <Button onClick={() => handlePress("7")} variant="outline" className="text-lg">7</Button>
                  <Button onClick={() => handlePress("8")} variant="outline" className="text-lg">8</Button>
                  <Button onClick={() => handlePress("9")} variant="outline" className="text-lg">9</Button>
                  <Button onClick={() => handleDelete()} variant="destructive">⌫</Button>
                  <Button onClick={() => handleClear()} variant="destructive">AC</Button>

                  <Button onClick={() => handlePress("4")} variant="outline" className="text-lg">4</Button>
                  <Button onClick={() => handlePress("5")} variant="outline" className="text-lg">5</Button>
                  <Button onClick={() => handlePress("6")} variant="outline" className="text-lg">6</Button>
                  <Button onClick={() => handlePress("*")} variant="default" className="text-lg">×</Button>
                  <Button onClick={() => handlePress("/")} variant="default" className="text-lg">÷</Button>

                  <Button onClick={() => handlePress("1")} variant="outline" className="text-lg">1</Button>
                  <Button onClick={() => handlePress("2")} variant="outline" className="text-lg">2</Button>
                  <Button onClick={() => handlePress("3")} variant="outline" className="text-lg">3</Button>
                  <Button onClick={() => handlePress("+")} variant="default" className="text-lg">+</Button>
                  <Button onClick={() => handlePress("-")} variant="default" className="text-lg">-</Button>

                  <Button onClick={() => handlePress("0")} variant="outline" className="col-span-2 text-lg">0</Button>
                  <Button onClick={() => handlePress(".")} variant="outline" className="text-lg">.</Button>
                  <Button onClick={() => handleCalculate()} variant="default" className="col-span-2 text-lg font-bold">=</Button>
                </div>
              </CardContent>
            </Card>

            <AdInArticle />

            <div className="prose prose-blue dark:prose-invert max-w-none mt-12">
              <h2>About Scientific Calculators</h2>
              <p>A scientific calculator is an essential tool for students, engineers, and scientists. It goes beyond basic arithmetic to provide advanced functions such as trigonometry, logarithms, and exponential calculations.</p>
              
              <h3>Key Features</h3>
              <ul>
                <li><strong>Trigonometric Functions:</strong> Sine, cosine, tangent, and their inverses. Ensure you are in the correct angle mode (Degrees or Radians).</li>
                <li><strong>Logarithms:</strong> Base-10 logs and natural logs (ln).</li>
                <li><strong>Exponents and Roots:</strong> Square roots, arbitrary powers (x^y), and factorials.</li>
                <li><strong>Constants:</strong> Quick access to mathematical constants like pi (π) and Euler's number (e).</li>
              </ul>
              <p>Use the parentheses to properly structure your mathematical expressions, ensuring the correct order of operations.</p>

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

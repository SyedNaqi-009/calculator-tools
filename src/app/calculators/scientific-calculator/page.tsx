"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { evaluateMathExpression } from "@/lib/calculators/scientific";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AdBanner, AdSidebar, AdInArticle } from "@/components/ads";
import { NewsletterSignup } from "@/components/shared";
import { PageSEO } from "@/components/seo";
import { RotateCcw, Delete, History } from "lucide-react";

export default function ScientificCalculatorPage() {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [livePreview, setLivePreview] = useState<string>("");
  const [history, setHistory] = useState<Array<{ expr: string; ans: string }>>([]);
  const [angleMode, setAngleMode] = useState<"DEG" | "RAD">("DEG");
  const [memory, setMemory] = useState<number>(0);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Live preview calculation as user types
  useEffect(() => {
    if (!expression || expression.trim() === "") {
      setLivePreview("");
      return;
    }
    try {
      const res = evaluateMathExpression(expression, angleMode);
      if (!isNaN(res) && isFinite(res) && res.toString() !== expression) {
        setLivePreview(`= ${res}`);
      } else {
        setLivePreview("");
      }
    } catch {
      setLivePreview("");
    }
  }, [expression, angleMode]);

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in another input (e.g. search or newsletter)
      if (document.activeElement && document.activeElement.tagName === "INPUT" && document.activeElement !== inputRef.current) {
        return;
      }

      if (e.key >= "0" && e.key <= "9") {
        handlePress(e.key);
      } else if (["+", "-", "*", "/", "(", ")", "^", "."].includes(e.key)) {
        handlePress(e.key);
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleCalculate();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        handleDelete();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expression, angleMode, isCalculated]);

  const handlePress = (val: string) => {
    if (isCalculated) {
      // If user presses an operator after calculation, continue with the result
      if (["+", "-", "*", "/", "^"].includes(val)) {
        setExpression(result + val);
      } else {
        setExpression(val);
      }
      setIsCalculated(false);
    } else {
      setExpression((prev) => prev + val);
    }
    inputRef.current?.focus();
  };

  const handleCalculate = () => {
    if (!expression || expression.trim() === "") return;
    try {
      const res = evaluateMathExpression(expression, angleMode);
      if (isNaN(res) || !isFinite(res)) {
        setResult("Error");
      } else {
        const resStr = res.toString();
        setResult(resStr);
        setHistory((prev) => [{ expr: expression, ans: resStr }, ...prev.slice(0, 9)]);
        setIsCalculated(true);
      }
    } catch (e) {
      setResult("Error");
    }
  };

  const handleClear = () => {
    setExpression("");
    setResult("");
    setLivePreview("");
    setIsCalculated(false);
  };

  const handleDelete = () => {
    if (isCalculated) {
      handleClear();
      return;
    }
    setExpression((prev) => prev.slice(0, -1));
  };

  const toggleAngleMode = () => {
    setAngleMode((prev) => (prev === "DEG" ? "RAD" : "DEG"));
  };

  // Memory functions
  const memoryAdd = () => {
    const val = parseFloat(result || expression);
    if (!isNaN(val)) setMemory((prev) => prev + val);
  };

  const memorySubtract = () => {
    const val = parseFloat(result || expression);
    if (!isNaN(val)) setMemory((prev) => prev - val);
  };

  const memoryRecall = () => {
    handlePress(memory.toString());
  };

  const memoryClear = () => {
    setMemory(0);
  };

  const faqs = [
    { question: "What functions does this scientific calculator support?", answer: "It supports basic arithmetic (+, -, ×, ÷), trigonometry (sin, cos, tan, asin, acos, atan), logarithms (log, ln), roots (sqrt), powers (^), factorials (!), and constants (π, e)." },
    { question: "Can I use my physical keyboard?", answer: "Yes! You can type numbers, operators (+, -, *, /), parentheses, Backspace, Escape (to clear), and Enter (to calculate) directly on your keyboard." },
    { question: "How do I switch between degrees and radians?", answer: "Click the DEG/RAD toggle button at the top of the calculator to switch between Degrees and Radians." },
    { question: "Does this calculator show live preview?", answer: "Yes! As you type or click buttons, the display immediately shows your full expression in real time, along with a live answer preview." },
    { question: "Is this scientific calculator free?", answer: "Yes, our online scientific calculator is 100% free with unlimited calculations." }
  ];

  return (
    <>
      <PageSEO 
        title="Scientific Calculator Online - Fast & Interactive" 
        description="Free online scientific calculator with live input display, keyboard support, trigonometric functions, exponents, and history."
        url="/calculators/scientific-calculator"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="text-xs mb-6 text-muted-foreground font-mono flex items-center gap-1.5">
          <Link href="/" className="hover:text-primary transition-colors">HOME</Link>
          <span className="opacity-40">/</span>
          <Link href="/calculators" className="hover:text-primary transition-colors">CALCULATORS</Link>
          <span className="opacity-40">/</span>
          <span className="text-foreground font-semibold">SCIENTIFIC CALCULATOR</span>
        </nav>
        
        <div className="max-w-4xl mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[11px] font-mono mb-2">
            <span>ENGINEERING TERMINAL · LIVE KEYBOARD ENABLED</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-2">
            Scientific Math Engine
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Perform high-precision trigonometry, logarithms, power radicals, and algebraic expressions with physical keyboard support.
          </p>
        </div>
        
        <AdBanner />

        <div className="grid lg:grid-cols-12 gap-8 mt-6">
          <div className="lg:col-span-8">
            <Card className="mb-8 max-w-2xl mx-auto border border-border/80 bg-card shadow-[0_4px_24px_-4px_rgb(0_0_0/0.08)] rounded-xl overflow-hidden">
              <CardContent className="p-5 sm:p-7">
                {/* Precision Instrument Display Screen */}
                <div 
                  className="bg-slate-950 text-slate-100 border border-slate-800 rounded-lg p-5 mb-5 font-mono shadow-inner cursor-text focus-within:ring-2 focus-within:ring-primary/80 transition-all"
                  onClick={() => inputRef.current?.focus()}
                >
                  {/* Previous calculation / Status Bar */}
                  <div className="text-xs text-slate-400 min-h-[22px] flex justify-between items-center mb-2 pb-2 border-b border-slate-800/80">
                    <span className="truncate max-w-[260px] sm:max-w-[360px] font-mono text-[11px]">
                      {history.length > 0 ? `${history[0].expr} = ${history[0].ans}` : "RAD/DEG READY"}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-emerald-400 font-mono font-bold tracking-wider">
                        {angleMode}
                      </span>
                      {memory !== 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-amber-400 font-mono font-bold">
                          M: {memory}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Main Expression Input Field */}
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={expression}
                      onChange={(e) => {
                        setExpression(e.target.value);
                        setIsCalculated(false);
                      }}
                      placeholder="0"
                      className="w-full bg-transparent text-right text-3xl sm:text-4xl font-bold text-slate-50 tracking-wider focus:outline-none placeholder:text-slate-700 font-mono tabular-nums"
                      autoFocus
                    />
                  </div>

                  {/* High-Visibility Output Screen */}
                  <div className="min-h-[30px] text-right mt-2 pt-1 border-t border-slate-800/40">
                    {result && isCalculated ? (
                      <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
                        = {result}
                      </div>
                    ) : livePreview ? (
                      <div className="text-base sm:text-lg font-medium text-slate-400 font-mono tabular-nums">
                        {livePreview}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-600 font-mono">STANDBY</div>
                    )}
                  </div>
                </div>

                {/* Instrument Mode Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant={angleMode === "DEG" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAngleMode("DEG")}
                      className="h-7 px-2.5 text-[11px] font-mono rounded"
                    >
                      DEG
                    </Button>
                    <Button
                      variant={angleMode === "RAD" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAngleMode("RAD")}
                      className="h-7 px-2.5 text-[11px] font-mono rounded"
                    >
                      RAD
                    </Button>
                  </div>

                  <div className="flex items-center gap-1 font-mono">
                    <Button variant="ghost" size="sm" onClick={memoryClear} className="h-7 px-2 text-[11px] rounded" title="Memory Clear">
                      MC
                    </Button>
                    <Button variant="ghost" size="sm" onClick={memoryRecall} className="h-7 px-2 text-[11px] rounded" title="Memory Recall">
                      MR
                    </Button>
                    <Button variant="ghost" size="sm" onClick={memoryAdd} className="h-7 px-2 text-[11px] rounded" title="Memory Add">
                      M+
                    </Button>
                    <Button variant="ghost" size="sm" onClick={memorySubtract} className="h-7 px-2 text-[11px] rounded" title="Memory Subtract">
                      M-
                    </Button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleClear}
                      className="h-7 px-2.5 text-[11px] font-mono rounded gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      AC
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleDelete}
                      className="h-7 px-2.5 text-[11px] font-mono rounded gap-1"
                    >
                      <Delete className="w-3 h-3" />
                      DEL
                    </Button>
                  </div>
                </div>

                {/* Scientific & Arithmetic Button Grid */}
                <div className="grid grid-cols-5 gap-2 select-none">
                  {/* Row 1: Scientific Functions */}
                  <Button variant="secondary" onClick={() => handlePress("sin(")} className="font-mono text-xs sm:text-sm h-10 border border-border/60 hover:border-primary/40">sin</Button>
                  <Button variant="secondary" onClick={() => handlePress("cos(")} className="font-mono text-xs sm:text-sm h-10 border border-border/60 hover:border-primary/40">cos</Button>
                  <Button variant="secondary" onClick={() => handlePress("tan(")} className="font-mono text-xs sm:text-sm h-10 border border-border/60 hover:border-primary/40">tan</Button>
                  <Button variant="outline" onClick={() => handlePress("(")} className="font-mono text-sm h-10 border border-border/80">(</Button>
                  <Button variant="outline" onClick={() => handlePress(")")} className="font-mono text-sm h-10 border border-border/80">)</Button>

                  {/* Row 2: Inverse Trig & Logs */}
                  <Button variant="secondary" onClick={() => handlePress("asin(")} className="font-mono text-xs">asin</Button>
                  <Button variant="secondary" onClick={() => handlePress("acos(")} className="font-mono text-xs">acos</Button>
                  <Button variant="secondary" onClick={() => handlePress("atan(")} className="font-mono text-xs">atan</Button>
                  <Button variant="secondary" onClick={() => handlePress("log(")} className="font-mono text-sm">log</Button>
                  <Button variant="secondary" onClick={() => handlePress("ln(")} className="font-mono text-sm">ln</Button>

                  {/* Row 3: Powers, Roots & Constants */}
                  <Button variant="secondary" onClick={() => handlePress("sqrt(")} className="font-mono text-sm">√x</Button>
                  <Button variant="secondary" onClick={() => handlePress("^")} className="font-mono text-sm">xʸ</Button>
                  <Button variant="secondary" onClick={() => handlePress("pi")} className="font-mono text-sm">π</Button>
                  <Button variant="secondary" onClick={() => handlePress("e")} className="font-mono text-sm">e</Button>
                  <Button variant="secondary" onClick={() => handlePress("!")} className="font-mono text-sm">n!</Button>

                  {/* Row 4: 7, 8, 9, ÷, × */}
                  <Button onClick={() => handlePress("7")} variant="outline" className="text-xl font-semibold h-12">7</Button>
                  <Button onClick={() => handlePress("8")} variant="outline" className="text-xl font-semibold h-12">8</Button>
                  <Button onClick={() => handlePress("9")} variant="outline" className="text-xl font-semibold h-12">9</Button>
                  <Button onClick={() => handlePress("/")} variant="secondary" className="text-xl font-bold h-12 bg-primary/10 hover:bg-primary/20 text-primary">÷</Button>
                  <Button onClick={() => handlePress("*")} variant="secondary" className="text-xl font-bold h-12 bg-primary/10 hover:bg-primary/20 text-primary">×</Button>

                  {/* Row 5: 4, 5, 6, -, + */}
                  <Button onClick={() => handlePress("4")} variant="outline" className="text-xl font-semibold h-12">4</Button>
                  <Button onClick={() => handlePress("5")} variant="outline" className="text-xl font-semibold h-12">5</Button>
                  <Button onClick={() => handlePress("6")} variant="outline" className="text-xl font-semibold h-12">6</Button>
                  <Button onClick={() => handlePress("-")} variant="secondary" className="text-xl font-bold h-12 bg-primary/10 hover:bg-primary/20 text-primary">−</Button>
                  <Button onClick={() => handlePress("+")} variant="secondary" className="text-xl font-bold h-12 bg-primary/10 hover:bg-primary/20 text-primary">+</Button>

                  {/* Row 6: 1, 2, 3, ^, % */}
                  <Button onClick={() => handlePress("1")} variant="outline" className="text-xl font-semibold h-12">1</Button>
                  <Button onClick={() => handlePress("2")} variant="outline" className="text-xl font-semibold h-12">2</Button>
                  <Button onClick={() => handlePress("3")} variant="outline" className="text-xl font-semibold h-12">3</Button>
                  <Button onClick={() => handlePress("^2")} variant="outline" className="text-sm font-semibold h-12 font-mono">x²</Button>
                  <Button onClick={() => handlePress("/100")} variant="outline" className="text-base font-semibold h-12 font-mono">%</Button>

                  {/* Row 7: 0, ., ±, = */}
                  <Button onClick={() => handlePress("0")} variant="outline" className="col-span-2 text-xl font-semibold h-12">0</Button>
                  <Button onClick={() => handlePress(".")} variant="outline" className="text-xl font-semibold h-12">.</Button>
                  <Button 
                    onClick={handleCalculate} 
                    variant="default" 
                    className="col-span-2 text-2xl font-bold h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow"
                  >
                    =
                  </Button>
                </div>

                {/* Recent History quick view */}
                {history.length > 0 && (
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-2">
                      <History className="w-3.5 h-3.5" /> Recent Calculations
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {history.slice(0, 4).map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setExpression(item.ans);
                            setResult(item.ans);
                            setIsCalculated(true);
                          }}
                          className="text-xs px-2.5 py-1 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground font-mono transition-colors"
                        >
                          {item.expr} = <span className="text-primary font-bold">{item.ans}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <AdInArticle />

            <div className="prose prose-blue dark:prose-invert max-w-none mt-12">
              <h2>About the Scientific Calculator</h2>
              <p>
                Our interactive scientific calculator is engineered for high accuracy, speed, and ease of use. Whether you are solving trigonometry problems, calculating logarithmic curves, or evaluating powers and factorials, every operation updates dynamically on screen.
              </p>
              
              <h3>Key Features</h3>
              <ul>
                <li><strong>Real-Time Display:</strong> Your expression appears immediately in the main display as you type or click buttons, with an instant answer preview.</li>
                <li><strong>Keyboard Friendly:</strong> Use your physical keyboard to enter numbers, basic operators, parentheses, Backspace, and Enter without touching the mouse.</li>
                <li><strong>Angle Modes:</strong> Seamlessly toggle between Degrees (DEG) and Radians (RAD) for accurate trigonometric evaluations.</li>
                <li><strong>Advanced Functions:</strong> Comprehensive support for sin, cos, tan, asin, acos, atan, square roots, factorials, natural log (ln), base-10 log, and constants like π and e.</li>
                <li><strong>Calculation Memory & History:</strong> Save and recall intermediate results with standard MC, MR, M+, and M- functions.</li>
              </ul>

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

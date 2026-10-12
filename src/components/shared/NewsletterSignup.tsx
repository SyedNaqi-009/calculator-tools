"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
    toast.success("Thanks for subscribing to CalcHub!");
  };

  if (compact) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
          <Mail className="h-4 w-4" />
          <span>Stay Updated</span>
        </div>
        <p className="mt-1.5 text-xs text-muted">
          Get notified when new math and financial calculators launch.
        </p>
        {submitted ? (
          <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>You&apos;re subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
            <Input
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9 text-xs"
              required
            />
            <Button type="submit" size="sm" className="w-full text-xs">
              Subscribe Free
            </Button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-border/80 bg-card p-8 md:p-12 text-center">
      <div className="absolute inset-0 tech-grid-pattern opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-xl">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary mb-4">
          <Mail className="h-5 w-5" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary border border-border text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-3">
          Monthly Algorithms & Formula Updates
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Precision Updates for Analysts & Students
        </h2>
        <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
          Stay informed on new computational releases, financial amortization formulas, and math optimization techniques.
        </p>

        {submitted ? (
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-4 w-4" />
            <span>Thank you for subscribing! Your computational digest is on the way.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-2.5 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 bg-background text-xs"
              required
            />
            <Button type="submit" className="h-10 px-5 text-xs whitespace-nowrap font-semibold">
              Subscribe
            </Button>
          </form>
        )}
        <p className="mt-3 text-[11px] font-mono text-muted-foreground/70">No spam. Zero tracking. 1-click unsubscribe.</p>
      </div>
    </div>
  );
}

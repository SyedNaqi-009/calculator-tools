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
    <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-blue-600/10 via-violet-600/5 to-transparent p-8 md:p-12 text-center">
      <div className="mx-auto max-w-xl">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
          <Mail className="h-6 w-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Never Miss a New Calculator or Financial Tip
        </h2>
        <p className="mt-2 text-sm md:text-base text-muted">
          Join thousands of students, accountants, and investors receiving our monthly newsletter on smart tools and math shortcuts.
        </p>

        {submitted ? (
          <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-5 w-5" />
            <span>Thank you for subscribing! Check your inbox soon.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 bg-background"
              required
            />
            <Button type="submit" variant="gradient" className="h-11 px-6 whitespace-nowrap">
              Subscribe
            </Button>
          </form>
        )}
        <p className="mt-3 text-xs text-muted">No spam ever. Unsubscribe anytime with 1 click.</p>
      </div>
    </div>
  );
}

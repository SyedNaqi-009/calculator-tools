"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("calchub_cookie_consent");
    if (!consent) {
      setIsOpen(true);
    }
  }, []);

  const handleConsent = (choice: "all" | "necessary") => {
    localStorage.setItem("calchub_cookie_consent", choice);
    setIsOpen(false);
  };

  if (!mounted || !isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Cookie Consent Banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 rounded-2xl border border-border bg-card/95 backdrop-blur-md p-5 shadow-2xl transition-all animate-in slide-in-from-bottom-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 text-primary">
          <Cookie className="h-5 w-5" />
          <span className="font-semibold text-foreground text-sm">Cookie Preferences</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-muted hover:text-foreground transition-colors p-1"
          aria-label="Dismiss cookie notice"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted">
        We use cookies to optimize calculator functionality and analyze visitor traffic. By continuing to use CalcHub, you agree to our{" "}
        <Link href="/cookie-policy" className="text-primary hover:underline">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={() => handleConsent("all")} className="flex-1 text-xs">
          Accept All
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleConsent("necessary")}
          className="flex-1 text-xs"
        >
          Reject Non-Essential
        </Button>
      </div>
    </div>
  );
}

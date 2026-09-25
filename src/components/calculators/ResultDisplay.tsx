"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ResultDisplayProps {
  title: string;
  value: string | number;
  subtitle?: string;
  prefix?: string;
  className?: string;
}

function AnimatedNumber({ value }: { value: number }) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  
  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  const display = useTransform(springValue, (current) => {
    if (Number.isInteger(value)) {
      return Math.round(current).toLocaleString();
    }
    return current.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  });

  return <motion.span>{display}</motion.span>;
}

export function ResultDisplay({ title, value, subtitle, prefix, className }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);
  const isNumber = typeof value === 'number';

  const handleCopy = () => {
    const textToCopy = `${prefix || ''}${value}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("p-6 rounded-2xl bg-primary/5 border border-primary/20", className)}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-primary/10"
          onClick={handleCopy}
          aria-label="Copy result"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <div className="flex items-baseline gap-1">
        {prefix && <span className="text-2xl font-semibold">{prefix}</span>}
        <div className="text-4xl md:text-5xl font-bold font-mono tracking-tight text-foreground">
          {isNumber ? <AnimatedNumber value={value as number} /> : <span>{value}</span>}
        </div>
      </div>
      {subtitle && (
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

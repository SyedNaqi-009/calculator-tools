"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalculatorMeta } from "@/types/calculator";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, BadgePercent, TrendingUp, Activity, Percent, Calendar, 
  Receipt, CreditCard, Landmark, Coins, DollarSign, Tag, PieChart, 
  Flame, CalendarRange, GraduationCap, Award, Scale, RefreshCw, Clock,
  LucideIcon
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Calculator, BadgePercent, TrendingUp, Activity, Percent, Calendar,
  Receipt, CreditCard, Landmark, Coins, DollarSign, Tag, PieChart,
  Flame, CalendarRange, GraduationCap, Award, Scale, RefreshCw, Clock
};

interface CalculatorCardProps {
  calculator: CalculatorMeta;
}

export function CalculatorCard({ calculator }: CalculatorCardProps) {
  const Icon = ICON_MAP[calculator.icon] || Calculator;
  const slug = calculator.slug || calculator.id || "";
  const description = calculator.shortDescription || calculator.description || "";

  return (
    <Link href={`/calculators/${slug}`} className="group block h-full select-none">
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="relative flex flex-col h-full p-5 bg-card border border-border/80 rounded-xl shadow-[0_1px_3px_0_rgb(0_0_0/0.04)] group-hover:border-primary/50 group-hover:shadow-[0_8px_20px_-6px_rgb(37_75_208/0.12)] dark:group-hover:shadow-[0_8px_20px_-6px_rgb(59_102_255/0.18)] transition-all cursor-pointer overflow-hidden"
      >
        {/* Subtle accent corner tick */}
        <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/20 via-transparent to-transparent" />
        </div>

        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="p-2.5 bg-secondary text-primary rounded-lg border border-border/50 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200">
            <Icon className="w-5 h-5 transition-transform group-hover:scale-105" />
          </div>
          <Badge variant={calculator.category as any} className="text-[10px] tracking-wider">
            {calculator.category}
          </Badge>
        </div>

        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors tracking-tight mb-1.5 flex items-center justify-between">
          <span>{calculator.name}</span>
          <span className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all text-xs">→</span>
        </h3>

        <p className="text-muted-foreground text-xs leading-relaxed flex-grow line-clamp-2">
          {description}
        </p>

        <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">Instant Client-side</span>
          <span className="font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">Launch Tool</span>
        </div>
      </motion.div>
    </Link>
  );
}

export default CalculatorCard;

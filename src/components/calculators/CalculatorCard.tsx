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
    <Link href={`/calculators/${slug}`} className="block h-full">
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="flex flex-col h-full p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <Icon className="w-6 h-6" />
          </div>
          <Badge variant={calculator.category as any}>
            {calculator.category}
          </Badge>
        </div>
        <h3 className="text-xl font-semibold mb-2">{calculator.name}</h3>
        <p className="text-muted text-sm flex-grow line-clamp-2">
          {description}
        </p>
      </motion.div>
    </Link>
  );
}

export default CalculatorCard;

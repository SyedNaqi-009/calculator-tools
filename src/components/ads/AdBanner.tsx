import { cn } from "@/lib/utils";

interface AdBannerProps {
  className?: string;
}

export function AdBanner({ className }: AdBannerProps) {
  return (
    <div
      className={cn(
        "my-6 flex min-h-[90px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/80 bg-secondary/50 p-4 text-center transition-colors",
        className
      )}
      aria-label="Advertisement Banner"
    >
      <span className="text-[11px] font-medium tracking-wider uppercase text-muted">
        Advertisement
      </span>
      <p className="mt-1 text-xs text-muted/80">
        Responsive Ad Unit (728×90 Leaderboard / Responsive)
      </p>

      {/* Google AdSense Placement - Uncomment once approved */}
      {/*
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      */}
    </div>
  );
}

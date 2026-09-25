import { cn } from "@/lib/utils";

interface AdSidebarProps {
  className?: string;
}

export function AdSidebar({ className }: AdSidebarProps) {
  return (
    <div
      className={cn(
        "flex min-h-[280px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/80 bg-secondary/50 p-6 text-center transition-colors",
        className
      )}
      aria-label="Advertisement Sidebar"
    >
      <span className="text-[11px] font-medium tracking-wider uppercase text-muted">
        Advertisement
      </span>
      <p className="mt-2 text-xs text-muted/80">
        Sidebar Unit (300×250 / 300×600)
      </p>

      {/* Google AdSense Placement - Uncomment once approved */}
      {/*
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="0987654321"
        data-ad-format="rectangle"
        data-full-width-responsive="true"
      />
      */}
    </div>
  );
}

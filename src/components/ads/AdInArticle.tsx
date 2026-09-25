import { cn } from "@/lib/utils";

interface AdInArticleProps {
  className?: string;
}

export function AdInArticle({ className }: AdInArticleProps) {
  return (
    <div
      className={cn(
        "my-8 flex min-h-[140px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/80 bg-secondary/40 p-6 text-center transition-colors",
        className
      )}
      aria-label="In-Article Advertisement"
    >
      <span className="text-[11px] font-medium tracking-wider uppercase text-muted">
        Advertisement
      </span>
      <p className="mt-1 text-xs text-muted/80">In-Article Native Ad Unit</p>

      {/* Google AdSense Placement - Uncomment once approved */}
      {/*
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="1122334455"
      />
      */}
    </div>
  );
}

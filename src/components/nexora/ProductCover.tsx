import type { MiningProduct } from "@/types";
import { cn } from "@/lib/utils";

const categoryIcon: Record<MiningProduct["category"], string> = {
  "E-book": "menu_book",
  Guia: "map",
  Checklist: "checklist",
  Template: "dashboard_customize",
  Pack: "inventory_2",
  "Mini curso": "school",
};

/**
 * Mockup procedural da capa do produto — placeholder elegante e monocromático
 * enquanto não existirem imagens reais. Substituível por <img> no futuro.
 */
export function ProductCover({
  product,
  className,
  size = "md",
}: {
  product: MiningProduct;
  className?: string;
  size?: "md" | "lg";
}) {
  const words = product.name.split(" ").filter(Boolean);
  const lines = [words.slice(0, 2).join(" "), words.slice(2).join(" ")].filter(Boolean);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-surface",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(120% 100% at 15% 0%, #1f1f1f 0%, #0d0d0d 55%, #050505 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, #ffffff 0 1px, transparent 1px 14px)",
        }}
      />
      <div className="absolute inset-y-0 left-0 w-[6px] bg-elevated" />
      <div className="absolute inset-y-0 left-[6px] w-px bg-border" />

      <div
        className={cn(
          "relative flex h-full flex-col justify-between",
          size === "lg" ? "p-7" : "p-5",
        )}
      >
        <div className="flex items-center justify-between gap-3 pl-3">
          <span className="label-caps text-muted-foreground">{product.category}</span>
          <span className="material-symbols-outlined text-[18px] text-muted-foreground">
            {categoryIcon[product.category]}
          </span>
        </div>

        <div className="pl-3">
          {lines.map((line) => (
            <div
              key={line}
              className={cn(
                "font-semibold uppercase leading-[1.05] tracking-[-0.02em] text-foreground",
                size === "lg" ? "text-[28px]" : "text-[19px]",
              )}
            >
              {line}
            </div>
          ))}
          <div className="mt-3 h-px w-14 bg-border" />
          <div className="mt-3 label-caps text-muted-foreground">{product.theme}</div>
        </div>
      </div>
    </div>
  );
}

import type { ProductStatus, SavedProduct } from "@/types";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

const statusTone: Record<ProductStatus, string> = {
  RASCUNHO: "border-border bg-transparent text-muted-foreground",
  PRONTO: "border-border bg-elevated text-foreground",
  "OFERTA CRIADA": "border-transparent bg-primary text-on-primary",
};

export function SavedProductCard({ product }: { product: SavedProduct }) {
  return (
    <Card interactive className="overflow-hidden">
      <div className="relative h-36 border-b border-border bg-surface">
        {product.image ? (
          <img
            src={product.image}
            alt={`Capa do produto ${product.name}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <Icon name="inventory_2" className="text-[24px]" />
          </div>
        )}
        <span
          className={cn(
            "absolute left-3 top-3 inline-flex items-center rounded px-2 py-1 label-caps",
            statusTone[product.status],
          )}
        >
          {product.status}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-body-lg text-foreground">{product.name}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge tone="muted">{product.type}</Badge>
          <Badge tone="muted">{product.price}</Badge>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="label-caps text-muted-foreground">Score</span>
          <span className="text-headline-md text-foreground">{product.score}</span>
        </div>
      </div>
    </Card>
  );
}

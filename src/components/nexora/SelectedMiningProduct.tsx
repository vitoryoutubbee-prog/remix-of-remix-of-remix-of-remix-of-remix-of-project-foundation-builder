import type { MiningProduct } from "@/types";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { MetricCard } from "./MetricCard";
import { ProductCover } from "./ProductCover";

/** Oportunidade minerada carregada em Products / Content. */
export function SelectedMiningProduct({ product }: { product: MiningProduct }) {
  return (
    <Card className="p-6 md:p-7">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:items-center">
        <ProductCover product={product} className="h-40" />
        <div className="min-w-0">
          <div className="label-caps text-muted-foreground">Oportunidade minerada</div>
          <h2 className="mt-2 text-headline-md text-foreground">{product.name}</h2>
          <p className="mt-2 text-body-md text-secondary-foreground">{product.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge tone="muted">{product.category}</Badge>
            <Badge tone="muted">{product.theme}</Badge>
            <Badge tone="muted">{product.price}</Badge>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <MetricCard label="Score" value={String(product.score)} icon="bolt" />
            <MetricCard label="Faturamento" value={product.revenue} icon="payments" />
            <MetricCard label="Potencial" value={product.potential} icon="trending_up" />
          </div>
        </div>
      </div>
    </Card>
  );
}

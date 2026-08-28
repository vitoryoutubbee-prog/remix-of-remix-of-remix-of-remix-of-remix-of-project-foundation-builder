import type { MiningProduct } from "@/types";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { Icon } from "./Icon";
import { MetricCard } from "./MetricCard";
import { ProductCover } from "./ProductCover";

/** Contexto da oportunidade minerada carregada no Product Builder. */
export function MinedOpportunityCard({ product }: { product: MiningProduct }) {
  return (
    <Card className="p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="label-caps text-muted-foreground">Oportunidade minerada</div>
        <span className="inline-flex items-center gap-2 rounded border border-border bg-surface px-2.5 py-1 label-caps text-secondary-foreground">
          <Icon name="construction" className="text-[14px]" />
          Produto encontrado na mineração
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <ProductCover product={product} className="h-48" />
        <div className="min-w-0">
          <h3 className="text-headline-md text-foreground">{product.name}</h3>
          <p className="mt-2 max-w-2xl text-body-md text-secondary-foreground">
            {product.description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge tone="muted">{product.category}</Badge>
            <Badge tone="muted">{product.theme}</Badge>
            <Badge>{product.trend}</Badge>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <MetricCard label="Score" value={String(product.score)} icon="bolt" />
            <MetricCard
              label="Vendas estimadas"
              value={product.estimatedSales.toLocaleString("pt-BR")}
              icon="shopping_bag"
            />
            <MetricCard label="Faturamento" value={product.revenue} icon="payments" />
            <MetricCard label="Anúncios" value={String(product.adCount)} icon="campaign" />
            <MetricCard label="Dias ativos" value={String(product.activeDays)} icon="schedule" />
            <MetricCard label="Preço" value={product.price} icon="sell" />
          </div>
        </div>
      </div>
    </Card>
  );
}

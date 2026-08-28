import type { MiningProduct } from "@/types";
import { Badge } from "./Badge";
import { CardLink } from "./Card";
import { Icon } from "./Icon";
import { ProductCover } from "./ProductCover";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2.5">
      <div className="label-caps text-muted-foreground">{label}</div>
      <div className="mt-1.5 text-body-md text-foreground">{value}</div>
    </div>
  );
}

const trendIcon: Record<MiningProduct["trend"], string> = {
  ALTA: "trending_up",
  CRESCENDO: "north_east",
  ESTÁVEL: "trending_flat",
};

export function MiningProductCard({ product }: { product: MiningProduct }) {
  return (
    <CardLink
      to="/mining/$id"
      params={{ id: product.id }}
      className="flex h-full flex-col p-5 md:p-6"
    >
      <ProductCover product={product} className="h-40" />

      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <h3 className="text-headline-md leading-tight text-foreground">{product.name}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge tone="muted">{product.category}</Badge>
            <span className="text-body-sm text-secondary-foreground">{product.price}</span>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-display-sm leading-none text-foreground">{product.score}</div>
          <div className="mt-1 label-caps text-muted-foreground">Score</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Stat label="Vendas" value={product.estimatedSales.toLocaleString("pt-BR")} />
        <Stat label="Faturamento" value={product.revenue} />
        <Stat label="Anúncios" value={String(product.adCount)} />
        <Stat label="Dias ativos" value={String(product.activeDays)} />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-4">
        <div>
          <div className="label-caps text-muted-foreground">Tendência</div>
          <div className="mt-1 inline-flex items-center gap-1.5 text-body-md text-foreground">
            <Icon name={trendIcon[product.trend]} className="text-[16px]" />
            {product.trend}
          </div>
        </div>
        <div>
          <div className="label-caps text-muted-foreground">Potencial</div>
          <div className="mt-1 text-body-md text-foreground">{product.potential}</div>
        </div>
        <div className="ml-auto flex h-8 w-20 items-end gap-1">
          {product.trendSeries.map((h, i) => (
            <div
              key={i}
              className="w-full rounded-sm bg-elevated"
              style={{ height: `${h}%`, opacity: 0.4 + i * 0.12 }}
            />
          ))}
        </div>
      </div>

      <span className="mt-auto pt-5 inline-flex items-center gap-2 label-caps text-secondary-foreground transition-colors group-hover:text-foreground">
        Ver oportunidade
        <Icon name="arrow_forward" className="text-[16px]" />
      </span>
    </CardLink>
  );
}

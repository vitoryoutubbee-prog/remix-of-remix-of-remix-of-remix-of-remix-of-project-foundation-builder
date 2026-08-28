import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppLayout } from "@/components/nexora/AppLayout";
import { Badge } from "@/components/nexora/Badge";
import { ButtonLink, buttonClasses } from "@/components/nexora/Button";
import { Card } from "@/components/nexora/Card";
import { EmptyState } from "@/components/nexora/EmptyState";
import { Icon } from "@/components/nexora/Icon";
import { MetricCard } from "@/components/nexora/MetricCard";
import { ProductCover } from "@/components/nexora/ProductCover";
import { SectionHeader } from "@/components/nexora/SectionHeader";
import { findMiningProduct, miningSignals } from "@/services/mock/mining";

export const Route = createFileRoute("/mining/$id")({
  loader: ({ params }) => {
    const product = findMiningProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Oportunidade indisponível — NEXORA" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — Mineração | NEXORA`;
    const description = `${product.name}: score ${product.score}, ${product.estimatedSales.toLocaleString("pt-BR")} vendas e faturamento de ${product.revenue} mapeados pela mineração da NEXORA.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: MiningNotFound,
  component: MiningDetail,
});

function MiningDetail() {
  const { product } = Route.useLoaderData();
  const signals = miningSignals(product);

  return (
    <AppLayout>
      <ButtonLink to="/mining" variant="quiet" size="sm" className="-ml-4 mb-6">
        <Icon name="arrow_back" className="text-[16px]" />
        Mineração
      </ButtonLink>

      <SectionHeader
        eyebrow="Produto minerado"
        title={product.name}
        description={product.description}
        action={
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{product.trend}</Badge>
            <Badge tone="muted">{product.category}</Badge>
          </div>
        }
        className="mb-10"
      />

      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
        <Card className="p-6 md:p-8">
          <ProductCover product={product} size="lg" className="h-64" />
          <div className="mt-6 flex items-end justify-between gap-4">
            <div>
              <div className="label-caps text-muted-foreground">Preço</div>
              <div className="mt-2 text-headline-md text-foreground">{product.price}</div>
            </div>
            <div className="text-right">
              <div className="text-display-sm leading-none text-foreground">{product.score}</div>
              <div className="mt-1 label-caps text-muted-foreground">Score</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:col-span-2">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <MetricCard
              label="Vendas estimadas"
              value={product.estimatedSales.toLocaleString("pt-BR")}
              icon="shopping_bag"
            />
            <MetricCard label="Faturamento" value={product.revenue} icon="payments" />
            <MetricCard label="Anúncios" value={String(product.adCount)} icon="campaign" />
            <MetricCard label="Dias ativos" value={String(product.activeDays)} icon="schedule" />
            <MetricCard label="Tendência" value={product.trend} icon="trending_up" />
            <MetricCard label="Potencial" value={product.potential} icon="bolt" />
          </div>

          <div className="mt-8 flex h-32 items-end gap-2 border-t border-border pt-8">
            {product.trendSeries.map((h, i) => (
              <div
                key={i}
                className="w-full rounded-sm bg-elevated"
                style={{ height: `${h}%`, opacity: 0.4 + i * 0.12 }}
              />
            ))}
          </div>

        </Card>
      </div>

      <section className="mt-16">
        <SectionHeader
          eyebrow="Análise da oportunidade"
          title="Por que esse produto foi minerado?"
          className="mb-8"
        />
        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-4">
          {signals.map((signal) => (
            <Card key={signal.label} className="p-6">
              <div className="label-caps text-muted-foreground">{signal.label}</div>
              <div className="mt-3 text-headline-md text-foreground">{signal.value}</div>
              <p className="mt-3 text-body-sm text-secondary-foreground">{signal.note}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <Card className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="min-w-0">
            <div className="label-caps text-muted-foreground">Próximo passo</div>
            <p className="mt-2 max-w-xl text-body-lg text-foreground">
              Mineração → Produto → Oferta → Conteúdo → Venda. Leve esta oportunidade para o próximo
              estágio da sua operação.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              search={{ mining: product.id }}
              className={buttonClasses("primary", "md")}
            >
              Criar produto a partir desta oportunidade
              <Icon name="arrow_forward" className="text-[16px]" />
            </Link>
            <Link
              to="/content"
              search={{ mining: product.id }}
              className={buttonClasses("ghost", "md")}
            >
              Criar conteúdo
              <Icon name="arrow_forward" className="text-[16px]" />
            </Link>
          </div>
        </Card>
      </section>
    </AppLayout>
  );
}

function MiningNotFound() {
  return (
    <AppLayout>
      <EmptyState
        icon="travel_explore"
        title="Produto não encontrado"
        description="Esse produto não existe ou ainda não foi minerado."
        action={<ButtonLink to="/mining">Voltar à mineração</ButtonLink>}
      />
    </AppLayout>
  );
}

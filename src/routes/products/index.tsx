import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { AppLayout } from "@/components/nexora/AppLayout";
import { Button } from "@/components/nexora/Button";
import { Card } from "@/components/nexora/Card";
import { EmptyState } from "@/components/nexora/EmptyState";
import { GeneratedProductView } from "@/components/nexora/GeneratedProductView";
import { Icon } from "@/components/nexora/Icon";
import { MinedOpportunityCard } from "@/components/nexora/MinedOpportunityCard";
import { OperationSteps } from "@/components/nexora/OperationSteps";
import { ProductBuilderForm } from "@/components/nexora/ProductBuilderForm";
import { SavedProductCard } from "@/components/nexora/SavedProductCard";
import { SectionHeader } from "@/components/nexora/SectionHeader";
import { findMiningProduct } from "@/services/mock/mining";
import {
  draftFromMining,
  emptyDraft,
  generateProduct,
  productFilters,
  querySavedProducts,
} from "@/services/mock/products";
import type { GeneratedProduct, ProductDraft, ProductFilterKey } from "@/types";
import { cn } from "@/lib/utils";

const title = "Product Builder — NEXORA";
const description =
  "Transforme uma oportunidade minerada em um produto digital estruturado e pronto para virar oferta.";

export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>) => ({
    mining: typeof search["mining"] === "string" ? (search["mining"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

type Mode = "hub" | "create" | "remodel" | "result";

function ProductsPage() {
  const { mining } = Route.useSearch();
  const source = useMemo(() => (mining ? findMiningProduct(mining) : undefined), [mining]);

  const [mode, setMode] = useState<Mode>(source ? "remodel" : "hub");
  const [draft, setDraft] = useState<ProductDraft>(source ? draftFromMining(source) : emptyDraft);
  const [generated, setGenerated] = useState<GeneratedProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [saved, setSaved] = useState(false);
  const [filter, setFilter] = useState<ProductFilterKey>("todos");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const products = querySavedProducts(filter);

  /** Simulação da geração por IA (~1.6s). FUTURO: chamar a API de geração aqui. */
  function runGeneration(regenerate = false) {
    if (timer.current) clearTimeout(timer.current);
    if (regenerate) setRegenerating(true);
    else setLoading(true);
    timer.current = setTimeout(() => {
      setGenerated(generateProduct(draft, source));
      setSaved(false);
      setLoading(false);
      setRegenerating(false);
      setMode("result");
    }, 1600);
  }

  return (
    <AppLayout>
      <OperationSteps current={1} className="mb-10" />

      <SectionHeader
        eyebrow="Estágio 02 — Produto"
        title="Product Builder"
        description="Transforme uma oportunidade em um produto digital pronto para vender."
        action={
          mode !== "hub" ? (
            <Button variant="ghost" size="sm" onClick={() => setMode("hub")}>
              <Icon name="arrow_back" className="text-[16px]" />
              Voltar
            </Button>
          ) : undefined
        }
        className="mb-10"
      />

      {mode === "hub" && (
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
          <PathCard
            icon="add_circle"
            label="Criar produto"
            description="Comece do zero: defina nicho, problema, público e preço e deixe a IA estruturar o produto."
            action="Criar produto"
            onClick={() => {
              setDraft(emptyDraft);
              setMode("create");
            }}
          />
          <PathCard
            icon="construction"
            label="Remodelar produto minerado"
            description={
              source
                ? `Oportunidade carregada: ${source.name}. Use como referência e crie sua própria versão.`
                : "Escolha uma oportunidade da mineração e crie sua própria versão a partir dela."
            }
            action={source ? "Abrir oportunidade" : "Ir para a mineração"}
            highlighted
            {...(source
              ? { onClick: () => setMode("remodel") }
              : { to: "/mining" as const })}
          />
        </div>
      )}

      {mode === "create" && (
        <ProductBuilderForm
          draft={draft}
          onChange={setDraft}
          onGenerate={() => runGeneration()}
          loading={loading}
        />
      )}

      {mode === "remodel" && source && (
        <div className="flex flex-col gap-gutter">
          <MinedOpportunityCard product={source} />

          <Card className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="min-w-0">
              <div className="label-caps text-muted-foreground">Remodelagem</div>
              <p className="mt-2 max-w-xl text-body-lg text-foreground">
                Use essa oportunidade como referência e crie uma versão própria — nome, promessa,
                mecanismo e estrutura originais.
              </p>
            </div>
            <Button onClick={() => runGeneration()} loading={loading} className="whitespace-nowrap">
              Remodelar este produto
              <Icon name="arrow_forward" className="text-[16px]" />
            </Button>
          </Card>

          <ProductBuilderForm
            draft={draft}
            onChange={setDraft}
            onGenerate={() => runGeneration()}
            loading={loading}
            ctaLabel="Gerar minha versão"
            hint="Campos pré-preenchidos com a oportunidade minerada. Ajuste o que quiser antes de gerar."
          />
        </div>
      )}

      {mode === "remodel" && !source && (
        <EmptyState
          icon="travel_explore"
          title="Nenhuma oportunidade carregada"
          description="Abra uma oportunidade na mineração e clique em “Criar produto a partir desta oportunidade”."
        />
      )}

      {mode === "result" && generated && (
        <GeneratedProductView
          product={generated}
          regenerating={regenerating}
          saved={saved}
          onEdit={() => setMode(source ? "remodel" : "create")}
          onRegenerate={() => runGeneration(true)}
          onSave={() => setSaved(true)}
          onAddModule={() =>
            setGenerated({
              ...generated,
              modules: [
                ...generated.modules,
                {
                  id: `modulo-${generated.modules.length + 1}`,
                  number: `MÓDULO ${String(generated.modules.length + 1).padStart(2, "0")}`,
                  title: "Novo módulo",
                  description: "Descreva o que o aluno aprende neste módulo.",
                },
              ],
            })
          }
          onAddBonus={() =>
            setGenerated({
              ...generated,
              bonuses: [...generated.bonuses, `Novo bônus ${generated.bonuses.length + 1}`],
            })
          }
        />
      )}

      <section className="mt-16">
        <SectionHeader eyebrow="Biblioteca" title="Meus produtos" className="mb-8" />

        <div className="mb-8 flex flex-wrap gap-2">
          {productFilters.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={filter === item.key}
              onClick={() => setFilter(item.key)}
              className={cn(
                "rounded-md border px-3.5 py-2 label-caps transition-colors duration-200",
                filter === item.key
                  ? "border-transparent bg-primary text-on-primary"
                  : "border-border bg-surface text-muted-foreground hover:bg-elevated hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {products.length === 0 ? (
          <EmptyState
            icon="package_2"
            title="Nenhum produto neste filtro"
            description="Ajuste o filtro ou crie um novo produto no Product Builder."
          />
        ) : (
          <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <SavedProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </AppLayout>
  );
}

function PathCard({
  icon,
  label,
  description,
  action,
  onClick,
  to,
  highlighted,
}: {
  icon: string;
  label: string;
  description: string;
  action: string;
  onClick?: () => void;
  to?: string;
  highlighted?: boolean;
}) {
  const content = (
    <div className="flex h-full flex-col p-6 md:p-8">
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border",
          highlighted
            ? "border-foreground bg-background text-foreground"
            : "border-border bg-surface text-muted-foreground",
        )}
      >
        <Icon name={icon} className="text-[20px]" />
      </div>
      <h3 className="mt-6 text-headline-md text-foreground">{label}</h3>
      <p className="mt-3 max-w-md flex-1 text-body-md text-secondary-foreground">{description}</p>
      <span className="mt-8 inline-flex items-center gap-2 label-caps text-foreground">
        {action}
        <Icon name="arrow_forward" className="text-[16px]" />
      </span>
    </div>
  );

  if (to) {
    return (
      <a href={to} className="surface-card card-hover block rounded-xl">
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="surface-card card-hover rounded-xl text-left"
    >
      {content}
    </button>
  );
}

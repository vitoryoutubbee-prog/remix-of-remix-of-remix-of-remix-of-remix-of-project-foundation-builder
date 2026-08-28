import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppLayout } from "@/components/nexora/AppLayout";
import { Button } from "@/components/nexora/Button";
import { Card } from "@/components/nexora/Card";
import { EmptyState } from "@/components/nexora/EmptyState";
import { Icon } from "@/components/nexora/Icon";
import { MiningFilters } from "@/components/nexora/MiningFilters";
import { MiningProductCard } from "@/components/nexora/MiningProductCard";
import { MiningProgress } from "@/components/nexora/MiningProgress";
import { SearchBar } from "@/components/nexora/SearchBar";
import { SectionHeader } from "@/components/nexora/SectionHeader";
import {
  miningSearchExamples,
  miningStages,
  mockDataNotice,
  queryMiningProducts,
} from "@/services/mock/mining";
import type { MiningFilterKey, MiningSortKey } from "@/types";

const title = "Mineração de produtos — NEXORA";
const description =
  "Encontre produtos digitais com sinais de demanda e descubra novas oportunidades para sua operação.";

export const Route = createFileRoute("/mining/")({
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
  component: MiningPage,
});

function MiningPage() {
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState<MiningFilterKey>("todos");
  const [sort, setSort] = useState<MiningSortKey>("score");
  const [stageIndex, setStageIndex] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  /** Simulação visual (~5s). FUTURO: disparar a mineração real aqui. */
  function startMining(nextTerm?: string) {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (nextTerm !== undefined) setTerm(nextTerm.trim());
    setStageIndex(0);

    miningStages.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStageIndex(i), i * 1000));
    });
    timers.current.push(setTimeout(() => setStageIndex(miningStages.length), 5000));
    timers.current.push(setTimeout(() => setStageIndex(null), 5800));
  }

  const mining = stageIndex !== null;
  const results = queryMiningProducts({ term, filter, sort });

  return (
    <AppLayout>
      <div className="mb-3 inline-flex items-center gap-2">
        <span className="metric-pulse h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="label-caps text-secondary-foreground">Mineração ativa</span>
      </div>

      <SectionHeader
        title="Mineração de produtos"
        description="Encontre produtos com sinais de demanda e descubra novas oportunidades para sua operação."
        action={
          <Button onClick={() => startMining()} loading={mining} className="whitespace-nowrap">
            <Icon name="construction" className="text-[16px]" />
            Iniciar mineração
          </Button>
        }
        className="mb-8"
      />

      <Card className="mb-6 p-5 md:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-3 label-caps text-muted-foreground">
          <span>Procurar</span>
          <Icon name="chevron_right" className="text-[14px]" />
          <span>Encontrar</span>
          <Icon name="chevron_right" className="text-[14px]" />
          <span>Analisar</span>
          <Icon name="chevron_right" className="text-[14px]" />
          <span className="text-foreground">Criar</span>
        </div>

        <SearchBar
          key={term}
          defaultValue={term}
          placeholder="Pesquise por nicho, produto, mercado ou problema..."
          submitLabel="Minerar"
          onSearch={(value) => startMining(value)}
          loading={mining}
        />

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {miningSearchExamples.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => startMining(example)}
              className="rounded-md border border-border bg-surface px-3 py-1.5 label-caps text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
            >
              {example}
            </button>
          ))}
        </div>
      </Card>

      <MiningFilters
        filter={filter}
        onFilter={setFilter}
        sort={sort}
        onSort={setSort}
        className="mb-8"
      />

      {mining ? (
        <MiningProgress stageIndex={stageIndex} />
      ) : results.length === 0 ? (
        <EmptyState
          icon="search_off"
          title="Não encontramos produtos para essa busca."
          description="Experimente outro termo ou inicie uma nova mineração."
          action={
            <Button
              variant="ghost"
              onClick={() => {
                setFilter("todos");
                startMining("");
              }}
            >
              <Icon name="construction" className="text-[16px]" />
              Nova mineração
            </Button>
          }
        />
      ) : (
        <>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-body-sm text-secondary-foreground">
              {results.length} {results.length === 1 ? "produto minerado" : "produtos minerados"}
              {term ? ` para “${term}”` : ""}.
            </p>
            <p className="text-body-sm text-muted-foreground">{mockDataNotice}</p>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 2xl:grid-cols-3">
            {results.map((product) => (
              <MiningProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </AppLayout>
  );
}

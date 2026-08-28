import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/nexora/AppLayout";
import { ActiveOpportunity } from "@/components/nexora/ActiveOpportunity";
import { ButtonLink } from "@/components/nexora/Button";
import { Card } from "@/components/nexora/Card";
import { Icon } from "@/components/nexora/Icon";
import { KpiCard } from "@/components/nexora/KpiCard";
import { OperationSummary } from "@/components/nexora/OperationSummary";
import { PerformanceChart } from "@/components/nexora/PerformanceChart";
import { ProgressStep } from "@/components/nexora/ProgressStep";
import { SectionHeader } from "@/components/nexora/SectionHeader";
import { activeOpportunities, dashboardKpis, operationSummary } from "@/services/mock/dashboard";
import { operationSteps } from "@/services/mock/operation";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Minha dashboard — NEXORA" },
      {
        name: "description",
        content:
          "Acompanhe faturamento, lucro, vendas e conversão da sua operação digital em um único painel.",
      },
      { property: "og:title", content: "Minha dashboard — NEXORA" },
      {
        property: "og:description",
        content:
          "Acompanhe faturamento, lucro, vendas e conversão da sua operação digital em um único painel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <AppLayout>
      <header className="mb-10">
        <h1 className="text-display-sm text-foreground">Minha dashboard</h1>
        <p className="mt-3 text-body-lg text-secondary-foreground">
          Acompanhe o desempenho da sua operação.
        </p>
        <p className="mt-2 text-body-sm text-muted-foreground">
          Dados simulados para demonstração.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-4">
        {dashboardKpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </section>

      <section className="mt-gutter">
        <PerformanceChart />
      </section>

      <section className="mt-16">
        <SectionHeader title="Resumo da operação" className="mb-8" />
        <OperationSummary groups={operationSummary} />
      </section>

      <section className="mt-16">
        <SectionHeader title="Oportunidades ativas" className="mb-8" />
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {activeOpportunities.map((o) => (
            <ActiveOpportunity key={o.id} opportunity={o} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeader title="Minha operação" className="mb-8" />
        <Card className="p-6 md:p-8">
          <div className="relative flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
            <div className="absolute left-[21px] top-0 -z-0 h-full w-px bg-border md:left-0 md:top-1/2 md:h-px md:w-full" />
            {operationSteps.map((step) => (
              <ProgressStep key={step.id} step={step} />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <p className="text-body-md text-secondary-foreground">Continue de onde parou.</p>
            <ButtonLink to="/products">
              Continuar operação
              <Icon name="arrow_forward" className="text-[16px]" />
            </ButtonLink>
          </div>
        </Card>
      </section>
    </AppLayout>
  );
}

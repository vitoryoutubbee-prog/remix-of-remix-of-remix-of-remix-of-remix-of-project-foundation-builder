import type { ActiveOpportunity, ChartPoint, ChartRange, Kpi, SummaryGroup } from "@/types";

/**
 * MOCK DATA — dashboard.
 * Estruturado para no futuro ser substituído por dados reais
 * (banco de dados, checkout, analytics, plataformas de conteúdo).
 */

export const dashboardKpis: Kpi[] = [
  { id: "revenue", label: "Faturamento", value: "R$ 4.280,00", delta: "+18,4%", direction: "up" },
  { id: "profit", label: "Lucro", value: "R$ 2.940,00", delta: "+21,7%", direction: "up" },
  { id: "sales", label: "Vendas", value: "126", delta: "+14,2%", direction: "up" },
  { id: "conversion", label: "Conversão", value: "3,8%", delta: "+0,6%", direction: "up" },
];

function series(days: number, seed: number, base: number, growth: number): ChartPoint[] {
  return Array.from({ length: days }, (_, i) => {
    const wave = Math.sin((i + seed) / 2.4) * base * 0.12;
    const noise = Math.cos((i + seed) * 1.7) * base * 0.06;
    const revenue = base + growth * i + wave + noise;
    return {
      label: `D${i + 1}`,
      revenue: Math.max(0, Math.round(revenue)),
      profit: Math.max(0, Math.round(revenue * 0.68 - base * 0.05)),
    };
  });
}

export const chartRanges: { id: ChartRange; label: string; days: number }[] = [
  { id: "7d", label: "7 dias", days: 7 },
  { id: "30d", label: "30 dias", days: 30 },
  { id: "90d", label: "90 dias", days: 90 },
];

const seriesByRange: Record<ChartRange, ChartPoint[]> = {
  "7d": series(7, 3, 120, 6),
  "30d": series(30, 1, 90, 3.2),
  "90d": series(90, 5, 60, 1.4),
};

/** Futuramente: substituir por fetch/API. */
export function getPerformanceSeries(range: ChartRange): ChartPoint[] {
  return seriesByRange[range];
}

export const operationSummary: SummaryGroup[] = [
  {
    id: "content",
    label: "Conteúdo",
    icon: "videocam",
    rows: [
      { label: "Vídeos publicados", value: "42" },
      { label: "Visualizações", value: "184.200" },
      { label: "Cliques", value: "3.842" },
    ],
  },
  {
    id: "product",
    label: "Produto",
    icon: "package_2",
    rows: [
      { label: "Produtos criados", value: "3" },
      { label: "Vendas", value: "126" },
      { label: "Faturamento", value: "R$ 4.280,00" },
    ],
  },
  {
    id: "offer",
    label: "Oferta",
    icon: "shopping_bag",
    rows: [
      { label: "Conversão", value: "3,8%" },
      { label: "Ticket médio", value: "R$ 33,97" },
    ],
  },
];

export const activeOpportunities: ActiveOpportunity[] = [
  { id: "eleicoes-2026", title: "Eleições 2026", score: 98, status: "Em operação" },
  { id: "futebol", title: "Futebol", score: 94, status: "Em análise" },
  { id: "beleza", title: "Beleza", score: 88, status: "Em análise" },
];

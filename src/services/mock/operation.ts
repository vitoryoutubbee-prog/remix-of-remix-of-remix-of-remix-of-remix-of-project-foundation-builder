import type { OperationStep, Opportunity } from "@/types";

/**
 * MOCK DATA — apenas para demonstrar a interface.
 * Será substituído por dados reais (Supabase / IA) em etapas futuras.
 */

export const opportunities: Opportunity[] = [
  {
    id: "eleicoes-2026",
    title: "Eleições 2026",
    attention: "Alta atenção",
    opportunities: 12,
    score: 98,
    contentPotential: "Alto",
    monetizationPotential: "Alto",
    trend: [30, 45, 62, 78, 100],
    summary: "Ciclo eleitoral com pico de buscas e alta demanda por explicações simples.",
  },
  {
    id: "futebol",
    title: "Futebol",
    attention: "Alta atenção",
    opportunities: 8,
    score: 94,
    contentPotential: "Alto",
    monetizationPotential: "Médio",
    trend: [40, 55, 70, 82, 90],
    summary: "Audiência recorrente e altíssimo volume de conteúdo curto consumido por dia.",
  },
  {
    id: "beleza",
    title: "Beleza",
    attention: "Alta atenção",
    opportunities: 10,
    score: 88,
    contentPotential: "Alto",
    monetizationPotential: "Médio",
    trend: [50, 62, 74, 85, 95],
    summary: "Nicho consolidado com forte conversão em produtos digitais e infoprodutos.",
  },
  {
    id: "entretenimento",
    title: "Entretenimento",
    attention: "Média atenção",
    opportunities: 6,
    score: 76,
    contentPotential: "Médio",
    monetizationPotential: "Alto",
    trend: [80, 72, 64, 58, 52],
    summary: "Picos rápidos de atenção com boa monetização por volume.",
  },
];

export const featuredOpportunity: Opportunity = opportunities[0]!;

export const operationSteps: OperationStep[] = [
  { id: "mining", label: "Mineração", state: "done" },
  { id: "product", label: "Product", state: "active" },
  { id: "offer", label: "Offer", state: "locked" },
  { id: "content", label: "Content", state: "locked" },
  { id: "sale", label: "Venda", state: "locked" },
];

export function getOpportunity(id: string): Opportunity | undefined {
  return opportunities.find((o) => o.id === id);
}

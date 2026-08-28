import { findMiningProduct } from "./mining";
import type {
  ContentTypeOption,
  GeneratedImage,
  LibraryItem,
  LibraryType,
  OperationContext,
} from "@/types";

/**
 * MOCK CONTENT STUDIO — dados e geradores simulados.
 * Cada função é assíncrona e isolada para que, futuramente, o corpo possa ser
 * substituído por chamadas reais (LLM, geração de imagem, geração de vídeo,
 * text-to-speech, analytics) sem alterar nenhum componente de interface.
 */

export const contentTypes: ContentTypeOption[] = [
  {
    key: "video",
    icon: "movie",
    label: "Vídeo",
    description: "Roteiros para TikTok, Reels e Shorts",
  },
  {
    key: "image",
    icon: "image",
    label: "Imagem",
    description: "Posts, criativos e imagens para redes sociais",
  },
  {
    key: "carousel",
    icon: "auto_stories",
    label: "Carrossel",
    description: "Sequências de posts para gerar retenção",
  },
  {
    key: "copy",
    icon: "edit_note",
    label: "Copy",
    description: "Legendas, hooks e CTAs",
  },
];

export const contentPipeline = ["Ideia", "Roteiro", "Visual", "Edição", "Publicação"];

/** Contexto da operação atual — futuramente vindo do banco de dados. */
const operationContexts: Record<string, OperationContext> = {
  "eleicoes-2026": {
    opportunityId: "eleicoes-2026",
    opportunityTitle: "Eleições 2026",
    product: {
      id: "guia-eleicoes-2026",
      name: "Guia Essencial das Eleições 2026",
      promise: "Entenda todo o processo eleitoral em menos de uma hora, sem viés e sem juridiquês.",
      price: "R$ 47,00",
    },
    offer: {
      id: "oferta-eleicoes-2026",
      name: "Guia Essencial das Eleições 2026",
      status: "Oferta ativa",
      price: "R$ 47,00",
    },
  },
  futebol: {
    opportunityId: "futebol",
    opportunityTitle: "Futebol",
    product: {
      id: "mercado-da-bola",
      name: "Mapa do Mercado da Bola",
      promise: "Acompanhe transferências e negociações antes de todo mundo.",
      price: "R$ 29,00",
    },
  },
  beleza: {
    opportunityId: "beleza",
    opportunityTitle: "Beleza",
  },
};

export const defaultOperationContext: OperationContext = operationContexts["eleicoes-2026"]!;

export function getOperationContext(opportunityId?: string): OperationContext {
  if (!opportunityId) return defaultOperationContext;
  const existing = operationContexts[opportunityId];
  if (existing) return existing;

  /** Oportunidade vinda da Mineração. */
  const mined = findMiningProduct(opportunityId);
  if (mined) {
    return {
      opportunityId: mined.id,
      opportunityTitle: mined.theme,
      product: {
        id: mined.id,
        name: mined.name,
        promise: mined.description,
        price: mined.price,
      },
    };
  }

  return { opportunityId, opportunityTitle: opportunityId };
}

/* ---------- Video Engine (interface preparada, sem integração) ---------- */

export const videoFormatOptions = ["TikTok", "Reels", "Shorts"] as const;
export const videoDurationOptions = ["15s", "30s", "60s"] as const;
export const videoStyleOptions = [
  "Notícia",
  "Storytelling",
  "Lista",
  "Explicação",
  "Curiosidade",
  "Opinião",
] as const;
export const videoVoiceOptions = ["Masculina", "Feminina", "Sem narração"] as const;
export const videoVisualOptions = [
  "Imagens de apoio",
  "Vídeo de stock",
  "AI Video",
  "Texto na tela",
] as const;

/* ---------- Image Engine ---------- */

export const imageKindOptions = [
  "Post",
  "Thumbnail",
  "Criativo",
  "Imagem de apoio",
  "Capa de carrossel",
] as const;

/**
 * Geração simulada de imagem.
 * FUTURO: substituir por provedor real (Gemini, OpenAI, etc.).
 */
export async function generateImage(kind: string, prompt: string): Promise<GeneratedImage> {
  await new Promise((r) => setTimeout(r, 1200));
  return {
    id: `img-${Date.now()}`,
    kind,
    prompt,
    caption:
      "Pré-visualização simulada. A geração real de imagem será conectada a um provedor de IA em uma etapa futura.",
  };
}

/* ---------- Biblioteca ---------- */

export const libraryFilters: Array<"Todos" | LibraryType> = [
  "Todos",
  "Vídeo",
  "Imagem",
  "Carrossel",
  "Copy",
];

export const libraryItems: LibraryItem[] = [
  {
    id: "lib-01",
    title: "5 coisas que você precisa entender sobre as Eleições 2026",
    type: "Vídeo",
    date: "24 ago 2026",
    status: "Publicado",
  },
  {
    id: "lib-02",
    title: "Capa jornalística — Eleições 2026",
    type: "Imagem",
    date: "24 ago 2026",
    status: "Pronto",
  },
  {
    id: "lib-03",
    title: "Como funciona a apuração — 7 slides",
    type: "Carrossel",
    date: "22 ago 2026",
    status: "Rascunho",
  },
  {
    id: "lib-04",
    title: "Legenda + CTA para o Guia Essencial",
    type: "Copy",
    date: "21 ago 2026",
    status: "Pronto",
  },
  {
    id: "lib-05",
    title: "Mercado da bola em 60 segundos",
    type: "Vídeo",
    date: "19 ago 2026",
    status: "Rascunho",
  },
  {
    id: "lib-06",
    title: "Thumbnail — Transferências da semana",
    type: "Imagem",
    date: "18 ago 2026",
    status: "Publicado",
  },
];

export type AttentionLevel = "Alta atenção" | "Média atenção" | "Baixa atenção";
export type PotentialLevel = "Alto" | "Médio" | "Baixo";
export type OperationStepState = "done" | "active" | "locked";

export interface Opportunity {
  id: string;
  title: string;
  attention: AttentionLevel;
  opportunities: number;
  score: number;
  contentPotential: PotentialLevel;
  monetizationPotential: PotentialLevel;
  trend: number[];
  summary: string;
}

export interface OperationStep {
  id: string;
  label: string;
  state: OperationStepState;
}

export type TrendDirection = "up" | "down" | "flat";

export interface Kpi {
  id: string;
  label: string;
  value: string;
  delta: string;
  direction: TrendDirection;
}

export type ChartRange = "7d" | "30d" | "90d";

export interface ChartPoint {
  label: string;
  revenue: number;
  profit: number;
}

export interface SummaryRow {
  label: string;
  value: string;
}

export interface SummaryGroup {
  id: string;
  label: string;
  icon: string;
  rows: SummaryRow[];
}

export interface ActiveOpportunity {
  id: string;
  title: string;
  score: number;
  status: string;
}

export interface ContentConfig {
  theme: string;
  objective: string;
  format: string;
  style: string;
  presence: string;
  duration: string;
  tone: string;
}

export interface ScriptBlock {
  label: string;
  text: string;
}

/** Cena do storyboard — pronta para futura geração de imagem/vídeo por API. */
export interface StoryboardScene {
  id: string;
  number: string;
  label: string;
  timecode: string;
  visual: string;
  onScreenText: string;
  narration: string;
  visualPrompt: string;
}

export interface GeneratedContent {
  title: string;
  badge: string;
  hook: string;
  script: ScriptBlock[];
  scenes: StoryboardScene[];
  narration: string;
  onScreenText: string[];
  cta: string;
  caption: string;
  hashtags: string[];
  visualPrompt: string;
  disclaimer: string;
}

export interface SequenceItem {
  id: string;
  number: string;
  title: string;
  kind: string;
}

/* ---------- Content Studio ---------- */

export type ContentTypeKey = "video" | "image" | "carousel" | "copy";

export interface ContentTypeOption {
  key: ContentTypeKey;
  icon: string;
  label: string;
  description: string;
}

export interface StudioProduct {
  id: string;
  name: string;
  promise: string;
  price: string;
}

export interface StudioOffer {
  id: string;
  name: string;
  status: string;
  price: string;
}

export interface OperationContext {
  opportunityId: string;
  opportunityTitle: string;
  product?: StudioProduct;
  offer?: StudioOffer;
}

export type LibraryType = "Vídeo" | "Imagem" | "Carrossel" | "Copy";
export type LibraryStatus = "Rascunho" | "Pronto" | "Publicado";

export interface LibraryItem {
  id: string;
  title: string;
  type: LibraryType;
  date: string;
  status: LibraryStatus;
}

export interface GeneratedImage {
  id: string;
  kind: string;
  prompt: string;
  caption: string;
}

/* ---------- Mineração ---------- */

export type MiningCategory = "E-book" | "Guia" | "Checklist" | "Template" | "Pack" | "Mini curso";

export type MiningTrend = "ALTA" | "CRESCENDO" | "ESTÁVEL";
export type MiningPotential = "MUITO ALTO" | "ALTO" | "MÉDIO/ALTO" | "MÉDIO" | "BAIXO";
export type MiningStage = "cold" | "scaled";

export interface MiningProduct {
  id: string;
  name: string;
  category: MiningCategory;
  price: string;
  theme: string;
  description: string;
  score: number;
  estimatedSales: number;
  /** Faturamento formatado para exibição. */
  revenue: string;
  /** Faturamento numérico, usado para ordenação. */
  revenueValue: number;
  adCount: number;
  activeDays: number;
  trend: MiningTrend;
  potential: MiningPotential;
  trendSeries: number[];
  /** Imagem real da oferta (opcional). Sem imagem, usamos a capa procedural. */
  image?: string;
  /** cold = oferta ainda não escalada; scaled = oferta escalada. */
  stage?: MiningStage;
}

export type MiningFilterKey =
  | "todos"
  | "escalados"
  | "recentes"
  | "potencial"
  | "ebooks"
  | "guias"
  | "templates"
  | "checklists"
  | "cursos";

export type MiningSortKey = "score" | "sales" | "revenue" | "ads" | "days";

export interface MiningSignal {
  label: string;
  value: string;
  note: string;
}

/* ---------- Product Builder ---------- */

export type ProductTypeKey =
  | "ebook"
  | "guia"
  | "checklist"
  | "template"
  | "pack"
  | "curso"
  | "desafio"
  | "metodo"
  | "outro";

export interface ProductTypeOption {
  key: ProductTypeKey;
  label: string;
  icon: string;
}

export type ProductStatus = "RASCUNHO" | "PRONTO" | "OFERTA CRIADA";

export interface SavedProduct {
  id: string;
  name: string;
  type: string;
  typeKey: ProductTypeKey;
  price: string;
  status: ProductStatus;
  score: number;
  image?: string;
}

export type ProductFilterKey = "todos" | ProductTypeKey;

/** Formulário de criação de produto (do zero ou pré-preenchido pela mineração). */
export interface ProductDraft {
  name: string;
  niche: string;
  type: ProductTypeKey;
  problem: string;
  audience: string;
  price: string;
}

export interface ProductModule {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface ProductPricing {
  min: string;
  ideal: string;
  max: string;
  note: string;
}

export interface ProductSignal {
  label: string;
  value: string;
}

/** Produto estruturado gerado pela IA (mock por enquanto). */
export interface GeneratedProduct {
  name: string;
  promise: string;
  audience: string;
  problem: string;
  mechanism: string;
  modules: ProductModule[];
  bonuses: string[];
  pricing: ProductPricing;
  positioning: string;
  description: string;
  signals: ProductSignal[];
  score: number;
  image?: string;
  sourceMiningId?: string;
}

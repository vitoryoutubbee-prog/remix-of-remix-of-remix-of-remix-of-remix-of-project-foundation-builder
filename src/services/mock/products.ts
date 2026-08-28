import type {
  GeneratedProduct,
  MiningProduct,
  ProductDraft,
  ProductFilterKey,
  ProductTypeKey,
  ProductTypeOption,
  SavedProduct,
} from "@/types";
import imgDesafio from "@/assets/mining/desafio-30-dias.jpg";
import imgFreelancer from "@/assets/mining/cold-freelancer.jpg";
import imgLegendas from "@/assets/mining/cold-legendas.jpg";
import imgFinanceiro from "@/assets/mining/rotina-financeira.jpg";
import imgMente from "@/assets/mining/mente-organizada.jpg";
import imgPlanner from "@/assets/mining/cold-planner.jpg";

/**
 * FONTE DE DADOS DO PRODUCT BUILDER (mock).
 * Toda a interface consome apenas as funções abaixo — para plugar IA/API real
 * basta substituir o corpo destas funções mantendo os mesmos tipos.
 */

export const productTypes: ProductTypeOption[] = [
  { key: "ebook", label: "Ebook", icon: "menu_book" },
  { key: "guia", label: "Guia", icon: "map" },
  { key: "checklist", label: "Checklist", icon: "checklist" },
  { key: "template", label: "Template", icon: "dashboard_customize" },
  { key: "pack", label: "Pack", icon: "inventory_2" },
  { key: "curso", label: "Mini curso", icon: "school" },
  { key: "desafio", label: "Desafio", icon: "flag" },
  { key: "metodo", label: "Método", icon: "route" },
  { key: "outro", label: "Outro", icon: "more_horiz" },
];

export const productFilters: { key: ProductFilterKey; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "ebook", label: "Ebooks" },
  { key: "guia", label: "Guias" },
  { key: "template", label: "Templates" },
  { key: "pack", label: "Packs" },
  { key: "curso", label: "Cursos" },
  { key: "desafio", label: "Desafios" },
];

export const savedProducts: SavedProduct[] = [
  {
    id: "desafio-30-dias-sem-desorganizacao",
    name: "Desafio 30 Dias Sem Desorganização",
    type: "Desafio",
    typeKey: "desafio",
    price: "R$ 24,90",
    status: "OFERTA CRIADA",
    score: 93,
    image: imgDesafio,
  },
  {
    id: "mapa-do-freelancer-iniciante",
    name: "Mapa do Freelancer Iniciante",
    type: "Guia",
    typeKey: "guia",
    price: "R$ 37",
    status: "PRONTO",
    score: 89,
    image: imgFreelancer,
  },
  {
    id: "pack-conteudo-que-vende",
    name: "Pack Conteúdo que Vende",
    type: "Pack",
    typeKey: "pack",
    price: "R$ 47",
    status: "PRONTO",
    score: 91,
    image: imgLegendas,
  },
  {
    id: "plano-financeiro-em-30-dias",
    name: "Plano Financeiro em 30 Dias",
    type: "Mini curso",
    typeKey: "curso",
    price: "R$ 67",
    status: "RASCUNHO",
    score: 85,
    image: imgFinanceiro,
  },
  {
    id: "guia-rotina-leve",
    name: "Guia Rotina Leve",
    type: "Ebook",
    typeKey: "ebook",
    price: "R$ 19,90",
    status: "RASCUNHO",
    score: 82,
    image: imgMente,
  },
  {
    id: "kit-produtividade-sem-complicacao",
    name: "Kit Produtividade Sem Complicação",
    type: "Template",
    typeKey: "template",
    price: "R$ 29,90",
    status: "PRONTO",
    score: 87,
    image: imgPlanner,
  },
];

export function querySavedProducts(filter: ProductFilterKey = "todos"): SavedProduct[] {
  if (filter === "todos") return savedProducts;
  return savedProducts.filter((product) => product.typeKey === filter);
}

const categoryToType: Record<string, ProductTypeKey> = {
  "E-book": "ebook",
  Guia: "guia",
  Checklist: "checklist",
  Template: "template",
  Pack: "pack",
  "Mini curso": "curso",
};

/** Converte uma oportunidade minerada em rascunho de produto pré-preenchido. */
export function draftFromMining(product: MiningProduct): ProductDraft {
  return {
    name: `${titleCase(product.name)} — versão NEXORA`,
    niche: product.theme,
    type: categoryToType[product.category] ?? "outro",
    problem: product.description,
    audience: `Pessoas interessadas em ${product.theme.toLowerCase()} que buscam um caminho simples, rápido e aplicável no dia a dia.`,
    price: product.price,
  };
}

export const emptyDraft: ProductDraft = {
  name: "",
  niche: "",
  type: "ebook",
  problem: "",
  audience: "",
  price: "",
};

function titleCase(value: string) {
  return value
    .toLowerCase()
    .split(" ")
    .map((word) => (word.length > 2 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(" ");
}

function moduleSet(niche: string, type: ProductTypeKey): string[][] {
  const base = [
    ["Fundamentos", `O que realmente importa em ${niche.toLowerCase() || "seu mercado"} antes de começar.`],
    ["Primeiros passos", "As primeiras ações práticas para sair do zero em poucos dias."],
    ["Aplicação prática", "O método aplicado no dia a dia, com exemplos e modelos prontos."],
    ["Aceleração", "Como acelerar resultados e evitar os erros mais comuns."],
    ["Plano de ação", "Roteiro final de execução com metas por semana."],
  ];
  if (type === "desafio") base[4] = ["Desafio final", "Sequência de 7 dias para consolidar o novo hábito."];
  if (type === "pack") base[2] = ["Biblioteca de recursos", "Todos os templates organizados por objetivo de uso."];
  return base;
}

/**
 * GERAÇÃO DO PRODUTO (mock determinístico).
 * FUTURO: chamar o modelo de IA com o draft + contexto da oportunidade minerada.
 */
export function generateProduct(
  draft: ProductDraft,
  source?: MiningProduct,
): GeneratedProduct {
  const typeLabel = productTypes.find((t) => t.key === draft.type)?.label ?? "Produto";
  const niche = draft.niche || source?.theme || "produtividade";
  const name = draft.name || `${typeLabel} de ${niche}`;
  const price = draft.price || source?.price || "R$ 27";

  return {
    name,
    promise: `Um caminho direto para resolver ${shortProblem(draft.problem || source?.description || niche)} em até 30 dias, sem complicação.`,
    audience:
      draft.audience ||
      `Pessoas que estão começando em ${niche.toLowerCase()} e precisam de um passo a passo simples.`,
    problem:
      draft.problem ||
      source?.description ||
      `Falta de um método claro para avançar em ${niche.toLowerCase()} sem se perder no excesso de informação.`,
    mechanism: `Método NEXORA em 5 estágios: diagnóstico, estrutura, execução guiada, aceleração e plano de manutenção — construído especificamente para ${niche.toLowerCase()}.`,
    modules: moduleSet(niche, draft.type).map(([title, description], i) => ({
      id: `modulo-${i + 1}`,
      number: `MÓDULO ${String(i + 1).padStart(2, "0")}`,
      title: title ?? "",
      description: description ?? "",
    })),
    bonuses: [
      "Checklist de implementação",
      "Guia rápido de primeiros resultados",
      "Templates prontos para usar",
      "Plano de ação de 30 dias",
    ],
    pricing: {
      min: cheaper(price),
      ideal: price,
      max: pricier(price),
      note: "Faixa recomendada pela NEXORA com base nos sinais de mercado do nicho.",
    },
    positioning: `Alternativa mais direta e aplicável dentro de ${niche.toLowerCase()}: entrega resultado rápido em vez de teoria longa.`,
    description: `${name} é um ${typeLabel.toLowerCase()} objetivo para quem quer resolver ${shortProblem(draft.problem || source?.description || niche)} com um plano claro. São 5 módulos de execução, bônus práticos e um roteiro de 30 dias para sair da estaca zero.`,
    signals: [
      { label: "Demanda", value: source && source.score >= 85 ? "ALTA" : "MÉDIA/ALTA" },
      { label: "Facilidade de criação", value: "ALTA" },
      { label: "Potencial de monetização", value: source && source.revenueValue > 50000 ? "ALTO" : "MÉDIO/ALTO" },
      { label: "Potencial de adaptação", value: "ALTO" },
    ],
    score: source?.score ?? 88,
    ...(source?.image ? { image: source.image } : {}),
    ...(source ? { sourceMiningId: source.id } : {}),
  };
}

function shortProblem(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= 90) return clean.toLowerCase();
  return `${clean.slice(0, 90).toLowerCase()}...`;
}

function parsePrice(price: string) {
  const numeric = Number(price.replace(/[^\d,]/g, "").replace(",", "."));
  return Number.isFinite(numeric) && numeric > 0 ? numeric : 27;
}

function format(value: number) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

function cheaper(price: string) {
  return format(Math.max(9, Math.round(parsePrice(price) * 0.7)));
}

function pricier(price: string) {
  return format(Math.round(parsePrice(price) * 1.8));
}

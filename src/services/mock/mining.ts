import type { MiningFilterKey, MiningProduct, MiningSignal, MiningSortKey } from "@/types";
import imgMapaRendaExtra from "@/assets/mining/mapa-da-renda-extra.jpg";
import imgDesafio30Dias from "@/assets/mining/desafio-30-dias.jpg";
import imgCozinhaLucrativa from "@/assets/mining/cozinha-lucrativa.jpg";
import imgGuiaPrimeiroCliente from "@/assets/mining/guia-do-primeiro-cliente.jpg";
import imgRotinaFinanceira from "@/assets/mining/rotina-financeira.jpg";
import imgCasaOrganizada from "@/assets/mining/casa-organizada.jpg";
import imgFaceless from "@/assets/mining/faceless-content-machine.jpg";
import imgMenteOrganizada from "@/assets/mining/mente-organizada.jpg";
import imgPetFeliz from "@/assets/mining/guia-do-pet-feliz.jpg";
import imgPrimeiraOferta from "@/assets/mining/crie-sua-primeira-oferta.jpg";
import imgColdPlanner from "@/assets/mining/cold-planner.jpg";
import imgColdReceitasFit from "@/assets/mining/cold-receitas-fit.jpg";
import imgColdExcel from "@/assets/mining/cold-excel.jpg";
import imgColdMudanca from "@/assets/mining/cold-mudanca.jpg";
import imgColdFreelancer from "@/assets/mining/cold-freelancer.jpg";
import imgColdLegendas from "@/assets/mining/cold-legendas.jpg";

/** Imagem de capa por oferta (id → imagem). */
const miningImages: Record<string, string> = {
  "mapa-da-renda-extra": imgMapaRendaExtra,
  "desafio-30-dias-sem-desorganizacao": imgDesafio30Dias,
  "cozinha-lucrativa": imgCozinhaLucrativa,
  "guia-do-primeiro-cliente": imgGuiaPrimeiroCliente,
  "rotina-financeira-descomplicada": imgRotinaFinanceira,
  "projeto-casa-organizada": imgCasaOrganizada,
  "faceless-content-machine": imgFaceless,
  "mente-organizada": imgMenteOrganizada,
  "guia-do-pet-feliz": imgPetFeliz,
  "crie-sua-primeira-oferta": imgPrimeiraOferta,
  "cold-planner-da-semana": imgColdPlanner,
  "cold-receitas-fit-basicas": imgColdReceitasFit,
  "cold-primeiros-passos-no-excel": imgColdExcel,
  "cold-checklist-de-mudanca": imgColdMudanca,
  "cold-guia-do-freelancer-iniciante": imgColdFreelancer,
  "cold-pack-de-legendas": imgColdLegendas,
};

/** Anexa a imagem de capa à oferta, quando existir. */
function withImage(product: MiningProduct): MiningProduct {
  const image = miningImages[product.id];
  return image ? { ...product, image } : product;
}

/**
 * BASE DE OFERTAS DA MINERAÇÃO.
 * A coleção e as funções abaixo isolam a fonte de dados da interface: para
 * conectar fontes/APIs reais no futuro basta substituir o corpo destas
 * funções mantendo os mesmos tipos.
 */

export const miningProducts: MiningProduct[] = [
  {
    id: "mapa-da-renda-extra",
    name: "MAPA DA RENDA EXTRA",
    category: "E-book",
    price: "R$ 27",
    theme: "Renda extra",
    description:
      "Passo a passo para montar uma primeira fonte de renda extra digital em poucas semanas, sem investimento inicial alto.",
    score: 96,
    estimatedSales: 3842,
    revenue: "R$ 103.734",
    revenueValue: 103734,
    adCount: 42,
    activeDays: 127,
    trend: "ALTA",
    potential: "MUITO ALTO",
    trendSeries: [30, 46, 61, 80, 100],
  },
  {
    id: "desafio-30-dias-sem-desorganizacao",
    name: "DESAFIO 30 DIAS SEM DESORGANIZAÇÃO",
    category: "Guia",
    price: "R$ 19,90",
    theme: "Organização",
    description:
      "Desafio guiado de 30 dias que transforma a rotina da casa e do trabalho em um sistema simples de organização.",
    score: 93,
    estimatedSales: 3417,
    revenue: "R$ 67.998",
    revenueValue: 67998,
    adCount: 31,
    activeDays: 94,
    trend: "ALTA",
    potential: "ALTO",
    trendSeries: [34, 48, 66, 78, 94],
  },
  {
    id: "cozinha-lucrativa",
    name: "COZINHA LUCRATIVA",
    category: "E-book",
    price: "R$ 29,90",
    theme: "Receitas",
    description:
      "Receitas simples e precificação para quem quer vender comida caseira, marmitas e doces com margem real.",
    score: 91,
    estimatedSales: 2126,
    revenue: "R$ 63.567",
    revenueValue: 63567,
    adCount: 56,
    activeDays: 181,
    trend: "ALTA",
    potential: "MUITO ALTO",
    trendSeries: [40, 52, 68, 84, 96],
  },
  {
    id: "guia-do-primeiro-cliente",
    name: "GUIA DO PRIMEIRO CLIENTE",
    category: "Guia",
    price: "R$ 37",
    theme: "Serviços e freelas",
    description:
      "Roteiro comercial para conseguir os primeiros clientes prestando serviços, com scripts de abordagem e proposta.",
    score: 89,
    estimatedSales: 1936,
    revenue: "R$ 71.632",
    revenueValue: 71632,
    adCount: 27,
    activeDays: 76,
    trend: "CRESCENDO",
    potential: "ALTO",
    trendSeries: [28, 40, 58, 74, 90],
  },
  {
    id: "rotina-financeira-descomplicada",
    name: "ROTINA FINANCEIRA DESCOMPLICADA",
    category: "Checklist",
    price: "R$ 17",
    theme: "Organização financeira",
    description:
      "Checklist mensal para organizar contas, cortar gastos invisíveis e montar uma reserva sem planilhas complexas.",
    score: 87,
    estimatedSales: 3231,
    revenue: "R$ 54.927",
    revenueValue: 54927,
    adCount: 24,
    activeDays: 113,
    trend: "CRESCENDO",
    potential: "ALTO",
    trendSeries: [32, 45, 60, 72, 88],
  },
  {
    id: "projeto-casa-organizada",
    name: "PROJETO CASA ORGANIZADA",
    category: "E-book",
    price: "R$ 24,90",
    theme: "Casa e organização",
    description:
      "Método ambiente por ambiente para organizar a casa inteira, com listas de descarte e rotinas de manutenção.",
    score: 86,
    estimatedSales: 2104,
    revenue: "R$ 52.390",
    revenueValue: 52390,
    adCount: 38,
    activeDays: 142,
    trend: "ESTÁVEL",
    potential: "ALTO",
    trendSeries: [58, 60, 62, 61, 63],
  },
  {
    id: "faceless-content-machine",
    name: "FACELESS CONTENT MACHINE",
    category: "Pack",
    price: "R$ 47",
    theme: "Conteúdo faceless",
    description:
      "Pack completo de roteiros, templates e prompts para produzir conteúdo curto sem aparecer.",
    score: 95,
    estimatedSales: 1847,
    revenue: "R$ 86.809",
    revenueValue: 86809,
    adCount: 63,
    activeDays: 89,
    trend: "ALTA",
    potential: "MUITO ALTO",
    trendSeries: [26, 44, 65, 86, 100],
  },
  {
    id: "mente-organizada",
    name: "MENTE ORGANIZADA",
    category: "Guia",
    price: "R$ 27",
    theme: "Produtividade",
    description:
      "Guia de foco e clareza mental para reduzir sobrecarga e executar o que realmente importa no dia.",
    score: 84,
    estimatedSales: 683,
    revenue: "R$ 18.441",
    revenueValue: 18441,
    adCount: 19,
    activeDays: 121,
    trend: "ESTÁVEL",
    potential: "MÉDIO/ALTO",
    trendSeries: [52, 50, 54, 51, 53],
  },
  {
    id: "guia-do-pet-feliz",
    name: "GUIA DO PET FELIZ",
    category: "E-book",
    price: "R$ 22",
    theme: "Pets",
    description:
      "Cuidados, alimentação e adestramento básico para tutores de primeira viagem manterem o pet saudável.",
    score: 82,
    estimatedSales: 712,
    revenue: "R$ 15.664",
    revenueValue: 15664,
    adCount: 35,
    activeDays: 156,
    trend: "ESTÁVEL",
    potential: "ALTO",
    trendSeries: [48, 47, 50, 49, 51],
  },
  {
    id: "crie-sua-primeira-oferta",
    name: "CRIE SUA PRIMEIRA OFERTA",
    category: "Template",
    price: "R$ 37",
    theme: "Ofertas digitais",
    description:
      "Templates de página, bônus e copy para estruturar uma oferta digital pronta para vender.",
    score: 92,
    estimatedSales: 1629,
    revenue: "R$ 60.273",
    revenueValue: 60273,
    adCount: 48,
    activeDays: 68,
    trend: "CRESCENDO",
    potential: "MUITO ALTO",
    trendSeries: [30, 43, 62, 79, 92],
  },
];

/**
 * OFERTAS AINDA NÃO ESCALADAS — o que aparece antes de iniciar a mineração.
 * Pouco volume de vendas, faturamento baixo e poucos anúncios rodando.
 */
export const coldMiningProducts: MiningProduct[] = [
  {
    id: "cold-planner-da-semana",
    name: "PLANNER DA SEMANA",
    category: "Template",
    price: "R$ 12",
    theme: "Produtividade",
    description:
      "Planner semanal simples para organizar tarefas e compromissos, ainda sem tração de anúncios.",
    score: 41,
    estimatedSales: 38,
    revenue: "R$ 456",
    revenueValue: 456,
    adCount: 1,
    activeDays: 9,
    trend: "ESTÁVEL",
    potential: "BAIXO",
    trendSeries: [12, 10, 14, 11, 13],
    stage: "cold",
  },
  {
    id: "cold-receitas-fit-basicas",
    name: "RECEITAS FIT BÁSICAS",
    category: "E-book",
    price: "R$ 15",
    theme: "Alimentação",
    description:
      "E-book de receitas leves para o dia a dia, com poucas vendas e sem estrutura de tráfego.",
    score: 44,
    estimatedSales: 61,
    revenue: "R$ 915",
    revenueValue: 915,
    adCount: 2,
    activeDays: 14,
    trend: "ESTÁVEL",
    potential: "BAIXO",
    trendSeries: [14, 13, 16, 15, 17],
    stage: "cold",
  },
  {
    id: "cold-primeiros-passos-no-excel",
    name: "PRIMEIROS PASSOS NO EXCEL",
    category: "Mini curso",
    price: "R$ 39",
    theme: "Capacitação",
    description:
      "Mini curso introdutório de planilhas, com audiência pequena e volume de vendas irregular.",
    score: 47,
    estimatedSales: 27,
    revenue: "R$ 1.053",
    revenueValue: 1053,
    adCount: 1,
    activeDays: 21,
    trend: "ESTÁVEL",
    potential: "MÉDIO",
    trendSeries: [18, 16, 19, 17, 20],
    stage: "cold",
  },
  {
    id: "cold-checklist-de-mudanca",
    name: "CHECKLIST DE MUDANÇA",
    category: "Checklist",
    price: "R$ 9,90",
    theme: "Casa",
    description:
      "Checklist de mudança residencial, produto nichado com faturamento ainda muito baixo.",
    score: 38,
    estimatedSales: 44,
    revenue: "R$ 436",
    revenueValue: 436,
    adCount: 1,
    activeDays: 6,
    trend: "ESTÁVEL",
    potential: "BAIXO",
    trendSeries: [9, 11, 10, 12, 11],
    stage: "cold",
  },
  {
    id: "cold-guia-do-freelancer-iniciante",
    name: "GUIA DO FREELANCER INICIANTE",
    category: "Guia",
    price: "R$ 19",
    theme: "Serviços e freelas",
    description:
      "Guia inicial para freelancers, testado em poucos criativos e sem escala comprovada.",
    score: 52,
    estimatedSales: 96,
    revenue: "R$ 1.824",
    revenueValue: 1824,
    adCount: 3,
    activeDays: 24,
    trend: "CRESCENDO",
    potential: "MÉDIO",
    trendSeries: [16, 19, 22, 25, 29],
    stage: "cold",
  },
  {
    id: "cold-pack-de-legendas",
    name: "PACK DE LEGENDAS PRONTAS",
    category: "Pack",
    price: "R$ 17",
    theme: "Conteúdo",
    description:
      "Pack de legendas para redes sociais, com poucas vendas recorrentes e baixo investimento em mídia.",
    score: 49,
    estimatedSales: 73,
    revenue: "R$ 1.241",
    revenueValue: 1241,
    adCount: 2,
    activeDays: 18,
    trend: "CRESCENDO",
    potential: "MÉDIO",
    trendSeries: [13, 15, 18, 20, 24],
    stage: "cold",
  },
];

export const miningFilters: { key: MiningFilterKey; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "escalados", label: "Mais escalados" },
  { key: "recentes", label: "Mais recentes" },
  { key: "potencial", label: "Maior potencial" },
  { key: "ebooks", label: "Ebooks" },
  { key: "guias", label: "Guias" },
  { key: "templates", label: "Templates" },
  { key: "checklists", label: "Checklists" },
  { key: "cursos", label: "Cursos" },
];

export const miningSorts: { key: MiningSortKey; label: string }[] = [
  { key: "score", label: "Score" },
  { key: "sales", label: "Vendas" },
  { key: "revenue", label: "Faturamento" },
  { key: "ads", label: "Anúncios" },
  { key: "days", label: "Dias ativos" },
];

export const miningStages = [
  "Conectando aos dados...",
  "Analisando mercados...",
  "Identificando produtos...",
  "Analisando sinais de demanda...",
  "Calculando oportunidades...",
];

export const miningDone = "Mineração concluída";

export const miningSearchExamples = [
  "renda extra",
  "emagrecimento",
  "beleza",
  "futebol",
  "organização financeira",
  "receitas",
  "pets",
];

const potentialRank: Record<MiningProduct["potential"], number> = {
  "MUITO ALTO": 5,
  ALTO: 4,
  "MÉDIO/ALTO": 3,
  "MÉDIO": 2,
  BAIXO: 1,
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function findMiningProduct(id: string): MiningProduct | undefined {
  const product = [...miningProducts, ...coldMiningProducts].find((p) => p.id === id);
  return product ? withImage(product) : undefined;
}

function matchesFilter(product: MiningProduct, filter: MiningFilterKey) {
  switch (filter) {
    case "ebooks":
      return product.category === "E-book";
    case "guias":
      return product.category === "Guia";
    case "templates":
      return product.category === "Template" || product.category === "Pack";
    case "checklists":
      return product.category === "Checklist";
    case "cursos":
      return product.category === "Mini curso";
    default:
      return true;
  }
}

function compare(a: MiningProduct, b: MiningProduct, sort: MiningSortKey) {
  switch (sort) {
    case "sales":
      return b.estimatedSales - a.estimatedSales;
    case "revenue":
      return b.revenueValue - a.revenueValue;
    case "ads":
      return b.adCount - a.adCount;
    case "days":
      return b.activeDays - a.activeDays;
    default:
      return b.score - a.score;
  }
}

/** FUTURO: substituir por consulta a fontes/APIs reais de inteligência de mercado. */
export function queryMiningProducts({
  term = "",
  filter = "todos",
  sort = "score",
  scaled = true,
}: {
  term?: string;
  filter?: MiningFilterKey;
  sort?: MiningSortKey;
  /** true = ofertas escaladas (pós-mineração); false = ofertas ainda não escaladas. */
  scaled?: boolean;
}): MiningProduct[] {
  const source = scaled ? miningProducts : coldMiningProducts;
  const q = normalize(term.trim());

  let list = source.filter((product) => {
    if (!matchesFilter(product, filter)) return false;
    if (!q) return true;
    return normalize(
      `${product.name} ${product.category} ${product.theme} ${product.description}`,
    ).includes(q);
  });

  if (filter === "escalados") {
    list = [...list].sort((a, b) => b.adCount - a.adCount);
  } else if (filter === "recentes") {
    list = [...list].sort((a, b) => a.activeDays - b.activeDays);
  } else if (filter === "potencial") {
    list = [...list].sort(
      (a, b) => potentialRank[b.potential] - potentialRank[a.potential] || b.score - a.score,
    );
  } else {
    list = [...list].sort((a, b) => compare(a, b, sort));
  }

  return list.map(withImage);
}

export function miningSignals(product: MiningProduct): MiningSignal[] {
  const level = (value: number, high: number, mid: number) =>
    value >= high ? "ALTA" : value >= mid ? "MÉDIA" : "MODERADA";

  return [
    {
      label: "Demanda",
      value: level(product.estimatedSales, 2000, 900),
      note: `${product.estimatedSales.toLocaleString("pt-BR")} vendas estimadas no período analisado.`,
    },
    {
      label: "Longevidade",
      value: level(product.activeDays, 120, 80),
      note: `${product.activeDays} dias com presença contínua no mercado.`,
    },
    {
      label: "Volume de anúncios",
      value: product.adCount >= 40 ? "ALTO" : product.adCount >= 25 ? "MÉDIO" : "MODERADO",
      note: `${product.adCount} anúncios identificados rodando para esse produto.`,
    },
    {
      label: "Potencial de adaptação",
      value: product.potential === "MUITO ALTO" ? "ALTO" : product.potential,
      note: `Tema "${product.theme}" permite criar uma versão própria com facilidade.`,
    },
  ];
}

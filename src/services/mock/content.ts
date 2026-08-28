import type { ContentConfig, GeneratedContent, SequenceItem, StoryboardScene } from "@/types";

/**
 * MOCK CONTENT ENGINE — geração simulada.
 * A assinatura assíncrona e os tipos permitem trocar o corpo destas funções
 * por chamadas reais (OpenAI / Gemini / Claude / geração de imagem e vídeo)
 * sem alterar nenhum componente de interface.
 */

export const objectiveOptions = [
  "Gerar audiência",
  "Gerar engajamento",
  "Educar",
  "Monetizar",
] as const;

export const formatOptions = ["TikTok", "Reels", "Shorts", "Carrossel"] as const;

export const styleOptions = [
  "Notícias rápidas",
  "Explicação simples",
  "Lista / Top 5",
  "Curiosidades",
  "Storytelling",
  "Opinião",
] as const;

export const presenceOptions = ["Faceless", "Com rosto"] as const;

export const durationOptions = ["15s", "30s", "60s"] as const;

export const toneOptions = [
  "Informativo",
  "Polêmico",
  "Curioso",
  "Urgente",
  "Educativo",
  "Entretenimento",
] as const;

export const defaultConfig: Omit<ContentConfig, "theme"> = {
  objective: "Gerar audiência",
  format: "TikTok",
  style: "Explicação simples",
  presence: "Faceless",
  duration: "30s",
  tone: "Informativo",
};

export const generationStages = [
  "Analisando oportunidade...",
  "Construindo roteiro...",
  "Montando storyboard...",
  "Conteúdo pronto.",
];

function hashtagize(theme: string) {
  const base = theme
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "");
  return [`#${base || "tema"}`, "#conteudo", "#brasil", "#informacao"];
}

function buildScenes(theme: string, offerName?: string): StoryboardScene[] {
  const cta = offerName
    ? `Link na bio para o ${offerName}.`
    : "Salve este vídeo e siga para os próximos conteúdos.";
  return [
    {
      id: "cena-01",
      number: "01",
      label: "Hook",
      timecode: "0–3s",
      visual: "Close em alto contraste com movimento leve de câmera.",
      onScreenText: `${theme} em 60 segundos`,
      narration: `Se você ainda não entendeu o que está acontecendo em ${theme}, presta atenção nisso.`,
      visualPrompt: `Cena de abertura impactante sobre ${theme}, preto e branco, alto contraste, 9:16.`,
    },
    {
      id: "cena-02",
      number: "02",
      label: "Contexto",
      timecode: "3–10s",
      visual: "Imagens de apoio com corte rápido a cada 1,5s.",
      onScreenText: "O que realmente importa",
      narration: `Explique rapidamente o que é ${theme} e por que isso importa agora.`,
      visualPrompt: `Sequência documental sobre ${theme}, iluminação suave, grão fino, 9:16.`,
    },
    {
      id: "cena-03",
      number: "03",
      label: "Desenvolvimento",
      timecode: "10–25s",
      visual: "Texto grande centralizado com fundo escuro.",
      onScreenText: "Ponto 1",
      narration: "Apresente a primeira informação relevante de forma direta e simples.",
      visualPrompt: `Composição tipográfica minimalista sobre ${theme}, fundo preto, 9:16.`,
    },
    {
      id: "cena-04",
      number: "04",
      label: "Informação principal",
      timecode: "25–40s",
      visual: "Plano detalhe com zoom lento e legenda destacada.",
      onScreenText: "Ponto 2",
      narration: "Apresente a informação principal, aquela que sustenta o vídeo inteiro.",
      visualPrompt: `Plano detalhe cinematográfico sobre ${theme}, contraste alto, 9:16.`,
    },
    {
      id: "cena-05",
      number: "05",
      label: "CTA",
      timecode: "40–45s",
      visual: "Tela final com chamada estática e respiro visual.",
      onScreenText: "Salve para não esquecer",
      narration: cta,
      visualPrompt: `Tela final minimalista com espaço para chamada de ação sobre ${theme}, 9:16.`,
    },
  ];
}

export async function generateContent(
  config: ContentConfig,
  titleOverride?: string,
  offerName?: string,
): Promise<GeneratedContent> {
  const theme = config.theme.trim() || "seu tema";
  const title = titleOverride ?? `5 coisas que você precisa entender sobre ${theme}`;

  return {
    title,
    badge: `${config.presence} ${config.format} ${config.duration}`,
    hook: `Se você ainda não entendeu o que está acontecendo em ${theme}, presta atenção nisso.`,
    script: [
      {
        label: "HOOK",
        text: "Comece com uma frase forte para prender a atenção nos 3 primeiros segundos.",
      },
      {
        label: "CONTEXTO",
        text: `Explique rapidamente o que é ${theme} e por que isso importa agora.`,
      },
      {
        label: "PONTO 1",
        text: "Apresente a primeira informação relevante de forma direta e simples.",
      },
      { label: "PONTO 2", text: "Apresente a segunda informação, complementando a anterior." },
      {
        label: "FECHAMENTO",
        text: "Resuma a ideia principal e conduza o espectador para a próxima ação.",
      },
    ],
    scenes: buildScenes(theme, offerName),
    narration: `Todo mundo está falando sobre ${theme}, mas pouca gente explica de forma simples. Tom ${config.tone.toLowerCase()}, sem enrolação e sem termos complicados.`,
    onScreenText: [
      `${theme} em 60 segundos`,
      "O que realmente importa",
      "Ponto 1",
      "Ponto 2",
      "Salve para não esquecer",
    ],
    cta: offerName
      ? `Garanta o ${offerName} pelo link na bio.`
      : "Salve este vídeo e acompanhe os próximos conteúdos.",
    caption: `${title}. Conteúdo simples e direto sobre ${theme} — salve e compartilhe com quem precisa entender isso.`,
    hashtags: hashtagize(theme),
    visualPrompt: `Cena minimalista em alto contraste preto e branco representando ${theme}, iluminação cinematográfica suave, textura de grão fina, composição vertical 9:16, sem texto na imagem.`,
    disclaimer:
      "Revise o roteiro antes de publicar: dados, números e afirmações devem ser confirmados na fonte.",
  };
}

export function buildSequence(theme: string): SequenceItem[] {
  return [
    { id: "01", number: "01", title: `O que pode mudar em ${theme}?`, kind: "Explicação simples" },
    { id: "02", number: "02", title: "5 fatos que você precisa conhecer", kind: "Lista / Top 5" },
    { id: "03", number: "03", title: `Como acompanhar ${theme}`, kind: "Guia rápido" },
    { id: "04", number: "04", title: "Entenda esse tema em 60 segundos", kind: "Notícias rápidas" },
    {
      id: "05",
      number: "05",
      title: "As principais dúvidas sobre o assunto",
      kind: "Curiosidades",
    },
  ];
}

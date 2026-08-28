import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/nexora/AppLayout";
import { Button, buttonClasses } from "@/components/nexora/Button";
import { Card } from "@/components/nexora/Card";
import { ContentConfigPanel } from "@/components/nexora/ContentConfigPanel";
import { ContentLibrary } from "@/components/nexora/ContentLibrary";
import { ContentPipeline } from "@/components/nexora/ContentPipeline";
import { ContentSequence } from "@/components/nexora/ContentSequence";
import { ContentTypeGrid } from "@/components/nexora/ContentTypeGrid";
import { EmptyState } from "@/components/nexora/EmptyState";
import { GeneratedContentView } from "@/components/nexora/GeneratedContentView";
import { Icon } from "@/components/nexora/Icon";
import { ImageEnginePanel } from "@/components/nexora/ImageEnginePanel";
import { OperationContextPanel } from "@/components/nexora/OperationContextPanel";
import { SectionHeader } from "@/components/nexora/SectionHeader";
import { StoryboardView } from "@/components/nexora/StoryboardView";
import { VideoEnginePanel } from "@/components/nexora/VideoEnginePanel";
import {
  buildSequence,
  defaultConfig,
  generateContent,
  generationStages,
} from "@/services/mock/content";
import { contentPipeline, contentTypes, getOperationContext } from "@/services/mock/studio";
import type {
  ContentConfig,
  ContentTypeKey,
  GeneratedContent,
  OperationContext,
  SequenceItem,
} from "@/types";

export const Route = createFileRoute("/content/")({
  validateSearch: (search: Record<string, unknown>) => ({
    mining: typeof search["mining"] === "string" ? (search["mining"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "NEXORA Content Studio — produção de conteúdo com IA" },
      {
        name: "description",
        content:
          "Crie, produza e organize conteúdo para transformar atenção em vendas: roteiros, storyboard, imagens, carrosséis e copies conectados à sua oferta.",
      },
      { property: "og:title", content: "NEXORA Content Studio — produção de conteúdo com IA" },
      {
        property: "og:description",
        content:
          "Crie, produza e organize conteúdo para transformar atenção em vendas: roteiros, storyboard, imagens, carrosséis e copies conectados à sua oferta.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContentStudioPage,
});

function ContentStudioPage() {
  const { mining } = Route.useSearch();
  const context = getOperationContext(mining);

  const [type, setType] = useState<ContentTypeKey>("video");
  const [config, setConfig] = useState<ContentConfig>({
    ...defaultConfig,
    theme: context.opportunityTitle,
  });
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<string | null>(null);
  const [activeSequence, setActiveSequence] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const sequence = buildSequence(config.theme.trim() || context.opportunityTitle);
  const pipelineIndex = loading ? 1 : content ? 2 : 0;

  /** FUTURO: substituir generateContent() por uma chamada real de LLM. */
  async function run(titleOverride?: string) {
    setLoading(true);
    setContent(null);
    for (const [i, text] of generationStages.entries()) {
      setStage(text);
      await new Promise((r) => setTimeout(r, i === generationStages.length - 1 ? 400 : 900));
    }
    const result = await generateContent(config, titleOverride, context.offer?.name);
    setContent(result);
    setLoading(false);
    setStage(null);
    setActiveSequence(null);
  }

  function handleSequence(item: SequenceItem) {
    setActiveSequence(item.id);
    void run(item.title);
  }

  function copyScript() {
    if (!content) return;
    const text = [
      content.title,
      "",
      `HOOK: ${content.hook}`,
      "",
      ...content.script.map((b) => `[${b.label}]\n${b.text}`),
      "",
      `CTA: ${content.cta}`,
    ].join("\n");
    void navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function download() {
    if (!content) return;
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(content, null, 2)], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "nexora-conteudo.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AppLayout>
      <div className="mb-3 inline-flex items-center gap-2">
        <span className="metric-pulse h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="label-caps text-secondary-foreground">Nexora Content Studio</span>
      </div>
      <SectionHeader
        title="Content Studio"
        description="Transforme sua operação em conteúdo pronto para publicar."
        className="mb-10"
      />

      <div className="flex flex-col gap-gutter">
        <OperationContextPanel context={context} />

        <OfferFocus context={context} onStart={() => setType("video")} />

        <ContentPipeline steps={contentPipeline} currentIndex={pipelineIndex} />

        <div>
          <SectionHeader
            eyebrow="Motores do estúdio"
            title="O que você quer criar?"
            description="Crie, produza e organize conteúdo para transformar atenção em vendas."
            className="mb-gutter"
          />
          <ContentTypeGrid options={contentTypes} value={type} onSelect={setType} />
        </div>

        {type === "image" ? (
          <ImageEnginePanel
            suggestion={`Imagem impactante relacionada a ${context.opportunityTitle}, estilo jornalístico premium.`}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-gutter xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
              <ContentConfigPanel
                config={config}
                onChange={setConfig}
                onGenerate={() => void run()}
                loading={loading}
                stage={stage}
              />

              <div className="flex flex-col gap-gutter">
                {loading ? (
                  <EmptyState icon="auto_awesome" title={stage ?? "Gerando conteúdo..."} />
                ) : content ? (
                  <>
                    <GeneratedContentView content={content} />
                    <div className="flex flex-wrap gap-3">
                      <Button variant="ghost" onClick={copyScript}>
                        {copied ? "Copiado" : "Copiar roteiro"}
                      </Button>
                      <Button variant="ghost" onClick={download}>
                        Baixar conteúdo
                      </Button>
                      <Button variant="ghost" onClick={() => setContent(null)}>
                        Novo conteúdo
                      </Button>
                      <Link to="/offers" className={buttonClasses("primary", "md")}>
                        Ver oferta vinculada
                        <Icon name="arrow_forward" className="text-[16px]" />
                      </Link>
                    </div>
                  </>
                ) : (
                  <EmptyState
                    icon="auto_awesome"
                    title="Seu conteúdo aparece aqui"
                    description="Ajuste a configuração ao lado e clique em gerar conteúdo."
                  />
                )}

                <ContentSequence
                  items={sequence}
                  onGenerate={handleSequence}
                  activeId={activeSequence}
                  loading={loading}
                />
              </div>
            </div>

            {content && <StoryboardView scenes={content.scenes} />}

            {type === "video" && <VideoEnginePanel />}
          </>
        )}

        <ContentLibrary />
      </div>
    </AppLayout>
  );
}

/** CONTEÚDO PARA: [oferta atual] — conecta o estúdio à etapa comercial. */
function OfferFocus({ context, onStart }: { context: OperationContext; onStart: () => void }) {
  return (
    <Card className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
      <div className="min-w-0">
        <div className="label-caps text-muted-foreground">Conteúdo para</div>
        <div className="mt-2 text-headline-md text-foreground">
          {context.offer?.name ?? context.product?.name ?? context.opportunityTitle}
        </div>
        <p className="mt-2 text-body-sm text-secondary-foreground">
          {context.offer
            ? "O conteúdo será gerado com foco em venda desta oferta."
            : "Sem oferta ativa, o conteúdo será gerado com foco em audiência."}
        </p>
      </div>
      <Button onClick={onStart} className="shrink-0">
        Criar conteúdo para essa oferta
        <Icon name="arrow_forward" className="text-[16px]" />
      </Button>
    </Card>
  );
}

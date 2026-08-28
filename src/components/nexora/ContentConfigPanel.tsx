import type { ContentConfig } from "@/types";
import {
  durationOptions,
  formatOptions,
  objectiveOptions,
  presenceOptions,
  styleOptions,
  toneOptions,
} from "@/services/mock/content";
import { Button } from "./Button";
import { Card } from "./Card";
import { Icon } from "./Icon";
import { OptionGroup } from "./OptionGroup";

/** Painel de configuração do conteúdo (lado esquerdo do Content Engine). */
export function ContentConfigPanel({
  config,
  onChange,
  onGenerate,
  loading,
  stage,
}: {
  config: ContentConfig;
  onChange: (config: ContentConfig) => void;
  onGenerate: () => void;
  loading: boolean;
  stage: string | null;
}) {
  const set = (patch: Partial<ContentConfig>) => onChange({ ...config, ...patch });

  return (
    <Card className="flex flex-col gap-8 p-6 md:p-8">
      <h2 className="text-headline-md text-foreground">Configurar conteúdo</h2>

      <div>
        <label htmlFor="content-theme" className="mb-3 block label-caps text-muted-foreground">
          Tema
        </label>
        <input
          id="content-theme"
          value={config.theme}
          onChange={(e) => set({ theme: e.target.value })}
          className="h-12 w-full rounded-md border border-border bg-surface px-4 text-body-md text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40"
          placeholder="Ex.: Eleições 2026"
        />
      </div>

      <OptionGroup
        label="Objetivo"
        options={objectiveOptions}
        value={config.objective}
        onChange={(objective) => set({ objective })}
      />
      <OptionGroup
        label="Formato"
        options={formatOptions}
        value={config.format}
        onChange={(format) => set({ format })}
      />
      <OptionGroup
        label="Estilo"
        options={styleOptions}
        value={config.style}
        onChange={(style) => set({ style })}
      />
      <OptionGroup
        label="Duração"
        options={durationOptions}
        value={config.duration}
        onChange={(duration) => set({ duration })}
      />
      <OptionGroup
        label="Tom"
        options={toneOptions}
        value={config.tone}
        onChange={(tone) => set({ tone })}
      />
      <OptionGroup
        label="Aparecer no vídeo?"
        options={presenceOptions}
        value={config.presence}
        onChange={(presence) => set({ presence })}
        hint={
          config.presence === "Faceless"
            ? "Conteúdo pensado para produção sem aparecer."
            : "Conteúdo pensado para gravação com apresentador."
        }
      />

      <div className="border-t border-border pt-6">
        <Button onClick={onGenerate} loading={loading} className="w-full">
          {loading ? (stage ?? "Gerando...") : "Gerar conteúdo"}
          {!loading && <Icon name="auto_awesome" className="text-[16px]" />}
        </Button>
      </div>
    </Card>
  );
}

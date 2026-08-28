import { useState } from "react";
import type { StoryboardScene } from "@/types";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";
import { Icon } from "./Icon";

/**
 * STORYBOARD — estrutura cena a cena do vídeo.
 * "Gerar imagem da cena" é simulado; futuramente chamará um provedor de
 * geração de imagem (ver services/mock/studio.ts → generateImage).
 */
export function StoryboardView({
  scenes,
  onGenerateScene,
}: {
  scenes: StoryboardScene[];
  onGenerateScene?: (scene: StoryboardScene) => Promise<void> | void;
}) {
  const [pending, setPending] = useState<string | null>(null);
  const [done, setDone] = useState<Record<string, boolean>>({});

  async function handle(scene: StoryboardScene) {
    setPending(scene.id);
    await onGenerateScene?.(scene);
    setPending(null);
    setDone((prev) => ({ ...prev, [scene.id]: true }));
  }

  return (
    <Card className="p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="label-caps text-muted-foreground">Storyboard</div>
          <h2 className="mt-2 text-headline-md text-foreground">Estrutura cena a cena</h2>
        </div>
        <Badge tone="muted">{scenes.length} cenas</Badge>
      </div>

      <ol className="mt-8 flex flex-col gap-4">
        {scenes.map((scene) => (
          <li key={scene.id} className="rounded-lg border border-border bg-surface p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border label-caps text-foreground">
                  {scene.number}
                </span>
                <div>
                  <div className="text-body-lg text-foreground">{scene.label}</div>
                  <div className="label-caps text-muted-foreground">{scene.timecode}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                loading={pending === scene.id}
                onClick={() => void handle(scene)}
              >
                {done[scene.id] ? "Imagem simulada" : "Gerar imagem da cena"}
                {!pending && <Icon name="image" className="text-[16px]" />}
              </Button>
            </div>

            <dl className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Descrição visual" value={scene.visual} />
              <Field label="Texto na tela" value={scene.onScreenText} />
              <Field label="Narração" value={scene.narration} />
              <Field label="Prompt visual" value={scene.visualPrompt} />
            </dl>

            {done[scene.id] && (
              <div className="mt-5 flex items-center gap-3 rounded-md border border-dashed border-border px-4 py-3">
                <Icon name="auto_awesome" className="text-[18px] text-muted-foreground" />
                <p className="text-body-sm text-muted-foreground">
                  Pré-visualização simulada. A geração real de imagem será conectada a um provedor
                  de IA em uma etapa futura.
                </p>
              </div>
            )}
          </li>
        ))}
      </ol>
    </Card>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label-caps text-muted-foreground">{label}</dt>
      <dd className="mt-2 text-body-sm text-secondary-foreground">{value}</dd>
    </div>
  );
}

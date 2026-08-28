import { useState } from "react";
import { generateImage, imageKindOptions } from "@/services/mock/studio";
import type { GeneratedImage } from "@/types";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";
import { Icon } from "./Icon";
import { OptionGroup } from "./OptionGroup";

/**
 * IMAGE ENGINE — geração simulada.
 * FUTURO: trocar generateImage() por provedor real (Gemini, OpenAI, etc.).
 */
export function ImageEnginePanel({ suggestion }: { suggestion?: string }) {
  const [kind, setKind] = useState<string>(imageKindOptions[0]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<GeneratedImage | null>(null);

  const placeholder =
    suggestion ?? "Imagem impactante relacionada às eleições de 2026, estilo jornalístico premium.";

  async function run() {
    setLoading(true);
    setImage(null);
    const result = await generateImage(kind, prompt.trim() || placeholder);
    setImage(result);
    setLoading(false);
  }

  return (
    <Card className="p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="label-caps text-muted-foreground">Image engine</div>
          <h2 className="mt-2 text-headline-md text-foreground">
            Crie imagens e criativos para acompanhar seu conteúdo.
          </h2>
        </div>
        <Badge tone="muted">Geração simulada</Badge>
      </div>

      <div className="mt-8">
        <OptionGroup label="Tipo" options={imageKindOptions} value={kind} onChange={setKind} />
      </div>

      <div className="mt-8">
        <label htmlFor="image-prompt" className="mb-3 block label-caps text-muted-foreground">
          Descrição da imagem
        </label>
        <textarea
          id="image-prompt"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          className="w-full resize-none rounded-md border border-border bg-surface p-4 text-body-md text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40"
        />
      </div>

      <Button className="mt-6" loading={loading} onClick={() => void run()}>
        {loading ? "Gerando imagem..." : "Gerar imagem"}
        {!loading && <Icon name="image" className="text-[16px]" />}
      </Button>

      <div className="mt-8 rounded-lg border border-dashed border-border p-6">
        {image ? (
          <>
            <div className="flex items-center gap-3">
              <Icon name="check_circle" className="text-[20px] text-muted-foreground" />
              <div className="label-caps text-foreground">{image.kind}</div>
            </div>
            <p className="mt-3 text-body-md text-secondary-foreground">{image.prompt}</p>
            <p className="mt-3 text-body-sm text-muted-foreground">{image.caption}</p>
          </>
        ) : (
          <p className="text-body-sm text-muted-foreground">
            A pré-visualização da imagem aparece aqui. Nesta versão a geração é simulada e a
            arquitetura já está preparada para receber um provedor de IA.
          </p>
        )}
      </div>
    </Card>
  );
}

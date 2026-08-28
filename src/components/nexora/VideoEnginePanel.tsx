import { useState } from "react";
import {
  videoDurationOptions,
  videoFormatOptions,
  videoStyleOptions,
  videoVisualOptions,
  videoVoiceOptions,
} from "@/services/mock/studio";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";
import { Icon } from "./Icon";
import { OptionGroup } from "./OptionGroup";

/**
 * VIDEO ENGINE — interface preparada, sem integração.
 * FUTURO: conectar provedor de geração de vídeo + text-to-speech.
 */
export function VideoEnginePanel() {
  const [format, setFormat] = useState<string>(videoFormatOptions[0]);
  const [duration, setDuration] = useState<string>(videoDurationOptions[1]);
  const [style, setStyle] = useState<string>(videoStyleOptions[0]);
  const [voice, setVoice] = useState<string>(videoVoiceOptions[0]);
  const [visual, setVisual] = useState<string>(videoVisualOptions[0]);

  return (
    <Card className="p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="label-caps text-muted-foreground">Video engine</div>
          <h2 className="mt-2 text-headline-md text-foreground">Vídeo faceless com IA</h2>
        </div>
        <Badge tone="muted">Em desenvolvimento</Badge>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <OptionGroup
          label="Formato"
          options={videoFormatOptions}
          value={format}
          onChange={setFormat}
        />
        <OptionGroup
          label="Duração"
          options={videoDurationOptions}
          value={duration}
          onChange={setDuration}
        />
        <OptionGroup label="Estilo" options={videoStyleOptions} value={style} onChange={setStyle} />
        <OptionGroup label="Voz" options={videoVoiceOptions} value={voice} onChange={setVoice} />
        <OptionGroup
          label="Visual"
          options={videoVisualOptions}
          value={visual}
          onChange={setVisual}
          className="lg:col-span-2"
        />
      </div>

      <div className="mt-8 rounded-lg border border-dashed border-border p-6">
        <div className="flex items-center gap-3">
          <Icon name="movie" className="text-[20px] text-muted-foreground" />
          <div className="label-caps text-foreground">Video engine — em desenvolvimento</div>
        </div>
        <p className="mt-3 text-body-md text-secondary-foreground">
          Em breve, transforme seu roteiro em um vídeo faceless completo.
        </p>
        <Button variant="ghost" size="sm" className="mt-5" disabled>
          Gerar vídeo
          <Icon name="lock" className="text-[16px]" />
        </Button>
      </div>
    </Card>
  );
}

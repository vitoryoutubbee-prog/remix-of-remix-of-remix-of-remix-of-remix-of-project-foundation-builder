import type { ReactNode } from "react";
import type { GeneratedContent } from "@/types";
import { Badge } from "./Badge";
import { Card } from "./Card";

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-border pt-6">
      <div className="mb-3 label-caps text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}

/** Preview do conteúdo gerado (lado direito do Content Engine). */
export function GeneratedContentView({ content }: { content: GeneratedContent }) {
  return (
    <Card className="flex flex-col gap-6 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="label-caps text-muted-foreground">Conteúdo gerado</div>
        <Badge>{content.badge}</Badge>
      </div>

      <h2 className="text-headline-md text-foreground">{content.title}</h2>

      <Block label="Hook">
        <p className="text-body-md text-secondary-foreground">{content.hook}</p>
      </Block>

      <Block label="Roteiro">
        <div className="flex flex-col gap-4">
          {content.script.map((block) => (
            <div key={block.label} className="rounded-md border border-border bg-surface p-4">
              <div className="label-caps text-muted-foreground">[{block.label}]</div>
              <p className="mt-2 text-body-md text-secondary-foreground">{block.text}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block label="Narração">
        <p className="text-body-md text-secondary-foreground">{content.narration}</p>
      </Block>

      <Block label="Texto na tela">
        <ul className="flex flex-col gap-2">
          {content.onScreenText.map((line) => (
            <li key={line} className="text-body-md text-secondary-foreground">
              — {line}
            </li>
          ))}
        </ul>
      </Block>

      <Block label="CTA">
        <p className="text-body-md text-secondary-foreground">{content.cta}</p>
      </Block>

      <Block label="Legenda">
        <p className="text-body-md text-secondary-foreground">{content.caption}</p>
      </Block>

      <Block label="Hashtags">
        <div className="flex flex-wrap gap-2">
          {content.hashtags.map((tag) => (
            <Badge key={tag} tone="muted">
              {tag}
            </Badge>
          ))}
        </div>
      </Block>

      <Block label="Prompt visual">
        <p className="text-body-md text-secondary-foreground">{content.visualPrompt}</p>
      </Block>

      <p className="border-t border-border pt-6 text-body-sm text-muted-foreground">
        {content.disclaimer}
      </p>
    </Card>
  );
}

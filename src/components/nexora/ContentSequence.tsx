import type { SequenceItem } from "@/types";
import { Button } from "./Button";
import { Card } from "./Card";
import { SectionHeader } from "./SectionHeader";

/** Sequência de conteúdos sugeridos para a mesma oportunidade. */
export function ContentSequence({
  items,
  onGenerate,
  activeId,
  loading,
}: {
  items: SequenceItem[];
  onGenerate: (item: SequenceItem) => void;
  activeId?: string | null;
  loading?: boolean;
}) {
  return (
    <section>
      <SectionHeader
        title="Sequência de conteúdos"
        description="Continue explorando essa oportunidade."
        className="mb-8"
      />
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="flex flex-col p-6">
            <div className="label-caps text-muted-foreground">{item.number}</div>
            <h3 className="mt-3 text-body-lg text-foreground">{item.title}</h3>
            <div className="mt-2 text-body-sm text-muted-foreground">{item.kind}</div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-6 self-start"
              loading={Boolean(loading && activeId === item.id)}
              onClick={() => onGenerate(item)}
            >
              Gerar
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}

import type { ContentTypeKey, ContentTypeOption } from "@/types";
import { Button } from "./Button";
import { Card } from "./Card";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

/** "O que você quer criar?" — seleciona o motor ativo do estúdio. */
export function ContentTypeGrid({
  options,
  value,
  onSelect,
}: {
  options: ContentTypeOption[];
  value: ContentTypeKey;
  onSelect: (key: ContentTypeKey) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-4">
      {options.map((option) => {
        const active = option.key === value;
        return (
          <Card
            key={option.key}
            className={cn("flex flex-col p-6", active && "ring-1 ring-foreground/30")}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground">
              <Icon name={option.icon} className="text-[20px]" />
            </div>
            <h3 className="mt-5 text-body-lg text-foreground">{option.label}</h3>
            <p className="mt-2 text-body-sm text-secondary-foreground">{option.description}</p>
            <Button
              variant={active ? "primary" : "ghost"}
              size="sm"
              className="mt-6 self-start"
              onClick={() => onSelect(option.key)}
            >
              {active ? "Selecionado" : "Criar"}
            </Button>
          </Card>
        );
      })}
    </div>
  );
}

import { useState } from "react";
import { libraryFilters, libraryItems } from "@/services/mock/studio";
import type { LibraryItem, LibraryType } from "@/types";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { cn } from "@/lib/utils";

type Filter = "Todos" | LibraryType;

/** MINHA BIBLIOTECA — conteúdos criados anteriormente (mock). */
export function ContentLibrary() {
  const [filter, setFilter] = useState<Filter>("Todos");
  const items: LibraryItem[] =
    filter === "Todos" ? libraryItems : libraryItems.filter((i) => i.type === filter);

  return (
    <Card className="p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="label-caps text-muted-foreground">Minha biblioteca</div>
          <h2 className="mt-2 text-headline-md text-foreground">Conteúdos criados</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {libraryFilters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={f === filter}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-md border px-3 py-2 label-caps transition-colors duration-200",
                f === filter
                  ? "border-transparent bg-primary text-on-primary"
                  : "border-border bg-surface text-muted-foreground hover:bg-elevated hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-8 flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-5 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="min-w-0">
              <div className="truncate text-body-lg text-foreground">{item.title}</div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge tone="muted">{item.type}</Badge>
                <span className="label-caps text-muted-foreground">{item.date}</span>
                <Badge tone={item.status === "Publicado" ? "solid" : "default"}>
                  {item.status}
                </Badge>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Abrir", "Duplicar", "Editar"].map((action) => (
                <button
                  key={action}
                  type="button"
                  className="rounded-md border border-border px-3 py-2 label-caps text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
                >
                  {action}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <p className="mt-8 text-body-sm text-muted-foreground">
          Nenhum conteúdo deste tipo por enquanto.
        </p>
      )}
    </Card>
  );
}

import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

/** Barra de progresso da produção: Ideia → Roteiro → Visual → Edição → Publicação. */
export function ContentPipeline({
  steps,
  currentIndex,
}: {
  steps: string[];
  currentIndex: number;
}) {
  return (
    <div className="surface-card rounded-xl p-6 md:p-7">
      <div className="mb-5 label-caps text-muted-foreground">Content pipeline</div>
      <ol className="flex flex-col gap-3 md:flex-row md:items-center">
        {steps.map((step, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <li key={step} className="flex items-center gap-3 md:flex-1">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors",
                  done && "border-primary bg-primary text-on-primary",
                  active && "border-foreground bg-background text-foreground",
                  !done && !active && "border-border bg-surface text-muted-foreground",
                )}
              >
                {done ? (
                  <Icon name="check" className="text-[16px]" />
                ) : (
                  <span className="label-caps">{i + 1}</span>
                )}
              </span>
              <span
                className={cn(
                  "label-caps",
                  done || active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step}
              </span>
              {i < steps.length - 1 && (
                <span className="hidden h-px flex-1 bg-border md:block" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

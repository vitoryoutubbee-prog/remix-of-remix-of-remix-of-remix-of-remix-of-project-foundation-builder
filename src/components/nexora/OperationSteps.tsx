import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

const steps = [
  { number: "01", label: "Mineração" },
  { number: "02", label: "Produto" },
  { number: "03", label: "Oferta" },
  { number: "04", label: "Content" },
];

/** Barra de progresso da operação: Mineração → Produto → Oferta → Content. */
export function OperationSteps({
  current,
  className,
}: {
  /** Índice do estágio atual (0-3). */
  current: number;
  className?: string;
}) {
  return (
    <ol
      className={cn(
        "surface-card flex flex-col gap-3 rounded-xl p-4 md:flex-row md:items-center md:gap-2 md:p-5",
        className,
      )}
    >
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step.number} className="flex items-center gap-3 md:flex-1">
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
                <span className="label-caps">{step.number}</span>
              )}
            </span>
            <span
              className={cn(
                "label-caps whitespace-nowrap",
                done || active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {step.label}
            </span>
            {i < steps.length - 1 && (
              <span className="hidden h-px flex-1 bg-border md:block" aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  );
}

import { cn } from "@/lib/utils";

/** Grupo de opções em chips, seguindo o design system NEXORA. */
export function OptionGroup({
  label,
  options,
  value,
  onChange,
  hint,
  className,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-3 label-caps text-muted-foreground">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option === value;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option)}
              className={cn(
                "rounded-md border px-3 py-2 label-caps transition-colors duration-200",
                active
                  ? "border-transparent bg-primary text-on-primary"
                  : "border-border bg-surface text-muted-foreground hover:bg-elevated hover:text-foreground",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      {hint && <p className="mt-3 text-body-sm text-muted-foreground">{hint}</p>}
    </div>
  );
}

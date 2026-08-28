import { miningFilters, miningSorts } from "@/services/mock/mining";
import type { MiningFilterKey, MiningSortKey } from "@/types";
import { cn } from "@/lib/utils";

export function MiningFilters({
  filter,
  onFilter,
  sort,
  onSort,
  className,
}: {
  filter: MiningFilterKey;
  onFilter: (value: MiningFilterKey) => void;
  sort: MiningSortKey;
  onSort: (value: MiningSortKey) => void;
  className?: string;
}) {
  const sortDisabled = filter === "escalados" || filter === "recentes" || filter === "potencial";

  return (
    <div
      className={cn(
        "flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between",
        className,
      )}
    >
      <div className="flex flex-wrap gap-2">
        {miningFilters.map((item) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={filter === item.key}
            onClick={() => onFilter(item.key)}
            className={cn(
              "rounded-md border px-3.5 py-2 label-caps transition-colors duration-200",
              filter === item.key
                ? "border-transparent bg-primary text-on-primary"
                : "border-border bg-surface text-muted-foreground hover:bg-elevated hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <label className="flex shrink-0 items-center gap-3 rounded-md border border-border bg-surface px-3 py-2">
        <span className="label-caps text-muted-foreground">Ordenar por</span>
        <select
          value={sort}
          disabled={sortDisabled}
          onChange={(e) => onSort(e.target.value as MiningSortKey)}
          className="bg-transparent label-caps text-foreground outline-none disabled:opacity-40"
        >
          {miningSorts.map((item) => (
            <option key={item.key} value={item.key} className="bg-surface">
              {item.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

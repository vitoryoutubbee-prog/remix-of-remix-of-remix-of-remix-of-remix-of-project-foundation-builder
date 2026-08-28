import type { SummaryGroup } from "@/types";
import { Card } from "./Card";
import { Icon } from "./Icon";

/** Resumo da operação. `groups` hoje vem de MOCK DATA, futuramente de API/banco. */
export function OperationSummary({ groups }: { groups: SummaryGroup[] }) {
  return (
    <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
      {groups.map((group) => (
        <Card key={group.id} className="p-6 md:p-7">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <Icon name={group.icon} className="text-[20px] text-foreground" />
            <span className="label-caps text-foreground">{group.label}</span>
          </div>
          <dl className="mt-2">
            {group.rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-b-0"
              >
                <dt className="text-body-sm text-secondary-foreground">{row.label}</dt>
                <dd className="text-body-md text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      ))}
    </div>
  );
}

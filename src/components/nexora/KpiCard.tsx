import type { Kpi } from "@/types";
import { Card } from "./Card";
import { Icon } from "./Icon";

const iconByDirection: Record<Kpi["direction"], string> = {
  up: "trending_up",
  down: "trending_down",
  flat: "trending_flat",
};

/** Card de métrica da dashboard. Recebe dados via props (hoje MOCK, futuramente API). */
export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <Card className="p-6">
      <div className="label-caps text-muted-foreground">{kpi.label}</div>
      <div className="mt-4 whitespace-nowrap text-headline-lg text-foreground">{kpi.value}</div>
      <div className="mt-4 inline-flex items-center gap-1.5 border-t border-border pt-4 label-caps text-secondary-foreground">
        <Icon name={iconByDirection[kpi.direction]} className="text-[16px]" />
        {kpi.delta}
      </div>
    </Card>
  );
}

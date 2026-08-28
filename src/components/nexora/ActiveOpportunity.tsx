import { Link } from "@tanstack/react-router";
import type { ActiveOpportunity as ActiveOpportunityType } from "@/types";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { Icon } from "./Icon";

/** Item de oportunidade ativa da dashboard. */
export function ActiveOpportunity({ opportunity }: { opportunity: ActiveOpportunityType }) {
  return (
    <Card className="flex flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-headline-md text-foreground">{opportunity.title}</h3>
          <div className="mt-3">
            <Badge tone="muted">{opportunity.status}</Badge>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-display-sm leading-none text-foreground">{opportunity.score}</div>
          <div className="mt-1 label-caps text-muted-foreground">Score</div>
        </div>
      </div>
      <Link
        to="/mining"
        className="btn-ghost mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md label-caps"
      >
        Abrir
        <Icon name="arrow_forward" className="text-[16px]" />
      </Link>
    </Card>
  );
}

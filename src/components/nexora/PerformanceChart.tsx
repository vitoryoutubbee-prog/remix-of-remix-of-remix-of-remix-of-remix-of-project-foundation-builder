import { useMemo, useState } from "react";
import type { ChartPoint, ChartRange } from "@/types";
import { chartRanges, getPerformanceSeries } from "@/services/mock/dashboard";
import { Card } from "./Card";
import { cn } from "@/lib/utils";

const W = 1000;
const H = 300;
const PAD = 8;

function path(points: ChartPoint[], key: "revenue" | "profit", max: number) {
  if (points.length < 2) return "";
  return points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * (W - PAD * 2) + PAD;
      const y = H - PAD - (p[key] / max) * (H - PAD * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

/**
 * Gráfico de desempenho monocromático.
 * `data` pode ser injetado no futuro (API/banco); por padrão usa MOCK DATA.
 */
export function PerformanceChart({
  data,
  defaultRange = "30d",
}: {
  data?: (range: ChartRange) => ChartPoint[];
  defaultRange?: ChartRange;
}) {
  const [range, setRange] = useState<ChartRange>(defaultRange);
  const source = data ?? getPerformanceSeries;
  const points = useMemo(() => source(range), [source, range]);
  const max = useMemo(() => Math.max(...points.map((p) => p.revenue), 1) * 1.1, [points]);

  return (
    <Card className="p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
        <div>
          <h2 className="text-headline-md text-foreground">Desempenho da operação</h2>
          <p className="mt-2 text-body-sm text-muted-foreground">
            Dados simulados — faturamento e lucro.
          </p>
        </div>
        <div className="inline-flex rounded-md border border-border bg-surface p-1">
          {chartRanges.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRange(r.id)}
              className={cn(
                "rounded px-3 py-1.5 label-caps transition-colors duration-200",
                range === r.id
                  ? "bg-primary text-on-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-6">
        <span className="inline-flex items-center gap-2 label-caps text-secondary-foreground">
          <span className="h-px w-6 bg-foreground" /> Faturamento
        </span>
        <span className="inline-flex items-center gap-2 label-caps text-muted-foreground">
          <span className="h-px w-6 border-t border-dashed border-muted-foreground" /> Lucro
        </span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        role="img"
        aria-label="Gráfico de faturamento e lucro"
        className="mt-6 h-[240px] w-full md:h-[300px]"
      >
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={0}
            x2={W}
            y1={(H / 3) * i}
            y2={(H / 3) * i}
            className="stroke-border"
            strokeWidth={1}
          />
        ))}
        <path
          d={path(points, "profit", max)}
          fill="none"
          className="stroke-muted-foreground"
          strokeWidth={2}
          strokeDasharray="6 6"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={path(points, "revenue", max)}
          fill="none"
          className="stroke-foreground"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="mt-4 flex justify-between label-caps text-muted-foreground">
        <span>{points[0]?.label}</span>
        <span>{points[points.length - 1]?.label}</span>
      </div>
    </Card>
  );
}

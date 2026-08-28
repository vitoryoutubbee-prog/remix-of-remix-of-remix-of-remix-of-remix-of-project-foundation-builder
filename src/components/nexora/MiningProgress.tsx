import { miningDone, miningStages } from "@/services/mock/mining";
import { Card } from "./Card";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

/**
 * Simulação visual do processamento da mineração (~5s).
 * `stageIndex` = etapa atual; quando igual ao total, exibe "Mineração concluída".
 */
export function MiningProgress({ stageIndex }: { stageIndex: number }) {
  const done = stageIndex >= miningStages.length;
  const progress = Math.min(
    100,
    Math.round(((stageIndex + (done ? 0 : 1)) / miningStages.length) * 100),
  );

  return (
    <Card className="p-6 md:p-8">
      <div className="flex items-center gap-2">
        <span className="metric-pulse h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="label-caps text-secondary-foreground">
          {done ? miningDone : "Minerando"}
        </span>
      </div>

      <h3 className="mt-4 text-headline-md text-foreground">
        {done ? "Mineração concluída" : miningStages[stageIndex]}
      </h3>

      <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-elevated">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
          style={{ width: `${done ? 100 : progress}%` }}
        />
      </div>

      <ul className="mt-8 flex flex-col gap-3">
        {miningStages.map((stage, i) => {
          const complete = done || i < stageIndex;
          const active = !done && i === stageIndex;
          return (
            <li
              key={stage}
              className={cn(
                "flex items-center gap-3 text-body-md transition-colors",
                complete
                  ? "text-secondary-foreground"
                  : active
                    ? "text-foreground"
                    : "text-muted-foreground",
              )}
            >
              <Icon
                name={
                  complete
                    ? "check_circle"
                    : active
                      ? "progress_activity"
                      : "radio_button_unchecked"
                }
                className={cn("text-[18px]", active && "animate-spin")}
              />
              {stage}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

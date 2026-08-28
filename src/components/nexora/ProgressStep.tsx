import type { OperationStep } from "@/types";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

const circleByState: Record<OperationStep["state"], string> = {
  done: "bg-primary text-on-primary border border-primary",
  active: "border border-foreground bg-background text-foreground",
  locked: "border border-border bg-surface text-muted-foreground",
};

const iconByState: Record<OperationStep["state"], string> = {
  done: "check",
  active: "arrow_forward",
  locked: "lock",
};

export function ProgressStep({ step }: { step: OperationStep }) {
  return (
    <div className="z-10 flex items-center gap-4 bg-card px-3 md:flex-col md:gap-3 md:px-4">
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors",
          circleByState[step.state],
        )}
      >
        <Icon name={iconByState[step.state]} className="text-[18px]" />
      </div>
      <span
        className={cn(
          "label-caps",
          step.state === "locked" ? "text-muted-foreground" : "text-foreground",
        )}
      >
        {step.label}
      </span>
    </div>
  );
}

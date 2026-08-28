import type { ReactNode } from "react";
import { Icon } from "./Icon";

export function EmptyState({
  icon = "hourglass_empty",
  title,
  description,
  action,
}: {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="surface-card flex flex-col items-center justify-center rounded-xl px-6 py-20 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground">
        <Icon name={icon} className="text-[22px]" />
      </div>
      <h3 className="mt-6 text-headline-md text-foreground">{title}</h3>
      {description && (
        <p className="mt-3 max-w-md text-body-md text-secondary-foreground">{description}</p>
      )}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}

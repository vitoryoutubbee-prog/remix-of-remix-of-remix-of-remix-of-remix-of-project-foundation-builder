import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow && <div className="mb-3 label-caps text-muted-foreground">{eyebrow}</div>}
        <h2 className="text-headline-md text-foreground">{title}</h2>
        {description && (
          <p className="mt-2 max-w-2xl text-body-md text-secondary-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

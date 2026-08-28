import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "muted" | "solid";

const tones: Record<Tone, string> = {
  default: "border border-border bg-elevated text-foreground",
  muted: "border border-border bg-transparent text-muted-foreground",
  solid: "bg-primary text-on-primary",
};

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded px-2 py-1 label-caps",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

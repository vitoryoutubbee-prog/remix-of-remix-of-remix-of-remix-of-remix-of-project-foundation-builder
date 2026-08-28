import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-md border border-border bg-surface px-4 py-3 text-body-md text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-200 focus:border-foreground";

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-3 block label-caps text-muted-foreground">{label}</span>
      {children}
      {hint && <span className="mt-2 block text-body-sm text-muted-foreground">{hint}</span>}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className={cn(control, className)}
    />
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      placeholder={placeholder ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className={cn(control, "resize-none", className)}
    />
  );
}

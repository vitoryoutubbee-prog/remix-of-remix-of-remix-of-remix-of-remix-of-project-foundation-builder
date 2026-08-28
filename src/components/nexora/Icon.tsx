import { cn } from "@/lib/utils";

export function Icon({
  name,
  className,
  fill = false,
}: {
  name: string;
  className?: string;
  fill?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      data-fill={fill ? "1" : "0"}
      className={cn("material-symbols-outlined", className)}
    >
      {name}
    </span>
  );
}

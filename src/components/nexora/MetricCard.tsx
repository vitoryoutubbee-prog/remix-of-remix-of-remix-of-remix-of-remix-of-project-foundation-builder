import { Icon } from "./Icon";

export function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="label-caps text-muted-foreground">{label}</div>
      <div className="mt-2 flex items-center gap-2 text-body-lg text-foreground">
        {icon && <Icon name={icon} className="text-[18px]" />}
        {value}
      </div>
    </div>
  );
}

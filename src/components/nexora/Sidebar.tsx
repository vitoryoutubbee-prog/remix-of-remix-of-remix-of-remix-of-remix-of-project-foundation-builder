import { Link } from "@tanstack/react-router";
import { primaryNav, settingsNav } from "@/lib/navigation";
import type { NavItem } from "@/lib/navigation";
import { Icon } from "./Icon";

const itemBase =
  "flex items-center gap-3 rounded-md px-3 py-2.5 label-caps text-muted-foreground transition-colors duration-200 hover:bg-elevated hover:text-foreground";

export function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const render = (item: NavItem) => (
    <Link
      key={item.key}
      to={item.to}
      aria-label={item.label}
      onClick={onNavigate}
      className={itemBase}
      activeProps={{ className: "bg-elevated text-foreground" }}
    >
      <Icon name={item.icon} className="text-[20px]" />
      <span>{item.label}</span>
    </Link>
  );

  return (
    <>
      <nav className="flex flex-col gap-1">{primaryNav.map(render)}</nav>
      <div className="mt-auto flex flex-col gap-1 pt-6">{render(settingsNav)}</div>
    </>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed bottom-0 left-0 top-header z-40 hidden w-rail flex-col overflow-y-auto border-r border-border bg-surface px-3 py-6 lg:flex">
      <NavList />
    </aside>
  );
}

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Icon } from "./Icon";
import { NavList } from "./Sidebar";

export function MobileDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Abrir menu"
        className="flex h-9 w-9 items-center justify-center rounded-md text-secondary-foreground transition-colors hover:bg-elevated hover:text-foreground lg:hidden"
      >
        <Icon name="menu" className="text-[22px]" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex w-[280px] flex-col border-border bg-surface px-3 pb-6 pt-14"
      >
        <SheetTitle className="px-3 pb-6 text-[18px] font-semibold tracking-[0.18em] text-foreground">
          NEXORA
        </SheetTitle>
        <NavList onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

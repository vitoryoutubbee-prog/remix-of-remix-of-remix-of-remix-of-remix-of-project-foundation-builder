import { Link } from "@tanstack/react-router";
import { ButtonLink } from "./Button";
import { MobileDrawer } from "./MobileDrawer";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-header border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-container-max items-center justify-between gap-4 px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center gap-2">
          <MobileDrawer />
          <Link
            to="/dashboard"
            className="text-[18px] font-semibold tracking-[0.18em] text-foreground"
          >
            NEXORA
          </Link>
        </div>

        <ButtonLink to="/mining" size="sm" className="whitespace-nowrap">
          <span className="hidden sm:inline">Criar minha operação</span>
          <span className="sm:hidden">Criar</span>
        </ButtonLink>
      </div>
    </header>
  );
}

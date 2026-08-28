import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

const cardBase = "surface-card rounded-xl";

export function Card({ children, className, interactive = false }: CardProps) {
  return (
    <div className={cn(cardBase, interactive && "card-hover cursor-pointer", className)}>
      {children}
    </div>
  );
}

export function CardLink({
  to,
  params,
  children,
  className,
}: {
  to: string;
  params?: Record<string, string>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      {...(params ? { params } : {})}
      className={cn(cardBase, "card-hover group block", className)}
    >
      {children}
    </Link>
  );
}

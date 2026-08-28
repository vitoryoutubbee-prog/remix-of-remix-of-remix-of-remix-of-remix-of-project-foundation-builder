import { useState, type FormEvent } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

/** Campo de busca reutilizável. `onSearch` recebe o termo digitado. */
export function SearchBar({
  onSearch,
  loading = false,
  defaultValue = "",
  placeholder = "Pesquise qualquer tema, assunto ou mercado...",
  submitLabel = "Pesquisar",
  className,
}: {
  onSearch: (term: string) => void;
  loading?: boolean;
  defaultValue?: string;
  placeholder?: string;
  submitLabel?: string;
  className?: string;
}) {
  const [term, setTerm] = useState(defaultValue);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch(term);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-border bg-surface p-3 sm:flex-row sm:items-center",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
        <Icon name="search" className="text-[20px] text-muted-foreground" />
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder={placeholder}
          aria-label="Pesquisar oportunidades"
          className="h-12 w-full bg-transparent text-body-lg text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>
      <Button type="submit" loading={loading} className="sm:w-auto">
        {submitLabel}
      </Button>
    </form>
  );
}

import type { ProductDraft, ProductTypeKey } from "@/types";
import { productTypes } from "@/services/mock/products";
import { Button } from "./Button";
import { Card } from "./Card";
import { Field, TextArea, TextInput } from "./Field";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

/** Formulário do produto — dados que serão enviados à IA na integração futura. */
export function ProductBuilderForm({
  draft,
  onChange,
  onGenerate,
  loading,
  ctaLabel = "Gerar produto com IA",
  hint,
}: {
  draft: ProductDraft;
  onChange: (draft: ProductDraft) => void;
  onGenerate: () => void;
  loading: boolean;
  ctaLabel?: string;
  hint?: string;
}) {
  const set = <K extends keyof ProductDraft>(key: K, value: ProductDraft[K]) =>
    onChange({ ...draft, [key]: value });

  return (
    <Card className="p-6 md:p-8">
      <div className="label-caps text-muted-foreground">Dados do produto</div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Nome do produto">
          <TextInput
            value={draft.name}
            onChange={(v) => set("name", v)}
            placeholder="Ex.: Método Casa Leve"
          />
        </Field>
        <Field label="Mercado / nicho">
          <TextInput
            value={draft.niche}
            onChange={(v) => set("niche", v)}
            placeholder="Ex.: organização, renda extra, pets"
          />
        </Field>
      </div>

      <div className="mt-6">
        <div className="mb-3 label-caps text-muted-foreground">Tipo de produto</div>
        <div className="flex flex-wrap gap-2">
          {productTypes.map((type) => {
            const active = draft.type === type.key;
            return (
              <button
                key={type.key}
                type="button"
                aria-pressed={active}
                onClick={() => set("type", type.key as ProductTypeKey)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md border px-3 py-2 label-caps transition-colors duration-200",
                  active
                    ? "border-transparent bg-primary text-on-primary"
                    : "border-border bg-surface text-muted-foreground hover:bg-elevated hover:text-foreground",
                )}
              >
                <Icon name={type.icon} className="text-[16px]" />
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Problema que o produto resolve">
          <TextArea
            value={draft.problem}
            onChange={(v) => set("problem", v)}
            placeholder="Descreva a dor principal do público."
          />
        </Field>
        <Field label="Público">
          <TextArea
            value={draft.audience}
            onChange={(v) => set("audience", v)}
            placeholder="Quem compra esse produto e em que momento está."
          />
        </Field>
      </div>

      <div className="mt-6 max-w-xs">
        <Field label="Preço desejado" hint="Você poderá ajustar depois na faixa recomendada.">
          <TextInput value={draft.price} onChange={(v) => set("price", v)} placeholder="R$ 27" />
        </Field>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-body-sm text-muted-foreground">
          {hint ??
            "A IA transforma essas informações em uma estrutura comercial completa: promessa, mecanismo, módulos, bônus e precificação."}
        </p>
        <Button onClick={onGenerate} loading={loading} className="whitespace-nowrap">
          {ctaLabel}
          <Icon name="arrow_forward" className="text-[16px]" />
        </Button>
      </div>
    </Card>
  );
}

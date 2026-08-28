import { Link } from "@tanstack/react-router";
import type { GeneratedProduct } from "@/types";
import { Button, buttonClasses } from "./Button";
import { Card } from "./Card";
import { Icon } from "./Icon";
import { SectionHeader } from "./SectionHeader";

/** Produto estruturado gerado pela IA (mock). Blocos prontos para edição futura. */
export function GeneratedProductView({
  product,
  onAddModule,
  onAddBonus,
  onRegenerate,
  onEdit,
  onSave,
  saved,
  regenerating,
}: {
  product: GeneratedProduct;
  onAddModule: () => void;
  onAddBonus: () => void;
  onRegenerate: () => void;
  onEdit: () => void;
  onSave: () => void;
  saved: boolean;
  regenerating: boolean;
}) {
  return (
    <div>
      <SectionHeader
        eyebrow="Produto gerado"
        title="Seu produto está pronto"
        description="Estrutura comercial completa criada a partir do seu contexto. Revise, ajuste e leve para a oferta."
        className="mb-8"
      />

      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
        <Card className="p-6 md:p-8 lg:col-span-2">
          {product.image && (
            <div className="mb-6 h-44 overflow-hidden rounded-lg border border-border">
              <img
                src={product.image}
                alt={`Referência visual de ${product.name}`}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="label-caps text-muted-foreground">Nome do produto</div>
          <h3 className="mt-2 text-headline-lg text-foreground">{product.name}</h3>

          <Block label="Promessa principal" text={product.promise} />
          <Block label="Público" text={product.audience} />
          <Block label="Problema" text={product.problem} />
          <Block label="Mecanismo / método" text={product.mechanism} />
          <Block label="Posicionamento" text={product.positioning} />
          <Block label="Descrição comercial" text={product.description} />
        </Card>

        <div className="flex flex-col gap-gutter">
          <Card className="p-6 md:p-7">
            <div className="label-caps text-muted-foreground">Preço sugerido</div>
            <div className="mt-2 text-display-sm text-foreground">{product.pricing.ideal}</div>
            <p className="mt-2 text-body-sm text-muted-foreground">{product.pricing.note}</p>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5">
              <PriceCell label="Mínimo" value={product.pricing.min} />
              <PriceCell label="Ideal" value={product.pricing.ideal} />
              <PriceCell label="Máximo" value={product.pricing.max} />
            </div>
          </Card>

          <Card className="p-6 md:p-7">
            <div className="label-caps text-muted-foreground">Potencial do produto</div>
            <ul className="mt-4 flex flex-col gap-3">
              {product.signals.map((signal) => (
                <li key={signal.label} className="flex items-center justify-between gap-4">
                  <span className="text-body-md text-secondary-foreground">{signal.label}</span>
                  <span className="label-caps text-foreground">{signal.value}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-end justify-between border-t border-border pt-5">
              <span className="label-caps text-muted-foreground">Score geral</span>
              <span className="text-headline-lg text-foreground">{product.score}/100</span>
            </div>
          </Card>
        </div>
      </div>

      <section className="mt-16">
        <SectionHeader
          eyebrow="Estrutura do produto"
          title="Módulos"
          action={
            <Button variant="ghost" size="sm" onClick={onAddModule}>
              <Icon name="add" className="text-[16px]" />
              Adicionar módulo
            </Button>
          }
          className="mb-8"
        />
        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-3">
          {product.modules.map((module) => (
            <Card key={module.id} className="p-6">
              <div className="label-caps text-muted-foreground">{module.number}</div>
              <h4 className="mt-3 text-body-lg text-foreground">{module.title}</h4>
              <p className="mt-2 text-body-sm text-secondary-foreground">{module.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeader
          eyebrow="Entregáveis extras"
          title="Bônus"
          action={
            <Button variant="ghost" size="sm" onClick={onAddBonus}>
              <Icon name="add" className="text-[16px]" />
              Adicionar bônus
            </Button>
          }
          className="mb-8"
        />
        <Card className="p-6 md:p-8">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {product.bonuses.map((bonus) => (
              <li key={bonus} className="flex items-center gap-3 text-body-md text-foreground">
                <Icon name="check" className="text-[16px] text-secondary-foreground" />
                {bonus}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="mt-16">
        <Card className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="min-w-0">
            <div className="label-caps text-muted-foreground">Próximo estágio</div>
            <p className="mt-2 max-w-xl text-body-lg text-foreground">
              Produto estruturado. Agora transforme ele em uma oferta com página, bônus e
              precificação.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="ghost" onClick={onEdit}>
              Editar produto
            </Button>
            <Button variant="ghost" onClick={onRegenerate} loading={regenerating}>
              Regenerar com IA
            </Button>
            <Button variant="ghost" onClick={onSave}>
              <Icon name={saved ? "check" : "bookmark"} className="text-[16px]" />
              {saved ? "Produto salvo" : "Salvar produto"}
            </Button>
            <Link
              to="/offers"
              search={{ product: product.name }}
              className={buttonClasses("primary", "md")}
            >
              Criar oferta
              <Icon name="arrow_forward" className="text-[16px]" />
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div className="mt-6 border-t border-border pt-6">
      <div className="label-caps text-muted-foreground">{label}</div>
      <p className="mt-2 text-body-md text-secondary-foreground">{text}</p>
    </div>
  );
}

function PriceCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="label-caps text-muted-foreground">{label}</div>
      <div className="mt-1 text-body-md text-foreground">{value}</div>
    </div>
  );
}

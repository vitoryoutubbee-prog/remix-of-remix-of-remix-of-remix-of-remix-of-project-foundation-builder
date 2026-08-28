import { Link } from "@tanstack/react-router";
import type { OperationContext } from "@/types";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { Icon } from "./Icon";
import { buttonClasses } from "./Button";

/**
 * Mostra o contexto da operação atual (oportunidade → produto → oferta)
 * e conduz o usuário para a etapa que ainda falta.
 */
export function OperationContextPanel({ context }: { context: OperationContext }) {
  const { product, offer } = context;

  return (
    <Card className="p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="label-caps text-muted-foreground">Operação atual</div>
        <Badge tone={offer ? "default" : "muted"}>{offer ? offer.status : "Oferta pendente"}</Badge>
      </div>

      <h2 className="mt-3 text-headline-md text-foreground">{context.opportunityTitle}</h2>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface p-5">
          <div className="label-caps text-muted-foreground">Produto</div>
          {product ? (
            <>
              <div className="mt-2 text-body-lg text-foreground">{product.name}</div>
              <p className="mt-2 text-body-sm text-secondary-foreground">{product.promise}</p>
              <div className="mt-3 text-body-sm text-muted-foreground">{product.price}</div>
            </>
          ) : (
            <>
              <p className="mt-2 text-body-md text-secondary-foreground">
                Você ainda não possui um produto para esta oportunidade.
              </p>
              <Link
                to="/products"
                search={{ mining: context.opportunityId }}
                className={buttonClasses("ghost", "sm", "mt-4")}
              >
                Criar produto
                <Icon name="arrow_forward" className="text-[16px]" />
              </Link>
            </>
          )}
        </div>

        <div className="rounded-lg border border-border bg-surface p-5">
          <div className="label-caps text-muted-foreground">Oferta</div>
          {offer ? (
            <>
              <div className="mt-2 text-body-lg text-foreground">{offer.name}</div>
              <p className="mt-2 text-body-sm text-secondary-foreground">
                Conteúdo para: {offer.name}
              </p>
              <div className="mt-3 text-body-sm text-muted-foreground">{offer.price}</div>
            </>
          ) : (
            <>
              <p className="mt-2 text-body-md text-secondary-foreground">
                {product
                  ? "Sua oferta ainda não foi criada."
                  : "Crie seu produto para depois estruturar a oferta."}
              </p>
              <Link to="/offers" className={buttonClasses("ghost", "sm", "mt-4")}>
                Criar oferta
                <Icon name="arrow_forward" className="text-[16px]" />
              </Link>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/nexora/AppLayout";
import { ButtonLink } from "@/components/nexora/Button";
import { EmptyState } from "@/components/nexora/EmptyState";
import { SectionHeader } from "@/components/nexora/SectionHeader";
import { SelectedMiningProduct } from "@/components/nexora/SelectedMiningProduct";
import { findMiningProduct } from "@/services/mock/mining";

export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>) => ({
    mining: typeof search["mining"] === "string" ? (search["mining"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Products — NEXORA" },
      {
        name: "description",
        content: "Transforme uma oportunidade minerada em um produto digital estruturado.",
      },
      { property: "og:title", content: "Products — NEXORA" },
      {
        property: "og:description",
        content: "Transforme uma oportunidade minerada em um produto digital estruturado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { mining } = Route.useSearch();
  const product = mining ? findMiningProduct(mining) : undefined;

  return (
    <AppLayout>
      <SectionHeader
        eyebrow="Product"
        title="Crie seu produto"
        description="Transforme uma oportunidade minerada em um produto digital estruturado."
        className="mb-10"
      />
      {product && (
        <div className="mb-gutter">
          <SelectedMiningProduct product={product} />
        </div>
      )}
      <EmptyState
        icon="package_2"
        title="Nenhum produto criado"
        description="Seus produtos digitais aparecerão aqui assim que o fluxo de criação for ativado."
        action={<ButtonLink to="/mining">Voltar à mineração</ButtonLink>}
      />
    </AppLayout>
  );
}

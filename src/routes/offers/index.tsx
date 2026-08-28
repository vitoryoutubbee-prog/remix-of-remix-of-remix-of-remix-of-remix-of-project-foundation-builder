import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/nexora/AppLayout";
import { ButtonLink } from "@/components/nexora/Button";
import { EmptyState } from "@/components/nexora/EmptyState";
import { SectionHeader } from "@/components/nexora/SectionHeader";

export const Route = createFileRoute("/offers/")({
  head: () => ({
    meta: [
      { title: "Offers — NEXORA" },
      {
        name: "description",
        content: "Monte a estrutura da sua oferta e da sua página de vendas na NEXORA.",
      },
      { property: "og:title", content: "Offers — NEXORA" },
      {
        property: "og:description",
        content: "Monte a estrutura da sua oferta e da sua página de vendas na NEXORA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OffersPage,
});

function OffersPage() {
  return (
    <AppLayout>
      <SectionHeader
        eyebrow="Offer"
        title="Monte sua oferta"
        description="Crie a estrutura da sua oferta e página de vendas."
        className="mb-10"
      />
      <EmptyState
        icon="shopping_bag"
        title="Nenhuma oferta criada"
        description="Crie um produto primeiro para estruturar sua oferta."
        action={<ButtonLink to="/products">Ver produtos</ButtonLink>}
      />
    </AppLayout>
  );
}

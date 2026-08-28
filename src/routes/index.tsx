import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXORA — Transforme atenção em uma operação digital" },
      {
        name: "description",
        content:
          "Plataforma de IA para encontrar oportunidades de atenção, criar conteúdo faceless e estruturar produtos e ofertas digitais.",
      },
      { property: "og:title", content: "NEXORA — Transforme atenção em uma operação digital" },
      {
        property: "og:description",
        content:
          "Plataforma de IA para encontrar oportunidades de atenção, criar conteúdo faceless e estruturar produtos e ofertas digitais.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
});

import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/nexora/AppLayout";
import { Card } from "@/components/nexora/Card";
import { SectionHeader } from "@/components/nexora/SectionHeader";
import { Badge } from "@/components/nexora/Badge";

export const Route = createFileRoute("/settings/")({
  head: () => ({
    meta: [
      { title: "Settings — NEXORA" },
      { name: "description", content: "Preferências da sua conta e da sua operação na NEXORA." },
      { property: "og:title", content: "Settings — NEXORA" },
      {
        property: "og:description",
        content: "Preferências da sua conta e da sua operação na NEXORA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

const sections = [
  { title: "Conta", text: "Nome, e-mail e credenciais de acesso." },
  { title: "Operação", text: "Nicho principal, idioma e preferências de conteúdo." },
  { title: "Assinatura", text: "Plano, faturamento e limites de uso." },
  { title: "Integrações", text: "Conexões com provedores de dados e IA." },
];

function SettingsPage() {
  return (
    <AppLayout>
      <SectionHeader
        eyebrow="Settings"
        title="Configurações"
        description="Ajuste sua conta e as preferências da sua operação."
        className="mb-10"
      />
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
        {sections.map((s) => (
          <Card key={s.title} className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-headline-md text-foreground">{s.title}</h3>
              <Badge tone="muted">Em breve</Badge>
            </div>
            <p className="mt-3 text-body-md text-secondary-foreground">{s.text}</p>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}

export type NavKey = "dashboard" | "mining" | "products" | "offers" | "content" | "settings";

export interface NavItem {
  key: NavKey;
  label: string;
  to: string;
  icon: string;
}

/** Ordem do fluxo comercial: Mineração → Products → Offers → Content. */
export const primaryNav: NavItem[] = [
  { key: "dashboard", label: "Dashboard", to: "/dashboard", icon: "dashboard" },
  { key: "mining", label: "Mineração", to: "/mining", icon: "construction" },
  { key: "products", label: "Products", to: "/products", icon: "inventory_2" },
  { key: "offers", label: "Offers", to: "/offers", icon: "local_offer" },
  { key: "content", label: "Content", to: "/content", icon: "article" },
];

export const settingsNav: NavItem = {
  key: "settings",
  label: "Settings",
  to: "/settings",
  icon: "settings",
};

export const allNav: NavItem[] = [...primaryNav, settingsNav];

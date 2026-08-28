import type { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className="pb-24 pt-header lg:pl-rail">
        <div className="mx-auto w-full max-w-container-max px-margin-mobile py-10 md:px-margin-desktop md:py-16">
          {children}
        </div>
      </main>
    </div>
  );
}

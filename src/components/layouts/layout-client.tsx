"use client";
import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/app-sidebar";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = !pathname.startsWith("/auth");

  return (
    <SidebarProvider>
      {showSidebar && <AppSidebar />}
      <main
        className={
          showSidebar
            ? "flex-1"
            : "flex-1 flex items-center justify-center min-h-screen"
        }
      >
        {showSidebar && <SidebarTrigger />}
        {children}
      </main>
    </SidebarProvider>
  );
}

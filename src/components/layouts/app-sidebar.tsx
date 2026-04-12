"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Products",
    href: "/dashboard/products",
    icon: Package,
    exact: false,
  },
  {
    label: "Sales",
    href: "/dashboard/sales",
    icon: ShoppingCart,
    exact: false,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [storeName, setStoreName] = useState("BBMD");

  const isActive = (href: string, exact: boolean) =>
    exact
      ? pathname === href
      : pathname === href || pathname?.startsWith(`${href}/`);

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single();

      if (data?.name) {
        setStoreName(data.name);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Sidebar className="border-r border-zinc-100 bg-white">
      {/* Header */}
      <SidebarHeader className="px-5 py-5 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center shadow-sm">
            <span className="text-white text-xs font-bold tracking-tight">B</span>
          </div>
          <span className="text-sm font-semibold text-zinc-800 tracking-wide">
            {storeName}
          </span>
        </div>
      </SidebarHeader>

      {/* Nav */}
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 px-2 mb-2">
            Menu
          </p>
          <SidebarMenu className="space-y-0.5">
            {navItems.map(({ label, href, icon: Icon, exact }) => {
              const active = isActive(href, exact);
              return (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton asChild isActive={active}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                        active
                          ? "text-emerald-600 bg-emerald-50"
                          : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50"
                      )}
                    >
                      <Icon
                        size={16}
                        className={cn(
                          "shrink-0 transition-colors",
                          active ? "text-emerald-500" : "text-zinc-400"
                        )}
                      />
                      {label}
                      {active && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="px-5 py-4 border-t border-zinc-100">
        <p className="text-[10px] text-zinc-400 text-center">
          © {new Date().getFullYear()} Brama
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function DashboardFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const range = searchParams.get("range") ?? "";

  const handleFilterChange = (nextRange: "30d" | "1y") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", nextRange);
    router.push(`?${params.toString()}`);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("range");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        className={cn(
          "h-8 px-3 text-xs border-zinc-200 bg-white hover:bg-zinc-50",
          range === "30d"
            ? "text-emerald-600 border-emerald-200 bg-emerald-50/40"
            : "text-zinc-600",
        )}
        onClick={() => handleFilterChange("30d")}
      >
        30 Hari
      </Button>
      <Button
        variant="outline"
        className={cn(
          "h-8 px-3 text-xs border-zinc-200 bg-white hover:bg-zinc-50",
          range === "1y"
            ? "text-emerald-600 border-emerald-200 bg-emerald-50/40"
            : "text-zinc-600",
        )}
        onClick={() => handleFilterChange("1y")}
      >
        1 Tahun
      </Button>
      <Button
        variant="ghost"
        className="h-8 px-3 text-xs text-emerald-600 hover:text-emerald-700"
        onClick={handleClearFilters}
      >
        Reset
      </Button>
    </div>
  );
}

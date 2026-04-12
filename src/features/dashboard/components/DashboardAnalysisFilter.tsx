"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function DashboardAnalysisFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const range = searchParams.get("range") ?? "30d";

  const handleFilterChange = (nextRange: "30d" | "1y") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", nextRange);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        className={cn(
          "h-7 px-2.5 text-[11px] border-zinc-200 bg-white hover:bg-zinc-50",
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
          "h-7 px-2.5 text-[11px] border-zinc-200 bg-white hover:bg-zinc-50",
          range === "1y"
            ? "text-emerald-600 border-emerald-200 bg-emerald-50/40"
            : "text-zinc-600",
        )}
        onClick={() => handleFilterChange("1y")}
      >
        1 Tahun
      </Button>
    </div>
  );
}

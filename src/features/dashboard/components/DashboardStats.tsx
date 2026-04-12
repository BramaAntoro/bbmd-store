import { cn } from "@/lib/utils";
import { TypeDashboardStatsCard } from "../types/DashboardStatsCard.type";

const toneStyles = {
  positive: "text-emerald-600",
  negative: "text-red-600",
  neutral: "text-zinc-600",
};

export default function DashboardStats({
  stats,
}: {
  stats: TypeDashboardStatsCard[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-zinc-200 bg-white px-5 py-4 shadow-sm"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
            {stat.label}
          </p>
          <p
            className={cn(
              "mt-2 text-2xl font-bold tracking-tight",
              stat.tone ? toneStyles[stat.tone] : "text-zinc-900",
            )}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

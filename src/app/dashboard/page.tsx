import DashboardPage from "@/features/dashboard/components/DashboardPage";
import { TypeSearchParams } from "@/types/searchParams.type";

export default async function page({ searchParams }: TypeSearchParams) {
  const resolvedSearchParams = await searchParams;
  return <DashboardPage searchParams={resolvedSearchParams} />;
}

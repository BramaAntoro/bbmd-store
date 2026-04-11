import SalesPage from "@/features/sales/components/SaleCatalogPage";
import { TypeSearchParams } from "@/types/searchParams.type";

export default async function page({ searchParams }: TypeSearchParams) {
  const resolvedSearchParams = await searchParams;
  return <SalesPage searchParams={resolvedSearchParams} />;
}

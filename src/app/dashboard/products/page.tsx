import ProductCatalogPage from "@/features/products/components/ProductCatalogPage";
import { TypeSearchParams } from "@/types/searchParams.type";


export default async function page({ searchParams }: TypeSearchParams) {
  const resolvedSearchParams = await searchParams; 
  return <ProductCatalogPage searchParams={resolvedSearchParams} />;
}
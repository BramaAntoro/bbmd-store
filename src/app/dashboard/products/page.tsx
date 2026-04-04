import ProductCatalogPage from "@/features/products/components/ProductCatalogPage";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth/login");
  }

  return <ProductCatalogPage />;
}

import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import Vendors from "./Index";
import { VendorService } from "@/services/vendorService";
import { generateSEO } from "@/config/seo/seo";

interface PageParams {
  searchParams: Promise<{ currentPage?: number; itemsPerPage?: number }>;
}

export const metadata = generateSEO({
  title: `Vendors - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "Discover our network of professional vendors",
});

export default async function Page({ searchParams }: PageParams) {
  const queryClient = new QueryClient();

  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams.currentPage || 1;
  const itemsPerPage = resolvedSearchParams.itemsPerPage || 10;

  // Prefetch vendor data on the server
  await queryClient.prefetchQuery({
    queryKey: ["vendors", currentPage, itemsPerPage],
    queryFn: () => VendorService.getVendors(currentPage, itemsPerPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Vendors />
    </HydrationBoundary>
  );
}

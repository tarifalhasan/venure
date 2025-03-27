import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import SearchResults from "./Index";
import { VendorService } from "@/services/vendorService";
import { generateSEO } from "@/config/seo/seo";

interface PageParams {
  searchParams: Promise<{ currentPage?: number; itemsPerPage?: number }>;
}

export const metadata = generateSEO({
  title: `Search - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "Search for venues near you",
});
export default async function Page({ searchParams }: PageParams) {
  const queryClient = new QueryClient();

  const currentPage = (await searchParams).currentPage;
  const itemsPerPage = (await searchParams).itemsPerPage;

  // Prefetch vendor data on the server
  // await queryClient.prefetchQuery({
  //   queryKey: ["vendors", currentPage, itemsPerPage], // Query key includes pagination params
  //   queryFn: async () => await VendorService.getVendors(currentPage, itemsPerPage), // Fetch first page of vendors
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchResults />
    </HydrationBoundary>
  );
}

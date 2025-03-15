import HomePage from "@/components/pages/Home";
import { VenueService } from "@/services/venueService";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

interface PageParams {
  searchParams: Promise<{ currentPage?: number; itemsPerPage?: number }>;
}
export default async function Page({ searchParams }: PageParams) {
  const queryClient = new QueryClient();

  const currentPage = (await searchParams).currentPage;
  const itemsPerPage = (await searchParams).itemsPerPage;

  // Prefetch all venue queries
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["recommendedVenues"],
      queryFn: async () =>
        await VenueService.getRecommendedVenues(currentPage, itemsPerPage),
    }),
    queryClient.prefetchQuery({
      queryKey: ["topRatedVenues"],
      queryFn: async () =>
        await VenueService.getTopRatedVenues(currentPage, itemsPerPage),
    }),
    queryClient.prefetchQuery({
      queryKey: ["someVenues"],
      queryFn: async () =>
        await VenueService.getSomeVenues(currentPage, itemsPerPage),
    }),
    queryClient.prefetchQuery({
      queryKey: ["dealsVenues"],
      queryFn: async () =>
        await VenueService.getDealsVenues(currentPage, itemsPerPage),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}

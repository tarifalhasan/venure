// hooks/useReviewQuery.ts
import { useQuery, QueryOptions } from "@tanstack/react-query";
import { ReviewService } from "../services/reviewService";
import { ReviewResponse } from "../types/venue";

// Define query keys
export const QUERY_KEYS = {
  reviews: (venueId: string, page: number, itemsPerPage: number) =>
    ["reviews", venueId, page, itemsPerPage] as const,
};

// Review queries
export const useReviewsQuery = (
  venueId: string,
  currentPage: number = 1,
  itemsPerPage: number = 10,
  options?: QueryOptions<ReviewResponse, Error>
) => {
  return useQuery<ReviewResponse, Error>({
    queryKey: QUERY_KEYS.reviews(venueId, currentPage, itemsPerPage),
    queryFn: () => ReviewService.getReviewsByVenueId(venueId, currentPage, itemsPerPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // Garbage collection time (optional)
    ...options,
  });
};

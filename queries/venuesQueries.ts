import { useQuery, QueryOptions } from "@tanstack/react-query";
import { VenueService } from "../services/venueService";
import { VenuesResponse, type VenueDetails } from "../types/venue";

// Define query keys
export const QUERY_KEYS = {
  recommendedVenues: (page: number, itemsPerPage: number) =>
    ["recommendedVenues", page, itemsPerPage] as const,
  someVenues: (page: number, itemsPerPage: number) =>
    ["someVenues", page, itemsPerPage] as const,
  topRatedVenues: (page: number, itemsPerPage: number) =>
    ["topRatedVenues", page, itemsPerPage] as const,
  dealsVenues: (page: number, itemsPerPage: number) =>
    ["dealsVenues", page, itemsPerPage] as const,
  venueDetails: (venueId: string) => ["venueDetails", venueId] as const,
};

// Hook to fetch recommended venues
export const useRecommendedVenuesQuery = (
  currentPage: number = 1,
  itemsPerPage: number = 10,
  options?: QueryOptions<VenuesResponse, Error>
) => {
  return useQuery<VenuesResponse, Error>({
    queryKey: QUERY_KEYS.recommendedVenues(currentPage, itemsPerPage),
    queryFn: () => VenueService.getRecommendedVenues(currentPage, itemsPerPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // Garbage collection time
    ...options,
  });
};

// Hook to fetch some venues
export const useSomeVenuesQuery = (
  currentPage: number = 1,
  itemsPerPage: number = 10,
  options?: QueryOptions<VenuesResponse, Error>
) => {
  return useQuery<VenuesResponse, Error>({
    queryKey: QUERY_KEYS.someVenues(currentPage, itemsPerPage),
    queryFn: () => VenueService.getSomeVenues(currentPage, itemsPerPage),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    ...options,
  });
};

// Hook to fetch top-rated venues
export const useTopRatedVenuesQuery = (
  currentPage: number = 1,
  itemsPerPage: number = 10,
  options?: QueryOptions<VenuesResponse, Error>
) => {
  return useQuery<VenuesResponse, Error>({
    queryKey: QUERY_KEYS.topRatedVenues(currentPage, itemsPerPage),
    queryFn: () => VenueService.getTopRatedVenues(currentPage, itemsPerPage),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    ...options,
  });
};

// Hook to fetch venue deals
export const useDealsVenuesQuery = (
  currentPage: number = 1,
  itemsPerPage: number = 10,
  options?: QueryOptions<VenuesResponse, Error>
) => {
  return useQuery<VenuesResponse, Error>({
    queryKey: QUERY_KEYS.dealsVenues(currentPage, itemsPerPage),
    queryFn: () => VenueService.getDealsVenues(currentPage, itemsPerPage),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    ...options,
  });
};

// Hook to fetch venue details
export const useVenueDetailsQuery = (
  venueId: string,
  options?: QueryOptions<VenueDetails, Error>
) => {
  return useQuery<VenueDetails, Error>({
    queryKey: QUERY_KEYS.venueDetails(venueId),
    queryFn: () => VenueService.getVenueDetails(venueId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    ...options,
  });
};

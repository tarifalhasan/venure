import { useQuery, QueryOptions } from "@tanstack/react-query";
import { VendorService } from "../services/vendorService";
import { VendorResponse } from "../types/venue";

// Define query keys
export const QUERY_KEYS = {
  vendors: (page: number, itemsPerPage: number, selectedCategory?: string, sortBy?: string, selectedCity?: string) =>
    ["vendors", page, itemsPerPage, selectedCategory, sortBy, selectedCity] as const,
};

// Vendor queries
export const useVendorsQuery = (
  currentPage: number = 1,
  itemsPerPage: number = 10,
  selectedCategory?: string,
  sortBy?: string,
  selectedCity?: string,
  options?: QueryOptions<VendorResponse, Error>
) => {
  return useQuery<VendorResponse, Error>({
    queryKey: QUERY_KEYS.vendors(currentPage, itemsPerPage, selectedCategory, sortBy, selectedCity),
    queryFn: () => VendorService.getVendors(currentPage, itemsPerPage, selectedCategory, sortBy, selectedCity),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // Garbage collection time (optional)
    ...options,
  });
};

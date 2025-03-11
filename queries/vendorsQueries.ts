import { useQuery, QueryOptions } from "@tanstack/react-query";
import { VendorService } from "../services/vendorService";
import { VendorResponse } from "../types/venue";

// Define query keys
export const QUERY_KEYS = {
  vendors: (page: number, itemsPerPage: number) =>
    ["vendors", page, itemsPerPage] as const,
};

// Vendor queries
export const useVendorsQuery = (
  currentPage: number = 1,
  itemsPerPage: number = 10,
  options?: QueryOptions<VendorResponse, Error>
) => {
  return useQuery<VendorResponse, Error>({
    queryKey: QUERY_KEYS.vendors(currentPage, itemsPerPage),
    queryFn: () => VendorService.getVendors(currentPage, itemsPerPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // Garbage collection time (optional)
    ...options,
  });
};

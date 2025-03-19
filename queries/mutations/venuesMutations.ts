import { VenueService } from "@/services/venueService";
import type { VenueFilter } from "@/types/search";
import type { VenueFilterInput, VenueFilterResponse } from "@/types/venue";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

// New mutation hook for filtered venues
export const useVenueFilterMutation = (
  options?: UseMutationOptions<VenueFilterResponse, Error, VenueFilterInput>
) => {
  return useMutation<VenueFilterResponse, Error, VenueFilterInput>({
    mutationFn: (filter: VenueFilterInput) => VenueService.getVenueFiltered(filter),
    ...options,
  });
};

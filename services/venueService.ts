import { VenueFilter } from "./../types/search";
// services/venueService.ts
import type { VenueDetails, VenuesResponse,VenueFilterInput,VenueFilterResponse } from "@/types/venue";
import apiClient from "../lib/axios";

// Venue service class
export class VenueService {
  //get recommended venues
  static async getRecommendedVenues(
    currentPage: number = 1,
    itemsPerPage: number = 10
  ): Promise<VenuesResponse> {
    const response = await apiClient.get<VenuesResponse>(
      `/venue/get-recommended-venues?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
    );
    return response.data;
  }
  //get some venues
  static async getSomeVenues(
    currentPage: number = 1,
    itemsPerPage: number = 10
  ): Promise<VenuesResponse> {
    const response = await apiClient.get<VenuesResponse>(
      `/venue/get-some-venues?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
    );
    return response.data;
  }
  //get top rated-venues
  static async getTopRatedVenues(
    currentPage: number = 1,
    itemsPerPage: number = 10
  ): Promise<VenuesResponse> {
    const response = await apiClient.get<VenuesResponse>(
      `/venue/top-rated?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
    );
    return response.data;
  }
  //get venue deals
  static async getDealsVenues(
    currentPage: number = 1,
    itemsPerPage: number = 10
  ): Promise<VenuesResponse> {
    const response = await apiClient.get<VenuesResponse>(
      `/venue/get-venue-deals?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
    );
    return response.data;
  }

  //get-venue-details
  static async getVenueDetails(venueId: string): Promise<VenueDetails> {
    const response = await apiClient.get<VenueDetails>(`/venue/get-venue-details/${venueId}`);
    return response.data;
  }

  //venue VenueFilter
  // Updated method for filtered venues with POST request
  static async getVenueFiltered(filter: VenueFilterInput): Promise<VenueFilterResponse> {
    const response = await apiClient.post<VenueFilterResponse>(
      "/venue/get-venue-filtered",
      filter
    );
    return response.data;
  }
}

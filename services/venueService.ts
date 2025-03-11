// services/venueService.ts
import type { VenueDetails, VenuesResponse } from "@/types/venue";
import apiClient from "../lib/axios";

// Venue service class
export class VenueService {
  //get recommended venues
  static async getRecommendedVenues(
    currentPage: number = 1,
    itemsPerPage: number = 10
  ): Promise<VenuesResponse> {
    const response = await apiClient.get<VenuesResponse>(
      `/get-recommended-venues?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
    );
    return response.data;
  }
  //get some venues
  static async getSomeVenues(
    currentPage: number = 1,
    itemsPerPage: number = 10
  ): Promise<VenuesResponse> {
    const response = await apiClient.get<VenuesResponse>(
      `/get-some-venues?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
    );
    return response.data;
  }
  //get top rated-venues
  static async getTopRatedVenues(
    currentPage: number = 1,
    itemsPerPage: number = 10
  ): Promise<VenuesResponse> {
    const response = await apiClient.get<VenuesResponse>(
      `/top-rated?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
    );
    return response.data;
  }
  //get venue deals
  static async getDealsVenues(
    currentPage: number = 1,
    itemsPerPage: number = 10
  ): Promise<VenuesResponse> {
    const response = await apiClient.get<VenuesResponse>(
      `/get-venue-deals?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
    );
    return response.data;
  }

  //get-venue-details
  static async getVenueDetails(
    venueId:string
  ): Promise<VenueDetails> {
    const response = await apiClient.get<VenueDetails>(`/get-venue-details/${venueId}`);
    return response.data;
  }
}

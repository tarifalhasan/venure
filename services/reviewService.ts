// services/reviewService.ts
import type { ReviewResponse } from "@/types/venue";
import apiClient from "../lib/axios";

// Review service class
export class ReviewService {
  static async getReviewsByVenueId(
    venueId: string,
    currentPage: number = 1,
    itemsPerPage: number = 10
  ): Promise<ReviewResponse> {
    const response = await apiClient.get<ReviewResponse>(
      `/review/venue-id/${venueId}?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
    );
    return response.data;
  }
}

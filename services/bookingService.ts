// services/bookingService.ts
import type {
  BookingRequest,
  BookingResponse,
  BookingConfirmRequest,
  BookingConfirmResponse,
} from "@/types/booking";
import apiClient from "../lib/axios";

export class BookingService {
  // Create a new booking
  static async createBooking(bookingData: BookingRequest): Promise<BookingResponse> {
    const response = await apiClient.post<BookingResponse>("/booking", bookingData);
    return response.data;
  }

  // Confirm a booking
  static async confirmBooking(
    confirmData: BookingConfirmRequest
  ): Promise<BookingConfirmResponse> {
    const response = await apiClient.post<BookingConfirmResponse>(
      "/booking/confirm",
      confirmData
    );
    return response.data;
  }
}

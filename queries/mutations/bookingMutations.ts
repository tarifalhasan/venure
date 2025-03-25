// hooks/useBookingMutation.ts
import { BookingService } from "@/services/bookingService";
import type {
  BookingRequest,
  BookingResponse,
  BookingConfirmRequest,
  BookingConfirmResponse,
} from "@/types/booking";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

// Mutation hook for creating a booking
export const useBookingMutation = (
  options?: UseMutationOptions<BookingResponse, Error, BookingRequest>
) => {
  return useMutation<BookingResponse, Error, BookingRequest>({
    mutationFn: (bookingData: BookingRequest) =>
      BookingService.createBooking(bookingData),
    ...options,
  });
};

// Mutation hook for confirming a booking
export const useBookingConfirmMutation = (
  options?: UseMutationOptions<BookingConfirmResponse, Error, BookingConfirmRequest>
) => {
  return useMutation<BookingConfirmResponse, Error, BookingConfirmRequest>({
    mutationFn: (confirmData: BookingConfirmRequest) =>
      BookingService.confirmBooking(confirmData),
    ...options,
  });
};


// types/booking.ts
export interface BookingRequest {
  venueId: number;
  vendorIds: number[];
  bookingType: string;
  bookingStartDate: string; // ISO date string
  bookingEndDate: string; // ISO date string
  visitorName: string;
  visitorEmail: string;
  visitorPhonenumber: string;
  specialRequest: string;
}

export interface BookingResponse {
  bookingId: number;
  trackingId: string;
  venueId: number;
  status: string;
  createdDate: string; // ISO date string
}

export interface BookingConfirmRequest {
  bookingId: number;
  trackingId: string;
  email: string;
  otp: number;
}

export interface BookingConfirmResponse {
  bookingId: number;
  trackingId: string;
  status: string;
  confirmedDate: string; // ISO date string
}

import type { VenueFilterItem } from "./search";

// Vendor schema
export interface Vendor {
  vendorid: number;
  siteid: number;
  vendorname: string;
  vendortype: string;
  vendorphonenumber: string;
  vendorcontactpersonname: string;
  vendorscountry: string;
  vendorscity: string;
  vendorothercities: boolean;
  vendorsothercountry: boolean;
}

export interface VendorResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  vendors: Vendor[];
}

// Single venue
export interface Venue {
  venueid: number;
  venuename: string;
  siteName: string;
  siteCity: string;
  siteCountry: string;
  venueCoverImage: string;
}

export interface VenuesResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  venues: Venue[];
}


// Venue DetailsSchema


export interface SiteVendor {
  vendortype: string;
  vendorname: string;
}

export interface VenueDetails {
  venueid: number;
  venuename: string;
  venueaddress: string;
  venueaward?: string;
  venuedescription: string;
  venuefloorplans3bucket?: string | null;
  venueheight?: number | null;
  venuemaxattendees: number;
  venuetotalarea?: number | null;
  venueprice: number;
  venuediscount?: number;
  venueminsizeinsquaremeters: number;
  venuemaxsizeinsquaremeters: number;
  venuetype: string;
  venuerating: number;
  venueCoverImage?: string; // Added to match the JSON data
  venueImages: string[]; // Already matches, can be empty array
  venueFeatures: string[];
  venueAmenities: string[];
  siteVendors: SiteVendor[];
}


//Reviews

export interface Review {
  reviewid: number;
  venueid: number;
  reviewcontent: string;
  reviewername: string;
  createddate: string; // Using string since it's an ISO date string
  updateddate: string; // Using string since it's an ISO date string
}

export interface ReviewResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  reviews: Review[];
}


export interface VenueFilterInput {
  searchText?: string; // Optional search text
  venueType: string; // Type of venue (e.g., "Banquet Hall")
  destination?: string; // Location or destination of the venue
  minAttendees: number; // Minimum number of attendees
  maxAttendees: number; // Maximum number of attendees
  minSize: number; // Minimum size (likely in square meters)
  maxSize: number; // Maximum size (likely in square meters)
  minPrice: number; // Minimum price
  maxPrice: number; // Maximum price
  minRating: number; // Minimum rating (e.g., 0 to 5)
  maxRating: number; // Maximum rating (e.g., 0 to 5)
  adjustableSpace: boolean; // Whether the venue has adjustable space
  startDate?: string|Date; // Start date in ISO format (e.g., "2025-03-25T20:34:27.440Z")
  endDate?: string|Date; // End date in ISO format (e.g., "2025-03-25T20:34:27.440Z")
  features: number[]; // Array of feature IDs (assuming numbers represent feature IDs)
  currentPage: number; // Current page for pagination
  itemsPerPage: number; // Number of items per page for pagination
}

export interface VenueFilterResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  venues: VenueFilterItem[];
}
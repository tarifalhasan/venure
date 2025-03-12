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
  venueImages: string[];
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
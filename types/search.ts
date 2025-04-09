export interface VenueFilter {
  setting: "INDOOR" | "OUTDOOR" | "HYBRID" | null;
  attendees: number;
  spaceSize: number;
  features: string[];
  priceRange: number;
  rating: number;
  adjustableSpace: boolean;
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  type: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  features: string[];
}

export interface VenueCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  id: any;
}

export interface VenueFilterItem {
  ispreferred: boolean;
  noOfReviews: number;
  siteCity: string;
  siteCountry: string;
  siteName: string;
  siteid: number;
  venueCoverImages: VenueFilterCoverImage[];
  venueaccount: string;
  venueaddress: string;
  venueaward: string | null; // Can be null if no award exists
  venuedescription: string;
  venuediscount: number; // Percentage discount
  venuefloorplans3bucket: string | null; // S3 bucket URL or null
  venueheight: number | null; // Could be null if not specified
  venueid: number;
  venuemaxattendees: number;
  venuemaxsizeinsquaremeters: number;
  venueminattendees: number;
  venueminsizeinsquaremeters: number;
  venuename: string;
  venuepackagepdfs3bucket: string | null; // S3 bucket URL or null
  venueprice: number;
  venuerating: number;
  venuereview: string;
  venuereviews: number;
  venuetotalarea: number | null; // Could be null if not specified
  venuetype: string;
}

export interface VenueFilterCoverImage {
  imageId: number;
  imagePath: string;
  isCoverImage: boolean; // Assuming this is a typo for "isCoverImage"
}

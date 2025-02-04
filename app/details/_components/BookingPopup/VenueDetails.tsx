import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MapPin } from "lucide-react";

export interface VendorInfo {
  role: string;
  name: string;
}

export interface VenueDetails {
  name: string;
  location: string;
  image: string;
  selectedDate: string;
  vendors: VendorInfo[];
}

export function VenueDetails({ details }: { details: VenueDetails }) {
  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-6">
        <div className="flex border-b border-black/15 gap-4 pb-6">
          <div className="w-20 h-20 bg-gray-100 rounded-lg" />
          <div>
            <h3 className="font-semibold text-lg">{details.name}</h3>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{details.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <CalendarIcon className="w-4 h-4" />
              <span className="text-sm">
                Selected Date: {details.selectedDate}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-primaryDark font-semibold my-6">
          You have chosen the selected vendors for your site visit, you are not
          charged yet.
        </p>

        <div className="space-y-4">
          {details.vendors.map((vendor, index) => (
            <div key={index} className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11.9996 15.9316C12.8309 15.9316 13.6273 15.7734 14.356 15.4896C17.8438 16.474 20.4234 19.5691 20.6355 23.3129H3.36383C3.57726 19.5703 6.17159 16.4746 9.64351 15.4897C10.3721 15.7735 11.1685 15.9316 11.9996 15.9316Z"
                  stroke="black"
                />
                <path
                  d="M15.7188 9.33789C15.7188 11.3917 14.0538 13.0566 12 13.0566C9.94619 13.0566 8.28125 11.3917 8.28125 9.33789C8.28125 7.28408 9.94619 5.61914 12 5.61914C14.0538 5.61914 15.7188 7.28408 15.7188 9.33789Z"
                  stroke="black"
                />
                <path
                  d="M6.4 11.3125H5.80625V10.8813H5.30625C4.62962 10.8813 4.0625 10.3211 4.0625 9.61875C4.0625 9.30524 4.17074 9.02935 4.35129 8.823L4.475 8.68162V8.49882L4.98321 8.42622C5.12067 8.40659 5.21655 8.39375 5.30625 8.39375H5.80625V7.9625H6.4V11.3125ZM18.9501 8.39326L19.525 8.55751V8.68162L19.6487 8.823C19.8293 9.02935 19.9375 9.30524 19.9375 9.61875C19.9375 10.3024 19.3891 10.8625 18.6937 10.8625H18.1937V11.2938H17.6V7.94375H18.1937V8.375H18.6937C18.8352 8.375 18.8968 8.37802 18.9501 8.39326Z"
                  stroke="black"
                />
              </svg>

              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{vendor.role}</p>
              </div>
              <div className="text-sm text-primaryDark font-semibold">
                {vendor.name}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

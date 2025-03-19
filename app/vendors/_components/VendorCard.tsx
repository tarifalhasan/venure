"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Vendor } from "@/types/venue";
import { Phone, User, MapPin, Globe } from "lucide-react"; // Icons for visual enhancement

interface VendorCardProps {
  vendor: Vendor;
}

export function VendorCard({ vendor }: VendorCardProps) {
  const {
    vendorid,
    siteid,
    vendorname,
    vendortype,
    vendorphonenumber,
    vendorcontactpersonname,
    vendorscountry,
    vendorscity,
    vendorothercities,
    vendorsothercountry,
  } = vendor;

  return (
    <Card className="overflow-hidden shadow-md rounded-[8px] w-full border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <Link href={`/vendors/${vendorid}`}>
        <div className="aspect-video relative">
          <Image
            src={`/vendor-images/${vendorid}.jpg` || "/placeholder.svg"} // Placeholder; replace with real image source
            alt={vendorname || "Vendor Image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="/placeholder.svg"
          />
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-lg xl:text-xl text-black font-semibold cursor-pointer hover:underline truncate">
            {vendorname}
          </CardTitle>
          <p className="text-sm text-gray-600 leading-[140%] truncate">{vendortype}</p>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-2">
          <div className="flex items-center gap-2 text-sm text-[#878D96]">
            <MapPin className="w-4 h-4" />
            <span className="truncate">
              {vendorscity}, {vendorscountry}
              {vendorothercities && " (+ other cities)"}
              {vendorsothercountry && " (+ other countries)"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#878D96]">
            <Phone className="w-4 h-4" />
            <span className="truncate">{vendorphonenumber}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#878D96]">
            <User className="w-4 h-4" />
            <span className="truncate">{vendorcontactpersonname}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#878D96]">
            <Globe className="w-4 h-4" />
            <span className="truncate">Site ID: {siteid}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import type { Vendor } from "@/types/venue";
import { Phone, User, MapPin, Mail, Heart, Square, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VendorCardProps {
  vendor: Vendor;
}

export function VendorCard({ vendor }: VendorCardProps) {
  const {
    vendorid,
    vendorname,
    vendortype,
    vendorphonenumber,
    vendorcontactpersonname,
    vendorscountry,
    vendorscity,
  } = vendor;

  return (
    <Card className="overflow-hidden rounded-lg w-full  border border-gray-200 hover:shadow-sm transition-shadow duration-200">
      <Link href={`/vendors/${vendorid}`} className="flex">
        {/* Left image section */}
        <div className="relative w-[180px] h-[180px] shrink-0 border-r border-gray-100">
          <Image
            src={"/default-card-placeholder_1.png"}
            alt={vendorname || "Vendor Image"}
            fill
            className="object-cover"
            sizes="180px"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IGZpbGw9IiNGOEY5RkEiIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIi8+PGcgc3Ryb2tlPSIjRERFMkU4IiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xIDFsMTc4IDE3OE0xNzkgMUwxIDE3OSIvPjwvZz48L2c+PC9zdmc+"
          />
        </div>

        {/* Right content section */}
        <div className="flex-1 flex flex-col p-4">
          <div className="flex justify-between items-start mb-auto">
            {/* Vendor name */}
            <h3 className="text-xl font-semibold text-gray-900">{vendorname}</h3>

            {/* Vendor type with icon */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6   flex items-center justify-center">
                <Image
                  src={"/Dj.png"}
                  alt={vendorname || "Vendor Image"}
                  height={28}
                  width={28}
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IGZpbGw9IiNGOEY5RkEiIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIi8+PGcgc3Ryb2tlPSIjRERFMkU4IiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xIDFsMTc4IDE3OE0xNzkgMUwxIDE3OSIvPjwvZz48L2c+PC9zdmc+"
                />
              </div>
              <span className="text-sm text-gray-400">{vendortype}</span>
            </div>
          </div>

          {/* Footer stats */}
          <div className="mt-auto">
            <div className="border border-gray-200 rounded-sm p-3 flex items-center justify-center gap-10">
              <div className="flex items-center gap-2">
                <Square className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">280</span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">14.8K</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}

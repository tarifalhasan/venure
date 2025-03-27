"use client";

import { MapPin, Star, Users } from "lucide-react";
import React from "react";
import "swiper/css"; // Keep Swiper styles if needed elsewhere
import "swiper/css/navigation";
import "swiper/css/pagination";

const VenueFilterCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col w-full gap-0 rounded-lg shadow-lg overflow-hidden bg-white animate-pulse">
      {/* Top Banner */}
      <div className="bg-[#234C86] flex items-center h-10 px-4 py-5">
        <div className="h-4 w-40 bg-gray-300 rounded"></div>
      </div>

      <div className="flex flex-col lg:flex-row w-full rounded-b-lg shadow-lg overflow-hidden bg-white">
        {/* Left Image Carousel Placeholder */}
        <div className="w-full lg:w-[254px] relative">
          <div className="aspect-[16/12] lg:aspect-[4/4] md:aspect-[4/4] bg-gray-200 rounded-bl-sm"></div>

          {/* Most Booking 2024 Badge Placeholder */}
          <div className="absolute z-20 top-4 left-2 flex items-center gap-2 bg-[#EDF5FC] px-3 py-1 rounded-full shadow">
            <div className="w-5 h-5 rounded-full bg-[#EDA842]"></div>
            <div className="h-3 w-20 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Right Details Section */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          {/* Venue Info */}
          <div className="space-y-2">
            <div className="h-5 w-3/4 bg-gray-200 rounded"></div> {/* Name */}
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-400" />
              <div className="h-4 w-1/2 bg-gray-200 rounded"></div> {/* Location */}
            </div>
            <div className="h-4 w-1/3 bg-gray-200 rounded"></div> {/* Type */}
          </div>

          {/* Pricing */}
          <div className="mt-6 md:mt-3 sm:border border-black/10 md:p-4 rounded-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600 text-sm">
                <Users className="w-4 h-4 mr-1 text-gray-400" />
                <div className="h-4 w-20 bg-gray-200 rounded"></div>{" "}
                {/* Capacity: 224-336 */}
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="h-4 w-12 bg-red-300 rounded"></div>{" "}
                {/* Discount Percent */}
                <div className="h-4 w-16 bg-gray-200 rounded"></div>{" "}
                {/* Original Price */}
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <div className="inline-flex py-[6px] px-3 rounded-full bg-[#EDA842]">
                  <Star className="w-4 h-4 mr-1 text-gray-200" />
                  <div className="h-4 w-6 bg-gray-200 rounded"></div> {/* Rating */}
                </div>
                <div className="h-4 w-20 bg-gray-200 rounded ml-1"></div> {/* Reviews */}
              </div>
              <div className="h-5 w-24 bg-gray-200 rounded"></div> {/* Discount Price */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueFilterCardSkeleton;

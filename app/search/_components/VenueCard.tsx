"use client";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { MapPin, Star, Users } from "lucide-react";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface VenueCardProps {
  name: string;
  location: string;
  type: string;
  capacity: string;
  rating: number;
  reviews: number;
  price: number;
  discountPrice: number;
  discountPercent: number;
  images: {
    src: string;
    alt: string;
  }[];
}

const VenueCard: React.FC<VenueCardProps> = ({
  name,
  location,
  type,
  capacity,
  rating,
  reviews,
  price,
  discountPrice,
  discountPercent,
  images,
}) => {
  return (
    <div className="flex flex-col  w-full    rounded-lg shadow-lg overflow-hidden bg-white">
      <div className="bg-primaryBlue py-5 px-4">
        <p className="text-sm font-normal text-white">
          Evenure Preferred Property
        </p>
      </div>
      <div className="flex flex-col lg:flex-row w-full   border rounded-b-lg shadow-lg overflow-hidden bg-white">
        {/* Left Image Carousel */}
        <div className="w-full lg:w-2/5 relative">
          <ImageCarousel
            images={images}
            autoPlay={false}
            aspectRatio="4/3"
            className="max-w-xl  mx-auto"
            imageClassName="rounded-bl-sm"
            showArrows={false}
          />

          {/* Most Booking 2024 Badge */}
          <div className="absolute z-20 inline-flex items-center gap-2 top-4 left-2 bg-[#EDF5FC] text-black px-3 py-1 rounded-full text-xs shadow">
            <div className="w-5 h-5 rounded-full grid place-items-center bg-[#EDA842]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
              >
                <path
                  d="M5.07763 11.0108L5.68489 5.80505C5.70372 5.64533 5.65324 5.48485 5.54626 5.36468C5.4389 5.24414 5.28671 5.17558 5.12472 5.17558H3.58851C3.5467 5.01774 3.44046 4.88514 3.29167 4.82223V3.72036L4.24624 4.35624C4.32121 4.40634 4.4199 4.40446 4.49261 4.35097C4.56606 4.29785 4.59809 4.2048 4.57435 4.11778L4.19576 2.76729L5.29537 1.89823C5.36619 1.84172 5.39557 1.74754 5.36657 1.66128C5.33869 1.57539 5.26034 1.51549 5.16955 1.5121L3.76933 1.4556L3.28225 0.140888C3.25098 0.0561293 3.17037 0 3.07958 0C2.98879 0 2.90818 0.0561293 2.87653 0.140888L2.38908 1.4556L0.988856 1.5121C0.89807 1.51587 0.819714 1.57577 0.791838 1.66128C0.763962 1.74754 0.792215 1.84172 0.863036 1.89823L1.96302 2.76729L1.58443 4.11778C1.56032 4.20443 1.59234 4.29785 1.66542 4.35059C1.7385 4.40408 1.8372 4.40596 1.91254 4.35624L2.8641 3.72224V4.83164C2.72321 4.89681 2.62226 5.02339 2.58082 5.17558H1.04386C0.882624 5.17558 0.730058 5.24414 0.623073 5.36468C0.515712 5.48485 0.465233 5.64533 0.483692 5.80505L1.0917 11.0108H0.646052C0.289311 11.0108 0 11.3001 0 11.6568V12.0004H6.14974V11.6568C6.14974 11.3001 5.86043 11.0108 5.50369 11.0108H5.07763Z"
                  fill="white"
                />
              </svg>
            </div>{" "}
            Most Booking 2024
          </div>
        </div>

        {/* Right Details Section */}
        <div className="lg:w-3/5 p-4 flex flex-col justify-between">
          {/* Venue Info */}
          <div className="space-y-1">
            <h3 className="text-lg xl:text-xl text-foreground font-semibold">
              {name}
            </h3>
            <div className="inline-flex items-center gap-2">
              <MapPin size={16} />
              <p className="text-sm text-skin-shade_gray_900">{location}</p>
            </div>
            <p className="text-sm text-skin-shade_gray_500">{type}</p>
            {/* Capacity & Reviews */}
            <div className="flex items-center justify-between mt-2"></div>
          </div>

          {/* Pricing */}
          <div className="mt-3 border border-black/10 p-4 rounded-sm ">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  {capacity}
                </div>
              </div>
              <div>
                <div className="flex flex-col items-end gap-1">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {discountPercent}% Off
                  </span>
                  <span className="text-gray-400 line-through ml-2 text-sm">
                    THB {price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex py-[6px] px-3 rounded-full items-center bg-yellow-600 text-sm text-white">
                  <Star className="w-4 h-4 mr-1 fill-white" />
                  {rating}
                </div>
                <span className="text-gray-900 ml-1">({reviews} Reviews)</span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                THB {discountPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;

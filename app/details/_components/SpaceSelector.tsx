"use client";

import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SpaceCard } from "./SpaceCard";

const spaces = [
  {
    type: "A",
    rating: 4.5,
    reviewCount: 2125,
    capacity: 50,
    price: 125000,
    amenities: ["Indoor", "Tables", "Chairs", "+7 more"],
    venuSize: "2400 sqm",
    stageSize: "200 sqm",
  },
  {
    type: "B",
    rating: 4.5,
    reviewCount: 2273,
    capacity: 50,
    price: 125000,
    amenities: ["Indoor", "Tables", "Chairs", "+7 more"],
    venuSize: "2400 sqm",
    stageSize: "200 sqm",
  },
  {
    type: "C",
    rating: 4.5,
    reviewCount: 2125,
    capacity: 50,
    price: 125000,
    amenities: ["Indoor", "Tables", "Chairs", "+7 more"],
    venuSize: "2400 sqm",
    stageSize: "200 sqm",
  },
  // Add more spaces as needed
];

export default function SpaceSelector() {
  const isMobile = useIsMobile();
  return (
    <Card id="Space Size" className="w-full p-4">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20} // Controls the space between slides
        slidesPerView={isMobile ? 1 : 2} // Three slides per view
        navigation
        pagination={{ clickable: true }}
        className="py-6"
      >
        {spaces.map((space, i) => (
          <SwiperSlide key={i} className="flex gap-4">
            <SpaceCard {...space} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface SpaceType {
  url: string;
  altText: string;
  id: string | number;
}

interface Props {
  spaces: SpaceType[];
}
export default function SpaceSelector({ spaces }: Props) {
  const isMobile = useIsMobile();
  return (
    <Card id="Space Size" className="w-full p-4">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-lg font-semibold text-skin-black tracking-[-0.36px]">
          View Floor Plan
        </h2>
        <Button className="text-sm text-[#343A3F] font-bold uppercase bg-transparent border border-[#343A3F] hover:text-white h-10 rounded-[8px]">
          show all
        </Button>
      </div>
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
            <div className="relative overflow-hidden aspect-[16/8] h-[400px]">
              <Image
                src={space.url}
                alt={space.altText}
                fill
                priority
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  );
}

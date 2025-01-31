"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Building,
  Building2,
  Home,
  Hotel,
  Landmark,
  CrownIcon as Luxury,
  Music,
  StickerIcon as Stadium,
  Tent,
  Trees,
  Warehouse,
  Wine,
} from "lucide-react";

const categories = [
  { icon: Luxury, label: "Luxury" },
  { icon: Home, label: "Plaza" },
  { icon: Music, label: "Concert Hall" },
  { icon: Building2, label: "Outdoor" },
  { icon: Trees, label: "Nightclub" },
  { icon: Warehouse, label: "Rooftop" },
  { icon: Building, label: "Hotel" },
  { icon: Tent, label: "Open Field" },
  { icon: Hotel, label: "Square" },
  { icon: Landmark, label: "Clubhouse" },
  { icon: Stadium, label: "Sports" },
  { icon: Wine, label: "Restaurant" },
];

export function Categories() {
  return (
    <section className="py-8 mt-10 px-4 md:px-6">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full container  mx-auto"
      >
        <CarouselContent>
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <CarouselItem key={index} className="basis-[20%] lg:basis-[10%]">
                <div className="p-1 ">
                  <Button
                    variant="ghost"
                    className="flex flex-col items-center justify-center w-full h-24 space-y-2"
                  >
                    <Icon className="w-6 h-6 text-gray-800" />
                    <span className="text-sm text-muted-foreground">
                      {category.label}
                    </span>
                  </Button>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-0 xl:left-0" />
        <CarouselNext className="right-0 xl:right-0" />
      </Carousel>
    </section>
  );
}

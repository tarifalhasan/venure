"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"; // Assuming ShadCN's Card component is imported
import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const images = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
];

export const VenueImageSlider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const totalImages = images.length;
  const [currentThumbIndex, setCurrentThumbIndex] = useState(0); // Track current thumb index

  return (
    <Card className="relative p-4">
      <div className="flex justify-between gap-10 flex-wrap lg:flex-nowrap items-start mb-6">
        <div id="Details">
          <h1 className="text-2xl font-bold mb-1.5">Turtle Eco Luxe Villa</h1>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>2/4 Moo 14 Bangna Trad Road, KM 6.5, Bangkaew, Bangplee</span>
            <Button
              variant="link"
              className="text-blue-600 px-0 ml-2 flex items-center"
            >
              Show on Map
            </Button>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-[#9A9FA3] my-[4px]">Listing By:</p>
          <div className="flex items-center gap-2">
            <Avatar className="w-7 h-7">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-sm">Account Name</span>
            <span className="px-2 py-1 rounded text-xs flex items-center">
              <Star className="w-3 h-3 mr-[2px] mb-[2px]" />
              4.3
            </span>
          </div>
        </div>
      </div>

      {/* Main Image Swiper */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        pagination={{ clickable: true }}
        thumbs={{
          swiper:
            thumbsSwiper && !(thumbsSwiper as any)?.destroyed
              ? thumbsSwiper
              : null,
        }}
        spaceBetween={20}
        slidesPerView={1}
        className="h-full w-full !pb-5 aspect-[16/12] lg:aspect-[16/8] rounded-none"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={`${image}?auto=format&fit=crop&w=1200&h=400`}
                alt={`Venue image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-none"
              />
              {/* Image count display */}
              <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-full">
                {index + 1}/{totalImages}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <div>
        <Swiper
          modules={[Thumbs, Pagination]}
          onSwiper={setThumbsSwiper as any}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          onSlideChange={(swiper) => setCurrentThumbIndex(swiper.activeIndex)}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          className=" rounded-none !pb-0 pt-1"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full min-h-[60px] aspect-[4/3] lg:aspect-video cursor-pointer group">
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-none group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Pagination and Remaining Count */}
        {/* <div className="swiper-pagination flex justify-between items-center">
          <span className="text-sm">
            {totalImages > 5
              ? `${totalImages - 5} images remaining`
              : "Showing all images"}
          </span>
          <div className="swiper-pagination"></div>
        </div> */}
      </div>
    </Card>
  );
};

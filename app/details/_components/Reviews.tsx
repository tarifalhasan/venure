"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReviewCard } from "./ReviewCard";

const reviews = [
  {
    name: "Charlene",
    date: "August 2024",
    rating: 5,
    review:
      "Location was great, really near to the beach (just a 5 mins walk away!). Node and all the staff at Turtle Bay were really friendly and provided us many recommendations.",
    yearsAgo: 9,
  },
  {
    name: "Michael",
    date: "July 2024",
    rating: 4,
    review:
      "Beautiful venue with excellent service. The outdoor pool area is perfect for events.",
    yearsAgo: 8,
  },
  {
    name: "Sophia",
    date: "June 2024",
    rating: 5,
    review:
      "A hidden gem! Loved the private beach and the amazing sunset views.",
    yearsAgo: 7,
  },
  {
    name: "Daniel",
    date: "May 2024",
    rating: 4,
    review: "Great experience overall, but the Wi-Fi could be better.",
    yearsAgo: 6,
  },
  {
    name: "Emily",
    date: "April 2024",
    rating: 5,
    review:
      "Perfect getaway! Excellent service, delicious food, and stunning location.",
    yearsAgo: 5,
  },
];

const Reviews = () => {
  return (
    <Card id="Reviews" className="w-full p-4">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-lg font-semibold text-skin-black tracking-[-0.36px]">
          Packages: Food & Beverages
        </h2>
        <Button className="text-sm text-[#343A3F] font-bold uppercase bg-transparent border border-[#343A3F] hover:text-white h-10 rounded-[8px]">
          show all
        </Button>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="py-6"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col gap-6">
              <ReviewCard key={index} {...review} />
              {reviews[index + 1] && (
                <ReviewCard key={index + 1} {...reviews[index + 1]} />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  );
};

export default Reviews;

"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReviewCard, ReviewCardSkeleton } from "./ReviewCard";
import type { ReviewResponse } from "@/types/venue";
import { useRouter } from "next/navigation";
import { ErrorSection, NoVenuesFound } from "@/components/common/Error_NoVenues_Sections";

// Reviews Component
const Reviews = ({
  reviewsResponse: { reviews, currentPage, totalPages, totalItems } = {
    reviews: [],
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
  isLoading,
  error,
}: {
  reviewsResponse?: ReviewResponse;
  isLoading: boolean;
  error: any;
}) => {
  const router = useRouter();

  // Function to chunk reviews into pairs
  const chunkReviews = (arr: any[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const reviewPairs = chunkReviews(reviews, 2); // Group reviews into pairs

  return (
    <Card id="Reviews" className="w-full p-4">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-skin-black tracking-[-0.36px]">
          Reviews ({totalItems})
        </h2>
        {reviews.length > 0 && (
          <Button
            onClick={() => router.push(`/reviews/${reviews[0].venueid}`)}
            className="text-sm text-[#343A3F] font-bold uppercase bg-transparent border border-[#343A3F] hover:text-white h-10 rounded-[8px]"
          >
            Show All
          </Button>
        )}
      </div>

      {isLoading ? (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          className="py-6"
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col gap-6">
                <ReviewCardSkeleton />
                <ReviewCardSkeleton />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : error ? (
        <ErrorSection title="Reviews" />
      ) : reviews.length === 0 ? (
        <NoVenuesFound title="Reviews" />
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="py-6"
        >
          {reviewPairs.map((pair, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col gap-6">
                {pair.map((review) => (
                  <ReviewCard key={review.reviewid} {...review} />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Card>
  );
};

export default Reviews;

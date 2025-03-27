"use client";
import {
  ReviewCard,
  ReviewCardSkeleton,
} from "@/app/venue/[venueId]/_components/ReviewCard";
import { ErrorSection, NoVenuesFound } from "@/components/common/Error_NoVenues_Sections";
import { useReviewsQuery } from "@/queries/reviewQueries";
import { Navbar } from "@/components/common/navbar";
import { Newsletter } from "@/components/common/news-letter";
import { Footer } from "@/components/common/footer";
import { CommonPagination } from "@/components/common/common-pagination";
import React, { useState } from "react";

const Index = ({
  venueId,
  currentPage: initialPage,
  itemsPerPage,
}: {
  venueId: string;
  currentPage: number;
  itemsPerPage: number;
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const {
    data: reviewsData,
    isLoading: isLoadingReviews,
    error: reviewError,
    refetch: refetchReviews,
  } = useReviewsQuery(venueId, currentPage, itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar navbarClasses="" searchComponentWrapperClasses="w-full max-w-[90%]" />
      <div className="container mx-auto pt-20 flex flex-col gap-y-6 lg:gap-y-10 min-h-screen">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-black">
            Venue Reviews ID#{venueId}
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Read what others have to say about this venue
          </p>
        </div>

        {/* Review Results */}
        <div className="py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoadingReviews ? (
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <ReviewCardSkeleton key={index} />
            ))
          ) : reviewError ? (
            <div className="col-span-full">
              <ErrorSection
                title="Reviews"
                refetch={refetchReviews}
                className="min-h-[50vh]"
              />
            </div>
          ) : reviewsData && reviewsData.reviews.length > 0 ? (
            reviewsData.reviews.map((review) => (
              <ReviewCard key={review.reviewid} {...review} />
            ))
          ) : (
            <div className="col-span-full">
              <NoVenuesFound title="Reviews" />
            </div>
          )}
        </div>

        {/* Pagination */}
        {reviewsData &&
          reviewsData.totalPages > 1 &&
          !isLoadingReviews &&
          !reviewError && (
            <div className="mt-8 flex justify-center">
              <CommonPagination
                currentPage={reviewsData.currentPage}
                totalPages={reviewsData.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}

        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default Index;

"use client";

import { AdvertisementBanner } from "@/components/common/advertisement-banner";
import { CommonCard } from "@/components/common/common-card";
import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Newsletter } from "@/components/common/news-letter";
import SliderSection from "@/components/common/SliderSection";
import { VenueConsultation } from "@/components/common/venue-consultsition";
import {
  useDealsVenuesQuery,
  useRecommendedVenuesQuery,
  useSomeVenuesQuery,
  useTopRatedVenuesQuery,
} from "@/queries/venuesQueries";
import type { Venue } from "@/types/venue";
import { ErrorSection, NoVenuesFound } from "../common/Error_NoVenues_Sections";
import { CommonCardSkeleton } from "../skeletons/common-card-skeleton";

export default function HomePage() {
  // Fetch data using React Query hooks
  const {
    data: recommendedVenues,
    isLoading: isLoadingRecommended,
    error: recommendedError,
    refetch: refetchRecommended,
  } = useRecommendedVenuesQuery();

  const {
    data: topRatedVenues,
    isLoading: isLoadingTopRated,
    error: topRatedError,
    refetch: refetchTopRated,
  } = useTopRatedVenuesQuery();

  const {
    data: nearYouVenues,
    isLoading: isLoadingNearYou,
    error: nearYouError,
    refetch: refetchNearYou,
  } = useSomeVenuesQuery();

  const {
    data: dealsVenues,
    isLoading: isLoadingDeals,
    error: dealsError,
    refetch: refetchDeals,
  } = useDealsVenuesQuery();

  // 📌 Function to render sections while keeping the design intact

  {
    /* "venuename": "Grand Ballroom",
      "siteName": "Grand Plaza",
      "siteCity": "New York",
      "siteCountry": "USA",
      "venueCoverImage": "https://venue-media-bucket.s3.amazonaws.com/venue-images/cover-images/1/"</> */
  }
  const renderSection = (
    title: string,
    venues: Venue[] | undefined,
    isLoading: boolean,
    error: Error | null,
    refetch: () => void
  ) => (
    <div className="mx-auto container pt-10 space-y-6">
      {!venues?.length && error && (
        <h2 className="text-2xl font-bold mb-2 ">{title}</h2>
      )}
      {isLoading ? (
        <SliderSection
          title={title}
          items={Array.from({ length: 4 })}
          renderItem={(_, index) => <CommonCardSkeleton key={index} />}
        />
      ) : error ? (
        <ErrorSection title={title} refetch={refetch} />
      ) : !venues?.length ? (
        <NoVenuesFound title={title} />
      ) : (
        <SliderSection
          title={title}
          items={venues}
          renderItem={(venue: Venue) => (
            <CommonCard
              title={venue.venuename}
              imageUrl={venue.venueCoverImage}
              subtitle={`${venue.siteName}, ${venue.siteCity}, ${venue.siteCountry}`}
            />
          )}
        />
      )}
    </div>
  );
  return (
    <main className="min-h-screen flex w-full flex-col gap-[60px]">
      <Navbar showSearchType={true}>
        <div className="md:block hidden mx-auto pt-10 pb-7 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-primaryBlue-foreground">
              Book your Venue
            </h2>
            <p className="text-lg opacity-90">
              Search for venues to host your best events
            </p>
          </div>
        </div>
      </Navbar>

      {/* Recommended Venues */}
      {renderSection(
        "Recommended Venues",
        recommendedVenues?.venues,
        isLoadingRecommended,
        recommendedError,
        refetchRecommended
      )}

      {/* Top Rated Venues */}
      {renderSection(
        "Top Rated Venues",
        topRatedVenues?.venues,
        isLoadingTopRated,
        topRatedError,
        refetchTopRated
      )}

      <VenueConsultation />

      {/* Near You Venues */}
      {renderSection(
        "Near You Venues",
        nearYouVenues?.venues,
        isLoadingNearYou,
        nearYouError,
        refetchNearYou
      )}

      <AdvertisementBanner />

      {/* Deals Venues */}
      {renderSection(
        "Deals Venues",
        dealsVenues?.venues,
        isLoadingDeals,
        dealsError,
        refetchDeals
      )}

      <Newsletter />
      <Footer />
    </main>
  );
}

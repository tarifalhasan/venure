"use client";
import { ErrorSection } from "@/components/common/Error_NoVenues_Sections";
import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { VenueDetailsSkeleton } from "@/components/skeletons/venue-details-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useReviewsQuery } from "@/queries/reviewQueries";
import { useVenueDetailsQuery } from "@/queries/venuesQueries";
import type { VenueDetails } from "@/types/venue";
import { BookingModalPopup } from "./_components/BookingPopup/BookingModal";
import HotelFeatures from "./_components/Features";
import { NavigationTabs } from "./_components/NavigationTabs";
import Packages from "./_components/Packages";
import Partners from "./_components/Partners";
import Reviews from "./_components/Reviews";
import SpaceSelector from "./_components/SpaceSelector";
import { VenueImageSlider } from "./_components/VenueImageSlider";
import VenueListing from "./_components/VenueListing";

function VenueDetails({
  venueId,
  ...params
}: {
  venueId: string;
  currentPage: number;
  itemsPerPage: number;
}) {
  const {
    data: details,
    isLoading: isLoadingDetails,
    error: detailsError,
    refetch: refetchDetails,
  } = useVenueDetailsQuery(venueId);

  const {
    data: reviews,
    isLoading: isLoadingReviews,
    error: reviewError,
    refetch: refetchReviews,
  } = useReviewsQuery(venueId, params.currentPage, params.itemsPerPage);

  if (isLoadingDetails) {
    return <VenueDetailsSkeleton />;
  }

  console.log(details);

  if (detailsError) {
    return <ErrorSection title="Venue Details" refetch={refetchDetails} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        navbarClasses="md:mb-6"
        searchComponentWrapperClasses="w-full  max-w-[90%]"
      />

      <div className="container max-w-7xl flex flex-col gap-6 py-8">
        <div className="mt-10">
          <VenueImageSlider
            data={{
              images: details?.venueImages || [],
              venuename: details?.venuename,
              venueaddress: details?.venueaddress,
              venuerating: details?.venuerating,
            }}
          />
        </div>
        <Partners />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-y-6">
            <NavigationTabs activeTab="Overview" onTabChange={() => {}} />

            <Card id="Overview">
              <CardContent className="p-6">
                <h2 className="text-lg text-skin-black 2xl:text-xl font-semibold mb-4">
                  About the Venue
                </h2>
                <p className="text-[#9A9FA3] text-sm xl:text-base leading-relaxed mb-6">
                  {details?.venuedescription}
                </p>

                <div className="flex items-center gap-4 mb-4">
                  {/* <div className="flex items-center gap-2">
                    <span className="font-medium">500</span>
                    <span className="text-gray-500 text-sm">Capacity</span>
                  </div> */}
                  <div className="flex flex-wrap gap-2">
                    {details?.venueAmenities.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#C1C7CD] rounded-full text-sm inline-flex items-center justify-center h-8"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="px-3 py-1 bg-[#C1C7CD] rounded-full text-sm inline-flex items-center justify-center h-8">
                      +2 more
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <HotelFeatures />
            <SpaceSelector />
            {/* Packages & Food & Beverages */}
            <Packages />

            {/* Reviews */}
            <Reviews />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* <Sidebar /> */}
            <VenueListing />
            <div className="pb-4" />
            <BookingModalPopup />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VenueDetails;

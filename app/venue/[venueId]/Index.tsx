"use client";
import { ErrorSection } from "@/components/common/Error_NoVenues_Sections";
import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { VenueDetailsSkeleton } from "@/components/skeletons/venue-details-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useReviewsQuery } from "@/queries/reviewQueries";
import { useVendorsQuery } from "@/queries/vendorsQueries";
import { useVenueDetailsQuery } from "@/queries/venuesQueries";
import type { VenueDetails } from "@/types/venue";
import BookingModalPopup from "./_components/BookingPopup/BookingModal";
import CTA from "./_components/CTA";
import HotelFeatures from "./_components/Features";
import { NavigationTabs } from "./_components/NavigationTabs";
import NearbySection from "./_components/NearbySection";
import Packages from "./_components/Packages";
import Reviews from "./_components/Reviews";
import SizeAndArea from "./_components/SizeAndArea";
import SpaceSelector from "./_components/SpaceSelector";
import Vendors from "./_components/Vendors";
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
    data: reviewsData,
    isLoading: isLoadingReviews,
    error: reviewError,
    refetch: refetchReviews,
  } = useReviewsQuery(venueId, params.currentPage, params.itemsPerPage);

  const {
    data: vendorsData,
    isLoading: isLoadingVendors,
    error: vendorError,
    refetch: refetchVendors,
  } = useVendorsQuery(params.currentPage, params.itemsPerPage); //venueId add later as first params,
  if (isLoadingDetails) {
    return <VenueDetailsSkeleton />;
  }

  if (detailsError) {
    return <ErrorSection title="Venue Details" refetch={refetchDetails} />;
  }

  console.log(details, "details");
  console.log(vendorsData, "vendors");

  const featureData = [
    {
      icon: "https://yourcdn.com/icons/pool.svg",
      label: "Outdoor swimming pool",
    },
    {
      icon: "https://yourcdn.com/icons/wifi.svg",
      label: "Free Wifi",
    },
    {
      icon: "https://yourcdn.com/icons/parking.svg",
      label: "Free parking",
    },
  ];
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
              images: [
                ...(details?.venueCoverImage
                  ? [details.venueCoverImage, ...details?.venueImages]
                  : []),
                ...(details?.venueImages || []),
              ],
              venuename: details?.venuename,
              venueaddress: details?.venueaddress,
              venuerating: details?.venuerating,
            }}
          />
        </div>
        <Vendors
          vendorsResponse={vendorsData}
          isLoading={isLoadingVendors}
          error={vendorError}
          vendorRefresh={refetchVendors}
        />

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
                    {/* <span className="px-3 py-1 bg-[#C1C7CD] rounded-full text-sm inline-flex items-center justify-center h-8">
                      +2 more
                    </span> */}
                  </div>
                </div>
              </CardContent>
            </Card>
            <HotelFeatures venueFeatures={details?.venueFeatures} />
            {/* <SpaceSelector />
            <HotelFeatures features={featureData} /> */}
            <SpaceSelector
              spaces={[
                {
                  url: "https://venue-media-bucket.s3.ap-southeast-1.amazonaws.com/venue-images/cover-images/1/luxury-ballroom-1.jpg",
                  altText: "dummy aly",
                  id: "120",
                },
                {
                  url: "https://venue-media-bucket.s3.ap-southeast-1.amazonaws.com/venue-images/cover-images/1/luxury-ballroom-1.jpg",
                  altText: "dummy aly",
                  id: "120",
                },
                {
                  url: "https://venue-media-bucket.s3.ap-southeast-1.amazonaws.com/venue-images/cover-images/1/luxury-ballroom-1.jpg",
                  altText: "dummy aly",
                  id: "120",
                },
              ]}
            />
            {/* Packages & Food & Beverages */}
            <Packages />

            {/* Reviews */}
            <Reviews
              reviewsResponse={reviewsData}
              isLoading={isLoadingReviews}
              error={reviewError}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* <Sidebar /> */}
            <VenueListing VenueDetails={details} />

            <div className="space-y-6">
              <NearbySection />
              <SizeAndArea
                totalArea={details?.venueheight}
                ceilingHeight={details?.venueheight}
                totalRooms={null}
                peopleCount={3}
              />
              <CTA
                buttonText="Plan a Free Site Visit"
                startingPrice={details?.venueprice || ""}
                addons={[
                  {
                    label: "Planner: Divine Events",
                    onRemove: () => console.log("Remove Divine Events"),
                  },
                  {
                    label: "Tito Catering",
                    onRemove: () => console.log("Remove Tito Catering"),
                  },
                  {
                    label: "DJ Sajan",
                    onRemove: () => console.log("Remove DJ Sajan"),
                  },
                ]}
              />
            </div>
            <div className="pb-4" />
            <BookingModalPopup
              venueId={venueId as any}
              venueDetails={details}
              vendors={vendorsData?.vendors}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VenueDetails;

"use client";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Newsletter } from "@/components/common/news-letter";
import { useState, useEffect, useCallback } from "react";
import { SearchHeader } from "./_components/search-header";
import { SearchResultsHeader } from "./_components/search-results-header";
import { VenueFilters } from "./_components/venue-filters";
import VenueCard from "./_components/VenueCard";
import { VenueFilterInput, VenueFilterResponse } from "@/types/venue";
import { useVenueFilterMutation } from "@/queries/mutations/venuesMutations";
import { CommonPagination } from "@/components/common/common-pagination";
import { useSearchParams } from "next/navigation";
import VenueFilterCardSkeleton from "@/components/skeletons/venue-filter-card-skeleton";
import { ErrorSection, NoVenuesFound } from "@/components/common/Error_NoVenues_Sections";
import { addDays } from "date-fns";

export default function SearchResults() {
  const searchParams = useSearchParams();

  // Extract search parameters with fallbacks
  const searchText = searchParams.get("searchText") || "";

  const startDate = searchParams.get("startDate") || new Date();
  const endDate = searchParams.get("endDate") || addDays(new Date(), 1);
  const venueType = searchParams.get("venueType") || "";
  const currentPage = parseInt(searchParams.get("currentPage") || "1", 10);
  const itemsPerPage = parseInt(searchParams.get("itemsPerPage") || "10", 10);

  // State declarations
  const [isShowFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<VenueFilterInput>({
    searchText,
    venueType,
    destination: searchText,
    minAttendees: 0,
    maxAttendees: 1000,
    minSize: 0,
    maxSize: 10000,
    minPrice: 0,
    maxPrice: 1000000,
    minRating: 0,
    maxRating: 5,
    adjustableSpace: true,
    features: [],
    startDate,
    endDate,
    currentPage,
    itemsPerPage,
  });
  const [filteredVenues, setFilteredVenues] = useState<VenueFilterResponse | null>(null);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  // Mutation hook
  const {
    mutate,
    isPending: isFiltering,
    isError: isFilterError,
  } = useVenueFilterMutation({
    onSuccess: (data) => {
      setFilteredVenues(data);
      setHasLoadedOnce(true);
    },
    onError: (error) => {
      console.error("Error filtering venues:", error);
      setFilteredVenues(null);
      setHasLoadedOnce(true);
    },
  });

  // Memoized filter application
  const applyFilters = useCallback(() => {
    mutate(filters);
  }, [filters, mutate]);

  // Effect to apply filters when filters change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]); // Only depends on applyFilters, which includes filters

  // Handler functions
  const handleFilterChange = (newFilters: VenueFilterInput) => {
    setFilters(newFilters); // Only update state; effect will handle API call
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, currentPage: page })); // Update state only
  };

  const handleSortChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, sort: value }));
  }, []);

  const handleTabChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, tab: value }));
  }, []);

  // Render venue cards or skeletons
  const renderVenues = () => {
    if (isFiltering || !hasLoadedOnce) {
      return Array.from({ length: filters.itemsPerPage }, (_, index) => (
        <VenueFilterCardSkeleton key={index} />
      ));
    }

    if (isFilterError) {
      return <ErrorSection title="Venues" />;
    }

    if (!filteredVenues?.venues?.length && hasLoadedOnce) {
      return <NoVenuesFound title="Venues" />;
    }

    return filteredVenues?.venues?.map((venue) => (
      <VenueCard
        key={venue.venueid}
        id={venue.venueid}
        name={venue.venuename}
        location={venue.venueaddress}
        type={venue.venuetype}
        capacity={`${venue.venueminattendees}-${venue.venuemaxattendees}`}
        rating={venue.venuerating}
        reviews={venue.venuereviews || 0}
        price={venue.venueprice}
        discountPrice={
          venue.venuediscount
            ? venue.venueprice * (1 - venue.venuediscount / 100)
            : venue.venueprice
        }
        discountPercent={venue.venuediscount || 0}
        images={[
          {
            src:
              venue.venueCoverImages?.find(
                (img) => img?.isCoverImage || (img as any)?.isComverImage
              )?.imagePath || "/default-card-placeholder.png",
            alt: "cover image",
          },
          ...(venue.venueCoverImages?.map((img) => ({
            src: img.imagePath,
            alt: "venue image",
          })) || []),
        ]}
      />
    ));
  };

  return (
    <>
      <Navbar navbarClasses="" searchComponentWrapperClasses="w-full max-w-[90%]" />
      <div className="container mx-auto pt-20 flex flex-col gap-y-6 lg:gap-y-10">
        <SearchHeader
          resultCount={filteredVenues?.totalItems || filteredVenues?.venues?.length || 0}
          searchTerm={searchText || "Venues"}
        />
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="w-full hidden md:block lg:w-[280px] xl:w-[400px]">
            <VenueFilters onFilterChange={handleFilterChange} />
          </div>

          <div className="flex-1 w-full flex flex-col gap-y-8">
            <SearchResultsHeader
              onSortChange={handleSortChange}
              onTabChange={handleTabChange}
              setShowFilterMobile={setShowFilter}
              isShowFilter={isShowFilter}
            />

            {isShowFilter && <VenueFilters onFilterChange={handleFilterChange} />}

            <div className="grid w-full flex-1 gap-6">{renderVenues()}</div>

            {filteredVenues && filteredVenues?.totalPages > 1 && (
              <CommonPagination
                currentPage={filteredVenues.currentPage}
                totalPages={filteredVenues.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}

"use client";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Newsletter } from "@/components/common/news-letter";
import { useVendorsQuery } from "@/queries/vendorsQueries";
import { useState } from "react";
import { SearchHeader } from "./_components/search-header";
import { SearchResultsHeader } from "./_components/search-results-header";
import { VenueFilters } from "./_components/venue-filters";
import VenueCard from "./_components/VenueCard";
import { VenueFilterInput, VenueFilterResponse } from "@/types/venue";
import { useVenueFilterMutation } from "@/queries/mutations/venuesMutations";
import { CommonPagination } from "@/components/common/common-pagination";

export default function SearchResults() {
  const [isShowFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<VenueFilterInput>({
    venuType: "",
    destination: "",
    minAttendees: 50,
    maxAttendees: 200,
    minSize: 30,
    maxSize: 150,
    minPrice: 100,
    maxPrice: 10000,
    minRating: 2,
    maxRating: 5,
    adjustableSpace: true,
    features: [],
    currentPage: 1,
    itemsPerPage: 10,
  });
  const [filteredVenues, setFilteredVenues] = useState<VenueFilterResponse | null>(null);

  const { mutate, isPending: isFiltering } = useVenueFilterMutation({
    onSuccess: (data) => {
      setFilteredVenues(data);
    },
    onError: (error) => {
      console.error("Error filtering venues:", error);
    },
  });

  const { data: vendors, isLoading: isLoadingVendors } = useVendorsQuery();

  const handleFilterChange = (newFilters: VenueFilterInput) => {
    setFilters(newFilters);
    mutate(newFilters);
  };

  const handlePageChange = (page: number) => {
    const updatedFilters = { ...filters, currentPage: page };
    setFilters(updatedFilters);
    mutate(updatedFilters);
  };

  // Default venue definition
  const defaultVenue = {
    name: "Grand Ballroom",
    location: "Shangri-La, Bangkok",
    type: "Hotel",
    capacity: "120-1000",
    rating: 4.3,
    reviews: 2228,
    price: 140000,
    discountPrice: 120000,
    discountPercent: 15,
    images: [
      {
        src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "image",
      },
      {
        src: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "image",
      },
      {
        src: "https://images.pexels.com/photos/5110056/pexels-photo-5110056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "image",
      },
    ],
  };

  // Repeat the default venue 5 times with unique keys
  const defaultVenues = Array.from({ length: 4 }, (_, index) => ({
    ...defaultVenue,
    key: index + 1,
  }));

  return (
    <>
      <Navbar navbarClasses="" searchComponentWrapperClasses="w-full max-w-[90%]" />
      <div className="container mx-auto pt-20 flex flex-col gap-y-6 lg:gap-y-10">
        <SearchHeader
          resultCount={filteredVenues?.totalItems || defaultVenues.length}
          searchTerm="Venue"
        />
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Filters (Desktop) */}
          <div className="w-full hidden md:block lg:w-[280px] xl:w-[400px]">
            <VenueFilters onFilterChange={handleFilterChange} />
          </div>

          {/* Results */}
          <div className="flex-1 w-full flex flex-col gap-y-8">
            <SearchResultsHeader
              onSortChange={(value) => console.log("Sort:", value)}
              onTabChange={(value) => console.log("Tab:", value)}
              setShowFilterMobile={setShowFilter}
              isShowFilter={isShowFilter}
            />

            {/* Filters (Mobile) */}
            {isShowFilter && <VenueFilters onFilterChange={handleFilterChange} />}

            {/* Venue Results */}
            <div className="grid w-full flex-1 gap-6">
              {isFiltering || isLoadingVendors ? (
                <p className="text-center text-gray-600">Loading venues...</p>
              ) : filteredVenues && filteredVenues.venues.length > 0 ? (
                filteredVenues.venues.map((venue) => (
                  <VenueCard
                    key={venue.venueid}
                    name={venue.venuename}
                    location={venue.venueaddress}
                    type={venue.venuetype}
                    capacity={`${venue.venueminsizeinsquaremeters}-${venue.venuemaxsizeinsquaremeters}`}
                    rating={venue.venuerating}
                    reviews={2228} // Placeholder; replace with real data
                    price={venue.venueprice}
                    discountPrice={
                      venue.venuediscount
                        ? venue.venueprice * (1 - venue.venuediscount / 100)
                        : venue.venueprice
                    }
                    discountPercent={venue.venuediscount || 0}
                    images={[
                      { src: venue.venueCoverImage || "", alt: "cover image" },
                      ...venue.venueImages.map((url) => ({
                        src: url,
                        alt: "venue image",
                      })),
                    ]}
                  />
                ))
              ) : (
                defaultVenues.map((venue) => (
                  <VenueCard
                    key={venue.key}
                    name={venue.name}
                    location={venue.location}
                    type={venue.type}
                    capacity={venue.capacity}
                    rating={venue.rating}
                    reviews={venue.reviews}
                    price={venue.price}
                    discountPrice={venue.discountPrice}
                    discountPercent={venue.discountPercent}
                    images={venue.images}
                  />
                ))
              )}
              {filteredVenues && filteredVenues.totalPages > 1 && (
                <CommonPagination
                  currentPage={filteredVenues.currentPage}
                  totalPages={filteredVenues.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}

"use client";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Newsletter } from "@/components/common/news-letter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Star } from "lucide-react";
import { SearchHeader } from "./_components/search-header";
import { SearchResultsHeader } from "./_components/search-results-header";
import { VenueFilters } from "./_components/venue-filters";
import { VenueResultsPagination } from "./_components/venue-results-pagination";
import VenueCard from "./_components/VenueCard";
import { useVendorsQuery } from "@/queries/vendorsQueries";

export default function SearchResults() {
  const {
    data: vendors,
    isLoading: isLoadingVendors,
    refetch: refetchVendors,
  } = useVendorsQuery();
  //call search function or others
  return (
    <>
      <Navbar navbarClasses="" searchComponentWrapperClasses="w-full   max-w-[90%] " />
      <div className="container mx-auto pt-20 flex flex-col gap-y-10 ">
        <SearchHeader resultCount={1280} searchTerm="Venue" />
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="w-full lg:w-[280px] xl:w-[400px]">
            <div className=" flex  mx-auto max-w-[20rem] justify-center md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    <Star className="w-4 h-4 mr-2" />
                    Show Filters
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[85%]">
                  <VenueFilters onFilterChange={(filters) => console.log(filters)} />
                </SheetContent>
              </Sheet>
            </div>
            <div className="hidden w-full md:block">
              <div className="mt-2">
                <VenueFilters onFilterChange={(filters) => console.log(filters)} />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 flex flex-col gap-y-8 px-4">
            <SearchResultsHeader
              onSortChange={(value) => console.log(value)}
              onTabChange={(value) => console.log(value)}
            />
            <div className="grid   flex-1 gap-6">
              {[1, 2, 3, 4].map((venue) => (
                <VenueCard
                  key={venue}
                  name="Grand Ballroom"
                  location="Shangri-La, Bangkok"
                  type="Hotel"
                  capacity="120-1000"
                  rating={4.3}
                  reviews={2228}
                  price={140000}
                  discountPrice={120000}
                  discountPercent={15}
                  images={[
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
                  ]}
                />
              ))}
              <VenueResultsPagination />
            </div>

            {/* <VenueResults venues={[]} isLoading={false} /> */}
          </div>
        </div>
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}

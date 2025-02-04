"use client";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Newsletter } from "@/components/common/news-letter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DefaultCardPlaceHolderImage } from "@/constants/data";
import { Heart, MapPin, Star, Users } from "lucide-react";
import Image from "next/image";
import { SearchHeader } from "./_components/search-header";
import { SearchResultsHeader } from "./_components/search-results-header";
import { VenueFilters } from "./_components/venue-filters";
import { VenueResultsPagination } from "./_components/venue-results-pagination";

export default function SearchResults() {
  return (
    <>
      <Navbar
        navbarClasses=""
        searchComponentWrapperClasses="w-full   max-w-[90%] "
      />
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
                  <VenueFilters
                    onFilterChange={(filters) => console.log(filters)}
                  />
                </SheetContent>
              </Sheet>
            </div>
            <div className="hidden w-full md:block">
              <div className="mt-2">
                <VenueFilters
                  onFilterChange={(filters) => console.log(filters)}
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 flex flex-col gap-y-8 px-4">
            <SearchResultsHeader
              onSortChange={(value) => console.log(value)}
              onTabChange={(value) => console.log(value)}
            />
            <div className="grid gap-6">
              {[1, 2, 3, 4].map((venue) => (
                <Card key={venue} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[300px_1fr] gap-4">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={DefaultCardPlaceHolderImage}
                          alt="Venue image"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="w-full p-6 relative">
                        <div className="w-full flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">
                              Grand Ballroom
                            </h3>
                            <p className="text-muted-foreground">
                              Shangri-La, Bangkok
                            </p>
                            <p className="text-muted-foreground flex items-center">
                              <MapPin className="w-4 h-4 mr-2" /> Bangkok,
                              Thailand
                            </p>{" "}
                            <p className="text-sm text-muted-foreground">
                              Hotel
                            </p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Heart className="w-5 h-5" />
                          </Button>
                        </div>
                        <Card className="w-full flex items-center justify-between gap-4 mt-4 md:absolute bottom-2 right-0 p-2">
                          <div className="flex items-center gap-1">
                            <div className="flex flex-col ">
                              <div className="ml-2 mb-2 flex  gap-1">
                                <Users className="w-4 h-4" />

                                <p className="text-sm text-gray-500">
                                  {" "}
                                  120-1000
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button className="btn-primary-orange text-white">
                                  <Star className="w-4 h-4 " />
                                  <span className="text-sm">4.8</span>
                                </Button>
                                <span className="text-sm text-muted-foreground">
                                  (2,228 Reviews)
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end text-sm">
                            <Badge variant={"destructive"}>50% Off</Badge>
                            <span className="text-muted-foreground line-through">
                              THB 120,000
                            </span>
                            <span className="font-semibold">THB 120,000</span>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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

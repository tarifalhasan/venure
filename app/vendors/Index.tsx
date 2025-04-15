"use client";

import { useState, useEffect } from "react";
import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Newsletter } from "@/components/common/news-letter";
import { useVendorsQuery } from "@/queries/vendorsQueries";
import { VendorCard } from "./_components/VendorCard";
import { ErrorSection, NoVenuesFound } from "@/components/common/Error_NoVenues_Sections";
import { VendorSkeleton } from "@/components/skeletons/vendor-skeleton";
import { CommonPagination } from "@/components/common/common-pagination";
import { VendorFilters } from "./_components/VendorFilters";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilterIcon, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function Vendors() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const itemsPerPage = 20;
  const [sortBy, setSortBy] = useState("most-followers");

  const {
    data: vendorsResponse,
    isLoading: isLoadingVendors,
    error,
    refetch,
  } = useVendorsQuery(currentPage, itemsPerPage, selectedCategory as string, selectedCity as string, sortBy as string);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleCityChange = (city: string | null) => {
    setSelectedCity(city);
    setCurrentPage(1);
  };

  useEffect(() => {
    refetch();
  }, [selectedCategory, selectedCity, refetch]);

  return (
    <>
      <Navbar
        navbarClasses=""
        showSearchBar={false}
        searchComponentWrapperClasses="w-full max-w-[90%]"
      />
      <div className="container mx-auto pt-6 pb-10 min-h-screen">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 px-4 md:px-0">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-900 font-medium">All Vendors</span>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filter Button */}
          <div className="md:hidden px-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <FilterIcon className="h-4 w-4" />
                    Filter By
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">
                <VendorFilters
                  selectedCity={selectedCity}
                  onCityChange={handleCityChange}
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden md:block w-full md:w-[320px] shrink-0">
            <VendorFilters
              selectedCity={selectedCity}
              onCityChange={handleCityChange}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Dropdown */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w-full flex items-center justify-between md:block lg:w-[200px]">
                <div>
                  <Select onValueChange={setSortBy}>
                    <SelectTrigger
                      arrowIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            d="M8.62008 13.3937C8.51131 13.3943 8.4035 13.3734 8.30283 13.3322C8.20215 13.291 8.1106 13.2304 8.03341 13.1537L4.62008 9.74042C4.57095 9.69464 4.53155 9.63944 4.50422 9.57811C4.47689 9.51678 4.4622 9.45057 4.46102 9.38343C4.45983 9.3163 4.47218 9.24961 4.49733 9.18735C4.52248 9.12509 4.55991 9.06854 4.60738 9.02106C4.65486 8.97358 4.71142 8.93615 4.77368 8.911C4.83594 8.88585 4.90262 8.8735 4.96976 8.87469C5.03689 8.87587 5.1031 8.89057 5.16444 8.9179C5.22577 8.94522 5.28097 8.98462 5.32674 9.03375L8.62008 12.3271L11.9134 9.03375C12.0082 8.94543 12.1336 8.89735 12.2631 8.89963C12.3926 8.90192 12.5162 8.95439 12.6078 9.046C12.6994 9.13761 12.7519 9.2612 12.7542 9.39073C12.7565 9.52027 12.7084 9.64563 12.6201 9.74042L9.20674 13.1537C9.12955 13.2304 9.038 13.291 8.93733 13.3322C8.83665 13.3734 8.72885 13.3943 8.62008 13.3937ZM12.6201 7.08708C12.7137 6.99333 12.7663 6.86625 12.7663 6.73375C12.7663 6.60125 12.7137 6.47417 12.6201 6.38042L9.20674 2.97375C9.13024 2.89669 9.0393 2.83545 8.93912 2.79354C8.83895 2.75163 8.73149 2.72987 8.62291 2.7295C8.51432 2.72913 8.40672 2.75015 8.30626 2.79138C8.2058 2.8326 8.11444 2.89321 8.03741 2.96975L8.03341 2.97375L4.62008 6.38042C4.52644 6.47417 4.47385 6.60125 4.47385 6.73375C4.47385 6.86625 4.52644 6.99333 4.62008 7.08708C4.66604 7.13425 4.72098 7.17174 4.78167 7.19734C4.84235 7.22294 4.90755 7.23613 4.97341 7.23613C5.03927 7.23613 5.10447 7.22294 5.16515 7.19734C5.22584 7.17174 5.28078 7.13425 5.32674 7.08708L8.62008 3.80042L11.9134 7.08708C11.9593 7.13413 12.0143 7.17138 12.0751 7.19659C12.1358 7.2218 12.201 7.23444 12.2667 7.23375C12.4001 7.23375 12.5267 7.18175 12.6201 7.08708Z"
                            fill="#343A3F"
                          />
                        </svg>
                      }
                      className="rounded-full"
                    >
                      <SelectValue
                        placeholder={
                          <div className="flex items-center text-xs ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="16"
                              viewBox="0 0 17 16"
                              fill="none"
                            >
                              <path
                                d="M7.85409 10.1467C7.94772 10.2405 8.00031 10.3675 8.00031 10.5C8.00031 10.6326 7.94772 10.7596 7.85409 10.8534L4.85409 13.8534C4.80766 13.8983 4.75344 13.9345 4.69409 13.9601C4.63306 13.9865 4.56726 14.0001 4.50075 14.0001C4.43425 14.0001 4.36845 13.9865 4.30742 13.9601C4.24806 13.9345 4.19385 13.8983 4.14742 13.8534L1.14742 10.8534C1.0983 10.8076 1.05889 10.7524 1.03157 10.6911C1.00424 10.6297 0.989544 10.5635 0.988359 10.4964C0.987175 10.4293 0.999524 10.3626 1.02467 10.3003C1.04982 10.2381 1.08725 10.1815 1.13473 10.134C1.18221 10.0865 1.23876 10.0491 1.30102 10.024C1.36328 9.99882 1.42997 9.98647 1.4971 9.98766C1.56424 9.98884 1.63045 10.0035 1.69178 10.0309C1.75311 10.0582 1.80831 10.0976 1.85409 10.1467L4.00075 12.2934V2.50005C4.00075 2.36744 4.05343 2.24026 4.1472 2.1465C4.24097 2.05273 4.36815 2.00005 4.50075 2.00005C4.63336 2.00005 4.76054 2.05273 4.85431 2.1465C4.94808 2.24026 5.00075 2.36744 5.00075 2.50005V12.2934L7.14742 10.1467C7.24117 10.0531 7.36825 10.0005 7.50075 10.0005C7.63325 10.0005 7.76034 10.0531 7.85409 10.1467ZM16.8541 5.14672L13.8541 2.14672C13.7998 2.09886 13.7362 2.06257 13.6674 2.04005C13.6064 2.01363 13.5406 2 13.4741 2C13.4076 2 13.3418 2.01363 13.2808 2.04005C13.2214 2.06562 13.1672 2.10176 13.1208 2.14672L10.1208 5.14672C10.0716 5.19249 10.0322 5.24769 10.0049 5.30902C9.97757 5.37036 9.96288 5.43657 9.96169 5.5037C9.96051 5.57084 9.97286 5.63752 9.998 5.69978C10.0232 5.76204 10.0606 5.8186 10.1081 5.86608C10.1555 5.91355 10.2121 5.95098 10.2744 5.97613C10.3366 6.00128 10.4033 6.01363 10.4704 6.01244C10.5376 6.01126 10.6038 5.99657 10.6651 5.96924C10.7264 5.94191 10.7816 5.90251 10.8274 5.85338L13.0008 3.70672V13.5C13.0008 13.6327 13.0534 13.7598 13.1472 13.8536C13.241 13.9474 13.3681 14 13.5008 14C13.6334 14 13.7605 13.9474 13.8543 13.8536C13.9481 13.7598 14.0008 13.6327 14.0008 13.5V3.70672L16.1474 5.85338C16.2412 5.94702 16.3683 5.99961 16.5008 5.99961C16.6333 5.99961 16.7603 5.94702 16.8541 5.85338C16.9477 5.75963 17.0003 5.63255 17.0003 5.50005C17.0003 5.36755 16.9477 5.24047 16.8541 5.14672Z"
                                fill="#343A3F"
                              />
                            </svg>
                            <span className="ml-1">Sort by: Most Followers</span>
                          </div>
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-followers">Most Followers</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="highest-rated">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 ">
                  <span className="font-semibold">{vendorsResponse?.totalItems || 0}</span> vendors found
                </div>
              </div>
            </div>

            {/* Vendor Results */}
            <div className="space-y-4 px-4 md:px-0">
              {isLoadingVendors ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <VendorSkeleton key={index} />
                ))
              ) : error ? (
                <ErrorSection
                  title="vendors"
                  refetch={refetch}
                  className="min-h-[50vh]"
                />
              ) : vendorsResponse && vendorsResponse.vendors.length > 0 ? (
                vendorsResponse.vendors.map((vendor) => (
                  <VendorCard key={vendor.vendorid} vendor={vendor} />
                ))
              ) : (
                <NoVenuesFound title="vendors" />
              )}
            </div>

            {/* Pagination */}
            {vendorsResponse &&
              vendorsResponse.totalPages > 1 &&
              !isLoadingVendors &&
              !error && (
                <div className="mt-8 flex justify-center">
                  <CommonPagination
                    currentPage={vendorsResponse.currentPage}
                    totalPages={vendorsResponse.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
          </div>
        </div>

        <Newsletter />
        <Footer />
      </div>
    </>
  );
}

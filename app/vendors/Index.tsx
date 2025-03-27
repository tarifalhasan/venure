"use client";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Newsletter } from "@/components/common/news-letter";
import { useVendorsQuery } from "@/queries/vendorsQueries";
import { useState } from "react";
import { VendorCard } from "./_components/VendorCard";
import { ErrorSection, NoVenuesFound } from "@/components/common/Error_NoVenues_Sections";
import { VendorSkeleton } from "@/components/skeletons/vendor-skeleton";
import  { CommonPagination } from "@/components/common/common-pagination";

export default function Vendors() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: vendorsResponse,
    isLoading: isLoadingVendors,
    error,
    refetch,
  } = useVendorsQuery(currentPage, itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar navbarClasses="" searchComponentWrapperClasses="w-full max-w-[90%]" />
      <div className="container mx-auto pt-20 flex flex-col gap-y-6 lg:gap-y-10 min-h-screen">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-black">Our Vendors</h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Explore our trusted network of vendors
          </p>
        </div>

        {/* Vendor Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoadingVendors ? (
            Array.from({ length: 10 }).map((_, index) => <VendorSkeleton key={index} />)
          ) : error ? (
            <div className="col-span-full">
              <ErrorSection title="vendors" refetch={refetch} className="min-h-[50vh]" />
            </div>
          ) : vendorsResponse && vendorsResponse.vendors.length > 0 ? (
            vendorsResponse.vendors.map((vendor) => (
              <VendorCard key={vendor.vendorid} vendor={vendor} />
            ))
          ) : (
            <div className="col-span-full">
              <NoVenuesFound title="vendors" />
            </div>
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

        <Newsletter />
        <Footer />
      </div>
    </>
  );
}

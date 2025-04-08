"use client";

import {
  ErrorSection,
  NoVenuesFound,
} from "@/components/common/Error_NoVenues_Sections"; // Verify this path and export
import { VendorSkeleton } from "@/components/skeletons/vendor-skeleton"; // Verify this path and export
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { VendorResponse } from "@/types/venue";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { VendorCard, type VendorTypeEnum } from "./VendorCard"; // Verify this path and export

const Vendors = ({
  vendorsResponse: { vendors, currentPage, totalPages, totalItems } = {
    vendors: [],
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
  isLoading,
  error,
  vendorRefresh,
}: {
  vendorsResponse?: VendorResponse;
  isLoading: boolean;
  error: any;
  vendorRefresh: () => void;
}) => {
  const router = useRouter();

  return (
    <Card className="p-4" id="Vendors">
      <div className="flex justify-between gap-5 flex-wrap items-center mb-6">
        <h2 className="text-sm md:text-xl font-semibold">
          We recommend these vendors for you:
        </h2>
        <div className="inline-flex flex-wrap items-center gap-5 lg:gap-3">
          <p className="text-xs text-skin-black font-semibold">
            Looking for some more vendors?
          </p>
          <Button
            onClick={() => vendorRefresh()}
            className="bg-skin-yellow_600 shadow-elevation hover:bg-skin-yellow_600/90 font-semibold text-white text-xs h-8"
            disabled={isLoading} // Disable during loading
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <p className="text-xs text-skin-black font-semibold">or</p>
          <Button
            onClick={() => router.push(`/vendors`)}
            className="bg-skin-yellow_600 shadow-elevation hover:bg-skin-yellow_600/90 font-semibold text-white text-xs h-8"
          >
            Browse all vendors ({totalItems})
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <VendorSkeleton key={index} />
          ))
        ) : error ? (
          <div className="col-span-full">
            <ErrorSection title="Vendors" refetch={vendorRefresh} />{" "}
            {/* Optional: Add refetch if supported */}
          </div>
        ) : vendors.length === 0 ? (
          <div className="col-span-full">
            <NoVenuesFound title="Vendors" />
          </div>
        ) : (
          vendors.map((vendor, index) => (
            <VendorCard
              key={vendor.vendorid || index} // Use vendorid if available, fallback to index
              name={vendor.vendorname}
              type={vendor.vendortype as VendorTypeEnum}
              rating={(vendor as any)?.rating ?? 5} // Fallback to 5 if rating is undefined
            />
          ))
        )}
      </div>
    </Card>
  );
};

export default Vendors;

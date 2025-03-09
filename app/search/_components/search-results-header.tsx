"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchResultsHeaderProps {
  onSortChange: (value: string) => void;
  onTabChange: (value: string) => void;
}

export function SearchResultsHeader({
  onSortChange,
  onTabChange,
}: SearchResultsHeaderProps) {
  return (
    <div className="w-full px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Sort Dropdown */}
        <div className="w-full sm:w-[190px]">
          <Select onValueChange={onSortChange}>
            <SelectTrigger className="">
              <SelectValue
                placeholder={
                  <div className="flex items-center text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      className="mr-1"
                    >
                      <path
                        d="M7.85409 10.1467C7.94772 10.2405 8.00031 10.3675 8.00031 10.5C8.00031 10.6326 7.94772 10.7596 7.85409 10.8534L4.85409 13.8534C4.80766 13.8983 4.75344 13.9345 4.69409 13.9601C4.63306 13.9865 4.56726 14.0001 4.50075 14.0001C4.43425 14.0001 4.36845 13.9865 4.30742 13.9601C4.24806 13.9345 4.19385 13.8983 4.14742 13.8534L1.14742 10.8534C1.0983 10.8076 1.05889 10.7524 1.03157 10.6911C1.00424 10.6297 0.989544 10.5635 0.988359 10.4964C0.987175 10.4293 0.999524 10.3626 1.02467 10.3003C1.04982 10.2381 1.08725 10.1815 1.13473 10.134C1.18221 10.0865 1.23876 10.0491 1.30102 10.024C1.36328 9.99882 1.42997 9.98647 1.4971 9.98766C1.56424 9.98884 1.63045 10.0035 1.69178 10.0309C1.75311 10.0582 1.80831 10.0976 1.85409 10.1467L4.00075 12.2934V2.50005C4.00075 2.36744 4.05343 2.24026 4.1472 2.1465C4.24097 2.05273 4.36815 2.00005 4.50075 2.00005C4.63336 2.00005 4.76054 2.05273 4.85431 2.1465C4.94808 2.24026 5.00075 2.36744 5.00075 2.50005V12.2934L7.14742 10.1467C7.24117 10.0531 7.36825 10.0005 7.50075 10.0005C7.63325 10.0005 7.76034 10.0531 7.85409 10.1467ZM16.8541 5.14672L13.8541 2.14672C13.7998 2.09886 13.7362 2.06257 13.6674 2.04005C13.6064 2.01363 13.5406 2 13.4741 2C13.4076 2 13.3418 2.01363 13.2808 2.04005C13.2214 2.06562 13.1672 2.10176 13.1208 2.14672L10.1208 5.14672C10.0716 5.19249 10.0322 5.24769 10.0049 5.30902C9.97757 5.37036 9.96288 5.43657 9.96169 5.5037C9.96051 5.57084 9.97286 5.63752 9.998 5.69978C10.0232 5.76204 10.0606 5.8186 10.1081 5.86608C10.1555 5.91355 10.2121 5.95098 10.2744 5.97613C10.3366 6.00128 10.4033 6.01363 10.4704 6.01244C10.5376 6.01126 10.6038 5.99657 10.6651 5.96924C10.7264 5.94191 10.7816 5.90251 10.8274 5.85338L13.0008 3.70672V13.5C13.0008 13.6327 13.0534 13.7598 13.1472 13.8536C13.241 13.9474 13.3681 14 13.5008 14C13.6334 14 13.7605 13.9474 13.8543 13.8536C13.9481 13.7598 14.0008 13.6327 14.0008 13.5V3.70672L16.1474 5.85338C16.2412 5.94702 16.3683 5.99961 16.5008 5.99961C16.6333 5.99961 16.7603 5.94702 16.8541 5.85338C16.9477 5.75963 17.0003 5.63255 17.0003 5.50005C17.0003 5.36755 16.9477 5.24047 16.8541 5.14672Z"
                        fill="#343A3F"
                      />
                    </svg>
                    <span>Sort by: Our top picks</span>
                  </div>
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top">Our top picks</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <div className="w-full sm:w-auto">
          <Tabs defaultValue="listings" onValueChange={onTabChange}>
            <TabsList className="flex  bg-[#F0F0F0]  shadow-none px-2 rounded-full py-2 h-12 space-x-1 w-full sm:w-auto">
              <TabsTrigger
                value="listings"
                className="flex-1 rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-[0px_2px_16px 0px_rgba(0, 0, 0, 0.08] border-0 px-4 border-gray-200 sm:flex-none w-fit"
              >
                Listings
              </TabsTrigger>
              <TabsTrigger
                value="packages"
                className="flex-1 rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-[0px_2px_16px 0px_rgba(0, 0, 0, 0.08] border-0 px-4 border-gray-200 sm:flex-none w-fit"
              >
                Packages
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

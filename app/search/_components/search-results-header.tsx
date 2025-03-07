"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpDown } from "lucide-react";

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
                    <ArrowUpDown className="mr-2 h-4 w-4" />
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

"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDownIcon, Users } from "lucide-react";
import { useState } from "react";

const vendors = [
  {
    id: 1,
    name: "DJ Sajan",
    followers: 1200,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "DJ Sajan",
    followers: 800,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function Vendors() {
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-full sm:w-[190px]">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="">
              <SelectValue
                placeholder={
                  <div className="flex items-center text-xs">
                    <ArrowUpDownIcon className="mr-2 h-4 w-4" />
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
      </div>

      <div className="space-y-4">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="grid grid-cols-12 border border-black/50 items-center   relative overflow-hidden rounded-[8px]"
          >
            <div className=" col-span-12 lg:col-span-4 h-[14rem]">
              <img
                src={vendor.image || "/placeholder.svg"}
                alt={vendor.name}
                className="w-full h-full   object-cover"
              />
            </div>
            <div className="col-span-12  px-6 lg:h-full py-6 lg:col-span-8 flex flex-col justify-between gap-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg xl:text-xl font-semibold">
                  {vendor.name}
                </h3>
                <div className="inline-flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M11.9996 15.9316C12.8309 15.9316 13.6273 15.7734 14.356 15.4896C17.8438 16.474 20.4234 19.5691 20.6355 23.3129H3.36383C3.57726 19.5703 6.17159 16.4746 9.64351 15.4897C10.3721 15.7735 11.1685 15.9316 11.9996 15.9316Z"
                      stroke="black"
                    />
                    <path
                      d="M15.7188 9.33789C15.7188 11.3917 14.0538 13.0566 12 13.0566C9.94619 13.0566 8.28125 11.3917 8.28125 9.33789C8.28125 7.28408 9.94619 5.61914 12 5.61914C14.0538 5.61914 15.7188 7.28408 15.7188 9.33789Z"
                      stroke="black"
                    />
                    <path
                      d="M6.4 11.3125H5.80625V10.8813H5.30625C4.62962 10.8813 4.0625 10.3211 4.0625 9.61875C4.0625 9.30524 4.17074 9.02935 4.35129 8.823L4.475 8.68162V8.49882L4.98321 8.42622C5.12067 8.40659 5.21655 8.39375 5.30625 8.39375H5.80625V7.9625H6.4V11.3125ZM18.9501 8.39326L19.525 8.55751V8.68162L19.6487 8.823C19.8293 9.02935 19.9375 9.30524 19.9375 9.61875C19.9375 10.3024 19.3891 10.8625 18.6937 10.8625H18.1937V11.2938H17.6V7.94375H18.1937V8.375H18.6937C18.8352 8.375 18.8968 8.37802 18.9501 8.39326Z"
                      stroke="black"
                    />
                  </svg>
                  <p className="text-xs  font-normal text-[#9A9FA3]">
                    Photography
                  </p>
                </div>
              </div>
              <div className="flex border rounded-[8px] border-black/10 py-3 w-full justify-center items-center gap-4 text-sm text-gray-500 mt-2">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {vendor.followers}
                </span>
                <span>{vendor.rating}⭐</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {"<"}
        </Button>
        {[1, 2, 3].map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === 3}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
}

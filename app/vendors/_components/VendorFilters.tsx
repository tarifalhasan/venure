"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { VendorCategories } from "./VendorCategories";

interface VendorFiltersProps {
  selectedCity: string | null;
  onCityChange: (city: string | null) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function VendorFilters({
  selectedCity,
  onCityChange,
  selectedCategory,
  onCategoryChange,
}: VendorFiltersProps) {
  const [cityInput, setCityInput] = useState(selectedCity || "");

  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCityChange(cityInput || null);
  };

  return (
    <div className="border border-gray-200 rounded-md shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900 mb-4">Filter By:</h2>

        {/* City Search */}
        <div className="space-y-2">
          <label htmlFor="city-search" className="text-sm font-medium text-gray-700">
            Search by City
          </label>
          <form onSubmit={handleCitySubmit} className="relative">
            <Input
              id="city-search"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="Bangkok"
              className="pr-10"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <MapPin className="h-4 w-4 text-gray-400" />
            </div>
          </form>
        </div>
      </div>

      {/* Categories */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Vendors Category</h3>
        <VendorCategories
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>

      {/* Filter Button */}
      <div className="p-4 bg-gray-50">
        <Button
          variant="default"
          className="w-full bg-gray-800 hover:bg-gray-700"
          onClick={() => {
            onCityChange(cityInput || null);
          }}
        >
          FILTER
        </Button>
      </div>
    </div>
  );
}

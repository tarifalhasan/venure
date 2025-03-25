"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";
import { useState } from "react";
import { VenueFilterInput } from "@/types/venue";
import { Input } from "@/components/ui/input";

interface VenueFiltersProps {
  onFilterChange: (filters: VenueFilterInput) => void;
}

export function VenueFilters({ onFilterChange }: VenueFiltersProps) {
  const [filters, setFilters] = useState<VenueFilterInput>({
    venueType: "", // Maps to "setting", defaults to "" (visually "INDOOR")
    minAttendees: 50,
    maxAttendees: 200,
    minSize: 30,
    maxSize: 150,
    minPrice: 100,
    maxPrice: 10000,
    minRating: 2,
    maxRating: 5,
    adjustableSpace: true,
    features: [], // Now numeric IDs instead of strings
    currentPage: 1, // Added for VenueFilterInput
    itemsPerPage: 10, // Added for VenueFilterInput
  });

  const featureOptions = [
    { name: "Projector", id: 1 },
    { name: "Pool", id: 2 },
    { name: "Stage", id: 3 },
    { name: "Sound System", id: 4 },
    { name: "Catering", id: 5 },
    { name: "Parking", id: 6 },
    { name: "WiFi", id: 7 },
    { name: "Lighting", id: 8 },
  ];

  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const updateFilter = <K extends keyof VenueFilterInput>(
    key: K,
    value: VenueFilterInput[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-6 w-full shadow-3xl border border-[#ddd] rounded-[12px]">
      <div className="p-6 w-full">
        <h3 className="font-semibold text-sm md:text-xl mb-4">Filter By:</h3>
        <div className="space-y-6 xl:space-y-8">
          {/* Setting */}
          <div>
            <h4 className="text-sm text-skin-black font-medium mb-4">Setting</h4>
            <div className="flex flex-wrap xl:grid grid-cols-3 gap-3">
              {["INDOOR", "OUTDOOR", "HYBRID"].map((type) => (
                <Button
                  size="lg"
                  className="rounded-[8px] border-primary shadow-2xl"
                  key={type}
                  variant={
                    filters.venueType === type
                      ? "default"
                      : type === "INDOOR" && !filters.venueType
                      ? "default"
                      : "outline"
                  }
                  onClick={() => updateFilter("venueType", type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Destination (New for VenueFilterInput) */}
          {/* <div>
            <h4 className="text-sm text-skin-black font-medium mb-4">Destination</h4>
            <Input
              type="text"
              value={filters.destination}
              onChange={(e) => updateFilter("destination", e.target.value)}
              placeholder="Enter location (e.g., Bangkok)"
              className="w-full p-2 border border-input rounded-[8px] text-sm"
            />
          </div> */}

          {/* Number of Attendees */}
          <div>
            <div className="flex mb-6 items-center justify-between">
              <h4 className="text-sm text-gray-600 font-medium">Number of Attendees</h4>
              <div className="text-sm px-4 py-2.5 border border-input rounded-[8px] text-muted-foreground">
                {filters.minAttendees} - {filters.maxAttendees} attendees
              </div>
            </div>
            <Slider
              defaultValue={[filters.minAttendees, filters.maxAttendees]}
              max={1000}
              step={10}
              onValueChange={(value) => {
                updateFilter("minAttendees", value[0]);
                updateFilter("maxAttendees", value[1]);
              }}
              className="w-full"
            />
          </div>

          {/* Space Size */}
          <div>
            <div className="flex mb-6 items-center justify-between">
              <h4 className="text-sm text-gray-600 font-medium">Space Size</h4>
              <div className="inline-flex items-center gap-2">
                <div className="text-sm px-4 py-2.5 border border-input rounded-[8px] text-muted-foreground">
                  {filters.minSize} sq
                </div>
                <div className="text-sm px-4 py-2.5 border border-input rounded-[8px] text-muted-foreground">
                  {filters.maxSize} sq
                </div>
              </div>
            </div>
            <Slider
              defaultValue={[filters.minSize, filters.maxSize]}
              max={500}
              step={10}
              onValueChange={(value) => {
                updateFilter("minSize", value[0]);
                updateFilter("maxSize", value[1]);
              }}
              className="w-full"
            />
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm text-gray-600 font-medium mb-4">Features</h4>
            <div className="space-y-2">
              {(showAllFeatures ? featureOptions : featureOptions.slice(0, 3)).map(
                (feature) => (
                  <label key={feature.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={filters.features.includes(feature.id)}
                      className="w-4 h-4 rounded-none"
                      onCheckedChange={(checked) => {
                        updateFilter(
                          "features",
                          checked
                            ? [...filters.features, feature.id]
                            : filters.features.filter((id) => id !== feature.id)
                        );
                      }}
                    />
                    <span>{feature.name}</span>
                  </label>
                )
              )}
            </div>
            <Button
              variant="outline"
              className="text-sm border border-primary rounded-[8px] shadow-2xl h-[32px] mt-2"
              onClick={() => setShowAllFeatures(!showAllFeatures)}
            >
              {showAllFeatures ? "SHOW LESS" : "SHOW MORE"}
            </Button>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex mb-6 items-center justify-between">
              <h4 className="text-sm text-gray-600 font-medium">Price Range</h4>
              <div className="inline-flex items-center gap-2">
                <div className="text-sm px-4 py-2.5 border border-input rounded-[8px] text-muted-foreground">
                  {filters.minPrice.toLocaleString()} -{" "}
                  {filters.maxPrice.toLocaleString()}
                </div>
              </div>
            </div>
            <Slider
              defaultValue={[filters.minPrice, filters.maxPrice]}
              max={10000}
              step={100}
              onValueChange={(value) => {
                updateFilter("minPrice", value[0]);
                updateFilter("maxPrice", value[1]);
              }}
              className="w-full"
            />
          </div>

          {/* Rating */}
          <div className="pt-4">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-sm text-gray-600 font-medium">Rating</h4>
              <Button
                variant="outline"
                className="text-sm px-4 py-2.5 border border-input rounded-[8px] text-muted-foreground"
              >
                <Star className="w-4 h-4" />
                <span className="text-muted-foreground">{filters.minRating} - 5</span>
              </Button>
            </div>
            <Slider
              defaultValue={[filters.minRating, filters.maxRating]}
              max={5}
              step={0.1}
              onValueChange={(value) => {
                updateFilter("minRating", value[0]);
                updateFilter("maxRating", value[1]);
              }}
              className="w-full"
            />
          </div>

          {/* Adjustable Space */}
          <div>
            <h4 className="text-sm text-gray-600 font-medium mb-4">Adjustable Space</h4>
            <div className="flex gap-2">
              <Button
                variant={filters.adjustableSpace ? "default" : "outline"}
                onClick={() => updateFilter("adjustableSpace", true)}
                className="w-full rounded-[8px] shadow-2xl"
              >
                YES
              </Button>
              <Button
                variant={!filters.adjustableSpace ? "default" : "outline"}
                onClick={() => updateFilter("adjustableSpace", false)}
                className="w-full rounded-[8px] shadow-2xl border-primary"
              >
                NO
              </Button>
            </div>
          </div>

          {/* Filter Button */}
          <Button
            className="w-full rounded-[8px] shadow-2xl border-primary"
            onClick={() => onFilterChange(filters)}
          >
            FILTER
          </Button>
        </div>
      </div>
    </div>
  );
}

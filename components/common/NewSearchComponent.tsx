"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format, parseISO } from "date-fns";
import { CalendarIcon, SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import { Input } from "../ui/input";
import { toast } from "@/hooks/use-toast";

interface SearchFormProps {
  showSearchType?: boolean; // Default hidden
}

export function SearchForm({ showSearchType = false }: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract initial values from searchParams
  const initialSearchText = searchParams.get("searchText") || "";
  const initialStartDate = searchParams.get("startDate")
    ? parseISO(searchParams.get("startDate")!)
    : undefined;
  const initialEndDate = searchParams.get("endDate")
    ? parseISO(searchParams.get("endDate")!)
    : undefined;
  const initialVenueType = searchParams.get("venueType") || "venues";

  // Default to current date and next day
  const today = new Date();
  const tomorrow = addDays(today, 1);

  // State initialization
  const [searchText, setSearchText] = useState<string>(initialSearchText);
  const [date, setDate] = useState<DateRange | undefined>(() => {
    if (initialStartDate || initialEndDate) {
      return {
        from: initialStartDate || today,
        to:
          initialEndDate || (initialStartDate ? addDays(initialStartDate, 1) : tomorrow),
      };
    }
    return { from: today, to: tomorrow }; // Default when no params
  });
  const [venueType, setVenueType] = useState<string>(initialVenueType);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Predefined locations for autocomplete
  const predefinedLocations = [
    "New York",
    "Los Angeles",
    "London",
    "Paris",
    "Berlin",
    "Tokyo",
    "Sydney",
    "San Francisco",
    "Chicago",
    "Miami",
  ];

  // Set isClient to true on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sync state with searchParams on change
  useEffect(() => {
    const currentSearchText = searchParams.get("searchText") || "";
    const currentStartDate = searchParams.get("startDate")
      ? parseISO(searchParams.get("startDate")!)
      : undefined;
    const currentEndDate = searchParams.get("endDate")
      ? parseISO(searchParams.get("endDate")!)
      : undefined;
    const currentVenueType = searchParams.get("venueType") || "venues";

    setSearchText(currentSearchText);
    setVenueType(currentVenueType);

    // Update date only if searchParams has dates; otherwise, keep or set default
    if (currentStartDate || currentEndDate) {
      setDate({
        from: currentStartDate || today,
        to:
          currentEndDate || (currentStartDate ? addDays(currentStartDate, 1) : tomorrow),
      });
    } else {
      setDate((prev) => prev || { from: today, to: tomorrow });
    }
  }, [searchParams]);

  // Handle search text input change and autocomplete filtering
  const handleSearchChange = (value: string) => {
    setSearchText(value);
    const filtered = predefinedLocations.filter((location) =>
      location.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLocations(filtered);
    setShowSuggestions(true);
  };

  // Venue type options
  const VENUE_TYPES = [
    { id: "venues", label: "Venues" },
    { id: "packages", label: "Packages" },
    { id: "food_and_beverages", label: "Food and Beverages Only" },
  ];

  // Search handler
  const handleSearch = () => {
    // if (!searchText.trim() || !date?.from || !date?.to) {
    //   toast({
    //     title: "Please enter a search query and select a date range.",
    //     variant: "destructive",
    //   });
    //   return;
    // }
    const searchParams = new URLSearchParams();

    searchParams.set("venueType", venueType);
    if (searchText.trim()) {
      searchParams.set("searchText", searchText.trim());
    }
    if (date?.from) {
      searchParams.set("startDate", format(date.from, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
    }
    if (date?.to) {
      searchParams.set("endDate", format(date.to, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
    }

    const queryString = searchParams.toString();
    router.push(`/search?${queryString}`);
  };

  return (
    <div className="relative mx-auto max-w-[850px]">
      {showSearchType && (
        <div className="hidden md:flex items-center gap-4 mb-4 flex-wrap">
          {VENUE_TYPES.map((item) => (
            <button
              key={item.id}
              className={cn(
                "px-4 py-2 h-8 inline-flex rounded-full border border-skin-black text-skin-black text-sm font-normal items-center justify-center",
                item.id === venueType ? "bg-white border-transparent" : "bg-transparent"
              )}
              onClick={() => setVenueType(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Main Search Box */}
      <div
        className="flex border border-[#ddd] bg-white rounded-full items-center md:h-[66px] lg:flex-row gap-4 w-full py-2 md:py-4 mx-auto px-2"
        style={{
          boxShadow:
            "0px 3px 12px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Location Input with Autocomplete */}
        <div className="flex-1 pl-2 relative">
          <h3 className="text-xs text-foreground font-medium mb-0.5">Location</h3>
          <div className="relative">
            <Input
              value={searchText}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search destinations..."
              className="bg-transparent text-xs font-normal text-[#6A6A6A] h-auto py-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none border-none outline-none focus:outline-none ring-0 focus:ring-0"
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && filteredLocations.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1 max-h-60 overflow-auto">
                {filteredLocations.map((loc) => (
                  <button
                    key={loc}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setSearchText(loc);
                      setFilteredLocations([]);
                      setShowSuggestions(false);
                    }}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Date Picker */}
        <div className="border-l pl-4 border-[#DDD]">
          <h3 className="text-xs text-foreground font-medium mb-0.5">Date</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "md:w-[300px] h-auto rounded-none border-none py-0 px-0 hover:bg-transparent justify-start text-left font-normal text-sm text-[#6A6A6A]"
                )}
              >
                <CalendarIcon className="mr-2" />
                {date?.from && date?.to ? (
                  <span className="text-xs font-normal text-[#6A6A6A]">
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </span>
                ) : (
                  <span className="text-xs font-normal text-[#6A6A6A]">
                    {date?.from ? format(date.from, "LLL dd, y") : "Pick a date"}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from || today}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={(date) => date < today}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button
          className="w-12 h-12 rounded-full bg-[#FFA500] hover:bg-[#FFA500]/90"
          onClick={handleSearch}
        >
          <SearchIcon size={16} />
        </Button>
      </div>
    </div>
  );
}

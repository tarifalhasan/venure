"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { CalendarIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Input } from "../ui/input";

interface SearchFormProps {
  showSearchType?: boolean; // Default hidden
}

export function SearchForm({ showSearchType = false }: SearchFormProps) {
  const [searchType, setSearchType] = useState("venues");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [isClient, setIsClient] = useState(false);
  const router = useRouter(); // Next.js router

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const handleSearchChange = (value: string) => {
    setLocation(value);
    const filtered = predefinedLocations.filter((location) =>
      location.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLocations(filtered);
    setShowSuggestions(true);
  };

  const SEARCH_TYPE = [
    { id: "venues", label: "Venues" },
    { id: "packages", label: "Packages" },
    { id: "food_and_beverages", label: "Food and Beverages Only" },
  ];

  const handleSearch = () => {
    // Format the search parameters
    const searchParams: Record<string, string> = {
      searchType,
      location,
      fromDate: date?.from ? format(date.from, "yyyy-MM-dd") : "",
      toDate: date?.to ? format(date.to, "yyyy-MM-dd") : "",
    };

    // Convert the searchParams object to query string
    const queryString = new URLSearchParams(searchParams).toString();

    // Redirect to the search page with query parameters
    router.push(`/search?${queryString}`);
  };

  return (
    <div className="relative mx-auto max-w-[850px]">
      {showSearchType && (
        <div className="hidden md:flex items-center gap-4 mb-4 flex-wrap">
          {SEARCH_TYPE.map((item) => (
            <button
              key={item.id}
              className={cn(
                "px-4 py-2 h-8 inline-flex rounded-full border border-skin-black text-skin-black text-sm font-normal items-center justify-center",
                item.id === searchType
                  ? "bg-white border-transparent"
                  : "bg-transparent"
              )}
              onClick={() => setSearchType(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Main Search Box */}
      <div
        className="flex  border border-[#ddd] bg-white rounded-full items-center md:h-[66px] lg:flex-row gap-4 w-full py-2 md:py-4 mx-auto px-2"
        style={{
          boxShadow:
            "0px 3px 12px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Location Input with Autocomplete */}
        <div className="flex-1 pl-2 relative">
          <h3 className="text-xs  text-foreground font-medium mb-0.5">
            Location
          </h3>
          <div className="relative">
            <Input
              value={location}
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
                      setLocation(loc);
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
        <div className="border-l  pl-4 border-[#DDD]">
          <h3 className="text-xs text-foreground font-medium mb-0.5">Date</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "md:w-[300px] h-auto rounded-none border-none py-0 px-0 hover:bg-transparent justify-start text-left font-normal text-sm text-[#6A6A6A]",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                <span className="lg:hidden text-xs font-normal text-[#6A6A6A]">
                  From and To
                </span>
                <span className="hidden lg:block text-xs font-normal text-[#6A6A6A]">
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button
          className="w-12 h-12 rounded-full bg-[#FFA500] hover:bg-[#FFA500]/90"
          onClick={handleSearch} // Handle the search click event
        >
          <SearchIcon size={6} />
        </Button>
      </div>
    </div>
  );
}

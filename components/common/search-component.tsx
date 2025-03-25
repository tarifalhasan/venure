"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Separator } from "../ui/separator";
import { format, parseISO } from "date-fns"; // For formatting and parsing dates

export function SearchComponent() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get query params from URL

  // Extract initial values from searchParams
  const initialSearchText = searchParams.get("searchText") || "";
  const initialStartDate = searchParams.get("startDate")
    ? parseISO(searchParams.get("startDate")!) // Parse ISO string to Date
    : undefined;
  const initialEndDate = searchParams.get("endDate")
    ? parseISO(searchParams.get("endDate")!) // Parse ISO string to Date
    : undefined;
  const initialEventType = searchParams.get("venueType") || "";

  // Initialize state with values from searchParams
  const [searchText, setSearchText] = useState<string>(initialSearchText);
  const [startDate, setStartDate] = useState<Date | undefined>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate);
  const [eventType, setEventType] = useState<string>(initialEventType);

  // Handle search submission
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchText.trim()) {
      params.set("searchText", searchText.trim());
    }

    if (startDate) {
      params.set("startDate", format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
    }

    if (endDate) {
      params.set("endDate", format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
    }

    if (eventType) {
      params.set("venueType", eventType);
    }

    const queryString = params.toString();
    console.log("Query String:", queryString);
    const redirectUrl = queryString ? `/search?${queryString}` : "/search";
    console.log("Redirect URL:", redirectUrl);
    router.push(redirectUrl);
  };

  return (
    <div className="w-full mx-auto flex flex-col px-4">
      <div className="w-full p-2 px-4 bg-white rounded-lg md:rounded-full shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Location Input */}
          <div className="flex flex-col w-full">
            <span className="text-xs text-gray-500 font-medium mb-1 ml-2">Location</span>
            <div className="relative">
              <Input
                placeholder="Search destinations"
                className="w-full pl-10"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          <Separator className="hidden md:flex h-8 mt-5 w-[1px] bg-gray-300" />

          {/* Date Picker */}
          <div className="flex flex-col w-full">
            <span className="text-xs text-gray-500 font-medium mb-1 ml-2">Date</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    !startDate && !endDate ? "text-muted-foreground" : ""
                  }`}
                >
                  {startDate && endDate
                    ? `${startDate.toDateString()} - ${endDate.toDateString()}`
                    : startDate
                    ? `${startDate.toDateString()} - To`
                    : "From and To"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={
                    startDate && endDate ? { from: startDate, to: endDate } : undefined
                  }
                  onSelect={(range) => {
                    setStartDate(range?.from);
                    setEndDate(range?.to);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Separator className="hidden md:flex h-8 mt-5 w-[1px] bg-gray-300" />

          {/* Event Type Dropdown */}
          <div className="flex flex-col w-full">
            <span className="text-xs text-gray-500 font-medium mb-1 ml-2">
              Event Type
            </span>
            <Select onValueChange={setEventType} value={eventType}>
              <SelectTrigger className="bg-transparent">
                <SelectValue placeholder="Type of Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="birthday">Birthday</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="w-full md:w-10 h-10 mt-3 bg-primaryOrange hover:bg-primaryOrange/90 text-white rounded-full flex items-center justify-center"
          >
            <Search className="w-5 h-5" />
            <span className="md:sr-only mr-2 inline-block">Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

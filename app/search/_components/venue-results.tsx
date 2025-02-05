"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Venue } from "@/types/search";
import { Heart, Star } from "lucide-react";
import Image from "next/image";

interface VenueResultsProps {
  venues: Venue[];
  isLoading?: boolean;
}

export function VenueResults({ venues, isLoading }: VenueResultsProps) {
  if (isLoading) {
    return <VenueResultsSkeleton />;
  }

  return (
    <div className="grid gap-6">
      {venues.map((venue) => (
        <Card key={venue.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-[300px_1fr] gap-4">
              <div className="relative aspect-[4/3]">
                <Image
                  src={venue.image || "/placeholder.svg"}
                  alt={venue.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{venue.name}</h3>
                    <p className="text-muted-foreground">{venue.location}</p>
                    <p className="text-muted-foreground">Bangkok, Thailand</p>
                    <p className="text-sm text-muted-foreground">
                      {venue.type}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm">{venue.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({venue.reviews.toLocaleString()} Reviews)
                </span>
              </div>
              <div className="text-sm">
                <span className="font-semibold">
                  THB {venue.price.toLocaleString()}
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
      {/* Pagination */}
      <VenueResultsPagination />
    </div>
  );
}

import { VenueResultsPagination } from "./venue-results-pagination";

const VenueResultsSkeleton = () => {
  return (
    <div className="grid gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden animate-pulse">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-[300px_1fr] gap-4">
              <div className="bg-muted h-[225px]" />
              <div className="p-6">
                <div className="h-6 bg-muted rounded w-1/3 mb-2" />
                <div className="h-4 bg-muted rounded w-1/4 mb-4" />
                <div className="h-4 bg-muted rounded w-1/5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

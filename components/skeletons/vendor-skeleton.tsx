"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function VendorSkeleton() {
  return (
    <Card className="overflow-hidden shadow-md rounded-[8px] w-full border border-gray-200">
      <div className="aspect-video relative">
        <Skeleton className="w-full h-full bg-gray-200" />
      </div>
      <CardHeader className="p-4">
        <Skeleton className="h-6 w-3/4 bg-gray-200" />
        <Skeleton className="h-4 w-1/2 mt-2 bg-gray-200" />
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <Skeleton className="h-4 w-2/3 bg-gray-200" />
        <Skeleton className="h-4 w-1/2 bg-gray-200" />
        <Skeleton className="h-4 w-3/5 bg-gray-200" />
        <Skeleton className="h-4 w-1/3 bg-gray-200" />
      </CardContent>
    </Card>
  );
}

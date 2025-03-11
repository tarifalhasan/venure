import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function VenueDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-7xl flex flex-col gap-6 py-8">
        {/* Image Slider Skeleton */}
        <div className="mt-10">
          <Skeleton className="w-full h-[300px] md:h-[450px] rounded-lg" />
        </div>

        {/* Partners Section Skeleton */}
        <Skeleton className="w-1/3 h-10 mx-auto rounded-md" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-y-6">
            {/* Tabs Skeleton */}
            <Skeleton className="w-1/2 h-12 rounded-lg" />

            {/* Overview Card Skeleton */}
            <Card>
              <CardContent className="p-6">
                <Skeleton className="w-1/3 h-6 rounded-md mb-4" />
                <Skeleton className="w-full h-24 rounded-md mb-6" />

                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="w-16 h-8 rounded-full" />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features, Space Selector, Packages, Reviews Skeletons */}
            <Skeleton className="w-full h-40 rounded-md" />
            <Skeleton className="w-full h-40 rounded-md" />
            <Skeleton className="w-full h-40 rounded-md" />
            <Skeleton className="w-full h-40 rounded-md" />
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <Skeleton className="w-full h-60 rounded-md" />
            <div className="pb-4" />
            <Skeleton className="w-full h-16 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

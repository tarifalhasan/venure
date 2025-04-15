import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function VendorSkeleton() {
  return (
    <Card className="overflow-hidden rounded-lg w-full border border-gray-200">
      <div className="flex">
        {/* Left image skeleton */}
        <div className="relative w-[180px] h-[180px] shrink-0 border-r border-gray-100 bg-gray-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-0.5 bg-gray-200 absolute transform rotate-45"></div>
            <div className="w-full h-0.5 bg-gray-200 absolute transform -rotate-45"></div>
          </div>
        </div>

        {/* Right content skeleton */}
        <div className="flex-1 flex flex-col p-4">
          <div className="flex justify-between items-start mb-auto">
            {/* Vendor name skeleton */}
            <Skeleton className="h-7 w-[150px]" />

            {/* Vendor type skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
          </div>

          {/* Footer stats skeleton */}
          <div className="mt-auto">
            <Skeleton className="h-[52px] w-full rounded-md" />
          </div>
        </div>
      </div>
    </Card>
  );
}

import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CommonCardSkeleton() {
  return (
    <Card className="overflow-hidden shadow-elevation rounded-[8px] w-full">
      {/* Image Skeleton */}
      <div className="aspect-video relative">
        <Skeleton className="w-full h-full absolute" />
      </div>

      {/* Content Skeleton */}
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </CardHeader>
    </Card>
  );
}

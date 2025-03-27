// ReviewCard Component
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Review } from "@/types/venue";

export const ReviewCard = ({
  reviewid,
  venueid,
  reviewcontent,
  reviewername,
  createddate,
  updateddate,
}: Review) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const yearsAgo = () => {
    const diff = Date.now() - new Date(createddate).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  };

  return (
    <Card key={reviewid}>
      <CardContent className="p-4 flex flex-col gap-y-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{reviewername[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-gray-900">{reviewername}</h4>
            <p className="text-sm text-gray-500">
              {yearsAgo()} year{yearsAgo() !== 1 ? "s" : ""} ago
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {createddate !== updateddate && (
            <span className="text-sm text-gray-400 italic">
              Updated: {formatDate(updateddate)}
            </span>
          )}
        </div>
        <p className="text-gray-700">{reviewcontent}</p>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Posted: {formatDate(createddate)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

// ReviewCardSkeleton Component
export const ReviewCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-4 flex flex-col gap-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-28" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-3 w-36" />
      </CardContent>
    </Card>
  );
};

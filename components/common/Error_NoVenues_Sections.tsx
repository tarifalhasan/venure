"use client";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import NoDataAnimation from "@/assets/animations/no-data.json"; // Replace with your actual Lottie JSON
import ErrorAnimation from "@/assets/animations/error.json"; // Replace with your actual Lottie JSON
import { cn } from "@/lib/utils";

const ErrorSection = ({
  title,
  refetch,
  className,
  ...others
}: {
  title: string;
  refetch?: () => void;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}) => {
  const handleRetry = () => {
    if (refetch) {
      refetch();
    } else {
      window.location.reload();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6 px-6 py-12 text-center",
        className
      )}
      {...others}
    >
      <div className="w-full max-w-[350px] sm:max-w-[450px]">
        <Lottie animationData={ErrorAnimation} loop autoplay className="w-full h-auto" />
      </div>
      <p className="text-2xl font-semibold text-red-700 sm:text-3xl">
        Oops! Something went wrong.
      </p>
      <p className="text-base text-gray-600 sm:text-lg max-w-md">
        We couldn't load <span className="font-medium text-black">{title}</span> at the
        moment. This could be due to a temporary issue. Please check your connection or
        try again.
      </p>
      <Button
        onClick={handleRetry}
        className="mt-2 bg-red-600 hover:bg-red-700 px-6 py-3 text-lg font-medium"
      >
        Try Again
      </Button>
    </div>
  );
};

// 🚫 No Data Found Section with Lottie Animation
const NoVenuesFound = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center gap-6 px-6 py-12 text-center">
    <div className="w-full max-w-[350px] sm:max-w-[450px]">
      <Lottie animationData={NoDataAnimation} loop autoplay className="w-full h-auto" />
    </div>
    <p className="text-2xl font-semibold text-gray-800 sm:text-3xl">No {title} Found</p>
    <p className="text-base text-gray-600 sm:text-lg max-w-md">
      It looks like there are no <span className="font-medium text-black">{title}</span>{" "}
      available at the moment. Try adjusting your search filters or check back later.
    </p>
  </div>
);

export { ErrorSection, NoVenuesFound };

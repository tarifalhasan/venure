"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import ErrorAnimation from "@/assets/animations/error.json"; // Your Lottie animation
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100 text-center px-6">
      <div className="w-full max-w-[350px] sm:max-w-[450px]">
        <Lottie
          animationData={ErrorAnimation}
          loop
          autoplay
          className="w-full h-auto"
        />
      </div>
      <p className="text-3xl font-semibold text-red-700 sm:text-4xl">
        Oops! Something went wrong.
      </p>
      <p className="text-lg text-gray-600 max-w-md mt-2">
        There was an issue loading this page. Please try again or go back to the
        homepage.
      </p>
      <div className="mt-6 flex gap-4">
        <Button
          onClick={() => reset()}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 text-lg"
        >
          Retry
        </Button>
        <Button
          onClick={() => router.push("/")}
          className="bg-gray-600 hover:bg-gray-700 px-6 py-3 text-lg"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}

"use client";

import NoDataAnimation from "@/assets/animations/no-data.json"; // Replace with your actual Lottie JSON
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function NotFoundPageClient() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100 text-center px-6">
      <div className="w-full max-w-[350px] sm:max-w-[450px]">
        <Lottie
          animationData={NoDataAnimation}
          loop
          autoplay
          className="w-full h-auto"
        />
      </div>
      <p className="text-3xl font-semibold text-gray-800 sm:text-4xl">
        Page Not Found
      </p>
      <p className="text-lg text-gray-600 max-w-md mt-2">
        The page you are looking for does not exist. It may have been moved or
        deleted.
      </p>
      <Button
        onClick={() => router.push("/")}
        className="mt-6 bg-gray-600 hover:bg-gray-700 px-6 py-3 text-lg"
      >
        Go Home
      </Button>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export interface ImageCarouselProps {
  /**
   * Array of image objects to display in the carousel
   */
  images: {
    src: string;
    alt: string;
  }[];
  /**
   * Whether to auto-play the carousel
   * @default true
   */
  autoPlay?: boolean;
  /**
   * Interval in milliseconds between auto-play transitions
   * @default 5000
   */
  interval?: number;
  /**
   * Whether to pause auto-play on hover
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Whether to show pagination dots
   * @default true
   */
  showDots?: boolean;
  /**
   * Whether to show navigation arrows
   * @default true
   */
  showArrows?: boolean;
  /**
   * Custom class name for the carousel container
   */
  className?: string;
  /**
   * Custom class name for the image
   */
  imageClassName?: string;
  /**
   * Custom class name for the navigation arrows
   */
  arrowClassName?: string;
  /**
   * Custom class name for the pagination dots
   */
  dotsClassName?: string;
  /**
   * Number of images to preload
   * @default 2
   */
  preloadCount?: number;
  /**
   * Whether to loop the carousel
   * @default true
   */
  loop?: boolean;
  /**
   * Aspect ratio of the images (width/height)
   * @default "16/9"
   */
  aspectRatio?: string;
}

export function ImageCarousel({
  images,
  autoPlay = true,
  interval = 5000,
  pauseOnHover = true,
  showDots = true,
  showArrows = true,
  className,
  imageClassName,
  arrowClassName,
  dotsClassName,
  preloadCount = 2,
  loop = true,
  aspectRatio = "16/9",
}: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(
    new Set()
  );
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle preloading of images
  const preloadImage = useCallback(
    (index: number) => {
      if (preloadedImages.has(index) || index < 0 || index >= images.length)
        return;

      // Use window.Image constructor explicitly to avoid TypeScript errors
      const img = new window.Image();
      img.src = images[index].src || "/default-card-placeholder.png";
      img.crossOrigin = "anonymous";
      img.onload = () => {
        setPreloadedImages((prev) => {
          const newSet = new Set(prev);
          newSet.add(index);
          return newSet;
        });
      };
    },
    [images, preloadedImages]
  );

  // Preload initial images
  useEffect(() => {
    if (images.length === 0) return;

    // Preload current image and next few images
    for (let i = 0; i < preloadCount + 1; i++) {
      const indexToPreload = (current + i) % images.length;
      preloadImage(indexToPreload);
    }
  }, [current, images, preloadCount, preloadImage]);

  // Set up carousel API
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() || 0);
    };

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() || 0);

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Handle auto-play
  useEffect(() => {
    if (!api || !autoPlay || isPaused) {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
      return;
    }

    const startAutoPlay = () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }

      autoPlayIntervalRef.current = setInterval(() => {
        if (api.canScrollNext()) {
          api.scrollNext();
        } else if (loop) {
          api.scrollTo(0);
        }
      }, interval);
    };

    startAutoPlay();

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
    };
  }, [api, autoPlay, interval, isPaused, loop]);

  // Preload next images when current changes
  useEffect(() => {
    if (!api) return;

    // Preload next few images
    for (let i = 1; i <= preloadCount; i++) {
      const nextIndex = (current + i) % images.length;
      preloadImage(nextIndex);
    }
  }, [api, current, images.length, preloadCount, preloadImage]);

  // Handle dot click
  const handleDotClick = useCallback(
    (index: number) => {
      if (api) {
        api.scrollTo(index);
      }
    },
    [api]
  );

  if (images.length === 0) {
    return null;
  }

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          loop,
          align: "start",
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div
                className={cn("relative  overflow-hidden", imageClassName)}
                // style={{ aspectRatio }}
              >
                <Image
                  src={image.src || "/default-card-placeholder.png?height=600&width=800"}
                  alt={image.alt || "Carousel image"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover w-full"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {showArrows && (
          <>
            <CarouselPrevious
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2",
                arrowClassName
              )}
            />
            <CarouselNext
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2",
                arrowClassName
              )}
            />
          </>
        )}
      </Carousel>

      {showDots && count > 0 && (
        <div
          className={cn(
            "flex absolute left-1/2 -translate-x-1/2 bottom-4 justify-center gap-1 mt-2",
            dotsClassName
          )}
        >
          {Array.from({ length: count }).map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className={cn(
                "h-2 w-2 rounded-full p-0",
                index === current
                  ? "bg-[#D9D9D9] w-4"
                  : "bg-[#EAEAEA]  hover:bg-muted-foreground/50"
              )}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import VenueDetailsComponent from "../Index";
import { VenueService } from "@/services/venueService";
import { ErrorSection } from "@/components/common/Error_NoVenues_Sections";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ venueId: string }>;
}

// 🔹 Dynamic SEO Generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const venueId = (await params).venueId;

  if (!venueId) {
    return {
      title: "Venue Not Found | MyVenue",
      description: "The requested venue could not be found.",
    };
  }

  try {
    const venue = await VenueService.getVenueDetails(venueId);

    return {
      title: `${venue.venuename} | Best ${venue.venuetype} in ${venue.venueaddress}`,
      description:
        venue.venuedescription || "Explore this beautiful venue for your next event.",
      openGraph: {
        title: `${venue.venuename} | ${venue.venuetype}`,
        description: venue.venuedescription,
        type: "article",
        url: `${process.env.NEXT_PUBLIC_URL}/details/${venueId}`,
        images: venue.venueImages.length > 0 ? venue.venueImages : ["/default-venue.jpg"],
      },
      twitter: {
        card: "summary_large_image",
        title: `${venue.venuename} | ${venue.venuetype}`,
        description: venue.venuedescription,
        images:
          venue.venueImages.length > 0 ? venue.venueImages[0] : "/default-venue.jpg",
      },
    };
  } catch (error) {
    return {
      title: "Venue Details | MyVenue",
      description: "Find the best venues for your events.",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const queryClient = new QueryClient();
  const venueId = (await params).venueId;

  if (!venueId) {
    return <ErrorSection title="Venue not found" />;
  }

  // Prefetch data on the server
  await queryClient.prefetchQuery({
    queryKey: ["venueDetails", venueId],
    queryFn: async () => await VenueService.getVenueDetails(venueId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VenueDetailsComponent venueId={venueId} />
    </HydrationBoundary>
  );
}

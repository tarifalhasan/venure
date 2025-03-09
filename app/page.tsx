"use client";
import { Footer } from "@/components/common/footer";
import { Newsletter } from "@/components/common/news-letter";

import SliderSection from "@/components/common/SliderSection";
import { AdvertisementBanner } from "@/components/common/advertisement-banner";
import { CommonCard } from "@/components/common/common-card";
import { Navbar } from "@/components/common/navbar";
import { VenueConsultation } from "@/components/common/venue-consultsition";
import { DefaultCardPlaceHolderImage } from "@/constants/data";

const venues = [
  {
    title: "This is a heading",
    subtitle: "This is a subtitle",
    imageUrl: DefaultCardPlaceHolderImage,
  },
  {
    title: "This is a heading",
    subtitle: "This is a subtitle",
    imageUrl: DefaultCardPlaceHolderImage,
  },
  {
    title: "This is a heading",
    subtitle: "This is a subtitle",
    imageUrl: DefaultCardPlaceHolderImage,
  },
  {
    title: "This is a heading",
    subtitle: "This is a subtitle",
    imageUrl: DefaultCardPlaceHolderImage,
  },
  {
    title: "This is a heading",
    subtitle: "This is a subtitle",
    imageUrl: DefaultCardPlaceHolderImage,
  },
  {
    title: "This is a heading",
    subtitle: "This is a subtitle",
    imageUrl: DefaultCardPlaceHolderImage,
  },
  {
    title: "This is a heading",
    subtitle: "This is a subtitle",
    imageUrl: DefaultCardPlaceHolderImage,
  },
  {
    title: "This is a heading",
    subtitle: "This is a subtitle",
    imageUrl: DefaultCardPlaceHolderImage,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex w-full flex-col gap-[60px]">
      <Navbar showSearchType={true}>
        <div className=" mx-auto pt-10 pb-7 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl  xl:text-5xl font-bold text-primaryBlue-foreground">
              Book your Venue
            </h2>
            <p className="text-lg opacity-90">
              Search for venues to host your best events
            </p>
          </div>
        </div>
      </Navbar>

      {/* <Categories /> */}

      {/* Recommended Venues */}

      <SliderSection
        title="Recommended Venues"
        className="pt-10"
        items={venues}
        renderItem={(venue) => <CommonCard {...venue} />}
      />

      {/* Top Rated */}
      <SliderSection
        title="Top Rated Venue"
        items={venues}
        renderItem={(venue) => <CommonCard {...venue} />}
      />
      <VenueConsultation />
      {/* Near You Venues */}
      <SliderSection
        title="Near You Venue"
        items={venues}
        renderItem={(venue) => <CommonCard {...venue} />}
      />
      <AdvertisementBanner />
      {/* Deals */}
      <SliderSection
        title="Deals Venue"
        items={venues}
        renderItem={(venue) => <CommonCard {...venue} />}
      />

      <Newsletter />
      <Footer />
    </main>
  );
}

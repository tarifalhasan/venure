"use client";
import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, MapPin, Star } from "lucide-react";
import { NavigationTabs } from "./_components/NavigationTabs";
import Packages from "./_components/Packages";
import Partners from "./_components/Partners";
import Reviews from "./_components/Reviews";
import { Sidebar } from "./_components/Sidebar";
import SpaceSelector from "./_components/SpaceSelector";
import { VenueFeatures } from "./_components/VenueFeatures";
import { VenueImageSlider } from "./_components/VenueImageSlider";

function App() {
  return (
    <>
      {" "}
      <Navbar
        navbarClasses="md:mb-6"
        searchComponentWrapperClasses="w-full max-w-[90%]"
      />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div id="Details">
              <h1 className="text-2xl font-bold mb-2">Turtle Eco Luxe Villa</h1>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                <span>
                  2/4 Moo 14 Bangna Trad Road, KM 6.5, Bangkaew, Bangplee
                </span>
                <Button
                  variant="link"
                  className="text-blue-600 ml-2 flex items-center"
                >
                  Show on Map <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-500 my-[4px]">Listing By:</p>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-sm">Account Name</span>
                <span className="bg-gray-200 px-2 py-1 rounded text-xs flex items-center">
                  <Star className="w-3 h-3 mr-[2px] mb-[2px]" />
                  4.3
                </span>
              </div>
            </div>
          </div>

          {/* Main Navigation */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <VenueImageSlider />
              {/* Partners */}
              <div className="my-4">
                <Partners />
              </div>

              <div className="mb-8">
                <NavigationTabs activeTab="Overview" onTabChange={() => {}} />
              </div>

              <Card id="Overview" className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    About the Venue
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    A unique 5-star resort and villa offering various function
                    halls by the beach. Near Tao Valley and Sai Noi beach.
                    Private and secluded villa with captivating beachfront and
                    outdoor waterside living deck. Unique design cafe and
                    restaurant where you can order breakfast, lunch, and dinner.
                  </p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">500</span>
                      <span className="text-gray-500 text-sm">Capacity</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Indoor", "Tables", "Chairs", "Pool", "Wifi"].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        )
                      )}
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                        +2 more
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mb-8">
                <SpaceSelector />
              </div>

              <VenueFeatures />
              {/* Packages & Food & Beverages */}
              <div className="mb-8">
                <Packages />
              </div>
              {/* Reviews */}
              <div className="mb-8">
                <Reviews />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

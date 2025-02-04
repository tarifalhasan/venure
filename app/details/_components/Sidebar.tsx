import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import { BookingModalPopup } from "./BookingPopup/BookingModal";

export const Sidebar = () => {
  return (
    <Card className="sticky top-4">
      <Tabs defaultValue="Listing">
        <TabsList className="flex gap-4">
          <TabsTrigger
            value="Listing"
            className="py-2 px-4 text-sm font-medium"
          >
            Listing
          </TabsTrigger>
          <TabsTrigger
            value="Package"
            className="py-2 px-4 text-sm font-medium"
          >
            Package
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Listing">
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">Starting at</h3>
              <p className="text-3xl font-bold text-green-600">120,000</p>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-2">Additional Add ons:</h4>
              <div className="space-y-2">
                {["Partner: Divine Events", "The Catering", "DJ Sajan"].map(
                  (addon) => (
                    <Badge
                      key={addon}
                      className="w-fit flex items-center gap-2 bg-gray-100 text-gray-500 hover:bg-gray-200 cursor-pointer transition-all duration-300"
                    >
                      <span>{addon}</span>
                      <span className="ml-auto text-gray-500">
                        <X className="w-4 h-4" />
                      </span>
                    </Badge>
                  )
                )}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">From</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input type="date" />
                    {/* <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" /> */}
                  </div>
                  <div className="flex-1 relative">
                    <Input type="time" />
                    {/* <Clock className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" /> */}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">To</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input type="date" />
                    {/* <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" /> */}
                  </div>
                  <div className="flex-1 relative">
                    <Input type="time" />
                    {/* <Clock className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" /> */}
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700 mb-3">
              RESERVE
            </Button>
            <Button variant="outline" className="w-full">
              PLAN A VISIT
            </Button>

            <p className="text-center text-sm text-gray-500 mt-4">
              You won&apos;t be charged yet
            </p>
          </CardContent>
        </TabsContent>

        <TabsContent value="Package">
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">Package Details</h3>
              <p className="text-3xl font-bold text-green-600">
                Premium Package
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-2">Included Features:</h4>
              <ul className="space-y-2">
                {[
                  "Exclusive Venue",
                  "Personalized Catering",
                  "DJ Services",
                  "Photography",
                ].map((feature) => (
                  <li key={feature} className="text-gray-600">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <BookingModalPopup />
            <Button variant="outline" className="w-full">
              LEARN MORE
            </Button>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

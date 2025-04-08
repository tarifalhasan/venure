"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Utility from Shadcn for className merging

// Custom Marker Icon
const CustomMarkerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 48], // Larger for prominence
  iconAnchor: [15, 48],
  popupAnchor: [0, -40],
  shadowSize: [48, 48],
});

L.Marker.prototype.options.icon = CustomMarkerIcon;

// Sample NYC Locations
const nycLocations = [
  {
    position: [40.7128, -74.006] as LatLngExpression,
    name: "Downtown Manhattan",
    description: "The financial hub of NYC.",
    link: "https://www.google.com/maps/dir/?api=1&destination=40.7128,-74.0060",
  },
  {
    position: [40.7589, -73.9851] as LatLngExpression,
    name: "Times Square",
    description: "The bustling heart of entertainment.",
    link: "https://www.google.com/maps/dir/?api=1&destination=40.7589,-73.9851",
  },
  {
    position: [40.7812, -73.973] as LatLngExpression,
    name: "Central Park",
    description: "A serene oasis in the city.",
    link: "https://www.google.com/maps/dir/?api=1&destination=40.7812,-73.9730",
  },
];

export default function MapPage() {
  const center: LatLngExpression = [40.7128, -74.006]; // NYC center

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Explore New York City
          </h1>
          <nav>
            <Button
              variant="ghost"
              asChild
              className="text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors"
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-5xl mx-auto border-none shadow-xl rounded-xl overflow-hidden">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center">
              <MapPin className="mr-2 h-6 w-6 text-primary" />
              New York City Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-md relative">
              <MapContainer
                center={center}
                zoom={12}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
              >
                <TileLayer
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {nycLocations.map((location, index) => (
                  <Marker key={index} position={location.position}>
                    <Popup className="w-64">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {location.name}
                        </h3>
                        <p className="text-sm text-gray-600">{location.description}</p>
                        <Button
                          variant="link"
                          asChild
                          className="p-0 h-auto text-primary hover:text-primary/80"
                        >
                          <a
                            href={location.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Get Directions
                          </a>
                        </Button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <Button
                variant="outline"
                className="flex items-center border-primary text-primary hover:bg-primary/10 transition-colors"
              >
                <Navigation className="mr-2 h-4 w-4" />
                Explore More Locations
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <div className="mt-2">
            <Button variant="link" asChild className="text-gray-400 hover:text-white">
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
            <Button variant="link" asChild className="text-gray-400 hover:text-white">
              <Link href="/terms">Terms of Service</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

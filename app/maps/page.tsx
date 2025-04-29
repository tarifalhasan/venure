"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import the map component without SSR
const MapClient = dynamic(() => import("./MapClient"), { ssr: false });

export default function MapPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Explore New York City
          </h1>
          <nav>
            <Button variant="ghost" asChild>
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
              <MapClient />
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <Button
                variant="outline"
                className="flex items-center border-primary text-primary hover:bg-primary/10"
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
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <div className="mt-2">
            <Button
              variant="link"
              asChild
              className="text-gray-400 hover:text-white"
            >
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
            <Button
              variant="link"
              asChild
              className="text-gray-400 hover:text-white"
            >
              <Link href="/terms">Terms of Service</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

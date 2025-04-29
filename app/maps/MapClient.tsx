"use client";

import { Button } from "@/components/ui/button";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const CustomMarkerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 48],
  iconAnchor: [15, 48],
  popupAnchor: [0, -40],
  shadowSize: [48, 48],
});

L.Marker.prototype.options.icon = CustomMarkerIcon;

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

export default function MapClient() {
  const center: LatLngExpression = [40.7128, -74.006];

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
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
  );
}

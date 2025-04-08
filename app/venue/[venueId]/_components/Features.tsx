"use client";

import {
  BellRing,
  Cigarette,
  Coffee,
  Dumbbell,
  Martini,
  ParkingMeterIcon as Parking,
  PocketIcon as Pool,
  Utensils,
  Wifi,
} from "lucide-react";

export default function HotelFeatures({ venueFeatures }: { venueFeatures?: string[] }) {
  // Array of available icons for random selection
  const iconOptions = [
    { Icon: Pool, name: "Pool" },
    { Icon: Cigarette, name: "Cigarette" },
    { Icon: Dumbbell, name: "Dumbbell" },
    { Icon: Parking, name: "Parking" },
    { Icon: BellRing, name: "BellRing" },
    { Icon: Utensils, name: "Utensils" },
    { Icon: Wifi, name: "Wifi" },
    { Icon: Coffee, name: "Coffee" },
    { Icon: Martini, name: "Martini" },
  ];

  // Function to get a random icon
  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * iconOptions.length);
    return iconOptions[randomIndex];
  };

  return (
    <div className="p-6 rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-semibold text-skin-black mr-3">Features ({venueFeatures?.length})</h2>
        {/* <div className="px-3 py-1 rounded-full border border-[#959595] text-skin-black text-sm">
          Type A
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {venueFeatures&&venueFeatures.map((feature, index) => {
          const { Icon } = getRandomIcon(); // Get a random icon for each feature
          return (
            <div key={index} className="flex items-start">
              <div className="w-6 h-6 mr-3 text-green-600">
                <Icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <span className="text-gray-800">{feature}</span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4"></div>
    </div>
  );
}

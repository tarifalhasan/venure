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

export default function HotelFeatures() {
  return (
    <div className="p-6 rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-semibold text-skin-black mr-3">Features</h2>
        <div className="px-3 py-1 rounded-full border border-[#959595] text-skin-black text-sm">
          Type A
        </div>
      </div>

      <div className="flex items-center  gap-6  mb-4">
        <div className="inline-flex items-start">
          <div className="w-6 h-6 mr-3 text-green-600">
            <Pool className="w-6 h-6" />
          </div>
          <span className="text-gray-800">Outdoor swimming pool</span>
        </div>

        <div className="inline-flex items-start">
          <div className="w-6 h-6 mr-3 text-green-600">
            <Cigarette className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <span className="text-gray-800">Non-smoking rooms</span>
        </div>

        <div className="inline-flex items-start">
          <div className="w-6 h-6 mr-3 text-green-600">
            <Dumbbell className="w-6 h-6" />
          </div>
          <span className="text-gray-800">Fitness center</span>
        </div>

        <div className="inline-flex items-start">
          <div className="w-6 h-6 mr-3 text-green-600">
            <Parking className="w-6 h-6" />
          </div>
          <span className="text-gray-800">Free parking</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="inline-flex items-start">
          <div className="w-6 h-6 mr-3 text-green-600">
            <BellRing className="w-6 h-6" />
          </div>
          <span className="text-gray-800">Room service</span>
        </div>

        <div className="inline-flex items-start">
          <div className="w-6 h-6 mr-3 text-green-600">
            <Utensils className="w-6 h-6" />
          </div>
          <span className="text-gray-800">2 restaurants</span>
        </div>

        <div className="inline-flex items-start">
          <div className="w-6 h-6 mr-3 text-green-600">
            <Wifi className="w-6 h-6" />
          </div>
          <span className="text-gray-800">Free Wifi</span>
        </div>

        <div className="inline-flex items-start">
          <div className="w-6 h-6 mr-3 text-green-600">
            <Coffee className="w-6 h-6" />
          </div>
          <span className="text-gray-800">Tea/Coffee Maker in All Rooms</span>
        </div>

        <div className="inline-flex items-start">
          <div className="w-6 h-6 mr-3 text-green-600">
            <Martini className="w-6 h-6" />
          </div>
          <span className="text-gray-800">Bar</span>
        </div>
      </div>
    </div>
  );
}

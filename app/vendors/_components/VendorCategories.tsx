"use client";

import type React from "react";

import {
  Calendar,
  Camera,
  Palette,
  Music,
  Mic,
  Users,
  Utensils,
  Wine,
  Shield,
  Film,
  Sparkles,
  Flame,
  Projector,
  Scissors,
  Car,
  Brush,
  Footprints,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VendorCategoriesProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

type CategoryItem = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

export function VendorCategories({
  selectedCategory,
  onCategoryChange,
}: VendorCategoriesProps) {
  const categories: CategoryItem[] = [
    {
      id: "event-planner",
      name: "Event Planner",
      icon: <Calendar className="w-4 h-4" />,
    },
    { id: "decoration", name: "Decoration", icon: <Palette className="w-4 h-4" /> },
    {
      id: "photography",
      name: "Photography and Cinematography",
      icon: <Camera className="w-4 h-4" />,
    },
    {
      id: "audio-visual",
      name: "Audio, Visual and Lighting",
      icon: <Music className="w-4 h-4" />,
    },
    { id: "dj", name: "Entertainment: DJ", icon: <Music className="w-4 h-4" /> },
    { id: "emcee", name: "Entertainment: Emcee", icon: <Mic className="w-4 h-4" /> },
    { id: "band", name: "Entertainment: Live Band", icon: <Music className="w-4 h-4" /> },
    {
      id: "dancer",
      name: "Entertainment: Dancer",
      icon: <Footprints className="w-4 h-4" />,
    },
    {
      id: "other-entertainment",
      name: "Entertainment: Other",
      icon: <Users className="w-4 h-4" />,
    },
    { id: "catering", name: "Food Catering", icon: <Utensils className="w-4 h-4" /> },
    { id: "mixologist", name: "Mixologist", icon: <Wine className="w-4 h-4" /> },
    {
      id: "hospitality",
      name: "Hospitality Service",
      icon: <Users className="w-4 h-4" />,
    },
    { id: "security", name: "Security Team", icon: <Shield className="w-4 h-4" /> },
    { id: "multimedia", name: "Multimedia", icon: <Film className="w-4 h-4" /> },
    { id: "firework", name: "Firework", icon: <Sparkles className="w-4 h-4" /> },
    { id: "drone", name: "Drone Show", icon: <Flame className="w-4 h-4" /> },
    {
      id: "projection",
      name: "Projection Mapping",
      icon: <Projector className="w-4 h-4" />,
    },
    { id: "makeup", name: "Make-Up Artist", icon: <Brush className="w-4 h-4" /> },
    { id: "grooming", name: "Grooming", icon: <Scissors className="w-4 h-4" /> },
    { id: "hair", name: "Hair Stylist", icon: <Scissors className="w-4 h-4" /> },
    {
      id: "transportation",
      name: "Transportation Team",
      icon: <Car className="w-4 h-4" />,
    },
    { id: "designer", name: "Designer", icon: <Palette className="w-4 h-4" /> },
    {
      id: "motion-designer",
      name: "Motion Designer",
      icon: <Film className="w-4 h-4" />,
    },
    {
      id: "choreography",
      name: "Choreography",
      icon: <Footprints className="w-4 h-4" />,
    },
  ];

  return (
    <div className="space-y-1  pr-2">
      <ScrollArea className="max-h-[520px]  overflow-y-auto bg-white">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              onCategoryChange(category.id === selectedCategory ? null : category.id)
            }
            className={`flex items-center gap-3 w-full text-left px-2 py-2 rounded-md text-sm transition-colors ${
              selectedCategory === category.id
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="text-gray-500">{category.icon}</span>
            <span className="truncate">{category.name}</span>
          </button>
        ))}
      </ScrollArea>
    </div>
  );
}

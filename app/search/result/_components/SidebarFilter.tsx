"use client";

import {
  CinematographyIcon,
  CupsIcon,
  DancerIcon,
  DecorationIcon,
  DjMusicIcon,
  EventPlanner,
  LiveBand,
  MicIcon,
  MusicIcon,
  PhotographyIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Brush,
  Car,
  Film,
  PenTool,
  Plane,
  Scissors,
  Shield,
  Sparkles,
  UserCircle,
  Utensils,
} from "lucide-react";
import { useState } from "react";

const categories = [
  { id: "event-planner", label: "Event Planner", icon: EventPlanner },
  { id: "decoration", label: "Decoration", icon: DecorationIcon },
  {
    id: "photography",
    label: "Photography and Cinematography",
    icon: PhotographyIcon,
  },
  {
    id: "cinematography",
    label: "Cinematography",
    icon: CinematographyIcon,
  },
  {
    id: "audio",
    label: "Audio, Visual and Lighting",
    icon: MusicIcon,
  },
  { id: "dj", label: "Entertainment: DJ", icon: MicIcon },
  { id: "emcee", label: "Entertainment: Emcee", icon: DjMusicIcon },
  { id: "band", label: "Entertainment: Live Band", icon: LiveBand },
  { id: "dancer", label: "Entertainment: Dancer", icon: DancerIcon },
  { id: "other", label: "Entertainment: Other", icon: CupsIcon },
  { id: "catering", label: "Food Catering", icon: Utensils },
  { id: "hostess", label: "Hospitality Service", icon: UserCircle },
  { id: "security", label: "Security Team", icon: Shield },
  { id: "multimedia", label: "Multimedia", icon: Film },
  { id: "firework", label: "Firework", icon: Sparkles },
  { id: "drone", label: "Drone Show", icon: Plane },
  { id: "makeup", label: "Make up Artist", icon: Brush },
  { id: "transport", label: "Transportation Team", icon: Car },
  { id: "hair", label: "Hair Stylist", icon: Scissors },
  { id: "designer", label: "Designer", icon: PenTool },
];

export function VendorSidebar() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="w-full shadow-3xl p-5 xl:p-6 border border-[#ddd] rounded-[12px] lg:w-[300px] xl:w-[400px] flex-shrink-0">
      <div className="space-y-6 xl:space-y-8">
        <div>
          <h2 className="text-lg font-semibold  mb-4">Filter By:</h2>
          <div className="space-y-4 xl:space-y-8">
            <div className="space-y-4 xl:space-y-8">
              <Label>Search by City</Label>
              <Input placeholder="Bangkok" />
            </div>
            <div className="space-y-4 xl:space-y-8">
              <Label>Vendors Category</Label>
              <div className="space-y-3 xl:space-y-8 mt-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([
                              ...selectedCategories,
                              category.id,
                            ]);
                          } else {
                            setSelectedCategories(
                              selectedCategories.filter(
                                (id) => id !== category.id
                              )
                            );
                          }
                        }}
                      />
                      <Label
                        htmlFor={category.id}
                        className="flex items-center  gap-2 cursor-pointer"
                      >
                        <div className="relative w-8 h-8">
                          <Icon />
                        </div>

                        <span>{category.label}</span>
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Button className="w-full">FILTER</Button>
      </div>
    </div>
  );
}

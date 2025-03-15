import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DefaultCardPlaceHolderImage } from "@/constants/data";
import { Star, Users } from "lucide-react";
import Image from "next/image";

interface SpaceCardProps {
  type: string;
  rating: number;
  reviewCount: number;
  capacity: number;
  price: number;
  amenities: string[];
  venuSize: string;
  stageSize: string;
}

export function SpaceCard({
  type,
  rating,
  reviewCount,
  capacity,
  price,
  amenities,
  venuSize,
  stageSize,
}: SpaceCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-6 w-full space-y-6 relative">
        <div className="aspect-video bg-muted rounded-lg relative">
          {/* Image */}
          <Image
            src={DefaultCardPlaceHolderImage}
            alt="Space image"
            height={182}
            width={277}
            quality={100}
            priority
            className="w-full h-full object-cover rounded-lg"
          />

          {/* Rating Badge */}
          <div className="absolute bottom-[-14px] left-4 z-10 flex items-center gap-1 p-1 bg-gray-100 rounded-[22px]">
            <Star className="w-3 h-3" />
            <span className="text-sm">{rating.toFixed(1)}</span>
            <span className="text-xs text-gray-500">
              ({reviewCount} Reviews)
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Type {type}</h3>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Starting at</p>
            <p className="text-2xl font-semibold">{price.toLocaleString()}</p>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="text-sm">{capacity}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity, index) => (
              <Badge key={index} variant="secondary" className="rounded-full">
                {amenity}
              </Badge>
            ))}
          </div>

          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Venu Size: {venuSize}</p>
            <p>Stage Size: {stageSize}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button className="w-full bg-gray-900 hover:bg-gray-800">SELECT</Button>
      </CardFooter>
    </Card>
  );
}

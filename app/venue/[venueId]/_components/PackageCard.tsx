import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DefaultCardPlaceHolderImage } from "@/constants/data";
import { Star } from "lucide-react";
import Image from "next/image";

interface PackageCardProps {
  name: string;
  type: string;
  price: number;
  reviews: number;
}

export const PackageCard = ({
  name,
  type,
  price,
  reviews,
}: PackageCardProps) => {
  return (
    <Card className="w-full h-[465px] flex-shrink-0 relative">
      <CardHeader className="p-0">
        <div className="aspect-video bg-gray-100 h-[182px] rounded-lg relative">
          <Image
            src={DefaultCardPlaceHolderImage}
            alt="Package image"
            height={182}
            width={277}
            quality={100}
            priority
            className="w-full h-full object-cover rounded-lg"
          />

          {/* Rating Badge */}
          <div className="absolute bottom-[-14px] left-4 z-10 flex items-center gap-1 p-1 bg-gray-100 rounded-[22px]">
            <Star className="w-3 h-3" />
            <span className="text-sm">4.5</span>
            <span className="text-xs text-gray-500">({reviews} Reviews)</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="font-medium mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">{type}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 absolute bottom-2 right-0 left-0">
        <div className="w-full">
          <div className="text-right my-2">
            <h3 className="font-bold">THB {price.toLocaleString()}</h3>
            <p className="text-xs text-gray-500 capitalize">per person</p>
          </div>
          <Button size="sm" className="w-[80%] rounded-lg">
            ADD VENUE SERVICE
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

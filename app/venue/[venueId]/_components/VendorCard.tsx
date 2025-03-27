import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Music, Utensils } from "lucide-react"; // Assuming lucide-react is installed
export enum VendorTypeEnum {
  Photographer = "photographer",
  DJ = "dj",
  Catering = "catering",
}
interface VendorCardProps {
  name: string;
  type: VendorTypeEnum;
  rating: number;
}

const icons = {
  photographer: Camera,
  dj: Music,
  catering: Utensils,
};

export const VendorCard = ({ name, type }: VendorCardProps) => {
  const Icon = icons[type]|| Utensils; // Dynamically select the icon based on 'type'

  return (
    <Card className="w-full bg-white">
      {/* items-center */}
      <CardContent className="flex  justify-between py-4 px-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Avatar className="w-9 h-9 bg-gray-100">
              <AvatarFallback className="bg-gray-100">
                <Icon className="h-4 w-4 text-gray-500" />
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-[#9A9FA3]">{name}</span>
          </div>
          <p className="text-sm text-skin-black font-semibold">Type {type}</p>
        </div>
        <Button className="h-8 shadow-elevation rounded-[8px] px-4 text-xs font-medium bg-[#FF9900] hover:bg-[#FF9900]/90 text-white">
          ADD
        </Button>
      </CardContent>
    </Card>
  );
};

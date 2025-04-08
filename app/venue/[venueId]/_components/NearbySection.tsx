import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface Props {}

const NearbySection = () => {
  return (
    <Card className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg text-skin-black 2xl:text-xl font-semibold mb-4">
          Nearby:
        </h3>
        <button className="text-gray-900 flex items-center text-sm">
          Maps <span className="ml-1">›</span>
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 p-1 rounded">
            <MapPin className="h-4 w-4" />
          </div>
          <span className="text-sm">BTS Station: Ekkamai (100m)</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-gray-100 p-1 rounded">
            <MapPin className="h-4 w-4" />
          </div>
          <span className="text-sm">MRT Station: Asok (800m)</span>
        </div>
      </div>
    </Card>
  );
};

export default NearbySection;

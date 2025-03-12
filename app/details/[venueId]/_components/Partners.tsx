import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCcw } from "lucide-react";
import { PartnerCard, type PartnerTypeEnum } from "./PartnerCard"; // Assuming PartnerCard is imported

const partnersData = [
  { name: "Divine Events", type: "catering", rating: 4.8 },
  { name: "DJ Sajan", type: "dj", rating: 4.5 },
  { name: "SnapPro", type: "photographer", rating: 4.9 },
  { name: "Taste Masters", type: "catering", rating: 4.7 },
  { name: "Party Beats", type: "dj", rating: 4.6 },
  { name: "Capture Moments", type: "photographer", rating: 4.8 },
  { name: "Flavors Feast", type: "catering", rating: 4.5 },
  { name: "SoundWave", type: "dj", rating: 4.3 },
];

const Partners = () => {
  return (
    <Card className="p-4" id="Partners">
      <div className="flex justify-between gap-5 flex-wrap items-center mb-6">
        <h2 className="text-sm md:text-xl font-semibold">
          We recommend these vendors for you:
        </h2>
        <div className="inline-flex flex-wrap items-center gap-5 lg:gap-3">
          <p className="text-xs text-skin-black font-semibold">
            Looking for some more vendors?
          </p>
          <Button className="bg-skin-yellow_600 shadow-elevation hover:bg-skin-yellow_600/90 font-semibold text-white text-xs h-8">
            <RefreshCcw />
            Refresh
          </Button>
          <p className="text-xs text-skin-black font-semibold">or</p>
          <Button className="bg-skin-yellow_600 shadow-elevation hover:bg-skin-yellow_600/90 font-semibold text-white text-xs h-8">
            Browse all vendors
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-4">
        {partnersData.map((partner, index) => (
          <PartnerCard
            key={index}
            name={partner.name}
            type={partner.type as PartnerTypeEnum}
            rating={partner.rating}
          />
        ))}
      </div>
    </Card>
  );
};

export default Partners;

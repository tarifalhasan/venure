import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

type Addon = {
  label: string;
  onRemove?: () => void;
};

type CTAProps = {
  buttonText: string;
  startingPriceLabel?: string;
  startingPrice: string | number;
  addons?: Addon[];
  note?: string;
  onButtonClick?: () => void;
};

const CTA = ({
  buttonText,
  startingPriceLabel = "Starting at",
  startingPrice,
  addons = [],
  note = "Visit us, it’s free of cost!",
  onButtonClick,
}: CTAProps) => {
  return (
    <Card className="bg-white rounded-lg p-4 shadow-sm">
      <Button
        size="lg"
        className="w-full mb-3 py-6 rounded-md"
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>

      <div className="mb-4">
        <div className="text-xs text-gray-500">{startingPriceLabel}</div>
        <div className="text-green-500 text-2xl font-semibold">
          {startingPrice}
        </div>
      </div>

      {addons.length > 0 && (
        <div className="space-y-3">
          <div className="text-gray-800 font-medium">Additional Add-ons:</div>

          <div className="flex flex-wrap gap-2">
            {addons.map((addon, idx) => (
              <div
                key={idx}
                className="flex items-center bg-transparent border border-[#959595] rounded-full px-3 py-1 text-sm"
              >
                {addon.label}
                {addon.onRemove && (
                  <button className="ml-1" onClick={addon.onRemove}>
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center text-sm mt-4">{note}</div>
    </Card>
  );
};

export default CTA;

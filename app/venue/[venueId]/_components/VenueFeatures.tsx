import { Card, CardContent } from "@/components/ui/card";
import { School as Pool, CookingPot as NoSmoking, Dumbbell, ParkingCircle, Bell, UtensilsCrossed, Wifi, Coffee, Wine } from 'lucide-react';

const features = [
  { icon: Pool, label: 'Outdoor swimming pool' },
  { icon: NoSmoking, label: 'Non-smoking rooms' },
  { icon: Dumbbell, label: 'Fitness center' },
  { icon: ParkingCircle, label: 'Free parking' },
  { icon: Bell, label: 'Room service' },
  { icon: UtensilsCrossed, label: '2 restaurants' },
  { icon: Wifi, label: 'Free WiFi' },
  { icon: Coffee, label: 'Tea/Coffee Maker in All Rooms' },
  { icon: Wine, label: 'Bar' }
];

export const VenueFeatures = () => {
  return (
    <Card id="Features" className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="text-sm">{feature.label}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
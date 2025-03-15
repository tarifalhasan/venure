import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  date: string;
  rating: number;
  review: string;
  yearsAgo: number;
}

export const ReviewCard = ({
  name,
  date,
  rating,
  review,
  yearsAgo,
}: ReviewCardProps) => {
  return (
    <Card>
      <CardContent className="p-4 flex flex-col gap-y-4">
        <div className="flex items-center gap-3 mb-2">
          <Avatar>
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm text-gray-500">{yearsAgo} years</p>
          </div>
        </div>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "text-black fill-black" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">{date}</span>
        </div>
        <p className="text-gray-700">{review}</p>
      </CardContent>
    </Card>
  );
};

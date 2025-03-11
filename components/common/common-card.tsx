import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface CommonCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export function CommonCard({ title, subtitle, imageUrl }: CommonCardProps) {
  return (
    <Card className="overflow-hidden shadow-elevation rounded-[8px] w-full">
      <div className="aspect-video relative">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title||"Eventure"}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg xl:text-xl text-black font-semibold">
          {title}
        </CardTitle>
        <p className="text-sm text-[#878D96] leading-[140%]">{subtitle}</p>
      </CardHeader>
    </Card>
  );
}

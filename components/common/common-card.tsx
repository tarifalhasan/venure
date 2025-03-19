import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface CommonCardProps {
  id: string | number;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export function CommonCard({ id, title, subtitle, imageUrl }: CommonCardProps) {
  return (
    <Card className="overflow-hidden shadow-elevation rounded-[8px] w-full">
      <Link href={`/venue/${id}`}>
        <div className="aspect-video relative">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title || "Eventure"}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-lg xl:text-xl text-black font-semibold cursor-pointer hover:underline">
            {title}
          </CardTitle>
          <p className="text-sm text-[#878D96] leading-[140%] hover:underline">
            {subtitle}
          </p>
        </CardHeader>
      </Link>
    </Card>
  );
}

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
    <Card className="overflow-hidden shadow-elevation rounded-[8px] w-full flex flex-col">
      <Link href={`/venue/${id}`} className="flex flex-col h-full">
        <div className="aspect-video relative">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title || "Eventure"}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader className="flex-1 p-4">
          <CardTitle className="text-lg xl:text-xl text-black font-semibold cursor-pointer hover:underline line-clamp-1 overflow-hidden">
            {title}
          </CardTitle>
          <p className="text-sm text-[#878D96] leading-[140%] line-clamp-1 overflow-hidden mt-1">
            {subtitle}
          </p>
        </CardHeader>
      </Link>
    </Card>
  );
}

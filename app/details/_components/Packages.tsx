import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PackageCard } from "./PackageCard"; // Assuming PackageCard component is imported

const packages = [
  { name: "Vendor 1", type: "Buffet", price: 450, reviews: 2228 },
  { name: "Vendor 2", type: "À la Carte", price: 300, reviews: 1500 },
  { name: "Vendor 3", type: "Buffet", price: 500, reviews: 1800 },
  { name: "Vendor 4", type: "Buffet", price: 350, reviews: 800 },
  { name: "Vendor 5", type: "À la Carte", price: 400, reviews: 1200 },
  { name: "Vendor 6", type: "Buffet", price: 450, reviews: 2200 },
];

const Packages = () => {
  const isMobile = useIsMobile();
  return (
    <Card id="Packages" className="p-4">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-lg font-semibold text-skin-black tracking-[-0.36px]">
          Packages: Food & Beverages
        </h2>
        <Button className="text-sm text-[#343A3F] font-bold uppercase bg-transparent border border-[#343A3F] hover:text-white h-10 rounded-[8px]">
          show all
        </Button>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20} // Controls the space between slides
        slidesPerView={isMobile ? 1 : 2} // Three slides per view
        navigation
        pagination={{ clickable: true }}
        className="py-6"
      >
        {packages.map((pkg, i) => (
          <SwiperSlide key={i} className="flex gap-4">
            <PackageCard
              name={pkg.name}
              type={pkg.type}
              price={pkg.price}
              reviews={pkg.reviews}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  );
};

export default Packages;

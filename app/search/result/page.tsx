import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Newsletter } from "@/components/common/news-letter";
import { Vendors } from "./_components/SearchFiltersResult";
import { VendorSidebar } from "./_components/SidebarFilter";

export default function VendorsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar showSearchBar={false} />

      <main className="container mx-auto py-8">
        <div className="text-sm breadcrumbs mb-4">
          <span className="text-gray-500">Home / All Vendors</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <VendorSidebar />
          <div className="flex-1">
            <Vendors />
          </div>
        </div>
      </main>

      <div className="mt-6 lg:mt-10 xl:mt-14">
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}

"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface SearchHeaderProps {
  resultCount: number;
  searchTerm: string;
}

export function SearchHeader({ resultCount, searchTerm }: SearchHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 lg:gap-8  lg:items-center">
      <div className=" hidden lg:block lg:w-[400px]">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Search</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <h3 className="text-xs md:text-sm  text-[#343A3F] font-bold">
        ({resultCount}) <span className="font-semibold">Results for '{searchTerm}' found</span>
      </h3>
    </div>
  );
}

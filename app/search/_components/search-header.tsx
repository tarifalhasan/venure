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
    <div className="flex flex-col md:flex-row gap-8  items-center">
      <div className="lg:w-[420px]">
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

      <h3 className="text-xs md:text-sm font-light text-[#343A3F]">
        {resultCount} Results for {searchTerm} found
      </h3>
    </div>
  );
}

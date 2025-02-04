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
    <div className="flex max-w-xl flex-col md:flex-row gap-7 md:justify-between items-center">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/search">Search Results</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Search</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h3 className="text-xs md:text-sm font-light text-[#343A3F]">
        {resultCount} Results for {searchTerm} found
      </h3>
    </div>
  );
}

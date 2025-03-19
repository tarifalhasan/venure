"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils"; // Assuming you have this utility for className merging

interface CommonPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number; // Optional: Customize max visible page numbers
  className?: string; // Optional: Custom styling
  disabled?: boolean; // Optional: Disable pagination entirely
}

export function CommonPagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  className,
  disabled = false,
}: CommonPaginationProps) {
  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= maxVisiblePages || totalPages === 0) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfRange = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - halfRange);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages: (number | "ellipsis")[] = [];
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("ellipsis");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("ellipsis");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Early return if no pages to display
  if (totalPages === 0) {
    return null;
  }

  return (
    <Pagination className={cn("flex justify-center", className)}>
      <PaginationContent className="flex items-center gap-1">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (!disabled && currentPage > 1) onPageChange(currentPage - 1);
            }}
            className={cn(
              "rounded-md transition-colors",
              currentPage === 1 || disabled
                ? "pointer-events-none opacity-50"
                : "hover:bg-gray-100"
            )}
            aria-disabled={currentPage === 1 || disabled}
            tabIndex={currentPage === 1 || disabled ? -1 : 0}
          />
        </PaginationItem>

        {pageNumbers.map((page, index) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis className="text-gray-500" />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  if (!disabled && page !== currentPage) onPageChange(page);
                }}
                className={cn(
                  "rounded-md transition-colors",
                  page === currentPage ? "bg-primary text-white" : "hover:bg-gray-100",
                  disabled && "pointer-events-none opacity-50"
                )}
                aria-current={page === currentPage ? "page" : undefined}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : 0}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (!disabled && currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={cn(
              "rounded-md transition-colors",
              currentPage === totalPages || disabled
                ? "pointer-events-none opacity-50"
                : "hover:bg-gray-100"
            )}
            aria-disabled={currentPage === totalPages || disabled}
            tabIndex={currentPage === totalPages || disabled ? -1 : 0}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

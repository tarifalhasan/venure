"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils"; // Ensure you use your utility function for classnames
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SearchForm } from "./NewSearchComponent";
interface Props {
  navbarClasses?: string;
  searchComponentWrapperClasses?: string;
  children?: React.ReactNode;
  showSearchBar?: boolean;
}
export function Navbar({
  children,
  navbarClasses,
  searchComponentWrapperClasses,
  showSearchBar = true,
}: Props) {
  return (
    <nav
      className={cn(
        "relative z-50  w-full bg-primaryBlue text-primaryBlue-foreground rounded-br-[60px] md:rounded-br-[80px] md:rounded-bl-[80px] rounded-bl-[60px] flex flex-col",
        navbarClasses
      )}
    >
      <div className="container mx-auto flex flex-col items-center px-4 md:px-6">
        {/* Top Section */}
        <div className="w-full flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="venue logo"
              width={120}
              height={40}
              className="cursor-pointer"
            />
          </Link>

          {/* Navigation & Controls */}
          <div className="flex items-center space-x-4">
            <Link href="#" className="hidden md:block text-sm font-medium">
              VENUE CONSULTATION
            </Link>
            <Button
              variant="ghost"
              className="hidden md:block bg-primaryDark text-white"
            >
              LIST YOUR VENUE
            </Button>

            {/* Currency Selection */}
            <Button
              variant="ghost"
              className="hidden md:inline-flex text-sm font-medium"
            >
              THB
            </Button>

            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  src="/nav_flag.png"
                  alt="venue flag"
                  width={32}
                  height={32}
                  className="cursor-pointer w-8 h-8 rounded-full"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Thai</DropdownMenuItem>
                <DropdownMenuItem>Japanese</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <NavNotificationDropdown />
              </DropdownMenuContent>
            </DropdownMenu> */}

            {/* Login/Sign Up */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-white text-black hover:bg-primaryDark hover:text-white">
                  LOGIN / SIGN UP
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <LoginRegisterDropdown />
              </DropdownMenuContent>
            </DropdownMenu> */}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Button variant="ghost" className="w-full justify-start">
                    VENUE CONSULTATION
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full bg-primaryDark text-white justify-start"
                  >
                    LIST YOUR VENUE
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    THB
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Optional Children */}
        {children && <div className="w-full flex-1">{children}</div>}

        {showSearchBar && (
          <div
            className={cn(
              "md:mt-4 w-full mx-auto  md:px-4 md:mb-[-2.4rem]",
              searchComponentWrapperClasses
            )}
          >
            <SearchForm />
          </div>
        )}
      </div>
    </nav>
  );
}

"use client";

import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  CheckCircle2,
  PackageIcon,
  UsersIcon,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { FormValues } from "./BookingModal";

const BookingComplete = ({ bookingId }: { bookingId?: string }) => {
  const { getValues } = useFormContext<FormValues>();
  const formData = getValues();

  // Format date
  const formattedDate = formData.date
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(formData.date)
    : "N/A";

  // Format time (assuming 1-hour duration)
  const formattedTime = formData.time
    ? (() => {
        const [hours, minutes] = formData.time.split(":").map(Number);
        const startDate = new Date();
        startDate.setHours(hours, minutes);
        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + 1);
        return `${formData.time} - ${endDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
      })()
    : "N/A";

  // Booking type display
  const bookingTypeDisplay =
    formData.bookingType === "standard" ? "Site Visit" : "Custom Booking";

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg border border-gray-200">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8" />
            <CardTitle className="text-xl md:text-2xl font-semibold">
              Booking Confirmed!
            </CardTitle>
          </div>
          <p className="mt-2 text-sm md:text-base opacity-90">
            Thank you for booking with us! A confirmation email has been sent to{" "}
            <span className="font-medium">{formData.email || "your email"}</span>.
          </p>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-6 space-y-6">
          {/* Summary Header */}
          <div className="text-center">
            <p className="text-sm md:text-base text-muted-foreground font-medium">
              Upcoming Booking for {formData.fullName || "Guest"}
            </p>
            <h3 className="text-lg md:text-xl font-semibold text-foreground">
              {bookingTypeDisplay}
            </h3>
            <Badge variant="secondary" className="mt-2">
              Booking ID: #
              {bookingId || `${formData.venueId}-${Date.now().toString().slice(-6)}`}
            </Badge>
          </div>

          <Separator />

          {/* Core Booking Details */}
          <div className="grid gap-4">
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <span className="text-sm md:text-base font-medium text-foreground">
                {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ClockIcon className="h-5 w-5 text-primary" />
              <span className="text-sm md:text-base font-medium text-foreground">
                {formattedTime}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPinIcon className="h-5 w-5 text-primary" />
              <span className="text-sm md:text-base font-medium text-foreground">
                Venue #{formData.venueId} {/* Replace with venue name if available */}
              </span>
            </div>
          </div>

          <Separator />

          {/* Visitor Details */}
          <div className="grid gap-4">
            <h4 className="text-sm font-semibold text-muted-foreground">
              Visitor Information
            </h4>
            <div className="flex items-center gap-3">
              <UserIcon className="h-5 w-5 text-primary" />
              <span className="text-sm md:text-base font-medium text-foreground">
                {formData.fullName || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MailIcon className="h-5 w-5 text-primary" />
              <span className="text-sm md:text-base font-medium text-foreground">
                {formData.email || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon className="h-5 w-5 text-primary" />
              <span className="text-sm md:text-base font-medium text-foreground">
                {formData.phone || "N/A"}
              </span>
            </div>
          </div>

          {/* Additional Details */}
          {(formData.requests || formData.vendorIds.length > 0 || formData.siteId) && (
            <>
              <Separator />
              <div className="grid gap-4">
                <h4 className="text-sm font-semibold text-muted-foreground">
                  Additional Details
                </h4>
                {formData.requests && (
                  <div>
                    <p className="text-sm text-muted-foreground">Special Requests:</p>
                    <p className="text-sm md:text-base text-foreground">
                      {formData.requests}
                    </p>
                  </div>
                )}
                {formData.vendorIds.length > 0 && (
                  <div className="flex items-center gap-3">
                    <UsersIcon className="h-5 w-5 text-primary" />
                    <span className="text-sm md:text-base font-medium text-foreground">
                      Vendors: {formData.vendorIds.join(", ")}{" "}
                      {/* Replace with names if available */}
                    </span>
                  </div>
                )}
                {formData.siteId && (
                  <div className="flex items-center gap-3">
                    <PackageIcon className="h-5 w-5 text-primary" />
                    <span className="text-sm md:text-base font-medium text-foreground">
                      Site #{formData.siteId} {/* Replace with site name if available */}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingComplete;

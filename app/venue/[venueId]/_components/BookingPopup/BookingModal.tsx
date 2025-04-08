"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import AddDetailsForm from "./AddDetailsForm";
import BookingComplete from "./BookingComplete";
import BookingDataForm from "./BookingDataForm";
import OtpVerification from "./OtpVerification";
import type { BookingRequest, BookingResponse } from "@/types/booking"; // Import the type
import {
  useBookingMutation,
  useBookingConfirmMutation,
} from "@/queries/mutations/bookingMutations";
import { AxiosError } from "axios";
// import type { VenueDetails } from "./VenueDetails";
import type { Vendor, VenueDetails } from "@/types/venue";

const steps = [
  { id: 1, label: "Booking Data", component: BookingDataForm },
  { id: 2, label: "Add Details", component: AddDetailsForm },
  { id: 3, label: "OTP Verification", component: OtpVerification },
  { id: 4, label: "Completion", component: BookingComplete },
];

const formSchema = z.object({
  date: z.date({ required_error: "Please select a date" }),
  time: z.string({ required_error: "Please select a time" }),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  requests: z.string().optional(),
  otp: z.string().optional(), // OTP is optional
  venueId: z.union([z.number(), z.string()]).default("1"), // Allow number or string
  vendorIds: z.array(z.union([z.number(), z.string()])).default(["1"]), // Array of number or string
  siteId: z.union([z.number(), z.string()]).default("1"), // Allow number or string
  bookingType: z.string().default("standard"),
});

export type FormValues = z.infer<typeof formSchema>;

interface BookingModalPopupProps {
  venueId: number; // Add venueId as a prop
  venueDetails?: VenueDetails;
  vendors?:Vendor[];
}

export function BookingModalPopup({ venueId, venueDetails, vendors }: BookingModalPopupProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookingResponse, setBookingResponse] = useState<BookingResponse | null>(null);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      venueId,
      vendorIds: [...(vendors?.map((vendor) => vendor?.vendorid) as number[])],
      siteId: venueDetails?.venueid,
      bookingType: "standard",
      requests: "",
    },
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
    watch,
  } = methods;

  // Booking creation mutation
  const { mutate: createBooking, isPending: isBookingPending } = useBookingMutation({
    onSuccess: (data) => {
      setBookingResponse(data);
      toast({
        title: "Booking created",
        description: "Please verify your booking with the OTP sent to your email.",
      });
      setCurrentStep(2); // Move to OTP verification step
    },
    onError: (error: unknown) => {
      console.log("Confirmation error:", error); // Log for debugging
      let title = "Booking failed, please try again";
      let description = "An unknown error occurred";

      if (typeof error === "string") {
        title = error;
      } else if (error instanceof AxiosError) {
        title = error.response?.data?.message || error.message || "Request failed";
        description =
          error.response?.data?.description || "An error occurred during the request";
      } else if (error instanceof Error) {
        title = error.message;
        description = "An error occurred during the request";
      }

      toast({
        title,
        description,
        variant: "destructive",
      });
    },
  });

  // Booking confirmation mutation
  const { mutate: confirmBooking, isPending: isConfirmPending } =
    useBookingConfirmMutation({
      onSuccess: (data) => {
        toast({
          title: "Booking confirmed",
          description: "Your booking has been successfully confirmed.",
        });
        setCurrentStep(3); // Move to completion step
      },
      onError: (error) => {
        // Log error in multiple ways for robustness
        console.log("Booking confirmation error:", error); // Plain log
        console.error("Error details:", { error }); // Explicit error log
        console.dir(error); // Deep inspection of the error object

        // Handle different error types
        let errorTitle = "Confirmation failed, Please check your OTP and try again";
        let errorDescription = "An unknown error occurred";

        if (typeof error === "string") {
          errorTitle = error; // If error is a string, use it as the title
        } else if (error instanceof AxiosError && error.name === "AxiosError") {
          errorTitle = error?.response?.data || error.message;
        } else if (error instanceof Error) {
          errorDescription = error.message; // Standard Error object
        } else if (error && typeof error === "object") {
          // Handle objects (e.g., Axios errors)
          errorDescription = (error as any)?.message || JSON.stringify(error);
        }

        toast({
          title: errorTitle,
          description: errorDescription,
          variant: "destructive",
        });
      },
    });

  const StepComponent = steps[currentStep].component;

  const nextStep = async () => {
    const fieldsToValidate = getFieldsToValidate(currentStep);
    const isValid = await trigger(fieldsToValidate);
    console.log("Step:", currentStep, "Is Valid:", isValid);
    if (isValid) {
      if (currentStep === 1) {
        // Booking creation
        const isFullFormValid = await trigger();
        const data = watch();
        console.log({ isFullFormValid, data });
        if (isFullFormValid) {
          await handleSubmit(async (data) => {
            await onCreateBooking(data);
          })();
        }
      } else if (currentStep === 2) {
        // OTP verification
        const isFullFormValid = await trigger(); // Ensure OTP is valid
        if (isFullFormValid) {
          await handleSubmit(async (data) => {
            await onConfirmBooking(data);
          })();
        }
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      }
    } else {
      console.log("Validation errors for step:", errors);
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const onCreateBooking = async (data: FormValues) => {
    console.log("onCreateBooking triggered with data:", data);
    const selectedDate = data.date;

    // Parse time string (e.g., "09:00 AM" or "14:00")
    let hours: number, minutes: number;
    if (data.time.includes("AM") || data.time.includes("PM")) {
      const [timePart, period] = data.time.split(" ");
      [hours, minutes] = timePart.split(":").map(Number);
      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
    } else {
      [hours, minutes] = data.time.split(":").map(Number);
    }

    // Validate parsed values
    if (isNaN(hours) || isNaN(minutes)) {
      throw new Error("Invalid time format in data.time");
    }

    const startDate = new Date(selectedDate);
    startDate.setHours(hours, minutes);

    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);

    const bookingRequest: BookingRequest = {
      venueId: data.venueId as number,
      vendorIds: [...vendors?.map((vendor) => vendor?.vendorid) as number[]],
      bookingType: data.bookingType,
      bookingStartDate: startDate.toISOString(),
      bookingEndDate: endDate.toISOString(),
      visitorName: data.fullName,
      visitorEmail: data.email,
      visitorPhonenumber: data.phone,
      specialRequest: data.requests || "",
    };

    createBooking(bookingRequest);
  };

  const onConfirmBooking = (data: FormValues) => {
    if (!bookingResponse) {
      toast({
        title: "Error",
        description: "No booking found to confirm",
        variant: "destructive",
      });
      return;
    }

    const confirmRequest = {
      bookingId: bookingResponse.bookingId,
      trackingId: bookingResponse.trackingId,
      email: data.email,
      otp: parseInt(data.otp as string),
    };

    confirmBooking(confirmRequest);
  };

  const getFieldsToValidate = (step: number): (keyof FormValues)[] => {
    switch (step) {
      case 0:
        return ["date", "time"];
      case 1:
        return ["fullName", "email", "phone", "requests"];
      case 2:
        return ["otp"];
      default:
        return [];
    }
  };

  const handleFinalSubmit = () => {
    // Handle final form submission
    if (currentStep === 3) {
      reset();
      setCurrentStep(0);
      setIsDialogOpen(false);
      setBookingResponse(null);
    }
  };
  const isLoading = isBookingPending || isConfirmPending;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size={"lg"} className="w-full  mb-3 py-6 rounded-md">
          BOOK PACKAGE
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1089px]">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center z-50 rounded-lg">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium text-foreground">
                {currentStep === 1 ? "Creating your booking..." : "Verifying OTP..."}
              </p>
            </div>
          </div>
        )}
        <DialogHeader>
          <DialogTitle>{steps[currentStep].label}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80vh] md:h-[85vh] w-full p-4">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleFinalSubmit)} id="booking-form">
              {currentStep === 0|| currentStep === 1 ? (
                <StepComponent venueDetails={venueDetails} vendors={vendors} />
              ) : (
                <StepComponent />
              )}
            </form>
          </FormProvider>
        </ScrollArea>
        <DialogFooter className="flex justify-between">
          <div className="w-full flex justify-between gap-6 flex-wrap md:flex-nowrap">
            <ol className="flex max-w-xs items-center w-full">
              {steps.map((step, index) => (
                <li
                  key={step.id}
                  className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-primaryBlue after:border-4 after:inline-block ${
                    index === steps.length - 1 ? "after:hidden" : ""
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${
                      currentStep >= index
                        ? "bg-primaryBlue text-white"
                        : "bg-white border border-primaryBlue text-black"
                    }`}
                  >
                    {currentStep >= index ? <CheckIcon /> : step.id}
                  </span>
                </li>
              ))}
            </ol>
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button
                  onClick={prevStep}
                  className="bg-gray-500"
                  disabled={isBookingPending || isConfirmPending}
                >
                  <ChevronLeftIcon /> Back
                </Button>
              )}
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={nextStep}
                  className="bg-primaryBlue"
                  disabled={isBookingPending || isConfirmPending}
                >
                  {isBookingPending ? (
                    <div className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </div>
                  ) : (
                    <div className="flex items-center">
                      {" "}
                      Next <ChevronRightIcon className="ml-2" />
                    </div>
                  )}
                </Button>
              ) : (
                <Button
                  type="submit"
                  form="booking-form"
                  className="bg-primaryBlue"
                  disabled={isBookingPending || isConfirmPending}
                >
                  {isConfirmPending ? "Processing..." : "Finish"}
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
import { useMutation } from "@tanstack/react-query";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import AddDetailsForm from "./AddDetailsForm";
import BookingComplete from "./BookingComplete";
import BookingDataForm from "./BookingDataForm";
import OtpVerification from "./OtpVerification";

// API function to create a booking
const createBooking = async (bookingData: BookingRequest) => {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create booking");
  }

  return response.json();
};

// API request type
interface BookingRequest {
  venueId: number;
  vendorIds: number[];
  siteId: number;
  bookingType: string;
  bookingStartDate: string;
  bookingEndDate: string;
  visitorName: string;
  visitorEmail: string;
  visitorPhonenumber: string;
  specialRequest: string;
}

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
  otp: z.string().length(4, "OTP must be 4 digits"),
  // Adding hidden fields for API requirements
  venueId: z.number().default(0),
  vendorIds: z.array(z.number()).default([0]),
  siteId: z.number().default(0),
  bookingType: z.string().default("standard"),
});

type FormValues = z.infer<typeof formSchema>;

export function BookingModalPopup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      venueId: 0,
      vendorIds: [0],
      siteId: 0,
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

  // Create booking mutation
  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast({
        title: "Booking successful",
        description: "Your booking has been confirmed.",
      });
      // Reset form and close dialog after successful booking
      reset();
      setCurrentStep(0);
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Booking failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const StepComponent = steps[currentStep].component;

  const nextStep = async () => {
    const fieldsToValidate = getFieldsToValidate(currentStep);
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    } else {
      console.log("Validation errors:", errors);
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = (data: FormValues) => {
    // Convert form data to API request format
    const selectedDate = data.date;
    const [hours, minutes] = data.time.split(":").map(Number);

    // Create start date with selected time
    const startDate = new Date(selectedDate);
    startDate.setHours(hours, minutes);

    // Create end date (assuming 1 hour duration, adjust as needed)
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);

    // Prepare booking request
    const bookingRequest: BookingRequest = {
      venueId: data.venueId,
      vendorIds: data.vendorIds,
      siteId: data.siteId,
      bookingType: data.bookingType,
      bookingStartDate: startDate.toISOString(),
      bookingEndDate: endDate.toISOString(),
      visitorName: data.fullName,
      visitorEmail: data.email,
      visitorPhonenumber: data.phone,
      specialRequest: data.requests || "",
    };

    // Submit booking request
    bookingMutation.mutate(bookingRequest);
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

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-green-600 hover:bg-green-700 mb-3">
          BOOK PACKAGE
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1089px]">
        <DialogHeader>
          <DialogTitle>{steps[currentStep].label}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80vh] md:h-[85vh] w-full p-4">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} id="booking-form">
              <StepComponent />
              {bookingMutation.isPending && (
                <div className="text-center py-4">
                  <p>Processing your booking...</p>
                </div>
              )}
              {bookingMutation.isError && (
                <div className="text-red-500 py-4">
                  <p>Error: {bookingMutation.error.message}</p>
                </div>
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
                  disabled={bookingMutation.isPending}
                >
                  <ChevronLeftIcon /> Back
                </Button>
              )}
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={nextStep}
                  className="bg-primaryBlue"
                  disabled={bookingMutation.isPending}
                >
                  Next <ChevronRightIcon />
                </Button>
              ) : (
                <Button
                  type="submit"
                  form="booking-form"
                  className="bg-primaryBlue"
                  disabled={bookingMutation.isPending}
                >
                  {bookingMutation.isPending ? "Processing..." : "Finish"}
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
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
  venueId: z.number().default(0),
  vendorIds: z.array(z.number()).default([0]),
  siteId: z.number().default(0),
  bookingType: z.string().default("standard"),
});

type FormValues = z.infer<typeof formSchema>;

export function BookingModalPopup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookingResponse, setBookingResponse] = useState<BookingResponse | null>(null);

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
    onError: (error) => {
      toast({
        title: "Booking failed",
        description: error.message,
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
        toast({
          title: "Confirmation failed",
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
      if (currentStep === 1) {
        // Submit booking when moving from "Add Details" to "OTP Verification"
        handleSubmit(onCreateBooking)();
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      }
    } else {
      console.log("Validation errors:", errors);
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const onCreateBooking = (data: FormValues) => {
    const selectedDate = data.date;
    const [hours, minutes] = data.time.split(":").map(Number);

    const startDate = new Date(selectedDate);
    startDate.setHours(hours, minutes);

    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);

    const bookingRequest: BookingRequest = {
      venueId: data.venueId,
      vendorIds: data.vendorIds,
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
      otp: parseInt(data.otp),
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
    if (currentStep === 2) {
      handleSubmit(onConfirmBooking)();
    } else if (currentStep === 3) {
      reset();
      setCurrentStep(0);
      setIsDialogOpen(false);
      setBookingResponse(null);
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
            <form onSubmit={handleSubmit(handleFinalSubmit)} id="booking-form">
              <StepComponent  />
              {(isBookingPending || isConfirmPending) && (
                <div className="text-center py-4">
                  <p>Processing your request...</p>
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
                  Next <ChevronRightIcon />
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
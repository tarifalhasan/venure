"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CheckCircle2, Mail } from "lucide-react";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export function Newsletter() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const onSubmit = (data: FormData) => {
    // Here you would typically make an API call to subscribe
    console.log("Subscribing:", data.email);
    setIsDialogOpen(true);
    reset(); // Clear the form after successful submission
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          Stay Informed About Exclusive Venue Offers
        </h2>
        <p className="text-gray-600 text-lg">
          Subscribe to our newsletter and receive curated updates on premium venues,
          special promotions, and event planning insights directly to your inbox.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col sm:flex-row gap-3 max-w-lg mx-auto items-start"
        >
          <div className="w-full sm:flex-1 space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Enter your email address"
                className="pl-10 w-full rounded-md border-gray-300 "
                {...register("email")}
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-sm block text-left">
                {errors.email.message}
              </span>
            )}
          </div>
          <Button type="submit" className="rounded-md">
            Subscribe
          </Button>
        </form>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Subscription Confirmed
          </DialogTitle>
          <DialogDescription className="space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-gray-700 font-medium">Thank You for Subscribing!</p>
              <p className="text-gray-500">
                You’ve successfully joined our newsletter. Expect the latest venue deals
                and event planning tips delivered straight to your inbox.
              </p>
            </div>
          </DialogDescription>
          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <Button onClick={() => setIsDialogOpen(false)} className="rounded-md">
                Continue Browsing
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

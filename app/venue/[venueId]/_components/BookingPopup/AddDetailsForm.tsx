import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { VenueDetails } from "./VenueDetails";

import type { Vendor,VenueDetails as TypeVenueDetails } from "@/types/venue";
interface BookingModalPopupProps {
  venueDetails?: TypeVenueDetails;
  vendors?:Vendor[];
}
const AddDetailsForm = ({venueDetails,vendors}:BookingModalPopupProps) => {
  const { control, watch } = useFormContext();
  const selectedDate = watch("date");
  const selectedTime = watch("time");

  // const mockVenueDetails = {
  //   name: "GRAND BALLROOM @SHERATON",
  //   location: "Bangkok, Thailand",
  //   image: "",
  //   selectedDate: selectedDate ? selectedDate.toDateString() : "",
  //   selectedTime: selectedTime,
  //   vendors: [
  //     { role: "Event Planner", name: "DJ Sajan" },
  //     { role: "Service Provider Type", name: "Service Provider Name" },
  //     { role: "Catering", name: "DJ Sajan" },
  //     { role: "Catering", name: "DJ Sajan" },
  //     { role: "Catering", name: "DJ Sajan" },
  //   ],
  // };
  return (
    <div className="grid w-full h-full lg:grid-cols-2 gap-4">
      <div className="space-y-3">
        <p className="text-xs uppercase font-bold text-center lg:text-base py-5">
          Booking for Visitation
        </p>
        <div className="flex flex-col rounded-[12px] border border-black/15 p-6">
          <div className="flex items-center gap-2 font-medium text-sm text-black mb-6">
            <span className="w-5 h-5 rounded-full inline-flex items-center justify-center">
              <UserIcon />
            </span>
            Add Your Detail
          </div>

          <div className="space-y-4">
            <FormField
              control={control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="flex items-center h-10 w-full rounded-[8px] border border-input bg-background px-3 py-2 text-base ring-offset-background">
                      <PhoneInput
                        containerClass="!z-40 w-full"
                        buttonClass="!bg-transparent !border-none focus:!outline-none hover:!bg-[#ffff]"
                        inputClass="!w-full !bg-[#ffff] !border-none !text-black !text-base placeholder:!text-black"
                        country={"us"}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        searchPlaceholder="search"
                        autocompleteSearch
                        enableSearch
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="requests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any special requests?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-xs uppercase font-bold text-center lg:text-base py-5">
          Your Plan Visit Details
        </p>
        <div className="flex flex-col rounded-[12px] border border-black/15 p-6">
          <VenueDetails venueDetails={venueDetails} vendors={vendors} selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
};

export default AddDetailsForm;

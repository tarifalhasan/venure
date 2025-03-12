import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CalendarIcon as Calendar1Icon, Clock } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { VenueDetails } from "./VenueDetails";

const timeSlots = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
];

const BookingDataForm = () => {
  const { control, watch } = useFormContext();
  const selectedDate = watch("date");
  const selectedTime = watch("time");

  const mockVenueDetails = {
    name: "GRAND BALLROOM @SHERATON",
    location: "Bangkok, Thailand",
    image: "",
    selectedDate: selectedDate ? selectedDate.toDateString() : "",
    vendors: [
      { role: "Event Planner", name: "DJ Sajan" },
      { role: "Service Provider Type", name: "Service Provider Name" },
      { role: "Catering", name: "DJ Sajan" },
      { role: "Catering", name: "DJ Sajan" },
      { role: "Catering", name: "DJ Sajan" },
    ],
  };

  return (
    <div className="grid w-full h-full lg:grid-cols-2 gap-4">
      <div className="space-y-3">
        <p className="text-xs uppercase font-bold text-center lg:text-base py-5">
          Booking for Visitation
        </p>
        <div className="flex flex-col rounded-[12px] border border-black/15 p-6">
          <FormField
            control={control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Calendar1Icon className="h-4 w-4" />
                <FormControl>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    className="rounded-md h-[350px] flex justify-center w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="time"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Time</FormLabel>
                <Clock className="h-4 w-4" />
                <FormControl>
                  <div className="grid grid-cols-5 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant="outline"
                        className={`text-sm rounded-[8px] py-2 px-3 h-auto ${
                          field.value === time
                            ? "bg-primaryBlue text-white border-primaryBlue"
                            : ""
                        }`}
                        onClick={() => field.onChange(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-sm text-black text-center mt-4">
            All Times Are In (UTC + 07:00) Bangkok, Hanoi, Jakarta
          </p>
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-xs uppercase font-bold text-center lg:text-base py-5">
          Booking for Visitation
        </p>
        <div className="flex flex-col rounded-[12px] border border-black/15 p-6">
          <VenueDetails details={mockVenueDetails} />
        </div>
      </div>
    </div>
  );
};

export default BookingDataForm;

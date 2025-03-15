import { CalendarIcon, ClockIcon, MapPinIcon, UserIcon } from "lucide-react";

const BookingComplete = () => {
  return (
    <div className="h-[80vh] grid place-items-center">
      <div className="flex flex-col items-center gap-y-4 xl:gap-y-6">
        <div className="inline-flex bg-[#F2F2F2] px-4 py-2.5 rounded-xl items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={24}
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z"
              fill="#343A3F"
            />
            <path
              d="M18 8L10.5 15.51L7.5 12.51"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-lg font-medium text-[#343A3F]">
            Thank you for booking with us! You will get a confirmation email
            shortly.
          </span>
        </div>
        <p className="text-center text-lg text-[#9A9FA3] font-semibold">
          Upcoming Booking for (Name)
        </p>
        <p className="text-center text-xl xl:text-2xl text-[#343A3F] font-semibold">
          Site Visit
        </p>
        <div className="w-full">
          <p className="text-right text-sm text-foreground font-medium pb-3">
            Booking ID #00000000
          </p>
          <div className="border border-black/10 rounded-xl p-6 xl:p-8 flex flex-col gap-y-6">
            <div className="inline-flex items-center gap-3">
              <CalendarIcon />
              <span className="text-sm font-medium">
                Tuesday, Octorber 29, 2024
              </span>
            </div>
            <div className="inline-flex items-center gap-3">
              <ClockIcon />
              <span className="text-sm font-medium">16:00 - 17:00</span>
            </div>
            <div className="inline-flex items-center gap-3">
              <UserIcon />
              <span className="text-sm font-medium">Name</span>
            </div>
            <div className="inline-flex items-center gap-3">
              <MapPinIcon />
              <span className="text-sm font-medium">Location</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingComplete;

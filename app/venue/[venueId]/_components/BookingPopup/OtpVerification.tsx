import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useFormContext } from "react-hook-form";

const OtpVerification = () => {
  const { control } = useFormContext();

  return (
    <div className="h-[80vh] grid place-items-center">
      <div className="flex mx-auto max-w-xl flex-col items-center justify-center gap-3">
        <h3 className="text-center text-base uppercase xl:text-lg font-bold text-black">
          OTP Verification
        </h3>
        <p className="text-center py-4 text-sm font-bold">
          A 6-digit OTP verification code has been sent to your mobile number
          (+66 88 888 8888). Kindly fill it in within 120 seconds.
        </p>
        <FormField
          control={control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter OTP</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  onChange={(value) => field.onChange(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot className="w-14 h-16" index={0} />
                    <InputOTPSlot className="w-14 h-16" index={1} />
                    <InputOTPSlot className="w-14 h-16" index={2} />
                    <InputOTPSlot className="w-14 h-16" index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default OtpVerification;

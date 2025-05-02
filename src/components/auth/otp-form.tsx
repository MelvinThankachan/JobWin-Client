"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
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
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useState } from "react";
import useAuthStore from "@/stores/authStore";
import { Loader2 } from "lucide-react";
import { formatTime } from "@/lib/formatTime";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits." })
    .regex(/^\d{6}$/, { message: "OTP must contain only digits." }),
});

export default function OTPForm() {
  const { user, verificationToken, verifyOTPWithoutAuth, resendOTPWithoutAuth, isLoading } =
    useAuthStore();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleResendOTP = async () => {
    if (!user) {
      toast.error("User information not found. Please try logging in again.");
      navigate("/auth/login");
      return;
    }

    try {
      const response = await resendOTPWithoutAuth(user.email);

      if (response.expires_at) {
        const currentTime = Math.floor(Date.now() / 1000);
        setTimeLeft(response.expires_at - currentTime);
      }

      toast.success(response.message || "OTP sent successfully");
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      const errorMessage =
        error.response?.data?.otp ||
        error.response?.data?.detail ||
        error.message ||
        "Failed to send OTP. Please try again.";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const checkAndSendOTP = async () => {
      if (!user) return;
      
      const otpExpiry = useAuthStore.getState().otp?.expires_at;
      const currentTime = Math.floor(Date.now() / 1000);
      
      if (otpExpiry) {
        const remainingTime = Math.max(0, otpExpiry - currentTime);
        setTimeLeft(remainingTime);
        
        if (remainingTime <= 0) {
          try {
            const response = await resendOTPWithoutAuth(user.email);
            if (response.expires_at) {
              setTimeLeft(response.expires_at - currentTime);
            }
            toast.success("A new verification code has been sent to your email");
          } catch (error: any) {
            console.error("Auto resend OTP error:", error);

          }
        }
      } else {
        try {
          const response = await resendOTPWithoutAuth(user.email);
          if (response.expires_at) {
            setTimeLeft(response.expires_at - currentTime);
          }
          toast.success("A verification code has been sent to your email");
        } catch (error: any) {
          console.error("Auto resend OTP error:", error);
        }
      }
    };
    
    checkAndSendOTP();
  }, [user, resendOTPWithoutAuth]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast.error("User information not found. Please try logging in again.");
      navigate("/auth/login");
      return;
    }

    try {
      const numericOTP = parseInt(values.otp, 10);
      const response = await verifyOTPWithoutAuth(
        user.email,
        numericOTP.toString(),
        verificationToken
      );

      toast.success(response.message || "Email verified successfully!");

      const updatedUser = { ...user, is_verified: true };
      useAuthStore.getState().setUser(updatedUser);

      if (updatedUser.role === "candidate") {
        navigate("/candidate/dashboard");
      } else if (updatedUser.role === "employer") {
        navigate("/employer/dashboard");
      } else if (updatedUser.role === "admin") {
        navigate("/winadmin/dashboard");
      }
    } catch (error: any) {
      console.error("Verify OTP error:", error);
      const errorMessage =
        error.response?.data?.otp ||
        error.response?.data?.detail ||
        error.message ||
        "Invalid OTP. Please try again.";

      form.setError("otp", {
        type: "server",
        message: errorMessage,
      });

      toast.error(errorMessage);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-10"
          noValidate
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-center">
                <FormLabel className="">One Time Password</FormLabel>
                <FormControl>
                  <InputOTP
                    pattern={REGEXP_ONLY_DIGITS}
                    maxLength={6}
                    {...field}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
            Verify OTP
          </Button>
        </form>
      </Form>
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between mt-4">
        <p>
          {timeLeft > 0
            ? `OTP will expire in ${formatTime(timeLeft)}`
            : "OTP has expired."}
        </p>
        <Button
          onClick={handleResendOTP}
          disabled={timeLeft > 0 || isLoading}
          variant="link"
        >
          Resend OTP
        </Button>
      </div>
    </>
  );
}

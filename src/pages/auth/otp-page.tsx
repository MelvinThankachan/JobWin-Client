import OTPForm from "@/components/auth/otp-form";
import { H2 } from "@/components/ui/typography";
import { Link } from "react-router-dom";

const OTPPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <H2 className="text-center">Please check your email for OTP.</H2>

      <OTPForm />

      <div className="mt-4 text-foreground/50">
        <span className="text-primary hover:underline">
          <Link to="#">Resend OTP?</Link>
        </span>
      </div>
    </div>
  );
};

export default OTPPage;

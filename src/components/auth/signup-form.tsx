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
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import GoogleAuthButton from "./google-auth-button";

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address." }),
    password_1: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must contain at least one lowercase letter.",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Password must contain at least one number.",
      })
      .refine((password) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password), {
        message: "Password must contain at least one special character.",
      }),
    password_2: z.string().min(1, { message: "Please confirm your password." }),
    role: z.enum(["candidate", "employer"]),
  })
  .superRefine((data, ctx) => {
    if (data.password_1 !== data.password_2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must match.",
        path: ["password_2"],
      });
    }
  });

export default function SignupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password_1: "",
      password_2: "",
      role: "candidate",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      email: values.email,
      password: values.password_1,
      role: values.role,
    };

    try {
      const response = await useAuthStore.getState().signup(data);

      if (response) {
        toast.success(
          "Account created! Please verify your email with the OTP sent."
        );

        // Use window.location for a hard redirect to avoid React Router issues
        window.location.href = "/auth/otp";
        return;
      }
    } catch (error: any) {
      console.error("Signup error:", error);

      if (error.response?.status === 400 && error.response?.data) {
        const backendErrors = error.response.data;

        if (backendErrors.email) {
          form.setError("email", {
            type: "server",
            message: backendErrors.email[0],
          });
        }
        if (backendErrors.password) {
          form.setError("password_1", {
            type: "server",
            message: backendErrors.password[0],
          });
        }
        if (backendErrors.role) {
          form.setError("role", {
            type: "server",
            message: backendErrors.role[0],
          });
        }
      } else {
        // Handle network errors or other types of errors
        const errorMessage = error.message || "An unexpected error occurred";
        toast.error("Failed to sign up", {
          description: errorMessage,
        });
      }
    }
  }

  return (
    <>
      {form.watch("role") === "candidate" && <GoogleAuthButton />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-10"
          noValidate
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email."
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password_1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter your password."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password_2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter your password again."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Sign up as</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue="candidate"
                    className="flex"
                  >
                    {[
                      ["Candidate", "candidate"],
                      ["Employer", "employer"],
                    ].map((option, index) => (
                      <FormItem
                        className="flex items-center justify-center"
                        key={index}
                      >
                        <FormControl>
                          <RadioGroupItem value={option[1]} />
                        </FormControl>
                        <FormLabel className="font-base">{option[0]}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="flex gap-2 items-center justify-center"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>
      </Form>
    </>
  );
}

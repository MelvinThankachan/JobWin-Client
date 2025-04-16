import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import axiosInstance from "@/lib/axiosInstance";
// import { setUser } from "@/lib/set-user";
import { PasswordInput } from "@/components/ui/password-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { use, useEffect } from "react";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least one number",
    })
    .refine((password) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password), {
      message: "Password must contain at least one special character",
    }),
  role: z.enum(["candidate", "employer"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "candidate",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const tokens = useAuthStore((state) => state.tokens);
  const setUser = useAuthStore((state) => state.setUser);
  const setTokens = useAuthStore((state) => state.setTokens);

  async function onSubmit(values: FormValues) {
    const data = {
      email: values.email,
      password: values.password,
      role: values.role,
    };

    try {
      const response = await axiosInstance.post("/auth/login/", data);
      if (response.status === 200) {
        const { refresh, access, user } = response.data;
        setUser(user);
        setTokens({ refresh, access });
        toast.success("Login successful!", {
          description: "Welcome back, " + user.email + "!",
        });
        navigate("/");
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        const backendErrors = error.response.data;

        if (backendErrors.email) {
          form.setError("email", {
            type: "server",
            message: backendErrors.email[0],
          });
        }
        if (backendErrors.password) {
          form.setError("password", {
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
        toast.error("An unexpected error occurred. Please try again.", {
          description: error.message,
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="w-full flex flex-col gap-10"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter your password." {...field} />
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
              <FormLabel>Login as</FormLabel>
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

        <Button type="submit">
          {isLoading && <Loader2 />}
          Login
        </Button>
      </form>
    </Form>
  );
}

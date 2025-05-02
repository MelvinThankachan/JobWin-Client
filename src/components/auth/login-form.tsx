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
import { PasswordInput } from "@/components/ui/password-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import { useNavigate } from "react-router-dom";

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

  async function onSubmit(values: FormValues) {
    const data = {
      email: values.email,
      password: values.password,
      role: values.role,
    };

    try {
      const response = await useAuthStore.getState().login(data);
      
      if (response) {
        const { user, verification_token } = response;
        
        if (verification_token) {
          useAuthStore.getState().verificationToken = verification_token;
        }
        
        toast.success("Login successful!", {
          description: "Welcome back, " + user.email + "!",
        });
        
        if (!user.is_verified) {
          toast.info("Please verify your email before continuing.");
          navigate("/auth/otp");
          return;
        }
        
        if (user.role === "candidate") {
          navigate("/candidate/dashboard");
        } else if (user.role === "employer") {
          navigate("/employer/dashboard");
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.response?.status === 400 && error.response?.data) {
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
        const errorMessage = error.message || 'An unexpected error occurred';
        toast.error("Failed to log in", {
          description: errorMessage,
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

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { Card } from "@/components/ui/card";
import ForgotPassword from "../ForgotPassword";

/** Zod Schema */
const schema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

/** @type of formData */
type FormData = z.infer<typeof schema>;

/** @TODO : Intergrate API call */

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur", // this means when to run the validation | onBlur => validation run onfocus change or when user leaves the field
  });

  const onSubmit = (data: FormData) => {
    console.log("Submitted data: ", data);
  };

  return (
    <Card className="w-full max-w-sm">
      <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-full p-4">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Login to your Account</FieldLegend>
            <FieldDescription>
              Enter your email to login to your account
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="user-email">User Email</FieldLabel>
                <Input
                  {...form.register("email")}
                  id="user-email"
                  placeholder="Enter your email"
                  required
                />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
              </Field>
              <Field>
                <div className="flex justify-between items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InputGroupButton
                        variant="ghost"
                        aria-label="Info"
                        size="icon-xs"
                      >
                        <InfoIcon />
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Password must be at least 8 characters</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <InputGroup>
                  <InputGroupInput
                    {...form.register("password")}
                    placeholder="Enter password"
                    type={showPassword ? "text" : "password"}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  />
                  <InputGroupAddon align="inline-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <IoEyeOff className="h-4 w-4" />
                      ) : (
                        <IoEye className="h-4 w-4" />
                      )}
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription className="text-end text-blue-400">
                  <ForgotPassword />
                </FieldDescription>
                <FieldError>
                  {form.formState.errors.password?.message}
                </FieldError>
              </Field>
              <Field>
                <Button type="submit">Login</Button>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <Button variant="secondary">
              <FcGoogle />
              Google
            </Button>
          </FieldSet>
        </FieldGroup>
      </form>
    </Card>
  );
};

export default Login;

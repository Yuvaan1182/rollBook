import { Button } from "@/components/ui/button";
import {
  FieldError,
  FieldGroup,
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
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

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
      <CardHeader>
        <CardTitle>Login to your Account</CardTitle>
        <CardDescription>
          Enter your email to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="user-email">Email</Label>
                <Input
                  {...form.register("email")}
                  id="user-email"
                  placeholder="Enter your email"
                  required
                />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">
                    Password
                    <Tooltip>
                      <TooltipTrigger asChild className="-ml-2">
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
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-light underline-offset-4 hover:underline"
                  >
                    Forgot Password?
                  </Link>
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
                <FieldError>
                  {form.formState.errors.password?.message}
                </FieldError>
              </div>
            </div>
            <FieldSet>
              <Button type="submit">Login</Button>
            </FieldSet>
            <FieldSeparator />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="secondary">
          <FcGoogle />
          Google
        </Button>
        <CardAction>
          <Button variant="link">
            <Link to="/register">Signup</Link>
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
};

export default Login;

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
import { Controller, useForm } from "react-hook-form";
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
import { codes } from "country-calling-code";
import "react-phone-input-2/lib/style.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** Zod Schema */
const schema = z
  .object({
    name: z.string().min(2).max(100),
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
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    phone: z
      .string()
      .regex(/^\d{6,14}$/, "Invalid phone number format")
      .optional()
      .or(z.literal("")),
    countryCode: z.string().min(1).max(10).optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/** @type of formData */
type FormData = z.infer<typeof schema>;

/** @TODO : Intergrate API call */

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      countryCode: "91",
    },
    mode: "onBlur", // this means when to run the validation | onBlur => validation run onfocus change or when user leaves the field
  });

  // Get the sorted list of countries for the dropdown
  // We'll sort them by country name
  const countryList = codes.sort((a, b) => a.country.localeCompare(b.country));

  const onSubmit = (data: FormData) => {
    console.log("Submitted data: ", data);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create new Account</CardTitle>
        <CardDescription>
          Enter your details to create new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex flex-col gap-3">
              {/* Name field */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="user-name">Name</Label>
                <Input
                  {...form.register("name")}
                  id="user-name"
                  placeholder="Enter your name"
                  required
                />
                <FieldError>{form.formState.errors.name?.message}</FieldError>
              </div>

              {/* Email Field  */}
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

              {/* Password Field  */}
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

              {/* Confirm Password Field  */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                </div>
                <InputGroup>
                  <InputGroupInput
                    {...form.register("confirmPassword")}
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
                  {form.formState.errors.confirmPassword?.message}
                </FieldError>
              </div>

              {/* --- COUNTRY CODE FIELD --- */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="user-country-code">Country</Label>
                <Controller
                  name="countryCode"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="user-country-code">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryList.map((country) => (
                          <SelectItem
                            key={country.isoCode2}
                            value={country.countryCodes[0]} // e.g., "91"
                          >
                            {country.country} (+{country.countryCodes[0]})
                            <SelectSeparator />
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError>
                  {form.formState.errors.countryCode?.message}
                </FieldError>
              </div>

              {/* --- PHONE FIELD --- */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="user-phone">Phone</Label>
                <Input
                  {...form.register("phone")}
                  id="user-phone"
                  placeholder="Enter your phone number"
                />
                <FieldError>{form.formState.errors.phone?.message}</FieldError>
              </div>
            </div>
            <FieldSet>
              <Button type="submit">Register</Button>
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
            <Link to="/login">Login</Link>
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
};

export default Signup;

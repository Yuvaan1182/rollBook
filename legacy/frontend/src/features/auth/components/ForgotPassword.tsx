import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/** Zod Schema */
const schema = z.object({
  email: z.email("Invalid email address"),
});

/** @type of formData */
type FormData = z.infer<typeof schema>;

/** @TODO : Intergrate API call */

const ForgotPassword = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
    mode: "onBlur", // this means when to run the validation | onBlur => validation run onfocus change or when user leaves the field
  });

  const onSubmit = (data: FormData) => {
    console.log("Submitted data: ", data);
  };
  return (
    <Dialog>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button
            variant="link"
            className="text-secondary-foreground font-thin p-0"
          >
            forgot password?
          </Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/40 backdrop-blur-md" />
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Forgot Password?</DialogTitle>
              <DialogDescription>
                Enter your registered email here. Click submit when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
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
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </form>
    </Dialog>
  );
};

export default ForgotPassword;

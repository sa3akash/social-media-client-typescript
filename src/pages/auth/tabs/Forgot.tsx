import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { forgotSchema } from "@/lib/zodSchema";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useForgotMutation } from "@/store/rtk/auth/authSlice";
import CommonAlert from "@/components/common/CommonAlert";
import { CustomError } from "@/interfaces/auth.interface";

const Forgot = () => {
  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const [forgot, { isLoading, isSuccess, isError, error, data }] =
    useForgotMutation();

  const onForgot = async (values: z.infer<typeof forgotSchema>) => {
    forgot(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onForgot)}
        className="text-left space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-left">Email</FormLabel>
              <FormControl>
                <Input placeholder="sa2avroo@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={false} className="w-full">
          {isLoading ? (
            <span className="flex text-center gap-2">
              Email Sending...
              <Loader2 className="animate-spin" size={20} />
            </span>
          ) : (
            "Submit"
          )}
        </Button>
        {isError && (
          <CommonAlert
            type="error"
            message={(error as CustomError).data.message}
          />
        )}
        {isSuccess && <CommonAlert type="success" message={data.message} />}
      </form>
    </Form>
  );
};

export default Forgot;

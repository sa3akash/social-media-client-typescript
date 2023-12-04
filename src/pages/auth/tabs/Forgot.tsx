import CommonCard from "@/components/common/CommonCard";
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
import CommonAlert from "@/components/common/CommonAlert";

const Forgot = () => {
  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const onLogin = async (values: z.infer<typeof forgotSchema>) => {
    console.log(values);
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <CommonCard
        title="Recover Password"
        title2="Enter your Email and instructions will be sent to you!"
        type="FORGOT"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onLogin)}
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

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <span className="flex text-center gap-2">
                  Email Sending...
                  <Loader2 className="animate-spin" size={20} />
                </span>
              ) : (
                "Submit"
              )}
            </Button>
            <CommonAlert type="email" />
          </form>
        </Form>
      </CommonCard>
    </div>
  );
};

export default Forgot;

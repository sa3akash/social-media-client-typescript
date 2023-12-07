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
import { useMutation } from "react-query";
import { IForgotPassword } from "@/interfaces/auth.interface";
import { forgotFn } from "@/services/http";
import { useToast } from "@/components/ui/use-toast";

const Forgot = () => {
  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const { toast } = useToast();

  const mutation = useMutation((data: IForgotPassword) => forgotFn(data), {
    onSuccess: () => {
      form.reset();
      setTimeout(() => {
        mutation.reset();
      }, 2500);
    },
    onError: ({ response }) => {
      mutation.reset();
      toast({
        variant: "destructive",
        description: response.data.message || response.message,
      });
    },
  });

  const onLogin = async (values: z.infer<typeof forgotSchema>) => {
    mutation.mutate(values);
  };

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

            <Button
              type="submit"
              disabled={mutation.isLoading}
              className="w-full"
            >
              {mutation.isLoading ? (
                <span className="flex text-center gap-2">
                  Email Sending...
                  <Loader2 className="animate-spin" size={20} />
                </span>
              ) : (
                "Submit"
              )}
            </Button>
            {mutation.isSuccess && <CommonAlert type="email" />}
          </form>
        </Form>
      </CommonCard>
    </div>
  );
};

export default Forgot;

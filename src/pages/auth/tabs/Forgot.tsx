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
import { useToast } from "@/components/ui/use-toast";
import useMutationCustom from "@/hooks/useMutationCustom";
import { forgotFn } from "@/services/http";

const Forgot = () => {
  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });
  const { toast } = useToast();

  const mutation = useMutationCustom({
    mutationFn: forgotFn,
    onSuccess: ({ data }) => {
      toast({ title: data.message });
    },
  });

  const onForgot = async (values: z.infer<typeof forgotSchema>) => {
    mutation.mutate(values);
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
          {mutation.isPending ? (
            <span className="flex text-center gap-2">
              Email Sending...
              <Loader2 className="animate-spin" size={20} />
            </span>
          ) : (
            "Submit"
          )}
        </Button>
        {/* {form.formState.isSubmitSuccessful && <CommonAlert type="email" />} */}
      </form>
    </Form>
  );
};

export default Forgot;

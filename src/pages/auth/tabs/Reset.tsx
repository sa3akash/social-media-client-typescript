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
import { resetSchema } from "@/lib/zodSchema";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useMutationCustom from "@/hooks/useMutationCustom";
import { resetFn } from "@/services/http";

const Reset = () => {
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token") as string;

  const mutation = useMutationCustom({
    mutationFn: (data) => resetFn(token, data),
    onSuccess: () => {
      navigate("/feed");
    },
  });

  const onLogin = async (values: z.infer<typeof resetSchema>) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onLogin)}
        className="text-left space-y-4"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-left">Password</FormLabel>
              <FormControl>
                <Input placeholder="password min 6 characters" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-left">Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="confirm your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={mutation.isPending} className="w-full">
          {mutation.isPending ? (
            <span className="flex text-center gap-2">
              Submit...
              <Loader2 className="animate-spin" size={20} />
            </span>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Reset;

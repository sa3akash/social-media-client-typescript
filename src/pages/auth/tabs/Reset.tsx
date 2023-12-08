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
import { resetSchema } from "@/lib/zodSchema";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "@/services/http/api";

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

  const onLogin = async (values: z.infer<typeof resetSchema>) => {
    await api.resetCall(token, values);
    navigate("/feed");
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <CommonCard
        title="Reset your password."
        title2="Change your password and secure your social account!"
        type="FORGOT"
      >
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

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting ? (
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
      </CommonCard>
    </div>
  );
};

export default Reset;

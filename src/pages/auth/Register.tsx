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
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import { registerSchema } from "@/lib/zodSchema";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { registerFn } from "@/services/http";
import { setAuth } from "@/store/reducers/AuthReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import useMutationCustom from "@/hooks/useMutationCustom";

const Register = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      check: false,
    },
  });

  const dispatch: AppDispatch = useDispatch();

  const mutation = useMutationCustom({
    mutationFn: registerFn,
    onSuccess: ({ data }) => {
      dispatch(setAuth({ authId: data.user._id, ...data.user }));
    },
  });

  const onRegister = async (values: z.infer<typeof registerSchema>) => {
    const { check, ...others } = values;
    if (check) {
      mutation.mutate(others);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <CommonCard title="Register" title2="Create Your Account" type="REGISTER">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onRegister)}
            className="text-left space-y-4"
          >
            <div className="flex items-center gap-2 max-sm:flex-col w-full">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Shakil" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ahmed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
              name="check"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md pt-2 pb-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      By Signing Up i agree with{" "}
                      <span className=" hover:underline">
                        Teams & Condition
                      </span>
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full"
            >
              {mutation.isPending ? (
                <span className="flex text-center gap-2">
                  Register...
                  <Loader2 className="animate-spin" size={20} />
                </span>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>
      </CommonCard>
    </div>
  );
};

export default Register;

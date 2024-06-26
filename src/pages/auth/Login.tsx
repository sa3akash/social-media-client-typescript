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
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/zodSchema";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { PageURL } from "@/services/utils/pageUrl";
import { loginFn } from "@/services/http";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { setAuth } from "@/store/reducers/AuthReducer";
import { storeKey } from "@/services/utils/keys";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import useMutationCustom from "@/hooks/useMutationCustom";

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      check: false,
    },
  });

  const dispatch: AppDispatch = useDispatch();

  const [, setKeepLogin] = useLocalStorage(storeKey.KeepLogin);

  const mutation = useMutationCustom({
    mutationFn: loginFn,
    onSuccess: ({ data }) => {
      dispatch(setAuth({ authId: data.user._id, ...data.user }));
      setKeepLogin(form.getValues().check);
    },
  });

  const onLogin = (values: z.infer<typeof loginSchema>) => {
    mutation.mutate({
      email: values.email,
      password: values.password,
    });
  };

  return (
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-left">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password min 6 characters"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center">
          <FormField
            control={form.control}
            name="check"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md pt-2 pb-4 select-none">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Keep me signed in</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Link
            to={PageURL.Forgot}
            className="hover:underline text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" disabled={mutation.isPending} className="w-full">
          {mutation.isPending ? (
            <span className="flex text-center gap-2">
              Login...
              <Loader2 className="animate-spin" size={20} />
            </span>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Login;

{
  /* <div className="flex flex-col justify-center items-center h-full">
      <CommonCard
        title="Login"
        title2="Login into Your Social Network Account"
        type="LOGIN"
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-left">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password min 6 characters"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center">
              <FormField
                control={form.control}
                name="check"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md pt-2 pb-4 select-none">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Keep me signed in</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Link
                to={PageURL.Forgot}
                className="hover:underline text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full"
            >
              {mutation.isPending ? (
                <span className="flex text-center gap-2">
                  Login...
                  <Loader2 className="animate-spin" size={20} />
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </CommonCard>
    </div> */
}

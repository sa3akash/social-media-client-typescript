import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { IUserDoc } from "@/interfaces/auth.interface";
import { usernameSchema } from "@/lib/zodSchema";
import { checkUsername, updateUsername } from "@/services/http";
import { AppDispatch, RootState } from "@/store";
import { setAuth } from "@/store/reducers/AuthReducer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

type UsernameFormValues = z.infer<typeof usernameSchema>;

const UsernameForm = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch: AppDispatch = useDispatch();

  const defaultValues: Partial<UsernameFormValues> = {
    username: user?.username || "",
  };

  const form = useForm<UsernameFormValues>({
    resolver: zodResolver(usernameSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: UsernameFormValues) {
    if (data.username !== user?.username) {
      updateUsername(data)
        .then((res) => {
          toast({
            title: res.data.message,
          });
          const userSave = { ...user, username: data.username } as IUserDoc;
          dispatch(setAuth(userSave));
        })
        .catch((err) => {
          const message = err?.response?.data?.message;
          if (message) {
            toast({
              title: message,
              variant: "destructive",
            });
          }
        });
    }
  }

  const usernameValue = useDebounce(form.watch().username, 1000);

  useEffect(() => {
    if (usernameValue !== user?.username) {
      checkUsername(usernameValue)
        .then()
        .catch((err) => {
          const message = err?.response?.data?.message;
          if (message) {
            form.setError("username", {
              message: message,
            });
          }
        });
    }
  }, [form, user?.username, usernameValue]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder={field.value}
                  {...field}
                  disabled={form.formState.isLoading}
                />
              </FormControl>
              <FormDescription>
                This is your public display and unique username. It can be your
                real name or a pseudonym. You can only change this once every 30
                days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isLoading}>
          Update Username
        </Button>
      </form>
    </Form>
  );
};

const UsernameUpdate = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Username</h3>
        <p className="text-sm text-muted-foreground">
          Username must be unique.
        </p>
      </div>
      <Separator />
      <UsernameForm />
    </div>
  );
};

export default UsernameUpdate;

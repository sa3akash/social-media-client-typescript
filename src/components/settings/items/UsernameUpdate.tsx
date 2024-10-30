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
import { AppDispatch, RootState } from "@/store";
import { setAuth } from "@/store/reducers/AuthReducer";
import { useCheckUsernameQuery, useUpdateUsernameMutation } from "@/store/rtk/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

type UsernameFormValues = z.infer<typeof usernameSchema>;

type ResponseType = {
  data: {
    message: string
    username: string
  }
}

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

  const [updateUsername,{isLoading: updateLoading}] = useUpdateUsernameMutation()

  

  function onSubmit(data: UsernameFormValues) {
    if (data.username !== user?.username) {
      updateUsername(data.username).then((res)=>{        
        toast({
          title: (res as ResponseType).data.message,
        });
        const userSave = { ...user, username: (res as ResponseType).data.username } as IUserDoc;
        dispatch(setAuth(userSave));
      });
    }
  }

  const usernameValue = useDebounce(form.watch().username, 1000);
  const { isError, isSuccess, isLoading,data } =
    useCheckUsernameQuery(usernameValue);

  useEffect(() => {
    if (usernameValue !== user?.username) {
      if (isError) {
        form.setError("username", {
          message: "This username is already taken",
        });
      }
    }
  }, [form, isError, user?.username, usernameValue]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder={field.value}
                  {...field}
                  disabled={updateLoading}
                />
              </FormControl>
              {!fieldState.error && !isSuccess && (
                <FormDescription>
                  This is your public display and unique username. It can be
                  your real name or a pseudonym. You can only change this once
                  every 30 days.
                </FormDescription>
              )}
              {data && !fieldState.error && !isError && (
                <FormDescription>You can use this username.</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            isLoading ||
            !!form.formState.errors.username ||
            form.getValues().username === user?.username || updateLoading
          }
        >
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

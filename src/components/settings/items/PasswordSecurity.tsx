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
import useMutationCustom from "@/hooks/useMutationCustom";
import { passwordSchema } from "@/lib/zodSchema";
import { updatePassword } from "@/services/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type UsernameFormValues = z.infer<typeof passwordSchema>;

const PasswordForm = () => {
  const defaultValues: Partial<UsernameFormValues> = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm<UsernameFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues,
  });

  const mutation = useMutationCustom({
    mutationFn: updatePassword,
    onSuccess: (res) => {
      toast({
        title: res.data.message,
      });
    },
  });

  function onSubmit(data: UsernameFormValues) {
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="**********"
                  {...field}
                  disabled={mutation.isPending}
                />
              </FormControl>
              {!fieldState.error && (
                <FormDescription>Enter your current password.</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="**********"
                  {...field}
                  disabled={mutation.isPending}
                />
              </FormControl>
              {!fieldState.error && (
                <FormDescription>Choose a new password.</FormDescription>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="**********"
                  {...field}
                  disabled={mutation.isPending}
                />
              </FormControl>
              {!fieldState.error && (
                <FormDescription>Write new password again.</FormDescription>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <span className="flex items-center gap-1">
              <Loader2 className="w-5 animate-spin" /> <span>Loading...</span>
            </span>
          ) : (
            <span>Update Password</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

const PasswordSecurity = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Login & recovery</h3>
        <p className="text-sm text-muted-foreground">
          Manage your passwords, login preferences and recovery methods.
        </p>
      </div>
      <Separator />
      <PasswordForm />
    </div>
  );
};

export default PasswordSecurity;

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
import { passwordSchema } from "@/lib/zodSchema";
import { updatePassword } from "@/services/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type UsernameFormValues = z.infer<typeof passwordSchema>;

const PasswordForm = () => {
  const defaultValues: Partial<UsernameFormValues> = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  const [loading, setLoading] = useState(false);

  const form = useForm<UsernameFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues,
  });

  function onSubmit(data: UsernameFormValues) {
    setLoading(true);
    updatePassword(data)
      .then((res) => {
        toast({
          title: res.data.message,
        });
        form.reset();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        const message = err?.response?.data?.message;
        if (message) {
          toast({
            title: message,
            variant: "destructive",
          });
        }
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input
                  placeholder={field.value}
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormDescription>Enter your current password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  placeholder={field.value}
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormDescription>Choose a new password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder={field.value}
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormDescription>Write new password again.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? (
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

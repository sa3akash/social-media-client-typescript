import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import {
  useGetSettingsNotificationQuery,
  useUpdateNotificationSettionsMutation,
} from "@/store/rtk/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const notificationsFormSchema = z.object({
  messages: z.boolean(),
  reactions: z.boolean(),
  comments: z.boolean(),
  follows: z.boolean(),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;
// This can come from your database or API.
const defaultValues: Partial<NotificationsFormValues> = {
  messages: false,
  reactions: false,
  comments: false,
  follows: false,
};

const NotificationsForm = () => {
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  });

  const [updateNotificationSettions] = useUpdateNotificationSettionsMutation();
  const { data } = useGetSettingsNotificationQuery("");

  useEffect(() => {
    const noti = data?.notifications;
    if (noti) {
      form.setValue("comments", noti.comments);
      form.setValue("follows", noti.follows);
      form.setValue("messages", noti.messages);
      form.setValue("reactions", noti.reactions);
    }
  }, [data, form]);

  function onSubmit(data: NotificationsFormValues) {
    updateNotificationSettions(data);
    toast({
      title: "Notification settings updated successfully.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="messages"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Messages emails</FormLabel>
                <FormDescription>
                  Receive emails about your messages activity.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Comments emails</FormLabel>
                <FormDescription>
                  Receive emails about new products, features, and more.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reactions"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Social reactions emails
                </FormLabel>
                <FormDescription>
                  Receive emails for reactions and more.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="follows"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Follows emails</FormLabel>
                <FormDescription>
                  Receive emails about your account activity and security.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Update notifications</Button>
      </form>
    </Form>
  );
};

const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Email Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      <Separator />
      <NotificationsForm />
    </div>
  );
};

export default NotificationSettings;

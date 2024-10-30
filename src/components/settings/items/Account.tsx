import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsUtils } from "@/services/utils/settingsUtil";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  AccountFormValues,
  accountFormSchema,
  udateProfileValues,
} from "@/lib/zodSchema";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setAuth } from "@/store/reducers/AuthReducer";
import { IUserDoc } from "@/interfaces/auth.interface";
import {
  useGetUserQuery,
  useUpdateProfileInfoMutation,
} from "@/store/rtk/auth/authSlice";

const relationShipArray = [
  "Single",
  "In a relationship",
  "Married",
  "Divorced",
];

const Account = () => {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: udateProfileValues,
    mode: "onChange",
  });

  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const { data } = useGetUserQuery(user?.authId as string);

  const [updateProfileInfo, { isLoading }] = useUpdateProfileInfoMutation();

  function onSubmit(data: AccountFormValues) {
    updateProfileInfo(data).then((res) => {
      if ((res as { error: string }).error) {
        toast({
          variant: "destructive",
          title: "Profile not updated.",
        });
      } else {
        toast({
          title: "Profile updated successfully.",
        });
        const dataUpdated = {
          ...user,
          name: {
            first: form.getValues().firstName,
            last: form.getValues().lastName,
            nick: form.getValues().nickName,
          },
          quote: form.getValues().quote,
        } as IUserDoc;
        dispatch(setAuth(dataUpdated));
      }
    });
  }


  // Example usage
  const years = SettingsUtils.generateYearsArray();
  const monthsList = SettingsUtils.updateMonthsList();
  const daysList = SettingsUtils.updateDaysList(
    +form.watch().dobMonth,
    +form.watch().dobYear
  );

  useEffect(() => {
    if (data) {
      form.setValue("addCountry", data.address?.country);
      form.setValue("addLocal", data.address?.local);
      form.setValue("addStreet", data.address?.street);
      form.setValue("addZipcode", data.address?.zipcode);
      form.setValue("addcity", data.address?.city);
      form.setValue("school", data.school);
      form.setValue("website", data.website);
      form.setValue("work", data.work);
      form.setValue("gender", data.gender);
      form.setValue("dobDay", data.dob?.day);
      form.setValue("dobMonth", data.dob?.month);
      form.setValue("dobYear", data.dob?.year);
      form.setValue("firstName", data.name?.first);
      form.setValue("lastName", data.name?.last);
      form.setValue("nickName", data.name?.nick);
      form.setValue("quote", data.quote);
      form.setValue("relationShipType", data.relationShip?.type);
      form.setValue("relationShipPartner", data.relationShip?.partner);
      form.setValue("facebook", data.social?.facebook);
      form.setValue("instagram", data.social?.instagram);
      form.setValue("youtube", data.social?.youtube);
      form.setValue("twitter", data.social?.twitter);
    }
  }, [form, data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center gap-2 w-full">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nickName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nick Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input placeholder="Your bio title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2 w-full">
          <FormField
            control={form.control}
            name="dobYear"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Year</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={field.value ? field.value : "Select a year"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((value, index) => (
                      <SelectItem value={`${value}`} key={index}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dobMonth"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Month</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={field.value ? field.value : "Select a month"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {monthsList.map((value, index) => (
                      <SelectItem value={`${value}`} key={index}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dobDay"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Day</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={field.value ? field.value : "Select a day"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {daysList.map((value, index) => (
                      <SelectItem value={`${value}`} key={index}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-2 w-full">
          <FormField
            control={form.control}
            name="relationShipType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>RelationShip Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  // defaultValue={field.value}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a realationship" />
                  </SelectTrigger>
                  <SelectContent>
                    {relationShipArray.map((value, index) => (
                      <SelectItem value={`${value}`} key={index}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.getValues().relationShipType !== "Single" && (
            <FormField
              control={form.control}
              name="relationShipPartner"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>RelationShip Partner</FormLabel>

                  <Input {...field} placeholder="Enter partner username" />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center gap-6 space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="custom" />
                    </FormControl>
                    <FormLabel className="font-normal">Custom</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2 w-full">
          <FormField
            control={form.control}
            name="work"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Work</FormLabel>
                <Input {...field} placeholder="Write a work" />

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>School</FormLabel>
                <Input {...field} placeholder="Enter partner username" />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Portfolio website</FormLabel>
              <Input {...field} placeholder="Enter partner username" />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2 w-full">
          <FormField
            control={form.control}
            name="addCountry"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Country</FormLabel>
                <Input {...field} placeholder="Bangladesh" />

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addStreet"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>State</FormLabel>
                <Input {...field} placeholder="Mymenshingh" />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-2 w-full">
          <FormField
            control={form.control}
            name="addcity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>City</FormLabel>
                <Input {...field} placeholder="Sherpur" />

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addZipcode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Zip Code</FormLabel>
                <Input {...field} placeholder="2100" />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="addLocal"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Local Address</FormLabel>
              <Input
                {...field}
                placeholder="Indilpur, Sreebordi Sherpur, 2130"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Facebook Link</FormLabel>
              <Input {...field} placeholder="Facebook link" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="youtube"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Youtube Link</FormLabel>
              <Input {...field} placeholder="Youtube link" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Instagram Link</FormLabel>
              <Input {...field} placeholder="Instagram link" />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> Loading...
            </span>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </Form>
  );
};

const AccountMain = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <Account />
    </div>
  );
};

export default AccountMain;

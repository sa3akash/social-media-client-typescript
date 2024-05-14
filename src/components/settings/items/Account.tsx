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
import useMutationCustom from "@/hooks/useMutationCustom";
import { currentUser, updateProfileInfo } from "@/services/http";
import { Loader2 } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setAuth } from "@/store/reducers/AuthReducer";
import { IFullUserDoc, IUserDoc } from "@/interfaces/auth.interface";
import { SocketUtils } from "@/services/socket/socketUtils";

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

  const queryClient = useQueryClient();

  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const socketUtils = new SocketUtils(queryClient);

  const { data } = useQuery({
    queryKey: ["profile", user?.authId],
    queryFn: () => currentUser(user?.authId as string),
  });

  const mutation = useMutationCustom({
    mutationKey: ["updateInfo"],
    mutationFn: updateProfileInfo,
    onSuccess: () => {
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

      const fullUser = {
        ...data?.data,
        ...dataUpdated,
      } as unknown as IFullUserDoc;
      socketUtils.updateUserDetails({
        key: ["profile", user?.authId as string],
        mainData: fullUser,
        updateFeild: {},
      });
    },
  });

  function onSubmit(data: AccountFormValues) {
    mutation.mutate(data);
  }

  // Example usage
  const years = SettingsUtils.generateYearsArray();
  const monthsList = SettingsUtils.updateMonthsList();
  const daysList = SettingsUtils.updateDaysList(
    +form.watch().dobMonth,
    +form.watch().dobYear
  );

  useEffect(() => {
    const userData = data?.data;
    if (userData) {
      form.setValue("addCountry", userData.address?.country);
      form.setValue("addLocal", userData.address?.local);
      form.setValue("addStreet", userData.address?.street);
      form.setValue("addZipcode", userData.address?.zipcode);
      form.setValue("addcity", userData.address?.city);
      form.setValue("school", userData.school);
      form.setValue("website", userData.website);
      form.setValue("work", userData.work);
      form.setValue("gender", userData.gender);
      form.setValue("dobDay", userData.dob?.day);
      form.setValue("dobMonth", userData.dob?.month);
      form.setValue("dobYear", userData.dob?.year);
      form.setValue("firstName", userData.name?.first);
      form.setValue("lastName", userData.name?.last);
      form.setValue("nickName", userData.name?.nick);
      form.setValue("quote", userData.quote);
      form.setValue("relationShipType", userData.relationShip?.type);
      form.setValue("relationShipPartner", userData.relationShip?.partner);
      form.setValue("facebook", userData.social?.facebook);
      form.setValue("instagram", userData.social?.instagram);
      form.setValue("youtube", userData.social?.youtube);
      form.setValue("twitter", userData.social?.twitter);
    }
  }, [form, data?.data]);

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
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a year" />
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

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? (
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

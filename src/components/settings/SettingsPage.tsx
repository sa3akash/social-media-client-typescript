import { Separator } from "@/components/ui/separator";
import React from "react";
import SidebarNav from "./items/SidebarNav";
import NotificationSettings from "./items/NotificationSettings";
import { ScrollArea } from "../ui/scroll-area";
import ProfileFormMain from "./items/ProfileForm";
import AccountMain from "./items/Account";
import Apparence from "./items/Appearance";
import { useSearchParams } from "react-router-dom";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "profile",
  },
  {
    title: "Account",
    href: "account",
  },
  {
    title: "Appearance",
    href: "appearance",
  },
  {
    title: "Notifications",
    href: "notifications",
  },
];

interface ISettingsComponentsMap {
  profile: JSX.Element;
  account: JSX.Element;
  appearance: JSX.Element;
  notifications: JSX.Element;
}

const settingsComponentsMap: ISettingsComponentsMap = {
  profile: <ProfileFormMain />,
  account: <AccountMain />,
  appearance: <Apparence />,
  notifications: <NotificationSettings />,
};

const SettingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab");
  return (
    <div className="w-full h-full rounded-[0.5rem] border cardBG shadow">
      <div className=" space-y-6 p-10 pb-16  h-full">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>

          <div className="flex-1 w-full">
            <ScrollArea className="h-[640px] w-full">
              <div className="lg:max-w-2xl">{settingsComponentsMap[tab as keyof ISettingsComponentsMap]}</div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

import AccountMain from "@/components/settings/items/Account";
import Apparence from "@/components/settings/items/Appearance";
import NotificationSettings from "@/components/settings/items/NotificationSettings";
import ProfileFormMain from "@/components/settings/items/ProfileForm";
import { ISettingsComponentsMap } from "@/interfaces/settings.interface";

export const settingsComponentsMap: ISettingsComponentsMap = {
  profile: <ProfileFormMain />,
  account: <AccountMain />,
  appearance: <Apparence />,
  notifications: <NotificationSettings />,
};

export const sidebarNavItems = [
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

import AccountMain from "@/components/settings/items/Account";
import Apparence from "@/components/settings/items/Appearance";
import NotificationSettings from "@/components/settings/items/NotificationSettings";
import PasswordSecurity from "@/components/settings/items/PasswordSecurity";
import UsernameUpdate from "@/components/settings/items/UsernameUpdate";
import { ISettingsComponentsMap } from "@/interfaces/settings.interface";


export const settingsComponentsMap: ISettingsComponentsMap = {
  // profile: <ProfileFormMain />,
  account: <AccountMain />,
  appearance: <Apparence />,
  notifications: <NotificationSettings />,
  username: <UsernameUpdate />,
  security: <PasswordSecurity />,
};

export const sidebarNavItems = [
  {
    title: "Username",
    href: "username",
  },
  {
    title: "Account",
    href: "account",
  },
  {
    title: "Security",
    href: "security",
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

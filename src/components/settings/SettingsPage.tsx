import { Separator } from "@/components/ui/separator";
import SidebarNav from "@/components/settings/items/SidebarNav";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useSearchParams } from "react-router-dom";
import { settingsComponentsMap, sidebarNavItems } from "@/data/SettingsData";
import { ISettingsComponentsMap } from "@/interfaces/settings.interface";

const SettingsPage = () => {
  const [searchParams] = useSearchParams();

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
              <div className="lg:max-w-2xl">
                {settingsComponentsMap[tab as keyof ISettingsComponentsMap]}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

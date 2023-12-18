import { ScrollArea } from "@/components/ui/scroll-area";
import { notificatonData } from "@/data/NotificatonData";
import SingleNotificaton from "./SingleNotificaton";
import { cn } from "@/lib/utils";
import { INotification } from "@/interfaces/notificaton.interface";

const NotificationDrop = () => {
  return (
    <div
      className={cn(
        "fixed w-[340px] h-[calc(100%-80px)] top-[80px] right-0 bg-background z-10"
      )}
    >
      <ScrollArea className="h-full w-full flex">
        {notificatonData.map((item: INotification, index: number) => (
          <SingleNotificaton key={index} item={item} />
        ))}
      </ScrollArea>
    </div>
  );
};

export default NotificationDrop;

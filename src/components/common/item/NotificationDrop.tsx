import { ScrollArea } from "@/components/ui/scroll-area";
import SingleNotificaton from "@/components/common/item/SingleNotificaton";
import { cn } from "@/lib/utils";
import { INotification } from "@/interfaces/notificaton.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotificationDrop = () => {
  const { notifications } = useSelector(
    (state: RootState) => state.notification
  );

  return (
    <div
      className={cn(
        "fixed max-w-[340px] w-[95%] h-[calc(100%-80px)] top-[80px] right-0 bg-background z-10 transition-all md:border-l"
      )}
    >
      <ScrollArea className="h-full w-full flex">
        <h3 className="p-4 cardBG text-[#92929D] font-semibold text-[14px] tracking-[1px]">
          Notifications
        </h3>
        {notifications?.map((item: INotification, index: number) =>
          notifications.length === index + 1 ? (
            <SingleNotificaton key={index} item={item} />
          ) : (
            <SingleNotificaton key={index} item={item} />
          )
        )}

        <Link
          to="/notifications"
          className={cn(buttonVariants(), "w-full h-12")}
        >
          See more
        </Link>
      </ScrollArea>
    </div>
  );
};

export default NotificationDrop;

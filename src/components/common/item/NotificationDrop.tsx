import { ScrollArea } from "@/components/ui/scroll-area";
import SingleNotificaton from "@/components/common/item/SingleNotificaton";
import { cn } from "@/lib/utils";
import { INotification } from "@/interfaces/notificaton.interface";
import { useDispatch, useSelector } from "react-redux";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { AppDispatch, RootState } from "@/store";
import { Loader2 } from "lucide-react";
import { setNotification } from "@/store/reducers/NotificationReducer";

const NotificationDrop = () => {
  const { notifications } = useSelector(
    (store: RootState) => store.notification
  );
  const dispatch: AppDispatch = useDispatch();

  const { lastElementRef, loading } = useInfiniteScroll(
    "/notifications",
    (data: { notifications: INotification[] }) => {
      dispatch(
        setNotification({
          notifications: data?.notifications as INotification[],
        })
      );
    }
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
            <SingleNotificaton key={index} item={item} ref={lastElementRef} />
          ) : (
            <SingleNotificaton key={index} item={item} />
          )
        )}
        {loading && (
          <p className="p-4 flex items-center justify-center">
            <Loader2 className="animate-spin w-6 h-6" />
          </p>
        )}
        {notifications.length === 0 && (
          <p className="p-4 flex items-center justify-center">Not found!</p>
        )}
      </ScrollArea>
    </div>
  );
};

export default NotificationDrop;

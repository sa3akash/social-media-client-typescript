import { INotification } from "@/interfaces/notificaton.interface";
import SingleNotificaton from "@/components/notificaton/SingleNotificaton";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import NotificationSkeleton from "@/components/notificaton/skeleton/NotificationSkeleton";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Loader2 } from "lucide-react";

const NotificatonPage = () => {
  const { notifications, loading: initialLoad } = useSelector(
    (store: RootState) => store.notification
  );

  const { lastElementRef, loading } = useInfiniteScroll("/notifications");

  return initialLoad ? (
    <NotificationSkeleton />
  ) : (
    <>
      <div className="hidden md:block md:text-[18px] mb-2 font-semibold xl:text-[24px] leading-9 tracking-[0.1px]">
        Notifications
      </div>

      <div className="flex flex-col gap-2 pb-2">
        {notifications?.map((item: INotification, index: number) => {
          if (notifications.length === index + 1) {
            return (
              <div ref={lastElementRef} id="ref" key={index}>
                <SingleNotificaton key={index} item={item} />
              </div>
            );
          } else {
            return <SingleNotificaton key={index} item={item} />;
          }
        })}
        {loading && (
          <p className="p-4 flex items-center justify-center">
            <Loader2 className="animate-spin w-6 h-6" />
          </p>
        )}
      </div>
    </>
  );
};

export default NotificatonPage;

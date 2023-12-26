import { INotification } from "@/interfaces/notificaton.interface";
import SingleNotificaton from "@/components/notificaton/SingleNotificaton";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import NotificationSkeleton from "@/components/notificaton/skeleton/NotificationSkeleton";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { ListChecks, Loader2 } from "lucide-react";

const NotificatonPage = () => {
  const { notifications, loading: initialLoad } = useSelector(
    (store: RootState) => store.notification
  );

  const { lastElementRef, loading } = useInfiniteScroll("/notifications");

  return initialLoad ? (
    <NotificationSkeleton />
  ) : (
    <>
      <div className="md:text-[18px] mb-2 px-4 md:px-0 font-semibold xl:text-[24px] leading-9 tracking-[0.1px] flex items-center justify-between">
        <div>Notifications</div>
        <button className="cardBG dark:hover:bg-[#292932] hover:bg-[#dedede] px-8 py-1 rounded-md flex items-center gap-2 text-[14px] transition-all select-none"><ListChecks /> Mark all read</button>
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
         {notifications.length === 0 && (
          <p className="p-4 flex items-center justify-center">
            Not found!
          </p>
        )}
      </div>
    </>
  );
};

export default NotificatonPage;

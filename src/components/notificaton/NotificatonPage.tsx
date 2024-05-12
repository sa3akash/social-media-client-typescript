import { INotification } from "@/interfaces/notificaton.interface";
import SingleNotificaton from "@/components/notificaton/SingleNotificaton";
import NotificationSkeleton from "@/components/notificaton/skeleton/NotificationSkeleton";
import { ListChecks, Loader2 } from "lucide-react";
import useReactInfiniteScroll from "@/hooks/ReactQueryInfiniteScroll";
import api from "@/services/http";

const NotificatonPage = () => {
  const { data, lastElementRef, loading } = useReactInfiniteScroll({
    baseURL: "notifications",
    fn: async ({ pageParam = 1 }) => {
      const response = await api.get(`/notifications?page=${pageParam}`);
      return response.data;
    },
  });

  if (!data) {
    return <NotificationSkeleton />;
  }

  const mainData = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.notifications];
  }, []);

  return (
    <>
      <div className="md:text-[18px] mb-2 px-4 md:px-0 font-semibold xl:text-[24px] leading-9 tracking-[0.1px] flex items-center justify-between">
        <div>Notifications</div>
        <button className="cardBG dark:hover:bg-[#292932] hover:bg-[#dedede] px-8 py-1 rounded-md flex items-center gap-2 text-[14px] transition-all select-none">
          <ListChecks /> Mark all read
        </button>
      </div>

      <div className="flex flex-col gap-2 pb-2">
        {mainData?.map((item: INotification, index: number) =>
          mainData.length === index + 1 ? (
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
        {mainData.length === 0 && (
          <p className="p-4 flex items-center justify-center">Not found!</p>
        )}
      </div>
    </>
  );
};

export default NotificatonPage;

import { notificatonData } from "@/data/NotificatonData";
import { INotification } from "@/interfaces/notificaton.interface";
import SingleNotificaton from "@/components/notificaton/SingleNotificaton";

const NotificatonPage = () => {
  return (
    <>
      <div className="hidden md:block md:text-[18px] mb-2 font-semibold xl:text-[24px] leading-9 tracking-[0.1px]">
        Notifications
      </div>

      <div className="flex flex-col gap-2">
        {notificatonData.map((item: INotification, index: number) => (
          <SingleNotificaton key={index} item={item} />
        ))}
      </div>
    </>
  );
};

export default NotificatonPage;

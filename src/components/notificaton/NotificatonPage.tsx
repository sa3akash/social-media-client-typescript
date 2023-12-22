import { INotification } from "@/interfaces/notificaton.interface";
import SingleNotificaton from "@/components/notificaton/SingleNotificaton";
import useEffectOnce from "@/hooks/useEffectOnece";
import { api } from "@/services/http/api";
import { useState } from "react";

const NotificatonPage = () => {

  const [notificationData,setNotificationData] = useState<INotification[]>()

  useEffectOnce(async () => {
    const notifications = await api.getNotifications(1);
    setNotificationData(notifications?.notifications);
  });

  console.log(notificationData)

  return (
    <>
      <div className="hidden md:block md:text-[18px] mb-2 font-semibold xl:text-[24px] leading-9 tracking-[0.1px]">
        Notifications
      </div>

      <div className="flex flex-col gap-2">
        {notificationData?.map((item: INotification, index: number) => (
          <SingleNotificaton key={index} item={item} />
        ))}
      </div>
    </>
  );
};

export default NotificatonPage;

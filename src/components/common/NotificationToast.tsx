import React from "react";
import UserAvater from "@/components/common/UserAvater";
import { INotification } from "@/interfaces/notificaton.interface";
import { cn } from "@/lib/utils";
import { notificationIconMap } from "@/services/utils/map";
import { timeAgo } from "@/services/utils/timeAgo";

interface Props {
  notification: INotification;
}

const NotificationToast: React.FC<Props> = ({ notification }) => {
  const read = notification.read;
  const creator = notification.creator;

  const type = notification.notificationType;

  const fullName =
    notification.creator.name.first + " " + notification.creator.name.last;
  return (
    <div className="flex items-center justify-between bg-background rounded-sm p-4 gap-3 cursor-pointer transition-all">
      <div className="h-full flex flex-col gap-2 items-center">
        <div className="">
          <UserAvater
            name={creator.name}
            src={creator.profilePicture}
            avatarColor={creator.avatarColor}
            className="border-[2px]"
            style={{ borderColor: creator.avatarColor }}
          />
        </div>
        <img src={notificationIconMap[type]} alt="" width={25} />
      </div>
      <div className="flex-1">
        {type === "comment" ? (
          <span className="text-sm">
            <strong className="capitalize">{fullName}</strong> comment your
            post: “{notification.message}”
          </span>
        ) : type === "community" ? (
          <span className="text-sm">
            <strong className="capitalize">{fullName}</strong> posted in{" "}
            <strong>{notification.communityName}</strong> : “
            {notification.message}”
          </span>
        ) : type === "follow" ? (
          <span className="text-sm">
            <strong className="capitalize">{fullName}</strong> “{notification.message}”
          </span>
        ) : (
          <span className="text-sm">
            <strong className="capitalize">{fullName}</strong> react your
            article that you&apos;ve post. “{notification.message}”
          </span>
        )}

        <div className="roboto text-sm text-[#92929D] tracking-[0.1px]">
          {timeAgo.transform(notification.createdAt)}
        </div>
      </div>
      <div className="">
        <div
          className={cn(
            "w-4 h-4 border-rose-400 border-[2px] rounded-full",
            read ? "" : "bg-green-400"
          )}
        />
      </div>
    </div>
  );
};

export default NotificationToast;

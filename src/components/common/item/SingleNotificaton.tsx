import { INotification } from "@/interfaces/notificaton.interface";
import React from "react";
import { Link } from "react-router-dom";
import MoreIcon from "@/assets/images/ic_More_3_dot.svg";

import { cn } from "@/lib/utils";
import UserAvater from "@/components/common/UserAvater";
import { markAsReadNotification } from "@/services/http";
import NotificationModel from "@/components/notificaton/NotificationModel";
import { timeAgo } from "@/services/utils/timeAgo";
import { notificationIconMap } from "@/services/utils/map";

interface Props {
  item: INotification;
}

const SingleNotificaton: React.FC<Props> = ({ item }) => {
  const handleNotification = () => {
    markAsReadNotification(item._id);
  };

  return (
    <div
      className={cn(
        "relative flex justify-between border gap-2 p-4 rounded-none w-full cursor-pointer hover:bg-[#3d3d4a]",
        item.read ? "cardBG" : "bg-[#292932]"
      )}
      onClick={handleNotification}
    >
      <div
        className={cn(
          "hidden w-2 h-2 rounded-full bg-green-400 absolute top-0 left-0 bottom-0 my-auto",
          !item.read && "block"
        )}
      />

      <div className="flex flex-col items-center justify-start gap-2">
        <UserAvater
          src={item.creator?.profilePicture}
          name={item.creator.name}
          className="w-[36px] h-[36px]"
          avatarColor={item.creator?.avatarColor}
        />

        <img
          src={notificationIconMap[item.notificationType]}
          alt=""
          className="w-6 h-6 object-contain"
        />
      </div>
      <div className="flex-1 flex flex-col h-full w-full">
        <div className="flex-1 text-[14px] leading-6 flex ">
          {item.notificationType === "comment" ? (
            <span>
              <Link
                to={`/u/${item?.creator?._id}`}
                className="capitalize font-semibold mr-1"
              >{`${item.creator!.name!.first} ${
                item.creator!.name!.last
              }`}</Link>
              commented your post : “{item.message}”
            </span>
          ) : item.notificationType === "community" ? (
            <span>
              <Link
                to={`/u/${item?.creator?._id}`}
                className="capitalize font-semibold mr-1"
              >{`${item.creator!.name!.first} ${
                item.creator!.name!.last
              }`}</Link>
              posted in
              <Link
                to={`/group/${item?.creator?._id}`}
                className="capitalize font-semibold mr-1 ml-1"
              >
                {item!.communityName}
              </Link>{" "}
              : “{item.message}”
            </span>
          ) : (
            <span>
              <Link
                to={`/u/${item?.creator?._id}`}
                className="capitalize font-semibold mr-1"
              >{`${item.creator!.name!.first} ${
                item.creator!.name!.last
              }`}</Link>
              react your post : “{item.message}”
            </span>
          )}
        </div>
        <span className="text-[14px] text-[#92929D]">{timeAgo.transform(item?.createdAt)}</span>
      </div>
      <NotificationModel id={item?._id}>
        <div className="flex items-center gap-4">
          <img src={MoreIcon} alt="icon" />
        </div>
      </NotificationModel>
    </div>
  );
};

export default SingleNotificaton;

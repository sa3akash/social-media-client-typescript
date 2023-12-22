import { INotification } from "@/interfaces/notificaton.interface";
import React from "react";
import UserAvater from "../common/UserAvater";
import { Link } from "react-router-dom";
import MoreIcon from "@/assets/images/ic_More_3_dot.svg";

import { cn } from "@/lib/utils";
import { notificationIconMap } from "@/data/NotificatonData";

interface Props {
  item: INotification;
  ref?: React.RefObject<HTMLDivElement> | undefined;
}

const SingleNotificaton: React.FC<Props> = ({ item,ref }) => {
  return (
    <div
      className={cn(
        "relative flex justify-between gap-2 p-4 rounded-none md:rounded-lg w-full cursor-pointer hover:bg-[#292932]",
        item.read ? "bg-[#292932]" :"bg-[#1C1C24]"
      )}
      ref={ref}
    >
      <div className={cn("hidden w-1 h-full bg-green-400 absolute top-0 left-0",
      !item.read && 'block')}/>
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
          className="w-6 h-6 object-contain md:hidden"
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
        <span className="text-[14px] text-[#92929D]">12 Minutes ago</span>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={notificationIconMap[item.notificationType]}
          alt="icon"
          className="w-6 h-6 object-contain hidden md:block"
        />
        <img src={MoreIcon} alt="icon" />
      </div>
    </div>
  );
};

export default SingleNotificaton;
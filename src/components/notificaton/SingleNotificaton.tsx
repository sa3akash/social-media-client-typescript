import { INotification } from "@/interfaces/notificaton.interface";
import { forwardRef } from "react";
import UserAvater from "@/components/common/UserAvater";
import { Link } from "react-router-dom";
import MoreIcon from "@/assets/images/ic_More_3_dot.svg";

import { cn } from "@/lib/utils";
import { markAsReadNotification } from "@/services/http";
import NotificationModel from "@/components/notificaton/NotificationModel";
import { timeAgo } from "@/services/utils/timeAgo";
import { notificationIconMap } from "@/services/utils/map";
import useMutationCustom from "@/hooks/useMutationCustom";

interface Props {
  item: INotification;
}

const SingleNotificaton = forwardRef(
  ({ item }: Props, ref: React.LegacyRef<HTMLDivElement>) => {

    const mutation = useMutationCustom({
      mutationFn: markAsReadNotification,
    })

    const handleNotification = () => {
      mutation.mutate(item._id)
    };

    return (
      <div
        className={cn(
          "cardBG relative flex justify-between gap-2 p-4 rounded-none md:rounded-lg w-full cursor-pointer dark:hover:bg-[#292932] hover:bg-[#dedede]",
          item.read ? " dark:bg-[#292932]" : "bg-[#e8e8e8] dark:bg-[#1C1C24]"
        )}
        ref={ref}
        onClick={handleNotification}
      >
        <div
          className={cn(
            "hidden w-2 h-2 rounded-full bottom-0 my-auto md:h-full md:w-1 md:rounded-none bg-green-400 absolute top-0 left-1 md:left-0",
            !item.read && "block"
          )}
        />
        <div className="flex flex-col items-center justify-start gap-2">
          <UserAvater
            src={item.creator?.profilePicture}
            name={item.creator.name}
            className="w-[36px] h-[36px]"
            avatarColor={item.creator?.avatarColor}
            authId={item?.creator.authId}
            indicator="hidden"
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
                  to={`/u/${item?.creator?.authId}`}
                  className="capitalize font-semibold mr-1"
                >{`${item.creator!.name!.first} ${
                  item.creator!.name!.last
                }`}</Link>
                commented your post : “{item.message}”
              </span>
            ) : item.notificationType === "community" ? (
              <span>
                <Link
                  to={`/u/${item?.creator?.authId}`}
                  className="capitalize font-semibold mr-1"
                >{`${item.creator!.name!.first} ${
                  item.creator!.name!.last
                }`}</Link>
                posted in
                <Link
                  to={`/group/${item?.creator?.authId}`}
                  className="capitalize font-semibold mr-1 ml-1"
                >
                  {item!.communityName}
                </Link>{" "}
                : “{item.message}”
              </span>
            ) : (
              <span>
                <Link
                  to={`/u/${item?.creator?.authId}`}
                  className="capitalize font-semibold mr-1"
                >{`${item.creator!.name!.first} ${
                  item.creator!.name!.last
                }`}</Link>
                react your post : “{item.message}”
              </span>
            )}
          </div>
          <span className="text-[14px] text-[#92929D]">
            {timeAgo.transform(item?.createdAt)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={notificationIconMap[item.notificationType]}
            alt="icon"
            className="w-6 h-6 object-contain hidden md:block"
          />
          <NotificationModel id={item?._id}>
            <img src={MoreIcon} alt="icon" />
          </NotificationModel>
        </div>
      </div>
    );
  }
);

export default SingleNotificaton;

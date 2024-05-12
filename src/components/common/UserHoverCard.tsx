import React from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, LucideIcon } from "lucide-react";
import { Utils } from "@/services/utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { timeAgo } from "@/services/utils/timeAgo";
import { FollowButton } from "@/components/common/FollowButton";
import { cn } from "@/lib/utils";
import { IFollowerDoc } from "@/interfaces/auth.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { followUserFn } from "@/services/http";
import useMutationCustom from "@/hooks/useMutationCustom";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  item: IFollowerDoc;
  className?: string;
}

const UserHoverCard: React.FC<Props> = ({ item, className }) => {
  const { following, user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutationCustom({
    mutationFn: followUserFn,
    onSuccess: () => {
      const sujestedUserCache = queryClient.getQueryData([
        "sujestedFriends",
      ]) as IFollowerDoc[];

      const filter = [...sujestedUserCache].filter((i) => i._id !== item._id);
      queryClient.setQueryData(["sujestedFriends"], filter);
    },
  });

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          variant="link"
          className={cn("font-semibold text-[18px] capitalize p-0", className)}
          onClick={() => navigate(`/u/${item._id}`)}
        >
          {item?.name.first} {item?.name.last}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-96 cardBG">
        <div className="flex justify-between space-x-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={item?.profilePicture} />
            <AvatarFallback
              style={{ backgroundColor: `${item?.avatarColor}` }}
              className="font-bold border-[4px] border-white"
            >
              {Utils.getAvaterName(
                item?.name?.first as string,
                item?.name?.last as string
              )}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="">
              <Link
                to={`/u/${item._id}`}
                className="font-semibold text-[18px] capitalize"
              >
                {item?.name.first} {item?.name.last}
              </Link>
              <p className="text-sm tracking-[0.1px] text-[#696974]">
                @{item?.username}
              </p>
            </div>
            <p className="text-sm">
              {item?.quote ||
                "“Pushing pixels and experiences in digital products for Sebostudio”"}
            </p>
            {/* <SingleItem
              text={`Lives in ${user?.address.city}, ${user?.address.country}`}
              Icon={HomeIcon}
            /> */}
            {/* <SingleItem
              text={
                (user?.relationShip.partner
                  ? `${user?.relationShip.type} with ${user?.relationShip.partner}`
                  : user?.relationShip.type) as string
              }
              Icon={HeartIcon}
            /> */}

            <SingleItem
              text={`Joined ${timeAgo.monthAndYear(item?.createdAt as string)}`}
              Icon={CalendarIcon}
            />
          </div>
        </div>

        <div
          className={cn(
            "flex items-center justify-center gap-2 mt-4",
            user?.authId === item._id ? "hidden" : "flex"
          )}
        >
          <FollowButton
            active={true}
            text={
              following.some((id) => id === item._id) ? "Following" : "Follow"
            }
            className="w-full"
            fn={() => {
              mutation.mutate(item._id);
            }}
          />
          <FollowButton
            active={false}
            text="Message"
            className="w-full bg-transparent"
          />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserHoverCard;

const SingleItem = ({ Icon, text }: { Icon: LucideIcon; text: string }) => {
  return (
    <div className="flex items-center pt-2">
      <Icon className="mr-2 h-4 w-4 opacity-70" />
      <span className="text-xs text-muted-foreground capitalize">{text}</span>
    </div>
  );
};

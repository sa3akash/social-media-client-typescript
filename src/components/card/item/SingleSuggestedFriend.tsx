import UserAvater from "@/components/common/UserAvater";
import { Button } from "@/components/ui/button";
import { IFollowerDoc } from "@/interfaces/auth.interface";
import { useFollowUserMutation } from "@/store/rtk/friends/friendsSlice";
import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  item: IFollowerDoc;
}

const SingleSuggestedFriend: FC<Props> = ({ item }) => {

  const [followUser] = useFollowUserMutation();


  const followUserHandle = () => {
    followUser(item._id);
  };

  return (
    <div className="w-full flex items-center gap-4 justify-between mr-2">
      <div className="flex items-center gap-2">
        <UserAvater
          src={item.profilePicture}
          name={item.name}
          className="w-10 md:w-12 md:h-12 h-10 border-[2px]"
          avatarColor={item.avatarColor}
          authId={item._id}
          style={{ border: `2px solid ${item.avatarColor}` }}
        />
        <Link to={`/u/${item._id}`} className="flex flex-col">
          <span className="text-[14px] tracking-[0.2px] capitalize">{`${item.name.first} ${item.name.last}`}</span>
          <span className="text-[12px] text-[#696974]">@{item.username}</span>
        </Link>
      </div>
      <Button
        onClick={followUserHandle}
        className="h-8 capitalize font-semibold text-[14px] bg-green-400"
      >
        follow
      </Button>
    </div>
  );
};

export default SingleSuggestedFriend;

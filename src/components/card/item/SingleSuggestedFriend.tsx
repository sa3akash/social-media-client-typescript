import UserAvater from "@/components/common/UserAvater";
import { Button } from "@/components/ui/button";
import { IFollowerDoc } from "@/interfaces/auth.interface";
import { api } from "@/services/http/api";
import { Dispatch, FC } from "react";

interface Props {
  item: IFollowerDoc,
  setData:Dispatch<React.SetStateAction<IFollowerDoc[] | undefined>>
}

const SingleSuggestedFriend:FC<Props> = ({ item ,setData}) => {
  return (
    <div className="w-full flex items-center gap-4 justify-between mr-2">
      <div className="flex items-center gap-2">
        <div className="w-14 h-14 rounded-full overflow-hidden border-[2px]">
          <UserAvater
            src={item.profilePicture}
            name={item.name}
            className="w-full h-full md:w-full md:h-full"
            avatarColor={item.avatarColor}
          />
        </div>
        <div className="text-[14px] tracking-[0.2px] capitalize">{`${item.name.first} ${item.name.last}`}</div>
      </div>
      <Button
        onClick={() => {
          api.followUserApi(item._id);
          setData(prev=>prev?.filter(i=>i._id !== item._id))
        }}
        className="h-8 capitalize font-semibold text-[14px] bg-green-400"
      >
        follow
      </Button>
    </div>
  );
};

export default SingleSuggestedFriend;

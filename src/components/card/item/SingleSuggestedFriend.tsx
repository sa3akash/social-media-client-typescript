import UserAvater from "@/components/common/UserAvater";
import { Button } from "@/components/ui/button";
import useMutationCustom from "@/hooks/useMutationCustom";
import { IFollowerDoc } from "@/interfaces/auth.interface";
import { followUserFn } from "@/services/http";
import { useQueryClient } from "@tanstack/react-query";
import { FC } from "react";

interface Props {
  item: IFollowerDoc;
}

const SingleSuggestedFriend: FC<Props> = ({ item }) => {
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

  const followUser = () => {
    mutation.mutate(item._id);
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
        <div className="text-[14px] tracking-[0.2px] capitalize">{`${item.name.first} ${item.name.last}`}</div>
      </div>
      <Button
        onClick={followUser}
        className="h-8 capitalize font-semibold text-[14px] bg-green-400"
      >
        follow
      </Button>
    </div>
  );
};

export default SingleSuggestedFriend;

import FriendHeader from "@/components/friends/FriendHeader";
import SingleFriendItem from "@/components/friends/item/SingleFriendItem";
import { IFollowerDoc } from "@/interfaces/auth.interface";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useState } from "react";
import FriendsSkeleton from "@/components/friends/skeleton/FriendsSkeleton";

const FriendPage = () => {
  const [userData, setUserData] = useState<IFollowerDoc[]>([]);

  const { lastElementRef, loading } = useInfiniteScroll(
    "/users",
    (data: { users: IFollowerDoc[] }) => {
      setUserData(data.users);
    }
  );

  if (loading) return <FriendsSkeleton />;

  return (
    <div className="w-full h-full flex flex-col gap-2 md:gap-4 mt-2 md:mt-8">
      <FriendHeader />
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-2 md:gap-4">
        {userData.map((item: IFollowerDoc, index: number) => {
          if (userData.length === index + 1) {
            return (
              <SingleFriendItem key={index} item={item} ref={lastElementRef} />
            );
          } else {
            return <SingleFriendItem key={index} item={item} />;
          }
        })}
      </div>
    </div>
  );
};

export default FriendPage;

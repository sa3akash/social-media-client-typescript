import FriendHeader from "@/components/friends/FriendHeader";
import SingleFriendItem from "@/components/friends/item/SingleFriendItem";
import { IFollowerDoc } from "@/interfaces/auth.interface";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Utils } from "@/services/utils/utils";

const FriendPage = () => {
  const [userData, setUserData] = useState<IFollowerDoc[]>([]);
  const [selectType, setSelectType] = useState<string>("users");

  const { lastElementRef, loading } = useInfiniteScroll(
    selectType === "users" ? "/users" : `/user/${selectType}`,
    (data: { users: IFollowerDoc[]; currentPage: number }) => {
      setUserData(
        data.currentPage === 1
          ? data.users
          : Utils.uniqueArray([...userData, ...data.users])
      );
    }
  );

  return (
    <div className="w-full h-full flex flex-col gap-2 md:gap-4 mt-2 md:mt-8">
      <FriendHeader setSelectType={setSelectType} selectType={selectType} />
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
      {userData.length === 0 && !loading && (
        <div className="w-full text-[24px] font-semibold text-center capitalize">
          No {selectType === "users" ? "friends" : selectType} found.
        </div>
      )}

      {loading && (
        <p className="p-4 flex items-center justify-center">
          <Loader2 className="animate-spin w-6 h-6" />
        </p>
      )}
    </div>
  );
};

export default FriendPage;

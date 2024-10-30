import FriendHeader from "@/components/friends/FriendHeader";
// import SingleFriendItem from "@/components/friends/item/SingleFriendItem";
import { IFollowerDoc } from "@/interfaces/auth.interface";
import { lazy, Suspense, useState } from "react";
import { Loader2 } from "lucide-react";
import FriendSingleSkeleton from "@/components/friends/skeleton/FriendSingleSkeleton";
import { useInfiniteFriends } from "@/hooks/testhook/useGetFriends";

const SingleFriendItem = lazy(
  () => import("@/components/friends/item/SingleFriendItem")
);

const FriendPage = () => {
  const [selectType, setSelectType] = useState<string>("users");

  const baseUrl = selectType === "users" ? "users" : `user/${selectType}`;

  const { users, isFetching, lastPostRef } = useInfiniteFriends(baseUrl);

  return (
    <section className="w-full h-full flex flex-col gap-2 md:gap-4 mt-2 md:mt-8">
      <FriendHeader setSelectType={setSelectType} selectType={selectType} />
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-2 md:gap-4">
        {users.map((item: IFollowerDoc, index: number) => {
          if (users.length === index + 1) {
            return (
              <Suspense fallback={<FriendSingleSkeleton />} key={index}>
                <SingleFriendItem key={index} item={item} ref={lastPostRef} />
              </Suspense>
            );
          } else {
            return (
              <Suspense fallback={<FriendSingleSkeleton />} key={index}>
                <SingleFriendItem key={index} item={item} />
              </Suspense>
            );
          }
        })}
      </div>
      {users.length === 0 && !isFetching && (
        <div className="w-full text-[24px] font-semibold text-center capitalize">
          No {selectType === "users" ? "friends" : selectType} found.
        </div>
      )}

      {isFetching && (
        <p className="p-4 flex items-center justify-center">
          <Loader2 className="animate-spin w-6 h-6" />
        </p>
      )}
    </section>
  );
};

export default FriendPage;

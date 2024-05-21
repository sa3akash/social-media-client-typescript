import FriendHeader from "@/components/friends/FriendHeader";
import SingleFriendItem from "@/components/friends/item/SingleFriendItem";
import { IFollowerDoc } from "@/interfaces/auth.interface";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import useReactInfiniteScroll from "@/hooks/useReactInfiniteScroll";
import api from "@/services/http";
import FriendsSkeleton from "@/components/friends/skeleton/FriendsSkeleton";

const FriendPage = () => {
  const [selectType, setSelectType] = useState<string>("users");

  const baseUrl = selectType === "users" ? "users" : `user/${selectType}`;

  const { data, lastElementRef, loading } = useReactInfiniteScroll({
    baseURL: baseUrl,
    fn: async ({ pageParam }) => {
      const response = await api.get(`/${baseUrl}?page=${pageParam}`);
      return response.data;
    },
  });

  if (!data) {
    return <FriendsSkeleton />;
  }

  const mainData = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.users];
  }, []);

  return (
    <section className="w-full h-full flex flex-col gap-2 md:gap-4 mt-2 md:mt-8">
      <FriendHeader setSelectType={setSelectType} selectType={selectType} />
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-2 md:gap-4">
        {mainData.map((item: IFollowerDoc, index: number) => {
          if (mainData.length === index + 1) {
            return (
              <SingleFriendItem key={index} item={item} ref={lastElementRef} />
            );
          } else {
            return <SingleFriendItem key={index} item={item} />;
          }
        })}
      </div>
      {mainData.length === 0 && !loading && (
        <div className="w-full text-[24px] font-semibold text-center capitalize">
         No {selectType === "users" ? "friends" : selectType} found.
        </div>
      )}

      {loading && (
        <p className="p-4 flex items-center justify-center">
          <Loader2 className="animate-spin w-6 h-6" />
        </p>
      )}
    </section>
  );
};

export default FriendPage;

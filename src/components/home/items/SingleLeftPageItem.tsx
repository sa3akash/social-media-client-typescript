import { PageSidebarDoc } from "@/data/SidebarLeftData";
import { cn } from "@/lib/utils";
import React from "react";
import { useSearchParams } from "react-router-dom";
interface Props {
  item: PageSidebarDoc;
}
const SingleLeftPageItem: React.FC<Props> = ({ item }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get("page") === `${item._id}`;

  return (
    <div
      className="flex items-center w-full h-14 pl-0 justify-center lg:justify-start lg:pl-6 gap-3 relative cursor-pointer"
      onClick={() => setSearchParams({ page: `${item._id}` })}
    >
      {item?.imageUrl?.length ? (
        <img
          src={item.imageUrl}
          alt={item.name}
          className={cn(
            "",
            active && "filter brightness-50 dark:brightness-150 "
          )}
        />
      ) : (
        <div className="w-9 h-9 overflow-hidden rounded-md bg-rose-400"></div>
      )}
      <h3
        className={cn(
          "text-primary/60 transition-all hidden lg:block",
          active && "text-primary"
        )}
      >
        {item.name}
      </h3>
      {active ? (
        <div className="bg-[#1C1C24] dark:bg-white rounded-md w-1 h-[80%] absolute left-[-1px] " />
      ) : null}
    </div>
  );
};

export default SingleLeftPageItem;

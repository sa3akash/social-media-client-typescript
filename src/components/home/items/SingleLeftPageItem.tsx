import Image from "@/components/common/Image";
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
      className="flex items-center w-full h-14 pl-0 justify-center lg:justify-start lg:pl-6 gap-3 relative cursor-pointer select-none"
      onClick={() => setSearchParams({ page: `${item._id}` })}
    >
      {item?.imageUrl?.length ? (
        <div className="w-9 h-9 rounded-lg overflow-hidden">
          <Image
            src={item.imageUrl}
            className={cn(
              "w-full h-full object-cover",
              active && "filter brightness-50 dark:brightness-150"
            )}
            
            classNameTwo="object-cover"
          />
        </div>
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

import RightSidePageItem from "@/components/home/items/RightSidePageItem";
import { IUserDoc } from "@/interfaces/auth.interface";
import React from "react";

interface Props {
  title: string;
  data: IUserDoc[];
  type: "page" | "friends" | "groups";
}

const RightSideFriends: React.FC<Props> = ({ title, data, type }) => {
  const end = type === "page" ? 3 : type === "groups" ? 5 : data.length;
  return (
    <div className="px-4 py-6">
      <h3 className="text-[#92929D] font-semibold text-[14px] tracking-[1px] uppercase">
        {title}
      </h3>
      <div className="flex flex-col gap-4 mt-4">
        {data.slice(0, end).map((u, i) => (
          <RightSidePageItem key={i} item={u} active={true} />
        ))}
      </div>
    </div>
  );
};

export default RightSideFriends;

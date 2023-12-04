import { IPostHederMenu, postHederMenu } from "@/data/menuData";
import React from "react";

const PostHeaderModel = () => {
  return (
    <div className="absolute z-20 top-14 right-4 w-[300px] rounded-xl bg-muted dark:bg-[#292932] borderWrapper p-2">
      {postHederMenu.map((item, index) => (
        <SingleItem item={item} key={index} />
      ))}
    </div>
  );
};

export default PostHeaderModel;

const SingleItem = ({ item }: { item: IPostHederMenu }) => {
  return (
    <div className="px-4 py-2 flex items-center gap-4 w-full cursor-pointer select-none">
      <img src={item.icon} alt="icon" className="filter brightness-50 dark:brightness-100" />
      <div className="w-full">
        <h3 className="text-[14px] roboto tracking-[0.1px]">{item.title}</h3>
        <span className="text-[12px] roboto text-[#696974]">
          {item.subTitle}
        </span>
      </div>
    </div>
  );
};

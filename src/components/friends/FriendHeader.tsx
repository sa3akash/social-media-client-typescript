import FilterButton from "@/components/common/FilterButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchIcon from "@/assets/images/ic_Search.svg";
import FilterIcon from "@/assets/images/btn_Filter.svg";
import React from "react";

interface Props {
  setSelectType: React.Dispatch<React.SetStateAction<string>>;
  selectType: string;
}

const FriendHeader: React.FC<Props> = ({ setSelectType, selectType }) => {
  return (
    <div className="cardBG md:!bg-transparent flex items-start justify-between px-4 py-2 md:px-0">
      <div className="flex items-center">
        <h2 className="font-semibold text-[18px] md:text-[24px] leading-9 tracking-[0.1px]">
          Friends List
        </h2>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <FilterButton
          img={SearchIcon}
          className="bg-[#292932] hover:bg-[#292932ca] hidden sm:block"
        />
        <div className="flex cardBG items-center w-full h-full md:pl-4 md:py-0.5 justify-center rounded-lg">
          <span className="hidden md:block roboto text-[18px] tracking-[0.1px] text-[#696974] mr-2">
            Sort by:
          </span>
          <div className="cursor-pointer select-none flex items-center">
            <Select
              onValueChange={(e) => setSelectType(e)}
              defaultValue={selectType}
            >
              <SelectTrigger className="w-[100px] sm:w-max cardBG border-none roboto text-[16px] font-semibold tracking-[0.1px] text-[#B5B5BE] focus:outline-none focus:ring-0 focus:ring-offset-0 p-0">
                <SelectValue placeholder="All Users" className="hidden" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="users">All Users</SelectItem>
                <SelectItem value="followings">Followings</SelectItem>
                <SelectItem value="followers">Followers</SelectItem>
              </SelectContent>
            </Select>
            {/* <img src={ArrowDown} alt="icon" /> */}
          </div>
        </div>

        <FilterButton
          img={FilterIcon}
          className="bg-[#292932] hover:bg-[#292932ca] hidden sm:block"
        />
        <FilterButton
          img={SearchIcon}
          className="bg-[#292932] hover:bg-[#292932ca] sm:hidden"
        />
      </div>
    </div>
  );
};

export default FriendHeader;

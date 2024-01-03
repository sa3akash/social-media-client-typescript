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

const FriendHeader = () => {
  return (
    <div className="cardBG md:!bg-transparent flex items-start justify-between px-4 py-2 md:px-0">
      <div className="flex items-center">
        <h2 className="font-semibold text-[18px] md:text-[24px] leading-9 tracking-[0.1px]">
          Friends List
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <FilterButton img={SearchIcon} className="bg-[#292932] hover:bg-[#292932ca]"/>
        <div className="hidden md:flex cardBG items-center w-full h-full pl-4 py-0.5 justify-center rounded-lg">
          <span className="hidden md:block roboto text-[18px] tracking-[0.1px] text-[#696974]">
            Sort by:
          </span>
          <div className="cursor-pointer select-none flex items-center">
            <Select>
              <SelectTrigger className="w-[120px] sm:w-[150px] cardBG border-none roboto text-[16px] font-semibold tracking-[0.1px] text-[#B5B5BE] focus:outline-none focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Newest Post" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Newest Post</SelectItem>
                <SelectItem value="dark">Old Post</SelectItem>
                <SelectItem value="system">Popular Post</SelectItem>
              </SelectContent>
            </Select>
            {/* <img src={ArrowDown} alt="icon" /> */}
          </div>
        </div>
        <FilterButton img={FilterIcon} className="bg-[#292932] hover:bg-[#292932ca]"/>
      </div>
    </div>
  );
};

export default FriendHeader;

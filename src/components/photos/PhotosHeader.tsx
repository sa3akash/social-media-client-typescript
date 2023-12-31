import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FilterButton from "@/components/common/FilterButton";
import SearchIcon from "@/assets/images/ic_Search.svg";
import FilterIcon from "@/assets/images/btn_Filter.svg";


const PhotosHeader = () => {
  return (
    <div className=" flex items-start justify-between px-4 md:px-0">
      <div className="flex items-center gap-4 ">
        <h2 className="hidden 2xl:block font-semibold text-[24px] leading-9 tracking-[0.1px]">
          Your Photos
        </h2>
        <div className="flex items-center gap-2">
          <span className="hidden xl:block roboto text-[18px] tracking-[0.1px] text-[#696974]">
            Show:
          </span>
          <div className="cursor-pointer select-none flex items-center gap-2">
            <Select>
              <SelectTrigger className="w-[130px] sm:w-[180px] bg-none border-none roboto text-[14px] xl:text-[15px] font-semibold tracking-[0.1px] text-[#B5B5BE] focus:outline-none focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="My Photos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="my-photos">My Photos</SelectItem>
                <SelectItem value="friends-photos">Friends Photos</SelectItem>
                <SelectItem value="public-photos">Public Photos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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

export default PhotosHeader;

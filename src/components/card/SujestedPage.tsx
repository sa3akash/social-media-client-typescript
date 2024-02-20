import { Separator } from "@/components/ui/separator";
import { userData } from "@/data/AddStoryData";
import LikeThumbIcon from "@/assets/images/ic_Like_Thumb.svg";
import { Link } from "react-router-dom";
import UserAvater from "@/components/common/UserAvater";

const SujestedPage = () => {
  return (
    <div className="cardBG rounded-lg relative w-full">
      <div className="flex items-center justify-between px-4 py-4 ">
        <h3 className="text-[14px] tracking-[0.1px]">Suggested Pages</h3>
        <Link
          to="/"
          className="font-semibold text-[14px] uppercase cursor-pointer select-none"
        >
          See All
        </Link>
      </div>
      <Separator />

      <div className="px-4 py-4 flex flex-col w-full gap-4">
        <div className="w-full flex items-center gap-4 cursor-pointer">
          <div
            className="w-14 h-14 rounded-full overflow-hidden border-[2px]"
            style={{borderColor: `${userData[0].avatarColor}`}}
          >
        <UserAvater src={userData[0].profilePicture} name={userData[0].name} className="w-full h-full md:w-full md:h-full" avatarColor={userData[0].avatarColor} authId={userData[0].authId}/>
            
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] tracking-[0.1px] capitalize font-semibold">{`${userData[0].name.first} ${userData[0].name.last}`}</span>
            <span className="text-[12px] text-[#696974] roboto">
              Design Studio
            </span>
          </div>
        </div>

        <div className="h-[232px] rounded-xl borderWrapper">
          <div className="h-[75%] bg-green-400"></div>
          <div className="h-[25%] flex items-center justify-center gap-2 cursor-pointer select-none">
            <img src={LikeThumbIcon} alt="icon" />
            <span className="text-[14px] roboto tracking-[0.1px] dark:text-[#D5D5DC]">
              Like Page
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SujestedPage;

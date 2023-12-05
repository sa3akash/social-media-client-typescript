import { Separator } from "@/components/ui/separator";
import Image from "@/components/common/Image";
import { cn } from "@/lib/utils";
import { userData } from "@/data/AddStoryData";
import LikeThumbIcon from "@/assets/images/ic_Like_Thumb.svg";
import CardHeader from "@/components/card/item/CardHeader";

const SujestedPage = () => {
  return (
    <div className="cardBG rounded-lg relative w-full">
      <CardHeader
        type="link"
        text="Suggested Pages"
        linkText="See All"
        link="/"
      />
      <Separator />

      <div className="px-4 py-4 flex flex-col w-full gap-4">
        <div className="w-full flex items-center gap-4 cursor-pointer">
          <div
            className={cn(
              "w-14 h-14 rounded-full overflow-hidden border-[2px]",
              userData[0].avatarColor && `border-[${userData[0].avatarColor}]`
            )}
          >
            <Image src={userData[0].profilePicture} />
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

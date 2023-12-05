import { useRef } from "react";
import { Separator } from "@/components/ui/separator";
import useDetectOutsideClick from "@/hooks/useDetactOutsideClick";
import MoreDot from "@/assets/images/ic_More_3_dot.svg";
import LocationIcon from "@/assets/images/ic_Place.svg";
import WebsiteIcon from "@/assets/images/ic_website.svg";
import DateIcon from "@/assets/images/ic_date.svg";
import WorkingIcon from "@/assets/images/ic_Working.svg";
import RelationShipIcon from "@/assets/images/ic_relationship.svg";
import { cn } from "@/lib/utils";

const AboutMeCard = () => {
  const docRef = useRef(null);

  const [openModel, setOpenModel] = useDetectOutsideClick(docRef, false);
  return (
    <div className="cardBG rounded-lg relative w-full">
      <div className="flex items-center justify-between px-4 py-4 ">
        <h3 className="text-[14px] tracking-[0.1px]">About us</h3>
        <div
          className={cn(
            "w-7 h-4 rounded-full grid place-items-center cursor-pointer select-none",
            openModel && "borderColor"
          )}
          onClick={() => setOpenModel!((prev) => !prev)}
          ref={docRef}
        >
          <img src={MoreDot} alt="dot" />
        </div>
      </div>
      <Separator />
      <div className="px-4 py-4 w-full roboto text-[14px] tracking-[0.1px]">
        “Pushing pixels and experiences in digital products for Sebostudio”
      </div>
      <Separator />

      <div className="px-4 py-4 flex flex-col w-full gap-4">
        <div className="flex flex-col justify-start cursor-pointer w-full gap-4">
          <SingleItem icon={LocationIcon} text="Yogyakarta, ID" />
          <SingleItem icon={WebsiteIcon} text="dribbble.com/fawait" />
          <SingleItem icon={DateIcon} text="Joined June 2012" />
          <SingleItem icon={WorkingIcon} text="Working at Sebo Studio" />
          <SingleItem
            icon={RelationShipIcon}
            text="In relationship with Gal Gadot"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutMeCard;

interface SingleProps {
  text: string;
  icon: string;
}

const SingleItem = ({ icon, text }: SingleProps) => {
  return (
    <div className="flex gap-4">
      <img src={icon} alt="icon" className="w-6" />
      <div className="text-[14px] tracking-[0.2px] dark:text-[#D5D5DC]">
        {text}
      </div>
    </div>
  );
};

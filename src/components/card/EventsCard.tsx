import { useRef } from "react";
import { Separator } from "@/components/ui/separator";
import useDetectOutsideClick from "@/hooks/useDetactOutsideClick";
import MoreDot from "@/assets/images/ic_More_3_dot.svg";
import ScheduleIcon from "@/assets/images/ic_Schedule.svg";
import BirthDayIcon from "@/assets/images/ic_Birthday.svg";
import CardHeader from "@/components/card/item/CardHeader";

const EventsCard = () => {
  const docRef = useRef(null);
  const [openModel, setOpenModel] = useDetectOutsideClick(docRef, false);
  return (
    <div className="cardBG rounded-lg relative w-full">
      <CardHeader
        type="dot"
        icon={MoreDot}
        text="Events"
        ref={docRef}
        openModel={openModel}
        setOpenModel={setOpenModel}
      />
      <Separator />

      <div className="px-4 py-4 flex flex-col w-full gap-4">
        <div className="flex flex-col justify-start cursor-pointer w-full gap-4">
          <SingleItem icon={ScheduleIcon} text="10 Events Invites" />
          <SingleItem icon={BirthDayIcon} text="Prada's Invitation Birthday" />
        </div>
      </div>
    </div>
  );
};

export default EventsCard;

const SingleItem = ({ icon, text }: { icon: string; text: string }) => {
  return (
    <div className="flex gap-4">
      <img src={icon} alt="icon" className="w-6" />
      <div className="text-[14px] tracking-[0.2px] dark:text-[#D5D5DC]">
        {text}
      </div>
    </div>
  );
};

import React, { useRef } from 'react'
import { Separator } from "@/components/ui/separator";
import useDetectOutsideClick from '@/hooks/useDetactOutsideClick';
import MoreDot from "@/assets/images/ic_More_3_dot.svg";
import { cn } from '@/lib/utils';
import ScheduleIcon from '@/assets/images/ic_Schedule.svg'
import BirthDayIcon from '@/assets/images/ic_Birthday.svg'


const EventsCard = () => {
    const docRef = useRef(null);
  const [openModel, setOpenModel] = useDetectOutsideClick(docRef, false);
  return (
    <div className="cardBG rounded-lg relative w-full">
    <div className="flex items-center justify-between px-4 py-4 ">
      <h3 className="text-[14px] tracking-[0.1px]">Events</h3>
      <div
        className={cn(
          "w-7 h-4 rounded-full grid place-items-center cursor-pointer select-none",
          openModel && "borderColor"
        )}
        onClick={() => setOpenModel((prev) => !prev)}
        ref={docRef}
      >
        <img src={MoreDot} alt="dot" />
        {/* {openModel && <PostHeaderModel />} */}
      </div>
    </div>
    <Separator />

    <div className="px-4 py-4 flex flex-col w-full gap-4">
      <div className="flex flex-col justify-start cursor-pointer w-full gap-4">
        <div className="flex gap-4">
          <img src={ScheduleIcon} alt="icon" className='w-6'/>
          <div className='text-[14px] tracking-[0.2px] text-[#D5D5DC]'>10 Events Invites</div>
        </div>
        <div className="flex gap-4">
          <img src={BirthDayIcon} alt="icon" className='w-6'/>
          <div className='text-[14px] tracking-[0.2px] text-[#D5D5DC]'>Prada&apos;s Invitation Birthday</div>
        </div>
      </div>
   
    </div>
  </div>
  )
}

export default EventsCard
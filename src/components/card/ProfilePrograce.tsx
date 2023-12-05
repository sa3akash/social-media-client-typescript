import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const ProfilePrograce = () => {
  return (
    <div className="cardBG rounded-lg relative w-full">
      <div className="flex items-center justify-between px-4 py-4 ">
        <h3 className="text-[14px] tracking-[0.1px]">Complete Your Profile</h3>
      </div>
      <Separator />
      <div className="flex items-center justify-between px-4 py-4 w-full gap-x-4">
        <Progress
          value={33}
          className="w-[90%] h-2 bg-primary"
          indicatorColor="bg-[#0062FF]"
        />
        <span>33%</span>
      </div>
    </div>
  );
};

export default ProfilePrograce;
